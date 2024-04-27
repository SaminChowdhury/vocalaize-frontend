import { Stack, Select, Button, Box, Input } from '@chakra-ui/react'
import React from 'react';
import { useCallback, useState, useRef, useEffect} from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { set } from 'firebase/database';
//import useDrivePicker from 'react-google-drive-picker'

    const HomePage = () => {
    const [file, setFile] = useState(null);
    const [language1, setLanguage1] = useState('');
    const [language2, setLanguage2] = useState('');
    const [languageOptions, setLanguageOptions] = useState([]);
    const navigate = useNavigate();
    const fileInputRef = useRef(null);
    const [subscriptionLevel, setSubscriptionLevel] = useState('');
    const [showAds, setShowAds] = useState(false);
    const [userId, setUserId] = useState(null);
    const [user, setUser] = useState({ id: null });
    const [translationId, setTranslationId] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [status, setStatus] = useState('idle'); //idle, loading, completed
    const [isPlaying, setIsPlaying] = useState(false);
    const [isTranslatedPlaying, setIsTranslatedPlaying] = useState(false);

//Language Dropdown Menus

    useEffect(() => {
      const fetchLanguageOptions = async () => {
        try {
          const response = await fetch('http://127.0.0.1:5000/languages');
          if (!response.ok) {
            throw new Error('Failed to fetch language options');
          }
          const data = await response.json();
          setLanguageOptions(data); // Ensure this matches the API response structure
        } catch (error) {
          console.error('Error:', error);
        }
      };
  
      fetchLanguageOptions();
    }, []);

//Token Checking

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
        fetch('http://127.0.0.1:5000/validate-token', {
            method: 'GET',
            headers: {
                'token': `${token}`
            }
        }).then(response => {
            if (response.ok) {
                return response.json();
            } else {
                localStorage.clear();
                navigate('/SignIn')
                throw new Error('Token validation failed');
            }
        }).then(data => {
            console.log('Token is valid:', data);
            setUserId(data.user_info.user_id);
        }).catch(error => {
            console.error('Error:', error);
            navigate('/SignIn')
        });

    }
  else{
    navigate('/SignIn');
  }
}, []);

useEffect(() => {
  if (userId) {
    checkSubscriptionLevel(userId);
  }
}, [userId]);

//File Dropzone

const onDrop = useCallback((acceptedFiles) => {
  const firstFile = acceptedFiles[0];
  if (firstFile && firstFile.name.match(/.(mp3|wav)$/)) {
    setFile({
      name: firstFile.name,
      size: firstFile.size,
      type: firstFile.type,
    });
  }
}, []);

const { getRootProps, getInputProps } = useDropzone({
  onDrop,
  multiple: false,
});

 // Token validation to get user ID
 useEffect(() => {
  const validateToken = async () => {
    const token = localStorage.getItem('token');
    if (!token) {
      console.error("No token available.");
      return;
    }

    try {
      const response = await fetch('http://127.0.0.1:5000/validate-token', {
        method: 'GET',
        headers: {
          'token': `${token}`
        }
      });

      if (!response.ok) throw new Error('Token validation failed.');

      const data = await response.json();
      setUser({ id: data.user_info.user_id });
    } catch (error) {
      console.error('Error validating token:', error);
    }
  };

  validateToken();
}, []);


// File Uploads
const handleFileChange = (e) => {
  setFile(e.target.files[0]);
};

const handleFileUpload = async () => {
  if (!file || !user.id || !language1 || !language2) {
    alert("Please ensure a file is selected / audio is recorded and all form fields are filled.");
    return;
  }

  console.log("Uploading file:", file, user.id, language1, language2);

  const formData = new FormData();
  formData.append('file', file);
  formData.append('user_id', user.id);
  formData.append('source_language', language1);
  formData.append('target_language', language2);

  setIsLoading(true);
  setStatus('loading');

  try {
    const response = await fetch('http://127.0.0.1:5000/upload-audio', {
      method: 'POST',
      body: formData,
      headers: {
      }
    });

    if (!response.ok) throw new Error('Failed to upload file.');

    console.log("Script running...")

    const data = await response.json();

    setTranslationId(data.translation_id);
    setStatus('completed');

    console.log("File uploaded and translation created, ID: " + data.translation_id);
    alert('File uploaded and translation created, ID: ' + data.translation_id);
  } catch (error) {
    console.error('Error during file upload:', error);
    alert('Error during file upload: ' + error.message);
    setStatus('idle');
  } finally {
    setIsLoading(false);
  }
};

//Subscription Level Checking and Ads
  const checkSubscriptionLevel = async (userId) => {
    const token = localStorage.getItem('token');
    console.log('User id before fetch is ' + userId);
    if (token) {
      try {
        const response = await fetch(`http://127.0.0.1:5000/${userId}/subscription`, {
          method: 'GET', // Specify the correct HTTP method
          headers: {
            'Content-Type': 'application/json',
            'token': `${token}`
          },
        });
  
        if (response.ok) {
          const data = await response.json();
          // Check if the subscription level is 'Free Tier' in the response
          if (data.subscription_level === 'Free') {
            console.log('check1')
            setShowAds(true);
            console.log(showAds);
          } // Update showAds state if subscription level is 'Free Tier'
        } else {
          setShowAds(false);
          console.error('Failed to update subscription level:', response.statusText);
        }
      } catch (error) {
        console.error('Error updating subscription level:', error);
      }
    }
  }  

  
  useEffect(() => {
      checkSubscriptionLevel(userId);
      if (showAds) {
        // Load Google AdSense script dynamically
        const script = document.createElement('script');
        script.src = "https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-6506241455661341";
        script.crossOrigin = "anonymous";
        script.async = true;
        document.body.appendChild(script);
        console.log('when calling ads:' + userId)
      }
  }, [showAds]);

  // Audio Recording
  let gumStream;
  let mediaRecorder;
  let audioChunks = [];

  const startRecording = () => {
    let constraints = {
        audio: true,
        video: false
    }

    navigator.mediaDevices.getUserMedia(constraints).then(function (stream) {
      console.log("Starting recording");

      gumStream = stream;
      mediaRecorder = new MediaRecorder(stream);
      audioChunks = [];

      mediaRecorder.addEventListener("dataavailable", event => {
        audioChunks.push(event.data);
      });

      mediaRecorder.addEventListener("stop", () => {
        const audioBlob = new Blob(audioChunks, { type: 'audio/wav' });
        console.log("Recording stopped");
        onStop(audioBlob);
    });

      mediaRecorder.start();
      console.log("Recording started");
    }).catch(function (err) {
        console.error("Recording failed: ", err);
    });
  }

  const stopRecording = () => {
      console.log("Stopping recording");

      if (mediaRecorder && mediaRecorder.state === "recording") {
        mediaRecorder.stop();
        if (gumStream) {
            gumStream.getAudioTracks().forEach(track => track.stop());
        }
    }
  }

  const onStop = async (blob) => {
    console.log("Recording ready for translation");
    setFile(blob);
  }

  // Download Button
  const handleFileDownload = async () => {
    console.log("Downloading translation");

    if (!translationId) {
      alert("No file available for downloading.");
      return;
    }

    const downloadUrl = `http://127.0.0.1:5000/download-file/${user.id}/${translationId}`;

    try {
      const response = await fetch(downloadUrl, {
        method: 'GET',
      });
      if (response.ok) {
        const blob = await response.blob();
        
        // Create a link and trigger the download
        const downloadLink = document.createElement('a');
        downloadLink.href = URL.createObjectURL(blob);
        downloadLink.download = "translation.mp3"; // FILENAME CHANGE
        document.body.appendChild(downloadLink);
        downloadLink.click();
        document.body.removeChild(downloadLink);
        console.log("Translation downloaded successfully");
      } else {
        throw new Error("Failed to download file.");
      }
    } catch (error) {
      console.error("Error downloading translation:", error);
    }
  };

  // Share Button
  const handleShare = async () => {
    console.log("Sharing translation");

    if (!translationId) {
      alert("No file available for sharing.");
      return;
    }

    const downloadUrl = `http://127.0.0.1:5000/download-file/${user.id}/${translationId}`;

    try {
      const response = await fetch(downloadUrl, {
        method: 'GET',
      });
      if (response.ok) {
        const blob = await response.blob();
        const file = new File([blob], "translation.mp3", { type: 'audio/mp3' });
  
        if (navigator.share) {
          try {
            await navigator.share({
              title: "Vocalaize Translation",
              text: "Check out this translation!",
              files: [file],
            });
            console.log("Successful share prompt");
          } catch (error) {
            console.error("Error sharing the translation:", error);
          }
        } else {
          alert("Web share not supported on this browser.");
        }
      } else {
        throw new Error("Failed to fetch the translated file for sharing.");
      }
    } catch (error) {
      console.error("Error downloading translation for share:", error);
    }
  };

  // Play and Pause Recording Audio
  let currentBlobUrl = null; // Store blob url for current audio file

  const playRecordingAudio = () => {
    console.log("Playing audio")

    if (!file) {
      console.log("No file selected");
      return;
    }

    const audioPlayer = document.getElementById("audioPlayer");

    if (!currentBlobUrl || audioPlayer.src !== currentBlobUrl) {
      // Existing blob url
      if (currentBlobUrl) {
        URL.revokeObjectURL(currentBlobUrl);
        currentBlobUrl = null;
      }
      // New blob url
      currentBlobUrl = URL.createObjectURL(file);
      audioPlayer.src = currentBlobUrl;
      audioPlayer.load(); // Load the new source
      console.log("Loading new audio file...");
    }

    audioPlayer.play();
    setIsPlaying(true);

    audioPlayer.onplay = () => console.log("Audio is now playing");
    audioPlayer.onerror = () => {
      console.error("Error occurred while trying to play the audio.");
      setIsPlaying(false);
    }
    audioPlayer.onended = () => setIsPlaying(false);

  };

  const pauseRecordingAudio = () => {
    const audioPlayer = document.getElementById('audioPlayer');
    if (audioPlayer && !audioPlayer.paused) {
      audioPlayer.pause();
      setIsPlaying(false);
      console.log("Audio paused");
    }
  };

  // Play and Pause Translation Audio
  let currentTranslatedBlobUrl = null; // Store translated blob url for current audio file

  const playTranslatedAudio = async () => {
    console.log("Playing translated audio");

    const audioPlayer = document.getElementById("translatedAudioPlayer");
    if (!currentTranslatedBlobUrl) {
      const downloadUrl = `http://127.0.0.1:5000/download-file/${user.id}/${translationId}`;
  
      try {
        const response = await fetch(downloadUrl, { method: 'GET' });
        if (response.ok) {
          const translatedAudioBlob = await response.blob();
          
          // Cleanup previous blob URL if any
          if (currentTranslatedBlobUrl) {
            URL.revokeObjectURL(currentTranslatedBlobUrl);
          }
          
          // Create and set new blob URL
          currentTranslatedBlobUrl = URL.createObjectURL(translatedAudioBlob);
          audioPlayer.src = currentTranslatedBlobUrl;
          audioPlayer.load(); // Load the new source only once
          console.log("Loading new translated audio file...");
        } else {
          alert("Please translate your audio first");
          throw new Error("Failed to fetch translated audio");
        }
      } catch (error) {
        console.error("Error fetching translated audio:", error);
      }
    }
  
    audioPlayer.play();
    setIsTranslatedPlaying(true);
    audioPlayer.onplay = () => console.log("Translated audio is now playing");
    audioPlayer.onerror = () => {
      console.error("Error occurred while trying to play the translated audio.");
      setIsTranslatedPlaying(false);
    };
    audioPlayer.onended = () => setIsTranslatedPlaying(false);
  };
  
  const pauseTranslatedAudio = () => {
    const audioPlayer = document.getElementById('translatedAudioPlayer');
    if (audioPlayer && !audioPlayer.paused && !audioPlayer.ended && audioPlayer.readyState > 2) {
        audioPlayer.pause();
        setIsTranslatedPlaying(false);
        console.log("Translated audio paused");
    }
  };

//HTML AND CSS

  return (
    <div>
      <Navbar />
      <Stack border={'0.5px black solid'} minHeight="100vh" direction="column" justify="flex-start" align="center" overflow="hidden" bg="#E7EEFD">
        <Stack direction="column" justify="flex-start" align="center">
          <Stack pt={'50px'} pb={'20px'} direction="row" justify="flex-start" align="center" spacing={'750px'}>
            <Select
              variant='filled'
              value={language1} 
              onChange={(e) => setLanguage1(e.target.value)}
              size="sm"
              isDisabled={false}
              isInvalid={false}
              maxWidth="100%"
              h={'30px'}
              borderRadius={'10px'}
              shadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
            >
              <option value="">Select Language 1</option>
              {languageOptions.map((lang) => (
                <option key={lang.language_name} value={lang.language_name}>
                  {lang.language_name}
                </option>
              ))}
            </Select>
            <Select
              variant='filled'
              value={language2} 
              onChange={(e) => setLanguage2(e.target.value)}
              size="sm"
              isDisabled={false}
              isInvalid={false}
              maxWidth="100%"
              h={'30px'}
              borderRadius={'10px'}
              shadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
            >
              <option value="">Select Language 2</option>
              {languageOptions.map((lang) => (
                <option key={lang.language_name} value={lang.language_name}>
                  {lang.language_name}
                </option>
              ))}
            </Select>
          </Stack>
          <Stack 
          p={'80px'} 
          borderRadius="10px" 
          direction="column" 
          justify="flex-start" 
          align="flex-start" 
          spacing="10px" 
          overflow="hidden" 
          maxWidth="100%" 
          shadow='0 8px 16px 0 rgba(0,0,0,0.2), 0 6px 20px 0 rgba(0,0,0,0.19)'
          bg="rgba(137, 172, 212, 0.3)"

          >
            <Stack direction="row" justify="flex-start" align="center">
              
            <Input 
            fontSize={'18px'}
            type='file' 
            onChange={handleFileChange}
            size="md"
              />
              <div>
                {status === 'loading' && (
                  <div className="loading-container">
                    <img src="/path/to/loading.gif" alt="Loading..." />
                  </div>
                )}

                {status === 'completed' && (
                  <div className="completed-container">
                    <img src="/path/to/completed.gif" alt="Completed!" />
                  </div>
                )}
              <Button 
              onClick={handleFileUpload}
               size="lg" 
               variant="solid" 
               height='48px'
               bg={'#304289'} 
               px={'7px'}
               borderRadius={'20px'}
              borderStyle={'none'}
              textDecor={'none'}
              textColor={'#ffffff'}
              fontSize={'16px'}
              w={'80px'}
              _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);'}}
              >
            Translate
              </Button>
            </div>
              <Box as='div' borderRight={'2px solid black'} h={'100px'} mx={'60px'} />
              <Button 
              onClick={startRecording}
              size="lg" 
               variant="solid" 
               height='48px'
               bg={'#304289'} 
               borderRadius={'20px'}
              borderStyle={'none'}
              textDecor={'none'}
              textColor={'#ffffff'}
              fontSize={'16px'}
              px={'7px'}
              w={'80px'}
              _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);'}}>
                Start
              </Button>
              <Button 
              onClick={stopRecording}
              size="lg" 
               variant="solid" 
               height='48px'
               bg={'#304289'} 
               borderRadius={'20px'}
              borderStyle={'none'}
              textDecor={'none'}
              textColor={'#ffffff'}
              fontSize={'16px'}
              px={'7px'}
              w={'80px'}
              _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);'}}>
                Stop
              </Button>
              <Box as='div' borderRight={'2px solid black'} h={'100px'} mx={'60px'} />
              <audio id="audioPlayer" controls hidden></audio>
              <div>
                {isPlaying && (
                  <div className="playing-container">
                    <img src="/path/to/playing.gif" alt="Playing..." />
                  </div>
                )}

                <Button onClick={playRecordingAudio}
                  size="lg" 
                  variant="solid" 
                  height='48px'
                  bg={'#304289'} 
                  px={'7px'}
                  borderRadius={'20px'}
                  borderStyle={'none'}
                  textDecor={'none'}
                  textColor={'#ffffff'}
                  fontSize={'16px'}
                  w={'80px'}
                  _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17th 50px 0 rgba(0,0,0,0.19);'}}
                >
                  Play
                </Button>
                
                <Button onClick={pauseRecordingAudio}
                  size="lg" 
                  variant="solid" 
                  height='48px'
                  bg={'#304289'} 
                  borderRadius={'20px'}
                  borderStyle={'none'}
                  textDecor={'none'}
                  textColor={'#ffffff'}
                  fontSize={'16px'}
                  px={'7px'}
                  w={'80px'}
                  _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17th 50px 0 rgba(0,0,0,0.19);'}}
                >
                  Pause
                </Button>
              </div>

              <Box as='div' borderRight={'2px solid black'} h={'100px'} mx={'60px'} />
              <audio id="translatedAudioPlayer" controls hidden></audio>
              <div>
                {isTranslatedPlaying && (
                  <div className="playing-container">
                    <img src="/path/to/playing.gif" alt="Playing..." />
                  </div>
                )}

                <Button onClick={playTranslatedAudio}
                  size="lg" 
                  variant="solid" 
                  height='48px'
                  bg={'#304289'} 
                  px={'7px'}
                  borderRadius={'20px'}
                  borderStyle={'none'}
                  textDecor={'none'}
                  textColor={'#ffffff'}
                  fontSize={'16px'}
                  w={'80px'}
                  _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17th 50px 0 rgba(0,0,0,0.19);'}}
                >
                  Play
                </Button>

                <Button onClick={pauseTranslatedAudio}
                  size="lg" 
                  variant="solid" 
                  height='48px'
                  bg={'#304289'} 
                  borderRadius={'20px'}
                  borderStyle={'none'}
                  textDecor={'none'}
                  textColor={'#ffffff'}
                  fontSize={'16px'}
                  px={'7px'}
                  w={'80px'}
                  _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17th 50px 0 rgba(0,0,0,0.19);'}}
                >
                  Pause
                </Button>
              </div>

            </Stack>
          </Stack>
          <Stack direction="row" justify="center" align="center" ml={'950px'} mt={'20px'} m>
          <Button   // Download translated audio
              onClick={handleFileDownload}
              size="lg" 
              variant="solid" 
              height='48px'
              bg={'#ffffff'} 
              borderRadius={'20px'}
              borderStyle={'none'}
              textDecor={'none'}
              textColor={'#000000'}
              fontSize={'16px'}
              px={'7px'}
              w={'80px'}
              _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);'}}
            >
            Download
            </Button>
            <Button   // Share translated audio
              onClick={handleShare}
              size="lg" 
              variant="solid" 
              height='48px'
              bg={'#ffffff'} 
              borderRadius={'20px'}
              borderStyle={'none'}
              textDecor={'none'}
              textColor={'#000000'}
              fontSize={'16px'}
              px={'7px'}
              w={'80px'}
              _hover={{shadow: '0 12px 16px 0 rgba(0,0,0,0.24), 0 17px 50px 0 rgba(0,0,0,0.19);'}}
            >
            Share
            </Button>
          </Stack>
        </Stack>
        {/* Render the ad slot */}
        {showAds && (
          <Stack spacing={4}>
            <ins className="adsbygoogle"
                 style={{ display: 'inline-block', width: '728px', height: '90px' }}
                 data-ad-client="ca-pub-6506241455661341"
                 data-ad-slot="6283292929"></ins>
            <script dangerouslySetInnerHTML={{ __html: '(adsbygoogle = window.adsbygoogle || []).push({})' }}></script>
          </Stack>
        )}
        <Stack {...getRootProps()} spacing={4} align="center">
          <input {...getInputProps()} ref={fileInputRef} />
        </Stack>
      </Stack>
    </div>
  );
};

export default HomePage;