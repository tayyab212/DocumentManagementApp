import React, { useState } from 'react';
import { Button, Container, Row, Col } from 'reactstrap';
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
      alert('Document uploaded successfully!');
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container style={{ display: 'flex', justifyContent: 'center' }}>
      <Row>
        <Col md="12">
          <h2>Upload a Document</h2>
          <input multiple type="file" onChange={handleFileChange} />
          <Button outline color="primary" onClick={uploadDocument}>Upload</Button>
        </Col>
      </Row>
    </Container>
  );
};

export default DocumentUpload;
