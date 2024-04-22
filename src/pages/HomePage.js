import { Stack, Select, Button, Box } from '@chakra-ui/react'
import React from 'react';
import { useCallback, useState, useRef} from 'react';
import { useDropzone } from 'react-dropzone';
import Navbar from '../components/Navbar';
//import useDrivePicker from 'react-google-drive-picker'


const languages = [
    { code: 'en', name: 'English' },
    { code: 'es', name: 'Spanish' },
    { code: 'fr', name: 'French' },
    // Add more languages as needed
  ];
  
  const HomePage = () => {
    const [file, setFile] = useState(null);
    const [language1, setLanguage1] = useState('');
    const [language2, setLanguage2] = useState('');
  
    const onDrop = useCallback((acceptedFiles) => {
      // Since we only accept one file, grab the first one
      const firstFile = acceptedFiles[0];
      if (firstFile && firstFile.name.match(/\.(mp3|wav)$/)) {
        setFile({
          name: firstFile.name,
          size: firstFile.size,
          type: firstFile.type,
        });
      }
    }, []);
  
    const { getRootProps, getInputProps } = useDropzone({
      onDrop,
      multiple: false, // Ensure only one file is accepted
    });

  const fileInputRef = useRef(null);

  const handleFileUpload = async () => {
    const files = fileInputRef.current.files;

    if (files.length > 0){
      const formData = new FormData();

      for(let i=0;i<files.length;i++){
        formData.append("files",files[i]);
      }

      try{
          const response = await fetch("http://localhost:5005/upload", {
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
  
    return (
      <div>
        <Navbar />
        <Stack
        minHeight="100vh"
    direction="column"
    justify="flex-start"
    align="center"
    overflow="hidden"
    bg="#CBD5E0"
  >
    <Stack
      direction="column"
      justify="flex-start"
      align="center"
    >
      <Stack
        pt={'50px'}
        pb={'20px'}
        direction="row"
        justify="flex-start"
        align="center"
        spacing={'750px'}
      >
        <Select
          value={language1} onChange={(e) => setLanguage1(e.target.value)}
          size="sm"
          isDisabled={false}
          isInvalid={false}
          maxWidth="100%"
        >
          <option value="">Select Language 1</option>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
          </option>
        ))}
        </Select>
        <Select
          value={language2} onChange={(e) => setLanguage2(e.target.value)}
          size="sm"
          isDisabled={false}
          isInvalid={false}
          maxWidth="100%"
        >
          <option value="">Select Language 2</option>
        {languages.map((lang) => (
          <option key={lang.code} value={lang.code}>
            {lang.name}
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
        background="rgba(137, 172, 212, 0.3)"
      >
        <Stack
          direction="row"
          justify="flex-start"
          align="center"
          
        >
          <input type='file' 
          multiple ref={fileInputRef}
          />

          <Button onClick={handleFileUpload} 
          size="lg" 
          variant="solid" 
          bg={'lightgrey'}
          borderRadius={'3px'}>
            Upload
          </Button>
          <Box 
          as='div' 
          borderRight={'2px solid black'}
          h={'100px'}
          mx={'250px'}
          />
          <Button 
          size="lg" 
          variant="solid" 
          bg={'white'}
          borderRadius={'5px'}
          p={'5px'}
          mr={'20px'}
          >
            Play
          </Button>
          <Button 
          size="lg" 
          variant="solid" 
          bg={'white'}
          borderRadius={'5px'}
          p={'5px'}
          mr={'50px'}
          >
            Pause
          </Button>
        </Stack>
      </Stack>
      <Stack
        direction="row"
        justify="center"
        align="center"
        ml={'950px'}
        mt={'20px'}
        m
      >
        <Button 
        size="lg" 
        variant="solid" 
        bg={'white'}
        borderRadius={'5px'}
        p={'5px'}
        >
          Save
        </Button>
        <Button 
        size="lg" 
        variant="solid" 
        bg={'white'}
        borderRadius={'5px'}
        p={'5px'}
        
        >
          Share
        </Button>
      </Stack>
    </Stack>
  </Stack>
  </div>
    );
  };
export default HomePage;