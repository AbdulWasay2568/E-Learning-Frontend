import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface LoadingState {
  isLoading: boolean;
  loadingMessage: string;
}

const initialState: LoadingState = {
  isLoading: false,
  loadingMessage: '',
};

const loadingSlice = createSlice({
  name: 'loading',
  initialState,
  reducers: {
    setLoading: (state, action: PayloadAction<{ isLoading: boolean; message?: string }>) => {
      state.isLoading = action.payload.isLoading;
      state.loadingMessage = action.payload.message || '';
    },
    clearLoading: (state) => {
      state.isLoading = false;
      state.loadingMessage = '';
    },
  },
});

export const { setLoading, clearLoading } = loadingSlice.actions;
export default loadingSlice.reducer; 