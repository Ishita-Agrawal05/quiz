import React, { useState } from "react";
import "./App.css";
import { STATEMENTS } from "./data/dataPage1";
import { VAK_QUESTIONS } from "./data/dataPage2";
import { REP_QUESTIONS } from "./data/dataPage3";

import QuestionPage1 from "./components/QuestionPage1";
import QuestionPage2 from "./components/QuestionPage2";
import QuestionPage3 from "./components/QuestionPage3";

import ResultsPage1 from "./components/ResultsPage1";
import ResultsPage2 from "./components/ResultsPage2";
import ResultsPage3 from "./components/ResultsPage3";

export default function App() {
  const [page, setPage] = useState(1);

  // Page 1
  const [scores, setScores] = useState(Array(STATEMENTS.length).fill(null));
  const handleChangePage1 = (idx, val) => {
    const copy = [...scores];
    copy[idx] = val;
    setScores(copy);
  };

  // Page 2
  const [answers, setAnswers] = useState(Array(VAK_QUESTIONS.length).fill(null));
  const handleChangePage2 = (idx, val) => {
    const copy = [...answers];
    copy[idx] = val;
    setAnswers(copy);
  };

  // Page 3
  const [repAnswers, setRepAnswers] = useState(Array(REP_QUESTIONS.length).fill(null));
  const handleChangePage3 = (idx, val) => {
    const copy = [...repAnswers];
    copy[idx] = val;
    setRepAnswers(copy);
  };

  return (
    <div className="app" >
      <div id="top-btn" style={{ marginBottom: 20 }}>
        <button onClick={() => setPage(1)}>Page 1: EQ Test</button>
        <button onClick={() => setPage(2)}>Page 2: VAK Test</button>
        <button onClick={() => setPage(3)}>Page 3: Rep System Test</button>
      </div>

      {page === 1 && (
        <>
          <h1>Emotional Intelligence Questionnaire</h1><p>Read each statement and decide how strongly the statement applies to you.<br/>Score yourself 1-5 based on the following guide<br/>1 = Does not apply ~ 3 = Apllies half the time ~ 5 = Always applies</p>
          {STATEMENTS.map((q, i) => (
            <QuestionPage1
              key={i}
              index={i}
              text={q}
              value={scores[i]}
              onChange={handleChangePage1}
            />
          ))}
          <ResultsPage1 scores={scores} />
        </>
      )}

      {page === 2 && (
        <>
          <h1>VAK Learning Style Test</h1>
          {VAK_QUESTIONS.map((q, i) => (
            <QuestionPage2
              key={i}
              index={i}
              data={q}
              value={answers[i]}
              onChange={handleChangePage2}
            />
          ))}
          <ResultsPage2 answers={answers} />
        </>
      )}

      {page === 3 && (
        <>
          <h1>Representational System Preference Test</h1>
          <p>Rank each option 1–4 (1 = least like you, 4 = most like you).</p>
          {REP_QUESTIONS.map((q, i) => (
            <QuestionPage3
              key={i}
              index={i}
              data={q}
              value={repAnswers[i]}
              onChange={handleChangePage3}
            />
          ))}
          <ResultsPage3 answers={repAnswers} />
        </>
      )}
    </div>
  );
}
