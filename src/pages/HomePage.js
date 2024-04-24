import { Stack, Select, Button, Box } from '@chakra-ui/react'
import React from 'react';
import { useCallback, useState, useRef, useEffect} from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '../components/Navbar';
import { useNavigate } from 'react-router-dom';
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
    

//Language Dropdown Menus

    useEffect(() => {
      const fetchLanguageOptions = async () => {
        try {
          const response = await fetch('https://20.9.240.176:5000/languages');
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
        fetch('https://20.9.240.176:5000/validate-token', {
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

//File Upload and Translation Operations

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

const handleFileUpload = async () => {
  const files = fileInputRef.current.files;

  if (files.length > 0){
    const formData = new FormData();

    for(let i=0;i<files.length;i++){
      formData.append("files",files[i]);
    }

    try{
        const response = await fetch("https://20.9.240.176:5005/upload", {
          method: 'POST',
          body: formData
        })

      const data = await response.json()
      console.log("uploaded files: ", data.files)
    }

    catch(error){
      console.log("error")
    }
  }
}

//Subscription Level Checking and Ads

  const checkSubscriptionLevel = async (userId) => {
    const token = localStorage.getItem('token');
    console.log('User id before fetch is ' + userId);
    if (token) {
      try {
        const response = await fetch(`https://20.9.240.176:5000/${userId}/subscription`, {
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

//HTML AND CSS

  return (
    <div>
      <Navbar />
      <Stack minHeight="100vh" direction="column" justify="flex-start" align="center" overflow="hidden" bg="#CBD5E0">
        <Stack direction="column" justify="flex-start" align="center">
          <Stack pt={'50px'} pb={'20px'} direction="row" justify="flex-start" align="center" spacing={'750px'}>
            <Select
              value={language1} 
              onChange={(e) => setLanguage1(e.target.value)}
              size="sm"
              isDisabled={false}
              isInvalid={false}
              maxWidth="100%"
              h={'30px'}
              borderRadius={'8px'}
            >
              <option value="">Select Language 1</option>
              {languageOptions.map((lang) => (
                <option key={lang.nlp_code} value={lang.nlp_code}>
                  {lang.language_name}
                </option>
              ))}
            </Select>
            <Select
              value={language2} 
              onChange={(e) => setLanguage2(e.target.value)}
              size="sm"
              isDisabled={false}
              isInvalid={false}
              maxWidth="100%"
              h={'30px'}
              borderRadius={'8px'}
            >
              <option value="">Select Language 2</option>
              {languageOptions.map((lang) => (
                <option key={lang.nlp_code} value={lang.nlp_code}>
                  {lang.language_name}
                </option>
              ))}
            </Select>
          </Stack>
          <Stack p={'80px'} borderRadius="10px" direction="column" justify="flex-start" align="flex-start" spacing="10px" overflow="hidden" maxWidth="100%" background="rgba(137, 172, 212, 0.3)">
            <Stack direction="row" justify="flex-start" align="center">
              <input type='file' multiple ref={fileInputRef} />
              <Button onClick={handleFileUpload} size="lg" variant="solid" bg={'lightgrey'} borderRadius={'5px'}
          h={'38px'}
          >
            Translate
              </Button>
              <Box as='div' borderRight={'2px solid black'} h={'100px'} mx={'250px'} />
              <Button size="lg" variant="solid" bg={'white'} borderRadius={'5px'} p={'5px'} mr={'20px'} h={'38px'}>
                Play
              </Button>
              <Button size="lg" variant="solid" bg={'white'} borderRadius={'5px'} p={'5px'} mr={'50px'} h={'38px'}>
                Pause
              </Button>
            </Stack>
          </Stack>
          <Stack direction="row" justify="center" align="center" ml={'950px'} mt={'20px'} m>
            <Button size="lg" 
              variant="solid" 
              h={'38px'}
              bg={'#89ACD4'}  
              px={'7px'}
              borderRadius={'5px'}
              fontSize={'16px'}
              border={'1px solid black'}>
              Save
            </Button>
            <Button 
              size="lg" 
              variant="solid" 
              h={'38px'}
              bg={'#89ACD4'}  
              px={'7px'}
              borderRadius={'5px'}
              fontSize={'16px'}
              border={'1px solid black'}
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