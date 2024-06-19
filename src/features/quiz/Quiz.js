import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  addName,
  handleOnChange,
  nextQues,
  prevQues,
  score,
  selectAnswer,
  candidateList,
} from "./quizSlice";

export function Quiz() {
  const state = useSelector((state) => state.quiz);
  const dispatch = useDispatch();

  const currentques = state.questions[state.queIndex];

  useEffect(() => {
    const data = localStorage.getItem("candidate");
    console.log(data);

    if (data) {
      dispatch(candidateList(JSON.parse(data)));
    }
  }, [dispatch]);

  return (
    <div>
      {!state.nameEntered && (
        <div>
          <h1>Welcome to Quiz app</h1>
          <section>
            Enter your Name :
            <input
              type="input"
              placeholder="name"
              value={state.input}
              onChange={(e) => dispatch(handleOnChange(e.target.value))}
            ></input>
          </section>
          <br />
          <button
            type="button"
            disabled={state.input === ""}
            onClick={() => dispatch(addName(state.input))}
          >
            Submit details
          </button>
          <br />
          <br />
          <br />
          <table>
            <th>Test Details</th>
            <tr>
              <td>Name</td>
              <td>Score</td>
            </tr>
            <tbody>
              {state.data.map((row, index) => (
                <tr key={index}>
                  <td>{row.candidateName}</td>
                  <td>{row.candidateScore}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
      <br />
      {state.nameEntered && !state.testSubmitted && (
        <>
          <h4>{currentques.questionText}</h4>
          <p>
            {currentques.answerOptions.map((row, index) => (
              <ul key={index}>
                <input
                  type="radio"
                  id="radioBtn"
                  name="answer"
                  value={row.answerText}
                  checked={
                    state.selectedAnswers[state.queIndex] === row.answerText
                  }
                  onChange={() => dispatch(selectAnswer(row.answerText))}
                />
                {row.answerText}
              </ul>
            ))}
          </p>

          <button
            type="button"
            disabled={state.queIndex === state.questions.length - 1}
            onClick={() => dispatch(nextQues())}
          >
            Next
          </button>
          <button
            type="button"
            disabled={state.queIndex === 0}
            onClick={() => dispatch(prevQues())}
          >
            Previous
          </button>
          <br />
          <br />
          <button
            type="button"
            disabled={state.queIndex < state.questions.length - 1}
            onClick={() => {
              dispatch(score(currentques.answerOptions));
            }}
          >
            Submit Test
          </button>
        </>
      )}
      {state.testSubmitted && (
        <>
          <h2>Final Score</h2>
          <p>Your Score is {state.score}</p>
          {/* <button type="button" onClick={() => dispatch(addName(state.input))}>Start New Quiz</button> */}
        </>
      )}
    </div>
  );
}
