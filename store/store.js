import { configureStore } from '@reduxjs/toolkit';
import chatSlice from 'store/chatSlice';
import taskKanbanSlice from 'store/taskKanbanSlice';

export const store = configureStore({
  reducer: {
      chat:chatSlice,
      kanban:taskKanbanSlice,
  },
})