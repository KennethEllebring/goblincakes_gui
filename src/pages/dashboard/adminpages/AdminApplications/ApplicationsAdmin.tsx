import React, { useState, useEffect } from "react";
import { FetchOptions, fetchData } from "../../../../utils/api";
import { toast } from "react-toastify";
import QuestionForm from "./components/QuestionForm";
import ApplicationCard from "./components/ApplicationCard";

interface Question {
    _id: number;
    text: string;
    type: "text" | "radio" | "checkbox";
    options?: string[];
}

interface Application {
    [key: string]: string | string[] | null;
    _id: string | null;
    date: string;
}

const ApplicationsAdmin: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([
        { _id: 0, text: "", type: "text" },
    ]);
    const [applications, setApplications] = useState<Application[]>([]);

    useEffect(() => {
        fetchApplicationForm();
        fetchApplications();
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

    const fetchApplications = async () => {
        try {
            const response = await fetchData<Application[]>(
                // "http://localhost:5050/api/auth/check", // Vercel server
                "http://localhost:5050/api/application/applications",
            );
            if (response) {
                setApplications(response);
            }
        } catch (error) {
            console.error("Error fetching applications: ", error);
        }
    };

    const handleDeleteApplication = async (id: string | null) => {
        if (!id) return;
        const endpoint = `http://localhost:5050/api/application/applications/${id}`;
        // const endpoint = `http://localhost:5050/api/application/applications/${id}`; // vercel server
        const fetchOptions: FetchOptions = {
            method: "DELETE",
            credentials: "include",
        };

        try {
            await fetchData(endpoint, fetchOptions);
            toast.success("Application deleted successfully");
            setApplications((prevApplications) =>
                prevApplications.filter(
                    (application) => application._id !== id,
                ),
            );
        } catch (error) {
            toast.error("Error deleting application");
            console.error("Error deleting application: ", error);
        }
    };

    const handleAddQuestion = () => {
        setQuestions([
            ...questions,
            { _id: questions.length, text: "", type: "text" },
        ]);
    };

    const handleChangeQuestion = (_id: number, text: string) => {
        const updatedQuestions = questions.map((question) =>
            question._id === _id ? { ...question, text } : question,
        );
        setQuestions(updatedQuestions);
    };

    const handleTypeChange = (
        _id: number,
        type: "text" | "radio" | "checkbox",
    ) => {
        const updatedQuestions = questions.map((question) =>
            question._id === _id ? { ...question, type } : question,
        );
        setQuestions(updatedQuestions);
    };

    const handleOptionsChange = (_id: number, options: string[]) => {
        const updatedQuestions = questions.map((question) =>
            question._id === _id ? { ...question, options } : question,
        );
        setQuestions(updatedQuestions);
    };

    const handleRemoveQuestion = async (_id: number) => {
        const updatedQuestions = questions.filter(
            (question) => question._id !== _id,
        );
        const endpoint = `http://localhost:5050/api/application/${_id}`;
        // const endpoint = `http://localhost:5050/api/application/${_id}`; // vercel server
        const method = "DELETE";

        const fetchOptions: FetchOptions = {
            method,
            credentials: "include",
        };

        try {
            const response = await fetchData(endpoint, fetchOptions);
            if (response) {
                toast.success("Tog bort formulär fråga");
            }
        } catch (error) {
            toast.error("Det gick inte att spara formuläret");
            console.error("Error saving form: ", error);
        }
        setQuestions(updatedQuestions);
    };

    const handleSubmit = async () => {
        const endpoint =
            questions.length > 0
                ? "http://localhost:5050/api/application/update"
                : "http://localhost:5050/api/application/create";
        // ? "http://localhost:5050/api/application/update" // vercel server
        // : "http://localhost:5050/api/application/create"; // vercel server
        const method = questions.length > 0 ? "PATCH" : "POST";

        const fetchOptions: FetchOptions = {
            method,
            body: JSON.stringify(questions),
            credentials: "include",
        };

        try {
            const response = await fetchData(endpoint, fetchOptions);
            toast.success("Ansökningsformulär sparat");
            console.log("Application form saved successfully: ", response);
        } catch (error) {
            toast.error("Det gick inte att spara formuläret");
            console.error("Error saving form: ", error);
        }
    };

    return (
        <div className="form-wrapper">
            <h1>Ansökningar</h1>
            <div>
                {applications.map((application) => (
                    <ApplicationCard
                        key={application._id}
                        application={application}
                        onDelete={handleDeleteApplication}
                    />
                ))}
            </div>
            <QuestionForm
                questions={questions}
                handleAddQuestion={handleAddQuestion}
                handleChangeQuestion={handleChangeQuestion}
                handleTypeChange={handleTypeChange}
                handleOptionsChange={handleOptionsChange}
                handleRemoveQuestion={handleRemoveQuestion}
                handleSubmit={handleSubmit}
            />
        </div>
    );
};

export default ApplicationsAdmin;
