import { createSlice } from '@reduxjs/toolkit';
// utils
import axios from '../../utils/axios';

// ----------------------------------------------------------------------

const initialState = {};

const slice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    // START LOADING
    startLoading(state) {
      state.isLoading = true;
    }
  }
});

// Reducer
export default slice.reducer;

// ----------------------------------------------------------------------
export async function registerClient(data) {
  let dataSet = { ...data };
  try {
    const response = await axios.post(
      '/platform-registration/verify-registration',
      {
        ...dataSet
      }
    );
    return response;
  } catch (error) {
    return error;
  }
}
