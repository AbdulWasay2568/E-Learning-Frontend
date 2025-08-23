import { configureStore } from "@reduxjs/toolkit";
import {
  authReducer,
  userReducer,
  courseReducer,
  lectureReducer,
  noteReducer,
  enrollmentReducer,
  quizReducer,
  questionReducer,
  progressReducer,
  groupReducer,
  groupMemberReducer,
  chatMessageReducer,
  feedbackReducer,
  commentReducer,
  loadingReducer,
} from "./slices";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    course: courseReducer,
    lecture: lectureReducer,
    note: noteReducer,
    enrollment: enrollmentReducer,
    quiz: quizReducer,
    question: questionReducer,
    progress: progressReducer,
    group: groupReducer,
    groupMember: groupMemberReducer,
    chatMessage: chatMessageReducer,
    feedback: feedbackReducer,
    comment: commentReducer,
    loading: loadingReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch; 