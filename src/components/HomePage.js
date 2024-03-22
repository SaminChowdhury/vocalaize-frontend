import React from 'react';
import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';

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
        <div {...getRootProps()} >
        <Card>
          <input {...getInputProps()} />
          <p>Drag 'n' drop a .mp3 or .wav file here, or click to select a file</p>
          </Card>
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