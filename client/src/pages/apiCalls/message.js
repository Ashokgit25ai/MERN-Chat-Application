import { axiosInstance } from "./index"

export const createNewMessage = async ( message ) => {
    try{
        const response = await axiosInstance.post('api/message/new-message', message );
        return response.data;
    }catch(error){
        return error;
    }
};

export const getAllMessages = async (chatId, page = 1, limit = 30 ) => {
    try{
        const response = await axiosInstance.get(`api/message/get-all-messages/${chatId}?page=${page}&limit=${limit}`);
        return response.data;
    }catch(error){
        return error;
    }
};

