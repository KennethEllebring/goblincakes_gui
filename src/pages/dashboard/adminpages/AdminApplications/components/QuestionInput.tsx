import React from "react";

interface Question {
    _id: number;
    text: string;
    type: "text" | "radio" | "checkbox";
    options?: string[];
}

interface QuestionInputProps {
    question: Question;
    handleChangeQuestion: (_id: number, text: string) => void;
    handleTypeChange: (
        _id: number,
        type: "text" | "radio" | "checkbox",
    ) => void;
    handleOptionsChange: (_id: number, options: string[]) => void;
    handleRemoveQuestion: (_id: number) => void;
}

const QuestionInput: React.FC<QuestionInputProps> = ({
    question,
    handleChangeQuestion,
    handleTypeChange,
    handleOptionsChange,
    handleRemoveQuestion,
}) => {
    return (
        <div className="form-settings" key={question._id}>
            <input
                type="text"
                value={question.text}
                onChange={(e) =>
                    handleChangeQuestion(question._id, e.target.value)
                }
            />
            <select
                value={question.type}
                onChange={(e) =>
                    handleTypeChange(
                        question._id,
                        e.target.value as "text" | "radio" | "checkbox",
                    )
                }
            >
                <option value="text">Text Input</option>
                <option value="radio">Radio Button</option>
                <option value="checkbox">Checkboxes</option>
            </select>
            {question.type !== "text" && (
                <input
                    type="text"
                    placeholder="Enter options (comma separated)"
                    value={question.options?.join(",")}
                    onChange={(e) =>
                        handleOptionsChange(
                            question._id,
                            e.target.value.split(","),
                        )
                    }
                />
            )}
            <button
                className="cancel-button"
                onClick={() => handleRemoveQuestion(question._id)}
            >
                Remove
            </button>
        </div>
    );
};

export default QuestionInput;
