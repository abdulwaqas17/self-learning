import api from "./api";

// Register User Service Function
export const addSeat = async (formData) => {
  try {
    const response = await api.post("/seat/add", formData);
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
export const bookSeat = async (formData) => {
    const token = localStorage.getItem('userToken')
  try {
    const response = await api.put("/seat/book", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
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
export const confirmSeat = async (formData) => {
    const token = localStorage.getItem('userToken')
  try {
    const response = await api.put("/seat/confirm", formData, {
      headers: {
        Authorization: `Bearer ${token}`,
      }
    });
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
export const getSeats = async () => {
  try {
    const response = await api.get("/seat/get");
    return response.data;
  } catch (error) {
    if (error.response?.data?.message) {
      throw new Error(error.response.data.message);
    } else {
      throw new Error("Something went wrong. Please try again.");
    }
  }
};
