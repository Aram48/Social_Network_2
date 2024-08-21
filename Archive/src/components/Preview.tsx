import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Avatar from '@mui/material/Avatar';
import { BASE, DEF } from '../helpers/default';
import { IPost, IComment } from '../helpers/types';
import { handlePostComment } from '../helpers/api';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 800,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

interface IProps {
    post: IPost;
    open: boolean;
    onClose: () => void;
}

export function Preview({ open, onClose, post }: IProps) {

    const [comments, setComments] = useState<IComment[]>(post?.comments);
    const [text, setText] = useState<string>("");

    useEffect(() => {
        setComments(post?.comments)
    }, [post]);

    const handleCommentChange = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const commentText = {
            text: text as string,
        };

        handlePostComment(post.id, commentText)
            .then((response) => {
                const newComment = response.payload as IComment;

                setComments((prev) => [...prev, newComment]);
                setText("");
            });
    };

    return (
        <Modal open={open} onClose={onClose} aria-labelledby="modal-title" aria-describedby="modal-description">
            <Box sx={style}>
                <Box sx={{ display: 'flex', height: '100%' }}>
                    <Box sx={{ flex: 2, mr: 2 }}>
                        <img
                            src={post.picture ? BASE + post.picture : DEF}
                            alt="post"
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                        />
                    </Box>
                    <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                        <Typography variant="h6">{`${post.likes.length} likes, ${comments.length} comments`}</Typography>

                        {/* Likes Section with Scroll */}
                        <Box sx={{ my: 2, maxHeight: 100, overflowY: 'auto' }}>
                            <Typography variant="subtitle1">Likes:</Typography>
                            {
                                post.likes.length > 0 ? (
                                    post.likes.map((like) => (
                                        <Box
                                            key={like.id}
                                            sx={{ display: 'flex', alignItems: 'center', mb: 1 }}
                                        >
                                            <Avatar
                                                src={like.picture ? BASE + like.picture : DEF}
                                                sx={{ mr: 1 }}
                                            />
                                            <Typography
                                                variant="body2"
                                                component="span">
                                                {like.name} {like.surname}
                                            </Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography variant="body2">No likes yet</Typography>
                                )
                            }
                        </Box>

                        {/* Comments Section with Scroll */}
                        <Box sx={{ flexGrow: 1, maxHeight: 200, overflowY: 'auto' }}>
                            <Typography variant="subtitle1">Comments:</Typography>
                            {
                                comments.length > 0 ? (
                                    comments.map((comment) => (
                                        <Box key={comment.id} sx={{ mb: 1 }}>
                                            <Typography variant="body2" fontWeight="bold">
                                                {comment.user.name} says:
                                            </Typography>
                                            <Typography variant="body2">{comment.content}</Typography>
                                        </Box>
                                    ))
                                ) : (
                                    <Typography variant="body2">No comments yet</Typography>
                                )}
                        </Box>
                        <Box sx={{ mt: 2 }}>
                            <form onSubmit={handleCommentChange}>
                                <input
                                    className="form-control my-1 w-100"
                                    placeholder="Add a comment..."
                                    value={text}
                                    onChange={(e) => setText(e.target.value)}
                                />
                            </form>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </Modal>
    );
}