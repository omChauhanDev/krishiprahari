import axios from "axios";
const baseUrl = `${import.meta.env.VITE_BASEURL}`;

export const imageUpload = async (tag, file, setUser) => {
    try {
      const token = localStorage.getItem("token");
      const formData = new FormData();
      formData.append("tag", tag);
      formData.append("file", file);
  
      const response = await axios.post(
        `${baseUrl}/upload/imageUpload`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
  
      if (response.data.success) {
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