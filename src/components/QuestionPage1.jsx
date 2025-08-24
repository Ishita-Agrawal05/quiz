import React from "react";
import "../App.css";

export default function QuestionPage1({ index, text, value, onChange }) {
  return (
    <div className="question-card">
      <div className="q-text">
        <span className="q-num">{index + 1}.</span> {text}
      </div>
      <div className="options">
        {[1, 2, 3, 4, 5].map((n) => (
          <label key={n} className={`opt ${value === n ? "selected" : ""}`}>
            <input
              type="radio"
              name={`q-${index}`}
              checked={value === n}
              onChange={() => onChange(index, n)}
            />
            {n}
          </label>
        ))}
      </div>
    </div>
  );
}
