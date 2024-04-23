import React from 'react';

const FileUploader = ({ onFileChange }) => {
    return (
        <input type="file" onChange={onFileChange} />
    );
};

export default FileUploader;