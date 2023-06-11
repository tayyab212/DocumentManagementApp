import React, { useState } from 'react';
import axios from 'axios';
import { postDocuments, getDocuments } from '../apiCalls/apiCalls';

const DocumentUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState<(string | Blob)[]>([]);

  const handleFileChange = (event: any) => {
    setSelectedFiles([...event.target.files]);
  }

  const uploadDocument = async () => {
    try {
      debugger;
      const formData = new FormData();
      selectedFiles.forEach((file) => {
        formData.append('files', file);
      });

      await postDocuments(formData);
      await getDocuments();
      alert('Document uploaded successfully!');
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h2>Upload a Document</h2>
      <input multiple type="file" onChange={handleFileChange} />
      <button onClick={uploadDocument}>Upload</button>
    </div>
  );
};

export default DocumentUpload;
