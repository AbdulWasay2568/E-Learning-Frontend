import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchFeedbacks,
  fetchFeedbackById,
  createFeedback,
  updateFeedback,
  deleteFeedback,
  fetchFeedbacksByCourse,
  fetchFeedbacksByUser,
  getAverageRatingByCourse,
} from '../../services/feedbackService';
import { CreateFeedbackDto, UpdateFeedbackDto } from '../../interfaces/feedback.interface';

interface FeedbackState {
  feedbacks: any[];
  currentFeedback: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: FeedbackState = {
  feedbacks: [],
  currentFeedback: null,
  loading: false,
  error: null,
};

export const getAllFeedbacks = createAsyncThunk('feedbacks/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchFeedbacks();
  } catch (error) {
    return rejectWithValue('Failed to fetch feedbacks' + error);
  }
});

export const getFeedbackById = createAsyncThunk('feedbacks/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchFeedbackById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch feedback ${id}` + error);
  }
});

export const createNewFeedback = createAsyncThunk(
  'feedbacks/create',
  async (data: CreateFeedbackDto, { rejectWithValue }) => {
    try {
      return await createFeedback(data);
    } catch (error) {
      return rejectWithValue('Failed to create feedback' + error);
    }
  }
);

export const updateFeedbackById = createAsyncThunk(
  'feedbacks/update',
  async ({ id, data }: { id: number; data: UpdateFeedbackDto }, { rejectWithValue }) => {
    try {
      return await updateFeedback(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update feedback ${id}` + error);
    }
  }
);

export const deleteFeedbackById = createAsyncThunk(
  'feedbacks/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteFeedback(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete feedback ${id}` + error);
    }
  }
);

export const getFeedbacksByCourse = createAsyncThunk(
  'feedbacks/getByCourse',
  async (courseId: number, { rejectWithValue }) => {
    try {
      return await fetchFeedbacksByCourse(courseId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch feedbacks for course ${courseId}` + error);
    }
  }
);

export const getFeedbacksByUser = createAsyncThunk(
  'feedbacks/getByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await fetchFeedbacksByUser(userId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch feedbacks for user ${userId}` + error);
    }
  }
);

export const getAverageRatingForCourse = createAsyncThunk(
  'feedbacks/getAverageRating',
  async (courseId: number, { rejectWithValue }) => {
    try {
      return await getAverageRatingByCourse(courseId);
    } catch (error) {
      return rejectWithValue(`Failed to get average rating for course ${courseId}` + error);
    }
  }
);

const feedbackSlice = createSlice({
  name: 'feedbacks',
  initialState,
  reducers: {
    clearCurrentFeedback(state) {
      state.currentFeedback = null;
    },
    setCurrentFeedback(state, action: PayloadAction<any>) {
      state.currentFeedback = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllFeedbacks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllFeedbacks.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(getAllFeedbacks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getFeedbackById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedbackById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentFeedback = action.payload;
      })
      .addCase(getFeedbackById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewFeedback.fulfilled, (state, action) => {
        state.feedbacks.push(action.payload);
      })
      .addCase(createNewFeedback.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateFeedbackById.fulfilled, (state, action) => {
        const index = state.feedbacks.findIndex((f) => f.id === action.payload.id);
        if (index !== -1) state.feedbacks[index] = action.payload;
        if (state.currentFeedback?.id === action.payload.id) {
          state.currentFeedback = action.payload;
        }
      })
      .addCase(updateFeedbackById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteFeedbackById.fulfilled, (state, action) => {
        state.feedbacks = state.feedbacks.filter((f) => f.id !== action.payload);
      })
      .addCase(deleteFeedbackById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getFeedbacksByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedbacksByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(getFeedbacksByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getFeedbacksByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getFeedbacksByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.feedbacks = action.payload;
      })
      .addCase(getFeedbacksByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentFeedback, setCurrentFeedback } = feedbackSlice.actions;
export default feedbackSlice.reducer; 