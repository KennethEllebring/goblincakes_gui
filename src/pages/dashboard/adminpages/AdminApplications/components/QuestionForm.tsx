import React from "react";
import QuestionInput from "./QuestionInput";

interface Question {
    _id: number;
    text: string;
    type: "text" | "radio" | "checkbox";
    options?: string[];
}

interface QuestionFormProps {
    questions: Question[];
    handleAddQuestion: () => void;
    handleChangeQuestion: (_id: number, text: string) => void;
    handleTypeChange: (
        _id: number,
        type: "text" | "radio" | "checkbox",
    ) => void;
    handleOptionsChange: (_id: number, options: string[]) => void;
    handleRemoveQuestion: (_id: number) => void;
    handleSubmit: () => void;
}

const QuestionForm: React.FC<QuestionFormProps> = ({
    questions,
    handleAddQuestion,
    handleChangeQuestion,
    handleTypeChange,
    handleOptionsChange,
    handleRemoveQuestion,
    handleSubmit,
}) => {
    return (
        <div>
            <h1>Redigera ansökningsformulär</h1>
            {questions.map((question) => (
                <QuestionInput
                    key={question._id}
                    question={question}
                    handleChangeQuestion={handleChangeQuestion}
                    handleTypeChange={handleTypeChange}
                    handleOptionsChange={handleOptionsChange}
                    handleRemoveQuestion={handleRemoveQuestion}
                />
            ))}
            <div className="form-buttons">
                <button className="save-button" onClick={handleAddQuestion}>
                    Lägg till fråga
                </button>
                <button className="login-button" onClick={handleSubmit}>
                    Spara formulär
                </button>
            </div>
        </div>
    );
};

export default QuestionForm;
