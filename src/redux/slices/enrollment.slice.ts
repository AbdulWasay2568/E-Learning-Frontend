import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchEnrollments,
  fetchEnrollmentById,
  createEnrollment,
  updateEnrollment,
  deleteEnrollment,
  fetchEnrollmentsByUser,
  fetchEnrollmentsByCourse,
  checkEnrollment,
} from '../../services/enrollmentService';
import type { CreateEnrollmentDto, UpdateEnrollmentDto } from '../../interfaces/enrollment.interface';

interface EnrollmentState {
  enrollments: any[];
  currentEnrollment: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: EnrollmentState = {
  enrollments: [],
  currentEnrollment: null,
  loading: false,
  error: null,
};

export const getAllEnrollments = createAsyncThunk('enrollments/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchEnrollments();
  } catch (error) {
    return rejectWithValue('Failed to fetch enrollments' + error);
  }
});

export const getEnrollmentById = createAsyncThunk('enrollments/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchEnrollmentById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch enrollment ${id}` + error);
  }
});

export const createNewEnrollment = createAsyncThunk(
  'enrollments/create',
  async (data: CreateEnrollmentDto, { rejectWithValue }) => {
    try {
      return await createEnrollment(data);
    } catch (error) {
      return rejectWithValue('Failed to create enrollment' + error);
    }
  }
);

export const updateEnrollmentById = createAsyncThunk(
  'enrollments/update',
  async ({ id, data }: { id: number; data: UpdateEnrollmentDto }, { rejectWithValue }) => {
    try {
      return await updateEnrollment(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update enrollment ${id}` + error);
    }
  }
);

export const deleteEnrollmentById = createAsyncThunk(
  'enrollments/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteEnrollment(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete enrollment ${id}` + error);
    }
  }
);

export const getEnrollmentsByUser = createAsyncThunk(
  'enrollments/getByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await fetchEnrollmentsByUser(userId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch enrollments for user ${userId}` + error);
    }
  }
);

export const getEnrollmentsByCourse = createAsyncThunk(
  'enrollments/getByCourse',
  async (courseId: number, { rejectWithValue }) => {
    try {
      return await fetchEnrollmentsByCourse(courseId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch enrollments for course ${courseId}` + error);
    }
  }
);

export const checkEnrollmentStatus = createAsyncThunk(
  'enrollments/check',
  async ({ userId, courseId }: { userId: number; courseId: number }, { rejectWithValue }) => {
    try {
      return await checkEnrollment(userId, courseId);
    } catch (error) {
      return rejectWithValue(`Failed to check enrollment for user ${userId} and course ${courseId}` + error);
    }
  }
);

const enrollmentSlice = createSlice({
  name: 'enrollments',
  initialState,
  reducers: {
    clearCurrentEnrollment(state) {
      state.currentEnrollment = null;
    },
    setCurrentEnrollment(state, action: PayloadAction<any>) {
      state.currentEnrollment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllEnrollments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllEnrollments.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload;
      })
      .addCase(getAllEnrollments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getEnrollmentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnrollmentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentEnrollment = action.payload;
      })
      .addCase(getEnrollmentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewEnrollment.fulfilled, (state, action) => {
        state.enrollments.push(action.payload);
      })
      .addCase(createNewEnrollment.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateEnrollmentById.fulfilled, (state, action) => {
        const index = state.enrollments.findIndex((e) => e.id === action.payload.id);
        if (index !== -1) state.enrollments[index] = action.payload;
        if (state.currentEnrollment?.id === action.payload.id) {
          state.currentEnrollment = action.payload;
        }
      })
      .addCase(updateEnrollmentById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteEnrollmentById.fulfilled, (state, action) => {
        state.enrollments = state.enrollments.filter((e) => e.id !== action.payload);
      })
      .addCase(deleteEnrollmentById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getEnrollmentsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnrollmentsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload;
      })
      .addCase(getEnrollmentsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getEnrollmentsByCourse.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEnrollmentsByCourse.fulfilled, (state, action) => {
        state.loading = false;
        state.enrollments = action.payload;
      })
      .addCase(getEnrollmentsByCourse.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentEnrollment, setCurrentEnrollment } = enrollmentSlice.actions;
export default enrollmentSlice.reducer; 