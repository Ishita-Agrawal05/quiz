import React from "react";
import { CATEGORIES, classify } from "../data/dataPage1";
import "../App.css";

export default function ResultsPage1({ scores }) {
  const totals = {};
  for (const c of CATEGORIES) {
    totals[c.key] = c.items.reduce(
      (sum, idx) => sum + (scores[idx - 1] || 0),
      0
    );
  }

  return (
    <div className="results">
      <h2>Total and Interpret Results</h2>
      <table>
        <thead>
          <tr>
            <th>Competency</th>
            <th>Total</th>
            <th>Interpretation</th>
          </tr>
        </thead>
        <tbody>
          {CATEGORIES.map((c) => (
            <tr key={c.key}>
              <td>{c.label}</td>
              <td>{totals[c.key]}</td>
              <td>{classify(totals[c.key])}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
