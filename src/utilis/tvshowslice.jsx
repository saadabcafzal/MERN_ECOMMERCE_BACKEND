import { createSlice } from "@reduxjs/toolkit";

const tvshowslice = createSlice({
  name: "tvshow",
  initialState: {
    info: null,
  },
  reducers: {
    addtvshow: (state, action) => {
      state.info = action.payload;
    },
    removetvshow: (state, action) => {
      state.info = null;
    },
  },
});
export const { addtvshow, removetvshow } = tvshowslice.actions;
export default tvshowslice.reducer;
