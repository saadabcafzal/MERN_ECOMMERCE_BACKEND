import { createSlice } from "@reduxjs/toolkit";



const peopleslice = createSlice({
    name:"people",
    initialState:{
       info:null,
    },
    reducers:{
        addperson: (state,action)=>{
            state.info = action.payload;
        },
        removeperson:(state,action)=>{
            state.info = null;
        }
    }
})
export const {addperson, removeperson} = peopleslice.actions
export default peopleslice.reducer