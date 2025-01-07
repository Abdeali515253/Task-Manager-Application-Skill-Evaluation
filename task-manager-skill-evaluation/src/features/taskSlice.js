import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { logout } from './userSlice';

const endpoint = "http://localhost:3001"

// Fetch tasks from the mock server
export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async (user) => {
  const query = new URLSearchParams();
  query.append('assignedTo', user.email);
  const response = await fetch(`${endpoint}/tasks?${query.toString()}`);
  return response.json();
});

export const addTask = createAsyncThunk('tasks/addTask', async (newTask) => {
    const response = await fetch('http://localhost:3001/tasks', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(newTask),
    });
    return response.json();
});

const tasksSlice = createSlice({
  name: 'tasks',
  initialState: { tasks: [], status: 'idle', error: null },
  reducers: {
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.tasks = action.payload;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addTask.fulfilled, (state, action) => {
        if(action.payload.assignedTo === action.payload.createdBy) {
          state.tasks.push(action.payload);
        }
      })
      .addCase(logout, (state) => {
        return { tasks: [], status: 'idle', error: null };
      })
  },
});

export default tasksSlice.reducer;
