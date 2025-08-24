import React from "react";
import "./Question.css";

// Page 3 → User must rank options 1–4
export default function QuestionPage3({ index, data, value, onChange }) {
    return (
        <div className="question-card">
            <p>
                <b>{index + 1}.</b> {data.text}
            </p>
            <div className="options">
                {data.options.map((opt, i) => (
                    <label key={i} className="opt">
                        <span>{opt.label}</span>
                        <select
                            value={(value && value[i]) || ""}
                            onChange={(e) => {
                                const newVals = value ? [...value] : Array(data.options.length).fill(null);
                                newVals[i] = parseInt(e.target.value);
                                onChange(index, newVals);
                            }}
                        >

                            <option value="">--</option>
                            {[1, 2, 3, 4].map((n) => (
                                <option key={n} value={n}>{n}</option>
                            ))}
                        </select>
                    </label>
                ))}
            </div>
        </div>
    );
}
