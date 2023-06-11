import axios from "axios";
import { debug } from "console";
import React, { useEffect, useState, ChangeEvent } from "react";
import { json } from "stream/consumers";
import { getDocuments, getDocumentById, downloadDocumentByIds, generateLink } from "../apiCalls/apiCalls";
import DocumentDto from "../models/Document ";
import PublicDocumentViewer from './PublicDocumentViewer';
const DocumentList = () => {
  const [documents, setDocuments] = useState<DocumentDto[]>([]);
  const [selectedDocuments, setSelectedDocuments] = useState<string[]>([]);
  const [shareableLink, setShareableLink] = useState('');
  const rootPath = 'src/icon/'; // Replace with your actual root path
  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await getDocuments();
      setDocuments(response.data);
    } catch (error) {
      console.error('Error fetching documents:', error);
    }
  };

  const downloadDocument = async (documentId: string): Promise<void> => {
    try {
      const response = await getDocumentById(documentId)
      debugger;
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      const extension = getFileExtension(documentId);
      link.download = `document.${extension}`; // Set the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading document:', error);
    }
  };

  const downloadSelectedDocuments = async (selectedDocuments: string[]) => {
    if (selectedDocuments.length === 0) {
      // Handle the case when no documents are selected
      return;
    }

    try {

      const response = await downloadDocumentByIds(selectedDocuments);

      // Create a URL for the blob response
      const url = window.URL.createObjectURL(new Blob([response.data]));

      // Create a link element to trigger the download
      const link = document.createElement('a');
      link.href = url;
      link.download = 'documents.zip'; // Set the desired filename
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      // const url = window.URL.createObjectURL(new Blob([response.data]));
      // const link = document.createElement('a');
      // link.href = url;
      // link.setAttribute('download', 'documents.zip');
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
    }
    catch (error) {
      console.log(error);
      // Handle the error scenario
    }
  };

  const generateHandler = async (documentId: string) => {
    try {
      const response = await generateLink(documentId);
      setShareableLink(response.data);
    } catch (error) {
      console.error('Error generating shareable link:', error);
    }
  };

  const handleCheckboxChange = (event: ChangeEvent<HTMLInputElement>) => {
    const documentId = event.target.value;

    if (event.target.checked) {
      setSelectedDocuments((prevSelectedDocuments) => [...prevSelectedDocuments, documentId]);
    } else {
      setSelectedDocuments((prevSelectedDocuments) => prevSelectedDocuments.filter((id) => id !== documentId));
    }
  };

  const getFileExtension = (documentId: string): string => {
    const parts = documentId.split('.');
    if (parts.length > 1) {
      return parts[parts.length - 1];
    }
    return ''; // Empty string if no extension found
  };


  return (
    <div>
      <h1>Document List</h1>
      <ul>
        <button onClick={() => downloadSelectedDocuments(selectedDocuments)}>
          Download Selected Documents
        </button>

        {documents.map((document) => (
          <li key={document.documentId}>
            <input
              type="checkbox"
              value={document.documentId}
              onChange={handleCheckboxChange}
              checked={selectedDocuments.includes(document.documentId)}
            />
            <h3>{document.name}</h3>
            <p>Type: {document.type}</p>
            <img src={`${rootPath}${document.icon}`} alt="Document Icon" />
            <img src={`data:image/png;base64,${document.contentPreviewImage}`} alt="Preview" />
            <p>Upload Date: {new Date(document.uploadDateTime).toLocaleDateString()}</p>
            <p>Download Count: {document.downloadCount}</p>
            <button onClick={() => downloadDocument(document.documentId)}>Download</button>

            <button onClick={() => generateHandler(document.documentId)}>Generate Shareable Link</button>
            {shareableLink && (
              <div>
                Shareable Link: <a href={shareableLink}>{shareableLink}</a>
              </div>
            )}


            {/* <PublicDocumentViewer token="a6deb854-e640-478b-b8e9-eea76b5fb2e1" /> */}
          </li>
        ))}
      </ul>
    </div >
  )
};

export default DocumentList;
