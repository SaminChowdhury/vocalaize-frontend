import React from 'react';
import { useCallback, useState, useEffect, useRef} from 'react';
import { useDropzone } from 'react-dropzone';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
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

  /*const [openPicker, authResponse] = useDrivePicker();  
  // const customViewsArray = [new google.picker.DocsView()]; // custom view
  const handleOpenPicker = () => {
    openPicker({
      clientId: "1079713253407-jmfbkfeq88tlj2c65drugq55cnsr5850.apps.googleusercontent.com",
      developerKey: "AIzaSyBrIOAA5G4ouxUJduqC0uKavy2gxCcTkX8",
      viewId: "DOCS",
      token:"ya29.a0Ad52N38-NtWt1EcRuzpxLO_KTvOWedlXMsp1vs9PwjnSoW8qDGiATdm1mP8Mq7RXAMwXaKTTeoByJNfwMGaOWcmmYgBn3rdKiXb_Xq_k1j3Uw9jTgqYdfm4_BAAVMEVulzpHmwZr6b2Q7GNSh102wV3cwttTJ9Y4d5_EaCgYKAZcSARASFQHGX2Mi4uVPLp8jfGbUwlxoqeF4_Q0171",
      showUploadView: true,
      showUploadFolders: true,
      supportDrives: true,
      multiselect: true,
      // customViews: customViewsArray, // custom view
      callbackFunction: (data) => {
        if (data.action === 'cancel') {
          console.log('User clicked cancel/close button')
        }
        console.log(data)
      },
    })
  }*/

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
        <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
          <select value={language1} onChange={(e) => setLanguage1(e.target.value)}>
            <option value="">Select Language 1</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
          <select value={language2} onChange={(e) => setLanguage2(e.target.value)}>
            <option value="">Select Language 2</option>
            {languages.map((lang) => (
              <option key={lang.code} value={lang.code}>
                {lang.name}
              </option>
            ))}
          </select>
        </div>
        <div>
        
          <input type='file' multiple ref={fileInputRef} />
        
          <button onClick={handleFileUpload}>Upload File</button>
        
        </div>
        {file && (
          <div style={{ marginTop: '20px' }}>
            <strong>Selected file:</strong> {file.name} - {file.size} bytes
          </div>
        )}
      </div>
    );
  };
export default HomePage;