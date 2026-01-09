import api from "./api";

 
// Register User Service Function
export const registerUser = async (formData) => {
  try {
    const response = await api.post("/auth/register", formData);
    console.log('====================================',response);
    console.log('==================after response==================');
  
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};


// Login User Service Function
export const loginUser = async (formData) => {
  try {
    const response = await api.post("/auth/login", formData);
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};
