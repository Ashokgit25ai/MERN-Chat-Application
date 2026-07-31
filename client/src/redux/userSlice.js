import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: { 
        user : null,
        allUsers: [],
        allCurrentChats: [],
    },
    reducers: {
        setUser: (state,action) => { state.user = action.payload; },
        setAllUsers: (state,action) => { state.allUsers = action.payload; },
        setAllCurrentChats: (state,action) => { state.allCurrentChats = action.payload; },
    }
});

export const { setUser, setAllUsers, setAllCurrentChats } = userSlice.actions;

export default userSlice.reducer;