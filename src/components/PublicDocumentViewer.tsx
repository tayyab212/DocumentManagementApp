import React, { useEffect, useState } from 'react';
import axios, { AxiosResponse } from 'axios';
import { publicUrl } from '../apiCalls/apiCalls';

interface PublicDocumentViewerProps {
  token: string;
}

const PublicDocumentViewer: React.FC<PublicDocumentViewerProps> = ({ token }) => {
  const [documentUrl, setDocumentUrl] = useState<string>('');

  useEffect(() => {
    const fetchDocumentUrl = async (): Promise<void> => {
      try {

        const response = await publicUrl(token);
        debugger;
        const fileUrl: string = URL.createObjectURL(new Blob([response.data]));
        setDocumentUrl(fileUrl);
      } catch (error) {
        console.error('Error fetching document:', error);
      }
    };

    fetchDocumentUrl();

    return (): void => {
      // Clean up the created URL
      URL.revokeObjectURL(documentUrl);
    };
  }, [token]);

  return (
    <div>
      {documentUrl ? (
        <a href={documentUrl} download>
          Download Document
        </a>
      ) : (
        <p>Loading document...</p>
      )}
    </div>
  )
};

export default PublicDocumentViewer;
