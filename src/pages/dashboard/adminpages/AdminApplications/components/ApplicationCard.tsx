import React from "react";
import ApplicationRow from "./ApplicationRow";
import { formatDate } from "../../../../../helpers/dateHelper";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash } from "@fortawesome/free-solid-svg-icons";

interface Application {
    [key: string]: string | string[] | null;
    _id: string | null;
    date: string;
}

interface ApplicationCardProps {
    application: Application;
    onDelete: (id: string | null) => void;
}

const ApplicationCard: React.FC<ApplicationCardProps> = ({
    application,
    onDelete,
}) => {
    return (
        <div key={application._id} className="application-card">
            {Object.entries(application).map(
                ([key, value], index) =>
                    key !== "_id" &&
                    key !== "date" && (
                        <div key={index}>
                            <ApplicationRow value={value} />
                        </div>
                    ),
            )}
            <div
                style={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <p>{formatDate(application.date)}</p>
                <div>
                    <button
                        className="delete-button"
                        onClick={() => onDelete(application._id)}
                    >
                        <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ApplicationCard;
