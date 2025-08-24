import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchCourses,
  fetchCourseById,
  createCourse,
  updateCourse,
  deleteCourse,
  fetchCoursesByTeacher,
} from '../../services/courseService';
import type { CreateCourseDto, UpdateCourseDto } from '../../interfaces/course.interface';

interface CourseState {
  courses: any[];
  currentCourse: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: CourseState = {
  courses: [],
  currentCourse: null,
  loading: false,
  error: null,
};

// Thunks with try-catch
export const getAllCourses = createAsyncThunk('courses/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchCourses();
  } catch (error) {
    return rejectWithValue('Failed to fetch courses' + error);
  }
});

export const getCourseById = createAsyncThunk('courses/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchCourseById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch course ${id}` + error);
  }
});

export const createNewCourse = createAsyncThunk(
  'courses/create',
  async (data: CreateCourseDto, { rejectWithValue }) => {
    try {
      return await createCourse(data);
    } catch (error) {
      return rejectWithValue('Failed to create course' + error);
    }
  }
);

export const updateCourseById = createAsyncThunk(
  'courses/update',
  async ({ id, data }: { id: number; data: UpdateCourseDto }, { rejectWithValue }) => {
    try {
      return await updateCourse(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update course ${id}` + error);
    }
  }
);

export const deleteCourseById = createAsyncThunk(
  'courses/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteCourse(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete course ${id}` + error);
    }
  }
);

export const getCoursesByTeacher = createAsyncThunk(
  'courses/getByTeacher',
  async (teacherId: number, { rejectWithValue }) => {
    try {
      return await fetchCoursesByTeacher(teacherId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch courses for teacher ${teacherId}` + error);
    }
  }
);

// Slice
const courseSlice = createSlice({
  name: 'courses',
  initialState,
  reducers: {
    clearCurrentCourse(state) {
      state.currentCourse = null;
    },
    setCurrentCourse(state, action: PayloadAction<any>) {
      state.currentCourse = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllCourses.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllCourses.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(getAllCourses.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(getCourseById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCourseById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentCourse = action.payload;
      })
      .addCase(getCourseById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })

      .addCase(createNewCourse.fulfilled, (state, action) => {
        state.courses.push(action.payload);
      })
      .addCase(createNewCourse.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(updateCourseById.fulfilled, (state, action) => {
        const index = state.courses.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.courses[index] = action.payload;
        if (state.currentCourse?.id === action.payload.id) {
          state.currentCourse = action.payload;
        }
      })
      .addCase(updateCourseById.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(deleteCourseById.fulfilled, (state, action) => {
        state.courses = state.courses.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCourseById.rejected, (state, action) => {
        state.error = action.payload as string;
      })

      .addCase(getCoursesByTeacher.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCoursesByTeacher.fulfilled, (state, action) => {
        state.loading = false;
        state.courses = action.payload;
      })
      .addCase(getCoursesByTeacher.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentCourse, setCurrentCourse } = courseSlice.actions;
export default courseSlice.reducer; 