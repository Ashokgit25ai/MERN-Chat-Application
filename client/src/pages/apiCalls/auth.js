import { axiosInstance } from "./index";

const getErrorResponse = (error, fallbackMessage) => {
    const responseData = error?.response?.data;

    if (responseData && typeof responseData === "object") {
        return responseData;
    }

    return {
        success: false,
        message: error?.message || fallbackMessage
    };
};

export const signupUser = async (user) => {
    try {
        const response = await axiosInstance.post("/api/auth/signup", user);
        return response.data;
    } catch (error) {
        return getErrorResponse(error, "Something went wrong while signing up.");
    }
};

export const loginUser = async (user) => {
    try {
        const response = await axiosInstance.post('/api/auth/login', user);
        return response.data;
    } catch (error) {
        return getErrorResponse(error, "Something went wrong while logging in.");
    }
};