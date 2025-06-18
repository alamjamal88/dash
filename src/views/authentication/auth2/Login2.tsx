// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { Link } from 'react-router-dom';
import { Grid2 as Grid, Box, Card, Stack, Typography } from '@mui/material';
import { useFormik } from 'formik';
import * as Yup from 'yup';

// components
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';
import AuthLogin from '../authForms/AuthLogin';

const Login2 = () => {
    const formik = useFormik({
        initialValues: {
            email: '',
            password: ''
        },
        validationSchema: Yup.object({
            email: Yup.string().email('Invalid email address').required('Email is required'),
            password: Yup.string().required('Password is required')
        }),
        onSubmit: (values, { setSubmitting }) => {
            // Handle login logic here
            setTimeout(() => {
                setSubmitting(false);
                // You can add navigation or success logic here
            }, 1000);
        }
    });

    return (
        <PageContainer title="Login" description="this is Login page">
            <Box
                sx={{
                    position: 'relative',
                    '&:before': {
                        content: '""',
                        background: 'radial-gradient(#d2f1df, #d3d7fa, #bad8f4)',
                        backgroundSize: '400% 400%',
                        animation: 'gradient 15s ease infinite',
                        position: 'absolute',
                        height: '100%',
                        width: '100%',
                        opacity: '0.3'
                    }
                }}
            >
                <Grid container spacing={0} justifyContent="center" sx={{ height: '100vh' }}>
                    <Grid
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        size={{
                            xs: 12,
                            sm: 12,
                            lg: 5,
                            xl: 4
                        }}
                    >
                        <Card elevation={9} sx={{ p: 4, zIndex: 1, width: '100%', maxWidth: '450px' }}>
                            <Box display="flex" alignItems="center" justifyContent="center">
                                <Logo />
                            </Box>
                            <form onSubmit={formik.handleSubmit}>
                                <AuthLogin
                                    formik={formik}
                                    handleChange={formik.handleChange}
                                    clickButton={formik.handleSubmit}
                                    subtitle={
                                        <Stack direction="row" spacing={1} justifyContent="center" mt={3}>
                                            <Typography color="textSecondary" variant="h6" fontWeight="500">
                                                New to Modernize?
                                            </Typography>
                                            <Typography
                                                component={Link}
                                                to="/auth/register"
                                                fontWeight="500"
                                                sx={{
                                                    textDecoration: 'none',
                                                    color: 'primary.main'
                                                }}
                                            >
                                                Create an account
                                            </Typography>
                                        </Stack>
                                    }
                                />
                            </form>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default Login2;
