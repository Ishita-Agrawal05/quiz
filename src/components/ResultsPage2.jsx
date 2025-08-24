import React from "react";
import "../App.css";

export default function ResultsPage2({ answers }) {
  const scores = { V: 0, A: 0, K: 0 };
  answers.forEach((val) => {
    if (val === "V") scores.V += 1;
    if (val === "A") scores.A += 1;
    if (val === "K") scores.K += 1;
  });

  return (
    <div className="results">
      <h2>Results</h2>
      <table>
        <thead>
          <tr>
            <th>Preference</th>
            <th>Score</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Visual</td>
            <td>{scores.V}</td>
          </tr>
          <tr>
            <td>Auditory</td>
            <td>{scores.A}</td>
          </tr>
          <tr>
            <td>Kinesthetic</td>
            <td>{scores.K}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
