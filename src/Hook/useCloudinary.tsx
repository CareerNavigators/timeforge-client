import axios from "axios";


const uploadImage = async (image: File): Promise<string> => {
    try {
      const formData = new FormData();
      formData.append("file", image);
      formData.append(
        "upload_preset",
        `${import.meta.env.VITE_IMAGE_UPLOAD_PREST}`
      );
  
      const response = await axios.post(
        `${import.meta.env.VITE_IMAGE_UPLOAD_API}`,
        formData
      );
      console.log(response.data.url);
      return response.data.url;
    } catch (error: any) {
      if (error.response) {
        console.error(
          "Server responded with error status:",
          error.response.status
        );
        console.error("Response data:", error.response.data);
      } else if (error.request) {
        console.error("No response received from the server.");
      } else {
        console.error("Error setting up the request:", error.message);
      }
  
      throw error;
    }
  };


const useCloudinary = () => {
    return uploadImage
};

export default useCloudinary;