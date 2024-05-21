import React from "react";

interface ApplicationRowProps {
    value: string | string[] | null;
}

const ApplicationRow: React.FC<ApplicationRowProps> = ({ value }) => {
    const renderTextWithLinks = (text: string) => {
        const urlRegex = /(https?:\/\/[^\s]+)/g;
        return text.split(urlRegex).map((part, index) => {
            if (part.match(urlRegex)) {
                return (
                    <a
                        key={index}
                        href={part}
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {part}
                    </a>
                );
            }
            return part;
        });
    };

    const renderValue = (value: string | string[] | null) => {
        if (!value) return null;

        if (Array.isArray(value)) {
            return value.map((item, index) => (
                <div key={index}>{renderTextWithLinks(item)}</div>
            ));
        } else {
            return <div>{renderTextWithLinks(value)}</div>;
        }
    };

    return <div className="application-row">{renderValue(value)}</div>;
};

export default ApplicationRow;
