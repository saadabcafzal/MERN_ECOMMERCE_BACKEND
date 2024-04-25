import { createSlice } from "@reduxjs/toolkit";



const movieslice = createSlice({
    name:"movie",
    initialState:{
       info:null,
    },
    reducers:{
        addmovie: (state,action)=>{
            state.info = action.payload;
        },
        removemovie:(state,action)=>{
            state.info = null;
        }
    }
})
export const {addmovie,removemovie} = movieslice.actions
export default movieslice.reducer