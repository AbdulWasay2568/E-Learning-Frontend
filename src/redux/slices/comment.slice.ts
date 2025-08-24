import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchComments,
  fetchCommentById,
  createComment,
  updateComment,
  deleteComment,
  fetchCommentsByLecture,
  fetchCommentsByUser,
  fetchCommentReplies,
} from '../../services/commentService';
import type { CreateCommentDto, UpdateCommentDto } from '../../interfaces/comment.interface';

interface CommentState {
  comments: any[];
  currentComment: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: CommentState = {
  comments: [],
  currentComment: null,
  loading: false,
  error: null,
};

export const getAllComments = createAsyncThunk('comments/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchComments();
  } catch (error) {
    return rejectWithValue('Failed to fetch comments' + error);
  }
});

export const getCommentById = createAsyncThunk('comments/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchCommentById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch comment ${id}` + error);
  }
});

export const createNewComment = createAsyncThunk(
  'comments/create',
  async (data: CreateCommentDto, { rejectWithValue }) => {
    try {
      return await createComment(data);
    } catch (error) {
      return rejectWithValue('Failed to create comment' + error);
    }
  }
);

export const updateCommentById = createAsyncThunk(
  'comments/update',
  async ({ id, data }: { id: number; data: UpdateCommentDto }, { rejectWithValue }) => {
    try {
      return await updateComment(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update comment ${id}` + error);
    }
  }
);

export const deleteCommentById = createAsyncThunk(
  'comments/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteComment(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete comment ${id}` + error);
    }
  }
);

export const getCommentsByLecture = createAsyncThunk(
  'comments/getByLecture',
  async (lectureId: number, { rejectWithValue }) => {
    try {
      return await fetchCommentsByLecture(lectureId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch comments for lecture ${lectureId}` + error);
    }
  }
);

export const getCommentsByUser = createAsyncThunk(
  'comments/getByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await fetchCommentsByUser(userId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch comments for user ${userId}` + error);
    }
  }
);

export const getCommentReplies = createAsyncThunk(
  'comments/getReplies',
  async (parentId: number, { rejectWithValue }) => {
    try {
      return await fetchCommentReplies(parentId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch replies for comment ${parentId}` + error);
    }
  }
);

const commentSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {
    clearCurrentComment(state) {
      state.currentComment = null;
    },
    setCurrentComment(state, action: PayloadAction<any>) {
      state.currentComment = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllComments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllComments.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getAllComments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCommentById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentComment = action.payload;
      })
      .addCase(getCommentById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewComment.fulfilled, (state, action) => {
        state.comments.push(action.payload);
      })
      .addCase(createNewComment.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateCommentById.fulfilled, (state, action) => {
        const index = state.comments.findIndex((c) => c.id === action.payload.id);
        if (index !== -1) state.comments[index] = action.payload;
        if (state.currentComment?.id === action.payload.id) {
          state.currentComment = action.payload;
        }
      })
      .addCase(updateCommentById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteCommentById.fulfilled, (state, action) => {
        state.comments = state.comments.filter((c) => c.id !== action.payload);
      })
      .addCase(deleteCommentById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getCommentsByLecture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentsByLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getCommentsByLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCommentsByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentsByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.comments = action.payload;
      })
      .addCase(getCommentsByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getCommentReplies.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getCommentReplies.fulfilled, (state, action) => {
        state.loading = false;
        // Add replies to the comments array or handle them separately
        state.comments = [...state.comments, ...action.payload];
      })
      .addCase(getCommentReplies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentComment, setCurrentComment } = commentSlice.actions;
export default commentSlice.reducer; 