import { createSlice } from '@reduxjs/toolkit';

const initialState: { displayPopup: boolean } = {
  displayPopup: false,
};

export const popupSlice = createSlice({
  name: 'popupSlice',
  reducers: {
    togglePopup: (state, action) => {
      state.displayPopup = action.payload; // payload should be a boolean value
    },
  },
  initialState,
});
export const { togglePopup } = popupSlice.actions;
export default popupSlice.reducer;
