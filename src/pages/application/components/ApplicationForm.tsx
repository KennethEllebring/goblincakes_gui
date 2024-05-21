import React, { useEffect, useState } from "react";
import { fetchData } from "../../../utils/api";
import { toast } from "react-toastify";

interface Question {
    _id: number;
    text: string;
    type: "text" | "radio" | "checkbox";
    options?: string[];
}

type Response = {
    [key: number]: string | string[];
};

const ApplicationForm = () => {
    const [questions, setQuestions] = useState<Question[]>([
        { _id: 0, text: "", type: "text" },
    ]);
    const [responses, setResponses] = useState<Response>({});
    const [formSubmitted, setFormSubmitted] = useState(false);

    useEffect(() => {
        fetchApplicationForm();
    }, []);

    const fetchApplicationForm = async () => {
        try {
            const response = await fetchData<Question[]>(
                // "http://localhost:5050/api/auth/check", // Vercel server
                "http://localhost:5050/api/application/",
            );
            if (response) {
                setQuestions(response);
            }
        } catch (error) {
            console.error("Error fetching application form: ", error);
        }
    };

    const handleInputChange = (
        questionId: number,
        value: string | string[],
    ) => {
        setResponses((prevResponses) => ({
            ...prevResponses,
            [questionId]: value,
        }));
    };

    const handleFormSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        try {
            const response = await fetch(
                // "http://localhost:5050/api/auth/check", // Vercel server
                "http://localhost:5050/api/application/submit",
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify(responses),
                },
            );
            if (!response.ok) {
                throw new Error("Failed to submit form");
            }
            const result = await response.json();
            toast.success(result.message || "Form submitted successfully");
            setFormSubmitted(true);
        } catch (error) {
            toast.error("Error submitting form");
            console.error("Error submitting form: ", error);
        }
    };

    const renderQuestionInput = (question: Question) => {
        switch (question.type) {
            case "text":
                return (
                    <input
                        className="application-text-input"
                        type="text"
                        onChange={(e) =>
                            handleInputChange(question._id, e.target.value)
                        }
                    />
                );
            case "radio":
                return question.options?.map((option, index) => (
                    <label key={index}>
                        <input
                            type="radio"
                            className="application-radio-input"
                            name={`radio-${question._id}`}
                            value={option}
                            onChange={() =>
                                handleInputChange(question._id, option)
                            }
                        />
                        {option}
                    </label>
                ));
            case "checkbox":
                return question.options?.map((option, index) => (
                    <label key={index}>
                        <input
                            type="checkbox"
                            className="application-checkbox-input"
                            name={`checkbox-${question._id}`}
                            value={option}
                            onChange={(e) => {
                                const newValue = e.target.checked
                                    ? [
                                          ...((responses[
                                              question._id
                                          ] as string[]) || []),
                                          option,
                                      ]
                                    : (
                                          (responses[
                                              question._id
                                          ] as string[]) || []
                                      ).filter((v: string) => v !== option);
                                handleInputChange(question._id, newValue);
                            }}
                        />
                        {option}
                    </label>
                ));
            default:
                return null;
        }
    };

    return (
        <div className="application-form-wrapper">
            {!formSubmitted ? (
                <form className="application-form" onSubmit={handleFormSubmit}>
                    {questions.map((question) => (
                        <div key={question._id}>
                            <label className="application-label">
                                {question.text}
                            </label>
                            <div className="application-inputs">
                                {renderQuestionInput(question)}
                            </div>
                        </div>
                    ))}
                    <button className="login-button" type="submit">
                        Submit
                    </button>
                </form>
            ) : (
                <h2>Tack för din ansökan, vi återkommer så fort vi kan!</h2>
            )}
        </div>
    );
};

export default ApplicationForm;
