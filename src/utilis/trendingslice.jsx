import { createSlice } from "@reduxjs/toolkit";



const trendingslice = createSlice({
    name:"trending",
    initialState:{
        trending:null,
    },
    reducers:{
        addtrending: (state,action)=>{
            state.trending = action.payload;
        },
        removetrending:(state,action)=>{
            state.trending = null;
        }
    }
})
export const {addtrending,removetrending} = trendingslice.actions
export default trendingslice.reducer