import React, { useState, useEffect, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faEdit,
    faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import CreateForumTopic from "../components/CreateForumTopic";

interface Comment {
    comment_id: string;
    comment: string;
    comment_created: string;
    comment_username: string;
}

interface Post {
    post_id: string;
    post_title: string;
    post_text: string;
    comments: Comment[];
    likes: string[];
    post_created: string;
    post_username: string;
}

interface Topic {
    topic_id: string;
    topic_text: string;
    topic_title: string;
    posts: Post[];
    topic_created: string;
    topic_username: string;
}

interface EditTopic {
    topicTitle: string;
    topicText: string;
    topicId: string;
}

const Topics: React.FC = () => {
    const { isAdmin, username } = useAuth();
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editTopic, setEditTopic] = useState<EditTopic | null>(null);
    const location = useLocation();
    const navigate = useNavigate();
    const { category, category_id } = (location.state as {
        category: string;
        category_id: string;
    }) || { category: "", category_id: "" };
    const [topics, setTopics] = useState<Topic[]>([]);

    const fetchTopics = useCallback(async () => {
        try {
            const response = await fetch(
                `http://localhost:5050/api/forum/topics/${category_id}`,
            );
            if (!response.ok) {
                throw new Error("Failed to fetch topics");
            }
            const data = await response.json();
            setTopics(data);
        } catch (error) {
            console.error("Error fetching topics:", error);
        }
    }, [category_id]);

    useEffect(() => {
        fetchTopics();
    }, [fetchTopics]);

    const handleAddTopic = () => {
        setEditTopic(null);
        setIsModalOpen(true);
    };

    const handleTopicClick = (topic: Topic) => {
        navigate(`/forum/${category}/${topic.topic_title}`, {
            state: {
                posts: topic.posts,
                category,
                topic: topic.topic_title,
                topicId: topic.topic_id,
            },
        });
    };

    const handleEdit = (event: React.MouseEvent, topic: Topic) => {
        event.stopPropagation();
        setEditTopic({
            topicTitle: topic.topic_title,
            topicText: topic.topic_text,
            topicId: topic.topic_id,
        });
        setIsModalOpen(true);
    };

    const handleDelete = async (event: React.MouseEvent, topicId: string) => {
        event.stopPropagation();

        try {
            const response = await fetch(
                `http://localhost:5050/api/forum/topic/${category_id}/${topicId}`,
                {
                    method: "DELETE",
                },
            );

            if (!response.ok) {
                throw new Error("Failed to delete topic");
            }

            fetchTopics();
        } catch (error) {
            console.error("Error deleting topic:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (
        topicTitle: string,
        topicText: string,
        topicId?: string,
    ) => {
        const endpoint = topicId
            ? `http://localhost:5050/api/forum/topic/${category_id}/${topicId}`
            : "http://localhost:5050/api/forum/topic";
        const method = topicId ? "PATCH" : "POST";

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    topic_title: topicTitle,
                    topic_text: topicText,
                    username,
                    category_id,
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            setIsModalOpen(false);
            fetchTopics();
        } catch (error) {
            console.error("Error saving topic:", error);
        }
    };

    return (
        <div className="forum-wrapper">
            <h1>FORUM / {category}</h1>
            <div className="forum">
                <div className="add-category">
                    <button
                        className="edit-button"
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </button>
                    <button className="save-button" onClick={handleAddTopic}>
                        Lägg till ämne
                    </button>
                </div>
                <CreateForumTopic
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmit}
                    editTopic={editTopic}
                />
                <div className="forum-body">
                    {topics.map((topic) => (
                        <div
                            key={topic.topic_id}
                            style={{ borderBottom: "2px solid silver" }}
                        >
                            <div
                                className="forum-post"
                                onClick={() => handleTopicClick(topic)}
                            >
                                <div className="forum-content">
                                    <div className="forum-img-text-wrapper">
                                        <div
                                            className="forum-text"
                                            style={{ paddingLeft: "2rem" }}
                                        >
                                            <h2>{topic.topic_title}</h2>
                                            <p>{topic.topic_text}</p>
                                        </div>
                                    </div>
                                    <div className="forum-stats-updated-wrapper">
                                        <div className="forum-stats">
                                            <p>{topic.posts.length} Posts</p>
                                        </div>
                                        <div className="forum-updated">
                                            <p>{`Tillagd av: ${topic.topic_username}`}</p>
                                            {(isAdmin ||
                                                username ===
                                                    topic.topic_username) && (
                                                <div>
                                                    <button
                                                        style={{
                                                            marginRight: "1rem",
                                                            marginLeft: "1rem",
                                                            backgroundColor:
                                                                "orange",
                                                        }}
                                                        className="edit-button"
                                                        onClick={(event) =>
                                                            handleEdit(
                                                                event,
                                                                topic,
                                                            )
                                                        }
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faEdit}
                                                        />
                                                    </button>
                                                    <button
                                                        onClick={(event) =>
                                                            handleDelete(
                                                                event,
                                                                topic.topic_id,
                                                            )
                                                        }
                                                        className="delete-button"
                                                    >
                                                        <FontAwesomeIcon
                                                            icon={faTrash}
                                                        />
                                                    </button>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Topics;
