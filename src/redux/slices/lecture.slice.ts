import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchLectures,
  fetchLectureById,
  createLecture,
  updateLecture,
  deleteLecture,
  fetchLecturesByCourse,
} from '../../services/lectureService';
import { CreateLectureDto, UpdateLectureDto } from '../../interfaces/lecture.interface';

interface LectureState {
  lectures: any[];
  currentLecture: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: LectureState = {
  lectures: [],
  currentLecture: null,
  loading: false,
  error: null,
};

// Thunks with try-catch
export const getAllLectures = createAsyncThunk('lectures/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchLectures();
  } catch (error) {
    return rejectWithValue('Failed to fetch lectures' + error);
  }
});

export const getLectureById = createAsyncThunk('lectures/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchLectureById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch lecture ${id}` + error);
  }
});

export const createNewLecture = createAsyncThunk(
  'lectures/create',
  async (data: CreateLectureDto, { rejectWithValue }) => {
    try {
      return await createLecture(data);
    } catch (error) {
      return rejectWithValue('Failed to create lecture' + error);
    }
  }
);

export const updateLectureById = createAsyncThunk(
  'lectures/update',
  async ({ id, data }: { id: number; data: UpdateLectureDto }, { rejectWithValue }) => {
    try {
      return await updateLecture(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update lecture ${id}` + error);
    }
  }
);

export const deleteLectureById = createAsyncThunk(
  'lectures/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteLecture(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete lecture ${id}` + error);
    }
  }
);

export const getLecturesByCourse = createAsyncThunk(
  'lectures/getByCourse',
  async (courseId: number, { rejectWithValue }) => {
    try {
      return await fetchLecturesByCourse(courseId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch lectures for course ${courseId}` + error);
    }
  }
);

// Slice
const lectureSlice = createSlice({
  name: 'lectures',
  initialState,
  reducers: {
    clearCurrentLecture(state) {
      state.currentLecture = null;
    },
    setCurrentLecture(state, action: PayloadAction<any>) {
      state.currentLecture = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllLectures.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllLectures.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
      })
      .addCase(getAllLectures.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getLectureById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLectureById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentLecture = action.payload;
      })
      .addCase(getLectureById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createNewLecture.fulfilled, (state, action) => {
        state.lectures.push(action.payload);
      })
      .addCase(createNewLecture.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(updateLectureById.fulfilled, (state, action) => {
        const index = state.lectures.findIndex((l) => l.id === action.payload.id);
        if (index !== -1) state.lectures[index] = action.payload;
        if (state.currentLecture?.id === action.payload.id) {
          state.currentLecture = action.payload;
        }
      })
      .addCase(updateLectureById.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(deleteLectureById.fulfilled, (state, action) => {
        state.lectures = state.lectures.filter((l) => l.id !== action.payload);
      })
      .addCase(deleteLectureById.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(getLecturesByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getLecturesByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.lectures = action.payload;
      })
      .addCase(getLecturesByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentLecture, setCurrentLecture } = lectureSlice.actions;
export default lectureSlice.reducer; 