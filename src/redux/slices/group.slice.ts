import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import {
  fetchGroups,
  fetchGroupById,
  createGroup,
  updateGroup,
  deleteGroup,
} from '../../services/groupService';
import { CreateGroupDto, UpdateGroupDto } from '../../interfaces/group.interface';

interface GroupState {
  groups: any[];
  currentGroup: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupState = {
  groups: [],
  currentGroup: null,
  loading: false,
  error: null,
};

export const getAllGroups = createAsyncThunk('groups/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchGroups();
  } catch (error) {
    return rejectWithValue('Failed to fetch groups' + error);
  }
});

export const getGroupById = createAsyncThunk('groups/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchGroupById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch group ${id}` + error);
  }
});

export const createNewGroup = createAsyncThunk(
  'groups/create',
  async (data: CreateGroupDto, { rejectWithValue }) => {
    try {
      return await createGroup(data);
    } catch (error) {
      return rejectWithValue('Failed to create group' + error);
    }
  }
);

export const updateGroupById = createAsyncThunk(
  'groups/update',
  async ({ id, data }: { id: number; data: UpdateGroupDto }, { rejectWithValue }) => {
    try {
      return await updateGroup(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update group ${id}` + error);
    }
  }
);

export const deleteGroupById = createAsyncThunk(
  'groups/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteGroup(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete group ${id}` + error);
    }
  }
);

const groupSlice = createSlice({
  name: 'groups',
  initialState,
  reducers: {
    clearCurrentGroup(state) {
      state.currentGroup = null;
    },
    setCurrentGroup(state, action: PayloadAction<any>) {
      state.currentGroup = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroups.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGroups.fulfilled, (state, action) => {
        state.loading = false;
        state.groups = action.payload;
      })
      .addCase(getAllGroups.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getGroupById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroupById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGroup = action.payload;
      })
      .addCase(getGroupById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewGroup.fulfilled, (state, action) => {
        state.groups.push(action.payload);
      })
      .addCase(createNewGroup.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateGroupById.fulfilled, (state, action) => {
        const index = state.groups.findIndex((g) => g.id === action.payload.id);
        if (index !== -1) state.groups[index] = action.payload;
        if (state.currentGroup?.id === action.payload.id) {
          state.currentGroup = action.payload;
        }
      })
      .addCase(updateGroupById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteGroupById.fulfilled, (state, action) => {
        state.groups = state.groups.filter((g) => g.id !== action.payload);
      })
      .addCase(deleteGroupById.rejected, (state, action) => {
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentGroup, setCurrentGroup } = groupSlice.actions;
export default groupSlice.reducer; 