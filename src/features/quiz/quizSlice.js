import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  data: [],
  name: "",
  nameEntered: false,
  input: "",
  queIndex: 0,
  questions: [
    {
      questionText: "What is the capital of France?",
      answerOptions: [
        { answerText: "New York", isCorrect: false },
        { answerText: "London", isCorrect: false },
        { answerText: "Paris", isCorrect: true },
        { answerText: "Dublin", isCorrect: false },
      ],
    },
    {
      questionText: "Who is CEO of Tesla?",
      answerOptions: [
        { answerText: "Jeff Bezos", isCorrect: false },
        { answerText: "Elon Musk", isCorrect: true },
        { answerText: "Bill Gates", isCorrect: false },
        { answerText: "Tony Stark", isCorrect: false },
      ],
    },
    {
      questionText: "The iPhone was created by which company?",
      answerOptions: [
        { answerText: "Apple", isCorrect: true },
        { answerText: "Intel", isCorrect: false },
        { answerText: "Amazon", isCorrect: false },
        { answerText: "Microsoft", isCorrect: false },
      ],
    },
    {
      questionText: "How many Harry Potter books are there?",
      answerOptions: [
        { answerText: "1", isCorrect: false },
        { answerText: "4", isCorrect: false },
        { answerText: "6", isCorrect: false },
        { answerText: "7", isCorrect: true },
      ],
    },
  ],

  selectedAnswers: {},
  score: 0,
  testSubmitted: false,
};

export const quizSlice = createSlice({
  name: "quiz",
  initialState,
  reducers: {
    handleOnChange: (state, action) => {
      state.input = action.payload;
    },

    addName: (state, action) => {
      state.name = action.payload;
      state.input = "";
      state.nameEntered = true;
      //console.log(state.name)
    },

    nextQues: (state, action) => {
      if (state.queIndex < state.questions.length - 1) {
        state.queIndex++;
      }
      //state.selectedAnswer = '';
    },

    prevQues: (state, action) => {
      if (state.queIndex > 0) {
        state.queIndex--;
      }
      //state.selectedAnswer = '';
    },

    selectAnswer: (state, action) => {
      const selectedAnswer = action.payload;
      const correctAns = state.questions[state.queIndex].answerOptions.find(
        (ans) => ans.isCorrect === true
      ).answerText;
      const previousAns = state.selectedAnswers[state.queIndex];

      state.selectedAnswers[state.queIndex] = selectedAnswer;

      if (previousAns === correctAns && selectedAnswer !== correctAns)
        state.score--;

      if (previousAns !== correctAns && selectedAnswer === correctAns)
        state.score++;

      if (state.score < 0) {
        state.score = 0;
      }

      // console.log(previousAns)
      // console.log(correctAns)
    },

    score: (state, action) => {
      state.testSubmitted = true;
      const existingData = JSON.parse(localStorage.getItem("candidate")) || [];
      const candidateData = {
        candidateName: state.name,
        candidateScore: state.score,
      };
      const newData = [...existingData, candidateData];
      localStorage.setItem("candidate", JSON.stringify(newData));
      //state.data = newData;
      //console.log(newData)
    },

    candidateList: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const {
  addName,
  handleOnChange,
  nextQues,
  prevQues,
  score,
  selectAnswer,
  candidateList,
} = quizSlice.actions;
export default quizSlice.reducer;
