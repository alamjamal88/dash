/* eslint-disable react-hooks/exhaustive-deps */
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';
import { fetchBlogPost } from 'src/store/apps/blog/BlogSlice';
import { useLocation } from 'react-router-dom';
import {
    CardContent,
    Stack,
    Avatar,
    Typography,
    CardMedia,
    Chip,
    Tooltip,
    Box,
    Divider,
    TextField,
    Button,
    Skeleton
} from '@mui/material';
import { IconEye, IconMessage2, IconPoint, IconQuote } from '@tabler/icons-react';
import { format } from 'date-fns';
import BlogComment from './BlogComment';
import { uniqueId } from 'lodash-es';
import { addComment } from 'src/store/apps/blog/BlogSlice';
import BlankCard from '../../../shared/BlankCard';
import { AppState, useDispatch, useSelector } from 'src/store/Store';
import type { BlogPostType, BlogType } from 'src/types/apps/blog';

const BlogDetail = () => {
    const dispatch = useDispatch();
    const title = useLocation();
    const getTitle: any = title.pathname.split('/').pop();
    const [replyTxt, setReplyTxt] = React.useState('');

    useEffect(() => {
        dispatch(fetchBlogPost(getTitle));
    }, [dispatch]);

    // Get post
    const post: BlogPostType | any = useSelector((state: AppState) => state.blogReducer.selectedPost);

    const onSubmit = async (id: number, reply: string) => {
        const replyId: string = uniqueId('#comm_');
        const newReply = {
            id: replyId,
            profile: {
                id: uniqueId('#REPLY_'),
                avatar: post?.author.avatar,
                name: post?.author.name,
                time: 'now'
            },
            comment: reply,
            replies: []
        };
        dispatch(addComment(id, newReply));
        dispatch(fetchBlogPost(getTitle));
        setReplyTxt('');
    };

    // skeleton
    const [isLoading, setLoading] = React.useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 700);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box>
            <BlankCard>
                <>
                    {isLoading ? (
                        <>
                            <Skeleton
                                animation="wave"
                                variant="rectangular"
                                width="100%"
                                height={440}
                                sx={{ borderRadius: (theme) => theme.shape.borderRadius / 5 }}
                            ></Skeleton>
                        </>
                    ) : (
                        <CardMedia component="img" height="440" image={post?.coverImg} alt="green iguana" />
                    )}
                    <CardContent>
                        <Stack direction="row" sx={{ marginTop: '-45px' }}>
                            <Tooltip title={post ? post?.author.name : ''} placement="top">
                                <Avatar aria-label="recipe" src={post?.author.avatar}></Avatar>
                            </Tooltip>
                            <Chip
                                sx={{
                                    marginLeft: 'auto',
                                    marginTop: '-21px',
                                    backgroundColor: (theme) =>
                                        theme.palette.mode === 'dark' ? theme.palette.background.default : 'white'
                                }}
                                label="2 min Read"
                                size="small"
                            ></Chip>
                        </Stack>
                        <Chip label={post?.category} size="small" sx={{ marginTop: 2 }}></Chip>
                        <Box my={3}>
                            <Typography
                                gutterBottom
                                variant="h1"
                                fontWeight={600}
                                color="inherit"
                                sx={{ textDecoration: 'none' }}
                            >
                                {post?.title}
                            </Typography>
                        </Box>
                        <Stack direction="row" gap={3} alignItems="center">
                            <Stack direction="row" gap={1} alignItems="center">
                                <IconEye size="18" /> {post?.view}
                            </Stack>
                            <Stack direction="row" gap={1} alignItems="center">
                                <IconMessage2 size="18" /> {post?.comments.length}
                            </Stack>

                            <Stack direction="row" ml="auto" alignItems="center">
                                <IconPoint size="16" />
                                <small>{post ? <>{format(new Date(post.createdAt), 'E, MMM d')}</> : ''}</small>
                            </Stack>
                        </Stack>
                    </CardContent>
                    <Divider />
                    <CardContent>
                        <Typography variant="h2">Title of the paragraph</Typography>
                        <p>
                            But you cannot figure out what it is or what it can do. MTA web directory is the simplest
                            way in which one can bid on a link, or a few links if they wish to do so. The link directory
                            on MTA displays all of the links it currently has, and does so in alphabetical order, which
                            makes it much easier for someone to find what they are looking for if it is something
                            specific and they do not want to go through all the other sites and links as well. It allows
                            you to start your bid at the bottom and slowly work your way to the top of the list.
                        </p>
                        <p>
                            Gigure out what it is or what it can do. MTA web directory is the simplest way in which one
                            can bid on a link, or a few links if they wish to do so. The link directory on MTA displays
                            all of the links it currently has, and does so in alphabetical order, which makes it much
                            easier for someone to find what they are looking for if it is something specific and they do
                            not want to go through all the other sites and links as well. It allows you to start your
                            bid at the bottom and slowly work your way to the top of the
                        </p>
                        <Typography fontWeight={600}>This is strong text.</Typography>
                        <Typography fontStyle="italic">This is italic text.</Typography>
                        <Box my={4}>
                            <Divider />
                        </Box>
                        <Typography variant="h3">Unorder list.</Typography>
                        <ul>
                            <li>Gigure out what it is or</li>
                            <li>The links it currently</li>
                            <li>It allows you to start your bid</li>
                            <li>Gigure out what it is or</li>
                            <li>The links it currently</li>
                            <li>It allows you to start your bid</li>
                        </ul>
                        <Box my={4}>
                            <Divider />
                        </Box>
                        <Typography variant="h3">Order list.</Typography>
                        <ol>
                            <li>Gigure out what it is or</li>
                            <li>The links it currently</li>
                            <li>It allows you to start your bid</li>
                            <li>Gigure out what it is or</li>
                            <li>The links it currently</li>
                            <li>It allows you to start your bid</li>
                        </ol>
                        <Box my={4}>
                            <Divider />
                        </Box>
                        <Typography variant="h3">Quotes</Typography>
                        <Box p={2} bgcolor="grey[100]" mt={2}>
                            <Typography variant="h6">
                                <IconQuote /> Life is short, Smile while you still have teeth!
                            </Typography>
                        </Box>
                    </CardContent>
                </>
            </BlankCard>
            <BlankCard sx={{ mt: 3, p: 0 }}>
                <CardContent>
                    <Typography variant="h4" fontWeight={600}>
                        Post Comments
                    </Typography>
                    <br />
                    <TextField
                        rows={4}
                        multiline
                        fullWidth
                        value={replyTxt}
                        onChange={(e) => setReplyTxt(e.target.value)}
                    ></TextField>
                    <br />
                    <br />
                    <Button color="primary" variant="contained" onClick={() => onSubmit(post.id, replyTxt)}>
                        Post Comment
                    </Button>

                    <Stack direction="row" gap={2} alignItems="center" mb={3} mt={5}>
                        <Typography variant="h4" fontWeight={600}>
                            Comments
                        </Typography>
                        <Box px={1.5} py={1} color="primary.main" bgcolor={'primary.light'}>
                            <Typography variant="h6" fontWeight={600}>
                                {post?.comments.length}
                            </Typography>
                        </Box>
                    </Stack>
                    <Box>
                        {post?.comments?.map((comment: BlogType | any) => {
                            return <BlogComment comment={comment} key={comment.profile.id} />;
                        })}
                    </Box>
                </CardContent>
            </BlankCard>
        </Box>
    );
};

export default BlogDetail;
