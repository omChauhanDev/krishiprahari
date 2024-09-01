import axios from "axios";
const baseUrl = "http://localhost:3000/api/v1";

export const imageUpload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);
  
      const response = await axios.post(
        `${baseUrl}/upload/image`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.success) {
        getUserDetails(setUser);
      }
      return response;
    } catch (error) {
      console.error("Error occurred while uploading image", error);
      return {
        success: false,
        message: error.message,
      };
    }
  };