import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchNotes,
  fetchNoteById,
  createNote,
  updateNote,
  deleteNote,
  fetchNotesByUser,
  fetchNotesByLecture,
} from '../../services/noteService';
import { CreateNoteDto, UpdateNoteDto } from '../../interfaces/note.interface';

interface NoteState {
  notes: any[];
  currentNote: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: NoteState = {
  notes: [],
  currentNote: null,
  loading: false,
  error: null,
};

export const getAllNotes = createAsyncThunk('notes/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchNotes();
  } catch (error) {
    return rejectWithValue('Failed to fetch notes' + error);
  }
});

export const getNoteById = createAsyncThunk('notes/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchNoteById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch note ${id}` + error);
  }
});

export const createNewNote = createAsyncThunk(
  'notes/create',
  async (data: CreateNoteDto, { rejectWithValue }) => {
    try {
      return await createNote(data);
    } catch (error) {
      return rejectWithValue('Failed to create note' + error);
    }
  }
);

export const updateNoteById = createAsyncThunk(
  'notes/update',
  async ({ id, data }: { id: number; data: UpdateNoteDto }, { rejectWithValue }) => {
    try {
      return await updateNote(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update note ${id}` + error);
    }
  }
);

export const deleteNoteById = createAsyncThunk(
  'notes/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteNote(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete note ${id}` + error);
    }
  }
);

export const getNotesByUser = createAsyncThunk(
  'notes/getByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await fetchNotesByUser(userId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch notes for user ${userId}` + error);
    }
  }
);

export const getNotesByLecture = createAsyncThunk(
  'notes/getByLecture',
  async (lectureId: number, { rejectWithValue }) => {
    try {
      return await fetchNotesByLecture(lectureId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch notes for lecture ${lectureId}` + error);
    }
  }
);

const noteSlice = createSlice({
  name: 'notes',
  initialState,
  reducers: {
    clearCurrentNote(state) {
      state.currentNote = null;
    },
    setCurrentNote(state, action: PayloadAction<any>) {
      state.currentNote = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllNotes.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllNotes.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(getAllNotes.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getNoteById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNoteById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentNote = action.payload;
      })
      .addCase(getNoteById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewNote.fulfilled, (state, action) => {
        state.notes.push(action.payload);
      })
      .addCase(createNewNote.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateNoteById.fulfilled, (state, action) => {
        const index = state.notes.findIndex((n) => n.id === action.payload.id);
        if (index !== -1) state.notes[index] = action.payload;
        if (state.currentNote?.id === action.payload.id) {
          state.currentNote = action.payload;
        }
      })
      .addCase(updateNoteById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteNoteById.fulfilled, (state, action) => {
        state.notes = state.notes.filter((n) => n.id !== action.payload);
      })
      .addCase(deleteNoteById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getNotesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(getNotesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getNotesByLecture.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getNotesByLecture.fulfilled, (state, action) => {
        state.loading = false;
        state.notes = action.payload;
      })
      .addCase(getNotesByLecture.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentNote, setCurrentNote } = noteSlice.actions;
export default noteSlice.reducer; 