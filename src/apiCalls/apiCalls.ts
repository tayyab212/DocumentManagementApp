import axios from "axios";
import endPoints from "./apiRoutes";
const axiosConfig = {
  baseURL: "https://localhost:7178/api/",
};
const axiousApi = axios.create(axiosConfig);

export const getDocuments = async () => {
  const response = await axiousApi.get(endPoints.getDocuments);
  return response;
};

export const getDocumentById = async (documentId: string) => {
  const response = await axiousApi.get<Blob>(
    `${endPoints.getDocumentById}/${documentId}`,
    {
      responseType: "blob",
    }
  );
  return response;
};

export const downloadDocumentByIds = async (selectedDocumentIds: string[]) => {
  const response = await axiousApi.post(
    `${endPoints.downloadDocumentByIds}`,
    selectedDocumentIds,
    {
      responseType: "blob", // Set the response type to blob to handle binary data
    }
  );
  return response;
};

export const publicUrl = async (token: string) => {
  const response = await axiousApi.get(
    `${endPoints.publicUrl}/${token}`,
    {
      responseType: 'blob',
      // responseType: 'arraybuffer',
     
    }
    
  );
  return response;
};




export const generateLink = async (documentId: string) => {
  const response = await axiousApi.post(endPoints.generateLink,`"${documentId}"`, {
    headers: {
      'Content-Type': 'application/json',
    },
  }
  );
  return response;
};



export const postDocuments = async (formData: FormData) => {
  debugger;
  const response = await axiousApi.post(endPoints.uploadDocument, formData);
  return response;
};
