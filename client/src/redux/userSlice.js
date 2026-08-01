import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: 'user',
    initialState: { 
        user : null,
        allUsers: [],
        allCurrentChats: [],
        selectedChats: null,
    },
    reducers: {
        setUser: (state,action) => { state.user = action.payload; },
        setAllUsers: (state,action) => { state.allUsers = action.payload; },
        setAllCurrentChats: (state,action) => { state.allCurrentChats = action.payload; },
        setSelectedChats: (state,action) => { state.selectedChats = action.payload; },
    }
});

export const { setUser, setAllUsers, setAllCurrentChats, setSelectedChats } = userSlice.actions;

export default userSlice.reducer;