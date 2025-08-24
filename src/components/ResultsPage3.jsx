import React from "react";
import "../App.css";

export default function ResultsPage3({ answers }) {
    const scores = { V: 0, A: 0, K: 0, Ad: 0 };

    answers.forEach((ans, qIdx) => {
        if (ans) {
            ans.forEach((val, optIdx) => {
                if (val) {
                    const optionKey = ["V", "A", "K", "Ad"].find(
                        (k) => k === (["V", "A", "K", "Ad"].includes(
                            ["V", "A", "K", "Ad"].find(
                                () => true
                            )
                        ) ? k : null)
                    );
                }
            });
        }
    });

    // Correct scoring loop
    answers.forEach((ans, qIdx) => {
        if (ans) {
            ans.forEach((rank, i) => {
                if (rank) {
                    const optionKey = answers[qIdx].optionKeys ? answers[qIdx].optionKeys[i] : null;
                }
            });
        }
    });

    const REP_QUESTIONS = [
        ["K", "A", "V", "Ad"],
        ["A", "V", "Ad", "K"],
        ["V", "K", "Ad", "A"],
        ["A", "Ad", "K", "V"],
        ["A", "Ad", "K", "V"],
    ];

    answers.forEach((ans, qIdx) => {
        if (ans) {
            ans.forEach((rank, i) => {
                if (rank) scores[REP_QUESTIONS[qIdx][i]] += rank;
            });
        }
    });

    return (
        <div className="results">
            <h2>Representational System Scores</h2>
            <table>
                <thead>
                    <tr>
                        <th>System</th>
                        <th>Total</th>
                    </tr>
                </thead>
                <tbody>
                    {Object.entries(scores).map(([k, v]) => (
                        <tr key={k}>
                            <td>{k}</td>
                            <td>{v}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
