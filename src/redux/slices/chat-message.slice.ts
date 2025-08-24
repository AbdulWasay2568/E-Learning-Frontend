import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchChatMessages,
  fetchChatMessageById,
  createChatMessage,
  updateChatMessage,
  deleteChatMessage,
  fetchChatMessagesByGroup,
  fetchChatMessagesByUser,
} from '../../services/chatMessageService';
import type { CreateChatMessageDto, UpdateChatMessageDto } from '../../interfaces/chat-message.interface';

interface ChatMessageState {
  chatMessages: any[];
  currentChatMessage: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: ChatMessageState = {
  chatMessages: [],
  currentChatMessage: null,
  loading: false,
  error: null,
};

export const getAllChatMessages = createAsyncThunk('chatMessages/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchChatMessages();
  } catch (error) {
    return rejectWithValue('Failed to fetch chat messages' + error);
  }
});

export const getChatMessageById = createAsyncThunk('chatMessages/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchChatMessageById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch chat message ${id}` + error);
  }
});

export const createNewChatMessage = createAsyncThunk(
  'chatMessages/create',
  async (data: CreateChatMessageDto, { rejectWithValue }) => {
    try {
      return await createChatMessage(data);
    } catch (error) {
      return rejectWithValue('Failed to create chat message' + error);
    }
  }
);

export const updateChatMessageById = createAsyncThunk(
  'chatMessages/update',
  async ({ id, data }: { id: number; data: UpdateChatMessageDto }, { rejectWithValue }) => {
    try {
      return await updateChatMessage(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update chat message ${id}` + error);
    }
  }
);

export const deleteChatMessageById = createAsyncThunk(
  'chatMessages/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteChatMessage(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete chat message ${id}` + error);
    }
  }
);

export const getChatMessagesByGroup = createAsyncThunk(
  'chatMessages/getByGroup',
  async (groupId: number, { rejectWithValue }) => {
    try {
      return await fetchChatMessagesByGroup(groupId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch chat messages for group ${groupId}` + error);
    }
  }
);

export const getChatMessagesByUser = createAsyncThunk(
  'chatMessages/getByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await fetchChatMessagesByUser(userId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch chat messages for user ${userId}` + error);
    }
  }
);

const chatMessageSlice = createSlice({
  name: 'chatMessages',
  initialState,
  reducers: {
    clearCurrentChatMessage(state) {
      state.currentChatMessage = null;
    },
    setCurrentChatMessage(state, action: PayloadAction<any>) {
      state.currentChatMessage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllChatMessages.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllChatMessages.fulfilled, (state, action) => {
        state.loading = false;
        state.chatMessages = action.payload;
      })
      .addCase(getAllChatMessages.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getChatMessageById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatMessageById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentChatMessage = action.payload;
      })
      .addCase(getChatMessageById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewChatMessage.fulfilled, (state, action) => {
        state.chatMessages.push(action.payload);
      })
      .addCase(createNewChatMessage.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateChatMessageById.fulfilled, (state, action) => {
        const index = state.chatMessages.findIndex((cm) => cm.id === action.payload.id);
        if (index !== -1) state.chatMessages[index] = action.payload;
        if (state.currentChatMessage?.id === action.payload.id) {
          state.currentChatMessage = action.payload;
        }
      })
      .addCase(updateChatMessageById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteChatMessageById.fulfilled, (state, action) => {
        state.chatMessages = state.chatMessages.filter((cm) => cm.id !== action.payload);
      })
      .addCase(deleteChatMessageById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getChatMessagesByGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatMessagesByGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.chatMessages = action.payload;
      })
      .addCase(getChatMessagesByGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getChatMessagesByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getChatMessagesByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.chatMessages = action.payload;
      })
      .addCase(getChatMessagesByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentChatMessage, setCurrentChatMessage } = chatMessageSlice.actions;
export default chatMessageSlice.reducer; 