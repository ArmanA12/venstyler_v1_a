// utils/authUtils.js or services/api.js
import axios from 'axios';

export const checkUserAuth = async () => {
  try {
    const response = await axios.get(
      `http://localhost:5000/api/auth/userAuthChecker`,
      {
        withCredentials: true, // ✅ ensure cookies are sent
      }
    );
    console.log(response, "auth check")
      return { success: true, user: response.data.data.userFromToken };
    
  } catch (error) {
    return {
      success: false,
      error: error.response?.data?.message || error.message,
    };
  }
};
