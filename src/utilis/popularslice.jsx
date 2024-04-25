import { createSlice } from "@reduxjs/toolkit";



const popularslice = createSlice({
    name:"popular",
    initialState:{
        popular:null,
    },
    reducers:{
        addpopular: (state,action)=>{
            state.popular = action.payload;
        },
        removepopular:(state,action)=>{
            state.trending = null;
        }
    }
})
export const {addpopular,removepopular} = popularslice.actions
export default popularslice.reducer