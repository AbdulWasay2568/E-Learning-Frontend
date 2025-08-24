import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchQuizzes,
  fetchQuizById,
  createQuiz,
  updateQuiz,
  deleteQuiz,
  fetchQuizzesByCourse,
  fetchQuizzesByUser,
} from '../../services/quizService';
import type { CreateQuizDto, UpdateQuizDto } from '../../interfaces/quiz.interface';

interface QuizState {
  quizzes: any[];
  currentQuiz: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuizState = {
  quizzes: [],
  currentQuiz: null,
  loading: false,
  error: null,
};

export const getAllQuizzes = createAsyncThunk('quizzes/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchQuizzes();
  } catch (error) {
    return rejectWithValue('Failed to fetch quizzes' + error);
  }
});

export const getQuizById = createAsyncThunk('quizzes/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchQuizById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch quiz ${id}` + error);
  }
});

export const createNewQuiz = createAsyncThunk(
  'quizzes/create',
  async (data: CreateQuizDto, { rejectWithValue }) => {
    try {
      return await createQuiz(data);
    } catch (error) {
      return rejectWithValue('Failed to create quiz' + error);
    }
  }
);

export const updateQuizById = createAsyncThunk(
  'quizzes/update',
  async ({ id, data }: { id: number; data: UpdateQuizDto }, { rejectWithValue }) => {
    try {
      return await updateQuiz(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update quiz ${id}` + error);
    }
  }
);

export const deleteQuizById = createAsyncThunk(
  'quizzes/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteQuiz(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete quiz ${id}` + error);
    }
  }
);

export const getQuizzesByCourse = createAsyncThunk(
  'quizzes/getByCourse',
  async (courseId: number, { rejectWithValue }) => {
    try {
      return await fetchQuizzesByCourse(courseId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch quizzes for course ${courseId}` + error);
    }
  }
);

export const getQuizzesByUser = createAsyncThunk(
  'quizzes/getByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await fetchQuizzesByUser(userId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch quizzes for user ${userId}` + error);
    }
  }
);

const quizSlice = createSlice({
  name: 'quizzes',
  initialState,
  reducers: {
    clearCurrentQuiz(state) {
      state.currentQuiz = null;
    },
    setCurrentQuiz(state, action: PayloadAction<any>) {
      state.currentQuiz = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuizzes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllQuizzes.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(getAllQuizzes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getQuizById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuizById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuiz = action.payload;
      })
      .addCase(getQuizById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewQuiz.fulfilled, (state, action) => {
        state.quizzes.push(action.payload);
      })
      .addCase(createNewQuiz.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateQuizById.fulfilled, (state, action) => {
        const index = state.quizzes.findIndex((q) => q.id === action.payload.id);
        if (index !== -1) state.quizzes[index] = action.payload;
        if (state.currentQuiz?.id === action.payload.id) {
          state.currentQuiz = action.payload;
        }
      })
      .addCase(updateQuizById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteQuizById.fulfilled, (state, action) => {
        state.quizzes = state.quizzes.filter((q) => q.id !== action.payload);
      })
      .addCase(deleteQuizById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getQuizzesByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuizzesByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(getQuizzesByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getQuizzesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuizzesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.quizzes = action.payload;
      })
      .addCase(getQuizzesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentQuiz, setCurrentQuiz } = quizSlice.actions;
export default quizSlice.reducer; 