import { createSlice } from '@reduxjs/toolkit';

// ----------------------------------------------------------------------

const initialState = {
  themeMode: 'light',
  themeDirection: 'ltr',
  isTutorialRequired: true
};

const slice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    switchMode(state, action) {
      state.themeMode = action.payload;
    },
    switchDirection(state, action) {
      state.themeDirection = action.payload;
    },
    toggleTutorialView(state, action) {
      state.isTutorialRequired = action.payload;
    }
  }
});

// Reducer
export default slice.reducer;

// Actions
export const { switchMode, switchDirection, toggleTutorialView } =
  slice.actions;
