import { configureStore } from '@reduxjs/toolkit'
import quizreducer from '../features/quiz/quizSlice'

export const store = configureStore({
  reducer: {
    quiz : quizreducer,
  },
})