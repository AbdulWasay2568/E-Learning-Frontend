import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchProgress,
  fetchProgressById,
  createProgress,
  updateProgress,
  deleteProgress,
  fetchProgressByUser,
  fetchProgressByLecture,
  fetchProgressByUserAndLecture,
} from '../../services/progressService';
import { CreateProgressDto, UpdateProgressDto } from '../../interfaces/progress.interface';

interface ProgressState {
  progress: any[];
  currentProgress: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProgressState = {
  progress: [],
  currentProgress: null,
  loading: false,
  error: null,
};

export const getAllProgress = createAsyncThunk('progress/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchProgress();
  } catch (error) {
    return rejectWithValue('Failed to fetch progress' + error);
  }
});

export const getProgressById = createAsyncThunk('progress/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchProgressById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch progress ${id}` + error);
  }
});

export const createNewProgress = createAsyncThunk(
  'progress/create',
  async (data: CreateProgressDto, { rejectWithValue }) => {
    try {
      return await createProgress(data);
    } catch (error) {
      return rejectWithValue('Failed to create progress' + error);
    }
  }
);

export const updateProgressById = createAsyncThunk(
  'progress/update',
  async ({ id, data }: { id: number; data: UpdateProgressDto }, { rejectWithValue }) => {
    try {
      return await updateProgress(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update progress ${id}` + error);
    }
  }
);

export const deleteProgressById = createAsyncThunk(
  'progress/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteProgress(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete progress ${id}` + error);
    }
  }
);

export const getProgressByUser = createAsyncThunk(
  'progress/getByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await fetchProgressByUser(userId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch progress for user ${userId}` + error);
    }
  }
);

export const getProgressByLecture = createAsyncThunk(
  'progress/getByLecture',
  async (lectureId: number, { rejectWithValue }) => {
    try {
      return await fetchProgressByLecture(lectureId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch progress for lecture ${lectureId}` + error);
    }
  }
);

export const getProgressByUserAndLecture = createAsyncThunk(
  'progress/getByUserAndLecture',
  async ({ userId, lectureId }: { userId: number; lectureId: number }, { rejectWithValue }) => {
    try {
      return await fetchProgressByUserAndLecture(userId, lectureId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch progress for user ${userId} and lecture ${lectureId}` + error);
    }
  }
);

const progressSlice = createSlice({
  name: 'progress',
  initialState,
  reducers: {
    clearCurrentProgress(state) {
      state.currentProgress = null;
    },
    setCurrentProgress(state, action: PayloadAction<any>) {
      state.currentProgress = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllProgress.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllProgress.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(getAllProgress.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProgressById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgressById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProgress = action.payload;
      })
      .addCase(getProgressById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewProgress.fulfilled, (state, action) => {
        state.progress.push(action.payload);
      })
      .addCase(createNewProgress.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateProgressById.fulfilled, (state, action) => {
        const index = state.progress.findIndex((p) => p.id === action.payload.id);
        if (index !== -1) state.progress[index] = action.payload;
        if (state.currentProgress?.id === action.payload.id) {
          state.currentProgress = action.payload;
        }
      })
      .addCase(updateProgressById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteProgressById.fulfilled, (state, action) => {
        state.progress = state.progress.filter((p) => p.id !== action.payload);
      })
      .addCase(deleteProgressById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getProgressByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgressByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(getProgressByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProgressByLecture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgressByLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.progress = action.payload;
      })
      .addCase(getProgressByLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getProgressByUserAndLecture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getProgressByUserAndLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProgress = action.payload;
      })
      .addCase(getProgressByUserAndLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentProgress, setCurrentProgress } = progressSlice.actions;
export default progressSlice.reducer; 