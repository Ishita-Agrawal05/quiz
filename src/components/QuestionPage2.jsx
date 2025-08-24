import React from "react";
import "./Question.css";

export default function QuestionPage2({ index, data, value, onChange }) {
    return (
        <div className="question-card">
            <p>
                <b>{index + 1}.</b> {data.text}
            </p>
            <div className="options">
                {data.options.map((opt, i) => (
                    <label
                        key={i}
                        className={`opt ${value === opt.value ? "selected" : ""}`}
                    >
                        <input
                            type="radio"
                            name={`q-${index}`}
                            checked={value === opt.value}
                            onChange={() => onChange(index, opt.value)}
                        />
                        {opt.label}
                    </label>
                ))}
            </div>
        </div>
    );
}
