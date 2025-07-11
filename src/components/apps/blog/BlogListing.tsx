// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React, { useEffect } from 'react';
import { Grid2 as Grid, Pagination } from '@mui/material';
import BlogCard from './BlogCard';
import { orderBy } from 'lodash-es';
import { useSelector, useDispatch } from 'src/store/Store';
import { fetchBlogPosts } from 'src/store/apps/blog/BlogSlice';
import BlogFeaturedCard from './BlogFeaturedCard';
import { BlogPostType } from 'src/types/apps/blog';

const BlogListing = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchBlogPosts());
    }, [dispatch]);

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const filterBlogs = (posts: BlogPostType[], sortBy: string, _cSearch: string) => {
        // SORT BY

        if (sortBy === 'newest') {
            posts = orderBy(posts, ['createdAt'], ['desc']);
        }
        if (sortBy === 'oldest') {
            posts = orderBy(posts, ['createdAt'], ['asc']);
        }
        if (sortBy === 'popular') {
            posts = orderBy(posts, ['view'], ['desc']);
        }
        if (posts) {
            return (posts = posts.filter((t) => t.featured === false));
        }

        return posts;
    };

    const filterFeaturedpost = (posts: BlogPostType[]) => {
        return (posts = posts.filter((t) => t.featured));
    };

    const blogPosts = useSelector((state) =>
        filterBlogs(state.blogReducer.blogposts, state.blogReducer.sortBy, state.blogReducer.blogSearch)
    );
    const featuredPost = useSelector((state) => filterFeaturedpost(state.blogReducer.blogposts));

    return (
        <Grid container spacing={3}>
            {featuredPost.map((post, index) => {
                return <BlogFeaturedCard index={index} post={post} key={post.title} />;
            })}
            {blogPosts.map((post) => {
                return <BlogCard post={post} key={post.id} />;
            })}
            <Grid
                mt={3}
                size={{
                    lg: 12,
                    sm: 12
                }}
            >
                <Pagination count={10} color="primary" sx={{ display: 'flex', justifyContent: 'center' }} />
            </Grid>
        </Grid>
    );
};

export default BlogListing;
