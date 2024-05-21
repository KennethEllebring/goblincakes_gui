import React, { useEffect, useState } from "react";
import forumSymbol from "../../assets/forumsymbol.webp";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../components/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTrash, faEdit } from "@fortawesome/free-solid-svg-icons";
import CreateForumThread from "./components/CreateForumThreadModal";

interface Comment {
    comment_id: string;
    comment_text: string;
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

interface Category {
    category_id: string;
    category_text: string;
    category_title: string;
    category_username: string;
    category_created: string;
    topics: Topic[];
}

interface ForumData {
    _id: string;
    forum_title: string;
    categories: Category[];
}

interface EditCategory {
    forumTitle: string;
    categoryTitle: string;
    categoryText: string;
    categoryId: string;
}

const Forum: React.FC = () => {
    const { isAdmin, username } = useAuth();
    const [forumData, setForumData] = useState<ForumData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editCategory, setEditCategory] = useState<EditCategory | null>(null);
    const navigate = useNavigate();

    const fetchCategories = async () => {
        setLoading(true);
        try {
            const response = await fetch("http://localhost:5050/api/forum/all");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const data: ForumData[] = await response.json();
            setForumData(data);
        } catch (error) {
            setError("Error fetching categories: " + (error as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    const handleCategoryClick = (category: Category) => {
        navigate(`/forum/${category.category_title}`, {
            state: {
                topics: category.topics,
                category: category.category_title,
                category_id: category.category_id,
            },
        });
    };

    const handleAddThread = () => {
        setEditCategory(null);
        setIsModalOpen(!isModalOpen);
    };

    const handleEdit = (
        event: React.MouseEvent,
        category: Category,
        forumTitle: string,
    ) => {
        event.stopPropagation();
        setEditCategory({
            forumTitle,
            categoryTitle: category.category_title,
            categoryText: category.category_text,
            categoryId: category.category_id,
        });
        setIsModalOpen(!isModalOpen);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (
        forumTitle: string,
        categoryTitle: string,
        categoryText: string,
        originalCategoryTitle?: string,
        categoryId?: string,
    ) => {
        const endpoint = originalCategoryTitle
            ? `http://localhost:5050/api/forum/category/${categoryId}`
            : "http://localhost:5050/api/forum/create";
        const method = originalCategoryTitle ? "PATCH" : "POST";

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    forum_title: forumTitle,
                    category_title: categoryTitle,
                    category_text: categoryText,
                    username,
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
            setIsModalOpen(false);
            fetchCategories();
        } catch (error) {
            console.error("Error saving category:", error);
        }
    };

    const handleDeleteTitle = async (event: React.MouseEvent, _id: string) => {
        event.stopPropagation();
        try {
            const response = await fetch(
                `http://localhost:5050/api/forum/title/${_id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                },
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    const handleDelete = async (
        event: React.MouseEvent,
        category_id: string,
    ) => {
        event.stopPropagation();
        try {
            const response = await fetch(
                `http://localhost:5050/api/forum/category/${category_id}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                },
            );

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            const data = await response.json();
            console.log(data);
            fetchCategories();
        } catch (error) {
            console.error("Error deleting category:", error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    const forumTitles = forumData.map((forum) => forum.forum_title);

    return (
        <div className="forum-wrapper">
            <h1>FORUM</h1>
            <div className="forum">
                {isAdmin && (
                    <div className="add-category">
                        <div></div>
                        <button
                            className="save-button"
                            onClick={handleAddThread}
                        >
                            Lägg till Kategori
                        </button>
                    </div>
                )}
                <CreateForumThread
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmit}
                    forumTitles={forumTitles}
                    editCategory={editCategory}
                />
                {!forumData.length ? (
                    <div className="forum-body">
                        <h2>No data available</h2>
                    </div>
                ) : (
                    forumData.map((forum, forumIndex) => (
                        <div key={forumIndex} className="forum-body">
                            <h2 className="forum-headers">
                                {forum.forum_title}
                                {isAdmin && (
                                    <button
                                        style={{ cursor: "pointer" }}
                                        onClick={(event) =>
                                            handleDeleteTitle(event, forum._id)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTrash} />
                                    </button>
                                )}
                            </h2>
                            {forum.categories.map((category, categoryIndex) => (
                                <div key={categoryIndex}>
                                    <div
                                        className="forum-post"
                                        onClick={() =>
                                            handleCategoryClick(category)
                                        }
                                        style={{
                                            borderBottom: "2px solid silver",
                                        }}
                                    >
                                        <div className="forum-content">
                                            <div className="forum-img-text-wrapper">
                                                <img
                                                    src={forumSymbol}
                                                    alt="goblincakes logo"
                                                />
                                                <div className="forum-text">
                                                    <h2>
                                                        {
                                                            category.category_title
                                                        }
                                                    </h2>
                                                    <p>
                                                        {category.category_text}
                                                    </p>
                                                </div>
                                            </div>
                                            <div className="forum-stats-updated-wrapper">
                                                <div className="forum-stats">
                                                    <p>
                                                        {
                                                            (
                                                                category.topics ??
                                                                []
                                                            ).length
                                                        }{" "}
                                                        {(category.topics ?? [])
                                                            .length <= 1
                                                            ? "Ämne"
                                                            : "Ämnen"}
                                                    </p>
                                                    <p>|</p>
                                                    <p>
                                                        {(
                                                            category.topics ??
                                                            []
                                                        ).reduce(
                                                            (acc, topic) =>
                                                                acc +
                                                                (
                                                                    topic.posts ??
                                                                    []
                                                                ).length,
                                                            0,
                                                        )}{" "}
                                                        Poster
                                                    </p>
                                                </div>
                                                <div className="forum-updated">
                                                    <p>{`Tillagd av: ${category.category_username}`}</p>
                                                    {(isAdmin ||
                                                        username ===
                                                            category.category_username) && (
                                                        <div>
                                                            <button
                                                                style={{
                                                                    marginRight:
                                                                        "1rem",
                                                                    marginLeft:
                                                                        "1rem",
                                                                    backgroundColor:
                                                                        "orange",
                                                                }}
                                                                className="edit-button"
                                                                onClick={(
                                                                    event,
                                                                ) =>
                                                                    handleEdit(
                                                                        event,
                                                                        category,
                                                                        forum.forum_title,
                                                                    )
                                                                }
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faEdit
                                                                    }
                                                                />
                                                            </button>
                                                            <button
                                                                onClick={(
                                                                    event,
                                                                ) =>
                                                                    handleDelete(
                                                                        event,
                                                                        category.category_id,
                                                                    )
                                                                }
                                                                className="delete-button"
                                                            >
                                                                <FontAwesomeIcon
                                                                    icon={
                                                                        faTrash
                                                                    }
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
                    ))
                )}
            </div>
        </div>
    );
};

export default Forum;
