import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../../../components/auth/authContext";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrash,
    faEdit,
    faThumbsUp,
    faComment,
    faCaretLeft,
} from "@fortawesome/free-solid-svg-icons";
import CreatePostModal from "../components/CreatePostModal";
import { formatDate } from "../../../helpers/dateHelper";
import CreateCommentModal from "../components/CreateCommentModal";

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

const Posts: React.FC = () => {
    const { isAdmin, username } = useAuth();
    const location = useLocation();
    const navigate = useNavigate();
    const { category, topic, topicId } = (location.state as {
        category: string;
        topic: string;
        topicId: string;
    }) || { category: "", topic: "", topicId: "" };
    const [posts, setPosts] = useState<Post[]>([]);
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const [editPost, setEditPost] = useState<Post | null>(null);
    const [commentModalPostId, setCommentModalPostId] = useState<string | null>(
        null,
    );
    const [likesOpenPostId, setLikesOpenPostId] = useState<string | null>(null);
    const [commentsOpenPostId, setCommentsOpenPostId] = useState<string | null>(
        null,
    );

    const fetchPosts = async () => {
        try {
            const response = await fetch(
                `https://goblincakes-server.vercel.app/api/forum/posts/${topicId}`,
                // `http://localhost:5050/api/forum/posts/${topicId}`,
                {
                    mode: "cors",
                    credentials: "include",
                },
            );
            if (!response.ok) {
                throw new Error("Failed to fetch posts");
            }
            const data = await response.json();
            setPosts(data);
        } catch (error) {
            console.error("Error fetching posts:", error);
        }
    };

    useEffect(() => {
        fetchPosts();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [topicId]);

    const handleAddPost = () => {
        setEditPost(null);
        setIsModalOpen(true);
    };

    const handleEdit = (event: React.MouseEvent, post: Post) => {
        event.stopPropagation();
        setEditPost(post);
        setIsModalOpen(true);
    };

    const handleDelete = async (event: React.MouseEvent, postId: string) => {
        event.stopPropagation();

        try {
            const response = await fetch(
                `https://goblincakes-server.vercel.app/api/forum/post/${topicId}/${postId}`,
                // `http://localhost:5050/api/forum/post/${topicId}/${postId}`,
                {
                    method: "DELETE",
                    credentials: "include",
                    mode: "cors",
                },
            );

            if (!response.ok) {
                throw new Error("Failed to delete post");
            }

            fetchPosts();
        } catch (error) {
            console.error("Error deleting post:", error);
        }
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const handleSubmit = async (
        postTitle: string,
        postText: string,
        postId?: string,
    ) => {
        const endpoint = postId
            ? `https://goblincakes-server.vercel.app/api/forum/post/${topicId}/${postId}`
            : `https://goblincakes-server.vercel.app/api/forum/post/${topicId}`;
        // ? `http://localhost:5050/api/forum/post/${topicId}/${postId}`
        // : `http://localhost:5050/api/forum/post/${topicId}`;
        const method = postId ? "PATCH" : "POST";

        try {
            const response = await fetch(endpoint, {
                method,
                headers: {
                    "Content-Type": "application/json",
                },
                credentials: "include",
                mode: "cors",
                body: JSON.stringify({
                    post_title: postTitle,
                    post_text: postText,
                    username,
                }),
            });

            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            setIsModalOpen(false);
            fetchPosts();
        } catch (error) {
            console.error("Error saving post:", error);
        }
    };

    const handleLike = async (postId: string) => {
        try {
            const response = await fetch(
                `https://goblincakes-server.vercel.app/api/forum/post/like/${topicId}/${postId}`,
                // `http://localhost:5050/api/forum/post/like/${topicId}/${postId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    mode: "cors",
                    body: JSON.stringify({ username }),
                },
            );

            if (!response.ok) {
                throw new Error("Failed to like/unlike post");
            }

            fetchPosts();
        } catch (error) {
            console.error("Error liking/unliking post:", error);
        }
    };

    const toggleCommentModal = (postId?: string) => {
        setCommentModalPostId(postId || null);
    };

    const handleCommentSubmit = async (commentText: string, postId: string) => {
        try {
            const response = await fetch(
                `https://goblincakes-server.vercel.app/api/forum/post/comment/${topicId}/${postId}`,
                // `http://localhost:5050/api/forum/post/comment/${topicId}/${postId}`,
                {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    mode: "cors",
                    body: JSON.stringify({
                        comment_text: commentText,
                        username,
                    }),
                },
            );

            if (!response.ok) {
                throw new Error("Failed to post comment");
            }
            setCommentModalPostId(null);
            fetchPosts();
        } catch (error) {
            console.error("Error posting comment:", error);
        }
    };

    const handleDeleteComment = async (postId: string, commentId: string) => {
        try {
            const response = await fetch(
                `https://goblincakes-server.vercel.app/api/forum/post/comment/${topicId}/${postId}/${commentId}`,
                // `http://localhost:5050/api/forum/post/comment/${topicId}/${postId}/${commentId}`,
                {
                    method: "DELETE",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    credentials: "include",
                    mode: "cors",
                },
            );

            if (!response.ok) {
                throw new Error("Failed to delete comment");
            }

            fetchPosts();
        } catch (error) {
            console.error("Error deleting comment:", error);
        }
    };

    const toggleLikesOpen = (postId: string) => {
        setLikesOpenPostId((prev) => (prev === postId ? null : postId));
    };

    const toggleCommentsOpen = (postId: string) => {
        setCommentsOpenPostId((prev) => (prev === postId ? null : postId));
    };

    const renderTextWithNewlines = (text: string) => {
        return text.split("\n").map((line, index) => <p key={index}>{line}</p>);
    };

    return (
        <div className="forum-wrapper">
            <h1>
                FORUM / {category} / {topic}
            </h1>
            <div className="forum">
                <div className="add-category">
                    <button
                        className="edit-button"
                        onClick={() => navigate(-1)}
                    >
                        <FontAwesomeIcon icon={faCaretLeft} />
                    </button>
                    <button className="save-button" onClick={handleAddPost}>
                        Lägg till inlägg
                    </button>
                </div>
                <CreatePostModal
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                    onSubmit={handleSubmit}
                    editPost={editPost}
                />
                <div className="forum-body">
                    {posts.map((post) => (
                        <div
                            key={post.post_id}
                            style={{ marginBottom: "2rem" }}
                        >
                            <div
                                style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    paddingInline: "1rem",
                                    background: "#121212",
                                }}
                            >
                                <h2>{post.post_title}</h2>
                                <div>
                                    <button
                                        className="edit-button"
                                        style={{
                                            marginRight: "1rem",
                                            backgroundColor: "orange",
                                        }}
                                        onClick={(event) =>
                                            handleEdit(event, post)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faEdit} />
                                    </button>
                                    <button
                                        className="delete-button"
                                        onClick={(event) =>
                                            handleDelete(event, post.post_id)
                                        }
                                    >
                                        <FontAwesomeIcon icon={faTrash} />{" "}
                                    </button>
                                </div>
                            </div>
                            <div
                                className="forum-content"
                                style={{
                                    borderBottom: "1px solid silver",
                                }}
                            >
                                <div
                                    className="forum-text"
                                    style={{
                                        borderBottom: "2px solid silver",
                                        marginBottom: "1rem",
                                    }}
                                >
                                    {renderTextWithNewlines(post.post_text)}
                                </div>
                                <div
                                    className="forum-actions"
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        paddingBottom: "1rem",
                                    }}
                                >
                                    <div>
                                        <button
                                            style={{ marginRight: "1rem" }}
                                            onClick={() =>
                                                handleLike(post.post_id)
                                            }
                                        >
                                            <FontAwesomeIcon
                                                icon={faThumbsUp}
                                            />{" "}
                                            Like
                                        </button>
                                        <button
                                            onClick={() =>
                                                toggleCommentModal(post.post_id)
                                            }
                                        >
                                            <FontAwesomeIcon icon={faComment} />{" "}
                                            Comment
                                        </button>
                                    </div>
                                    <div>
                                        <div>
                                            <span
                                                onClick={() =>
                                                    toggleLikesOpen(
                                                        post.post_id,
                                                    )
                                                }
                                                className="like-highlight"
                                            >
                                                {post.likes.length} Likes
                                            </span>
                                            <span
                                                onClick={() =>
                                                    toggleCommentsOpen(
                                                        post.post_id,
                                                    )
                                                }
                                                className="comment-highlight"
                                            >
                                                {post.comments.length} Comments
                                            </span>
                                        </div>
                                    </div>
                                </div>
                                {commentModalPostId === post.post_id && (
                                    <CreateCommentModal
                                        isOpen={true}
                                        onClose={toggleCommentModal}
                                        onSubmit={handleCommentSubmit}
                                        postId={post.post_id}
                                    />
                                )}

                                {likesOpenPostId === post.post_id && (
                                    <div
                                        className="forum-likes"
                                        style={{
                                            display: "flex",
                                            flexDirection: "column",
                                            alignItems: "end",
                                            gap: "8px",
                                            marginTop: "1rem",
                                        }}
                                    >
                                        <span>gillas av:</span>
                                        <div>
                                            {post.likes.map((like) => (
                                                <span
                                                    key={like}
                                                >{` ${like} `}</span>
                                            ))}
                                        </div>
                                    </div>
                                )}
                                {commentsOpenPostId === post.post_id && (
                                    <div
                                        className="forum-comments"
                                        style={{
                                            borderBottom: "1px solid silver",
                                        }}
                                    >
                                        {post.comments.map((comment) => (
                                            <div
                                                key={comment.comment_id}
                                                className="forum-comment"
                                                style={{
                                                    paddingTop: "1rem",
                                                    paddingBottom: "1rem",
                                                    borderBottom:
                                                        "1px solid silver",
                                                }}
                                            >
                                                <span>
                                                    {comment.comment_username}
                                                </span>
                                                <div>
                                                    <p>
                                                        {comment.comment_text}
                                                    </p>
                                                </div>
                                                <span
                                                    style={{
                                                        display: "flex",
                                                        justifyContent:
                                                            "space-between",
                                                        alignItems: "center",
                                                    }}
                                                >
                                                    {formatDate(
                                                        comment.comment_created,
                                                    )}
                                                    {(isAdmin ||
                                                        username ===
                                                            comment.comment_username) && (
                                                        <button
                                                            onClick={() =>
                                                                handleDeleteComment(
                                                                    post.post_id,
                                                                    comment.comment_id,
                                                                )
                                                            }
                                                            className="delete-button"
                                                        >
                                                            <FontAwesomeIcon
                                                                icon={faTrash}
                                                            />
                                                        </button>
                                                    )}
                                                </span>
                                            </div>
                                        ))}
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Posts;
