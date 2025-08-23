import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchQuestions,
  fetchQuestionById,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  fetchQuestionsByQuiz,
} from '../../services/questionService';
import { CreateQuestionDto, UpdateQuestionDto } from '../../interfaces/question.interface';

interface QuestionState {
  questions: any[];
  currentQuestion: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: QuestionState = {
  questions: [],
  currentQuestion: null,
  loading: false,
  error: null,
};

export const getAllQuestions = createAsyncThunk('questions/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchQuestions();
  } catch (error) {
    return rejectWithValue('Failed to fetch questions' + error);
  }
});

export const getQuestionById = createAsyncThunk('questions/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchQuestionById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch question ${id}` + error);
  }
});

export const createNewQuestion = createAsyncThunk(
  'questions/create',
  async (data: CreateQuestionDto, { rejectWithValue }) => {
    try {
      return await createQuestion(data);
    } catch (error) {
      return rejectWithValue('Failed to create question' + error);
    }
  }
);

export const updateQuestionById = createAsyncThunk(
  'questions/update',
  async ({ id, data }: { id: number; data: UpdateQuestionDto }, { rejectWithValue }) => {
    try {
      return await updateQuestion(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update question ${id}` + error);
    }
  }
);

export const deleteQuestionById = createAsyncThunk(
  'questions/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteQuestion(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete question ${id}` + error);
    }
  }
);

export const getQuestionsByQuiz = createAsyncThunk(
  'questions/getByQuiz',
  async (quizId: number, { rejectWithValue }) => {
    try {
      return await fetchQuestionsByQuiz(quizId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch questions for quiz ${quizId}` + error);
    }
  }
);

const questionSlice = createSlice({
  name: 'questions',
  initialState,
  reducers: {
    clearCurrentQuestion(state) {
      state.currentQuestion = null;
    },
    setCurrentQuestion(state, action: PayloadAction<any>) {
      state.currentQuestion = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllQuestions.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllQuestions.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(getAllQuestions.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getQuestionById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentQuestion = action.payload;
      })
      .addCase(getQuestionById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewQuestion.fulfilled, (state, action) => {
        state.questions.push(action.payload);
      })
      .addCase(createNewQuestion.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateQuestionById.fulfilled, (state, action) => {
        const index = state.questions.findIndex((q) => q.id === action.payload.id);
        if (index !== -1) state.questions[index] = action.payload;
        if (state.currentQuestion?.id === action.payload.id) {
          state.currentQuestion = action.payload;
        }
      })
      .addCase(updateQuestionById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteQuestionById.fulfilled, (state, action) => {
        state.questions = state.questions.filter((q) => q.id !== action.payload);
      })
      .addCase(deleteQuestionById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getQuestionsByQuiz.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getQuestionsByQuiz.fulfilled, (state, action) => {
        state.loading = false;
        state.questions = action.payload;
      })
      .addCase(getQuestionsByQuiz.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentQuestion, setCurrentQuestion } = questionSlice.actions;
export default questionSlice.reducer; 