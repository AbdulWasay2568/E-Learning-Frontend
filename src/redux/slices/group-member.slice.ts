import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
  fetchGroupMembers,
  fetchGroupMemberById,
  createGroupMember,
  updateGroupMember,
  deleteGroupMember,
  fetchGroupMembersByGroup,
  fetchGroupMembersByUser,
  checkGroupMembership,
} from '../../services/groupMemberService';
import type { CreateGroupMemberDto, UpdateGroupMemberDto } from '../../interfaces/group-member.interface';

interface GroupMemberState {
  groupMembers: any[];
  currentGroupMember: any | null;
  loading: boolean;
  error: string | null;
}

const initialState: GroupMemberState = {
  groupMembers: [],
  currentGroupMember: null,
  loading: false,
  error: null,
};

export const getAllGroupMembers = createAsyncThunk('groupMembers/getAll', async (_, { rejectWithValue }) => {
  try {
    return await fetchGroupMembers();
  } catch (error) {
    return rejectWithValue('Failed to fetch group members' + error);
  }
});

export const getGroupMemberById = createAsyncThunk('groupMembers/getById', async (id: number, { rejectWithValue }) => {
  try {
    return await fetchGroupMemberById(id);
  } catch (error) {
    return rejectWithValue(`Failed to fetch group member ${id}` + error);
  }
});

export const createNewGroupMember = createAsyncThunk(
  'groupMembers/create',
  async (data: CreateGroupMemberDto, { rejectWithValue }) => {
    try {
      return await createGroupMember(data);
    } catch (error) {
      return rejectWithValue('Failed to create group member' + error);
    }
  }
);

export const updateGroupMemberById = createAsyncThunk(
  'groupMembers/update',
  async ({ id, data }: { id: number; data: UpdateGroupMemberDto }, { rejectWithValue }) => {
    try {
      return await updateGroupMember(id, data);
    } catch (error) {
      return rejectWithValue(`Failed to update group member ${id}` + error);
    }
  }
);

export const deleteGroupMemberById = createAsyncThunk(
  'groupMembers/delete',
  async (id: number, { rejectWithValue }) => {
    try {
      await deleteGroupMember(id);
      return id;
    } catch (error) {
      return rejectWithValue(`Failed to delete group member ${id}` + error);
    }
  }
);

export const getGroupMembersByGroup = createAsyncThunk(
  'groupMembers/getByGroup',
  async (groupId: number, { rejectWithValue }) => {
    try {
      return await fetchGroupMembersByGroup(groupId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch group members for group ${groupId}` + error);
    }
  }
);

export const getGroupMembersByUser = createAsyncThunk(
  'groupMembers/getByUser',
  async (userId: number, { rejectWithValue }) => {
    try {
      return await fetchGroupMembersByUser(userId);
    } catch (error) {
      return rejectWithValue(`Failed to fetch group members for user ${userId}` + error);
    }
  }
);

export const checkGroupMembershipStatus = createAsyncThunk(
  'groupMembers/check',
  async ({ userId, groupId }: { userId: number; groupId: number }, { rejectWithValue }) => {
    try {
      return await checkGroupMembership(userId, groupId);
    } catch (error) {
      return rejectWithValue(`Failed to check group membership for user ${userId} and group ${groupId}` + error);
    }
  }
);

const groupMemberSlice = createSlice({
  name: 'groupMembers',
  initialState,
  reducers: {
    clearCurrentGroupMember(state) {
      state.currentGroupMember = null;
    },
    setCurrentGroupMember(state, action: PayloadAction<any>) {
      state.currentGroupMember = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAllGroupMembers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getAllGroupMembers.fulfilled, (state, action) => {
        state.loading = false;
        state.groupMembers = action.payload;
      })
      .addCase(getAllGroupMembers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getGroupMemberById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroupMemberById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentGroupMember = action.payload;
      })
      .addCase(getGroupMemberById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(createNewGroupMember.fulfilled, (state, action) => {
        state.groupMembers.push(action.payload);
      })
      .addCase(createNewGroupMember.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(updateGroupMemberById.fulfilled, (state, action) => {
        const index = state.groupMembers.findIndex((gm) => gm.id === action.payload.id);
        if (index !== -1) state.groupMembers[index] = action.payload;
        if (state.currentGroupMember?.id === action.payload.id) {
          state.currentGroupMember = action.payload;
        }
      })
      .addCase(updateGroupMemberById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(deleteGroupMemberById.fulfilled, (state, action) => {
        state.groupMembers = state.groupMembers.filter((gm) => gm.id !== action.payload);
      })
      .addCase(deleteGroupMemberById.rejected, (state, action) => {
        state.error = action.payload as string;
      })
      .addCase(getGroupMembersByGroup.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroupMembersByGroup.fulfilled, (state, action) => {
        state.loading = false;
        state.groupMembers = action.payload;
      })
      .addCase(getGroupMembersByGroup.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      })
      .addCase(getGroupMembersByUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getGroupMembersByUser.fulfilled, (state, action) => {
        state.loading = false;
        state.groupMembers = action.payload;
      })
      .addCase(getGroupMembersByUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});

export const { clearCurrentGroupMember, setCurrentGroupMember } = groupMemberSlice.actions;
export default groupMemberSlice.reducer; 