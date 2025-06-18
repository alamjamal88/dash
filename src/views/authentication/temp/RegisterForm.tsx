import React, { useState, useRef } from 'react';
import { Box, TextField, Button, Typography, Autocomplete, CircularProgress } from '@mui/material';
import { Grid } from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'src/store/Store';
import { userRegister } from 'src/store/auth/AuthSlice';
import { showToast } from 'src/utils/toast';
import { useDropzone } from 'react-dropzone';
import { axiosPublic } from 'src/utils/axios';
import PageContainer from 'src/components/container/PageContainer';
import Thumbnail from 'src/components/apps/ecommerce/productAdd/Thumbnail';

interface Hospital {
    id: string;
    name: string;
}

interface AddressResponse {
    district: string;
    state: string;
}

const RegisterForm = () => {
    const dispatch = useDispatch();
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const [loading, setLoading] = useState(false);
    const [addressDetails, setAddressDetails] = useState<AddressResponse | null>(null);
    const fileRef = useRef<File | null>(null);

    // Hospital search handler
    const handleHospitalSearch = async (searchTerm: string) => {
        try {
            const response = await axiosPublic.get(`/api/hospitals/search?q=${searchTerm}`);
            setHospitals(response.data);
        } catch (error) {
            showToast.error('Failed to fetch hospitals');
        }
    };

    // Pincode search handler
    const handlePincodeSearch = async (pincode: string) => {
        if (pincode.length === 6) {
            try {
                const response = await axiosPublic.get(`/api/address/${pincode}`);
                setAddressDetails(response.data);
            } catch (error) {
                showToast.error('Failed to fetch address details');
            }
        }
    };

    // File upload handler
    const { getRootProps, getInputProps } = useDropzone({
        accept: {
            'image/*': ['.png', '.jpg', '.jpeg']
        },
        maxFiles: 1,
        onDrop: (acceptedFiles) => {
            fileRef.current = acceptedFiles[0];
        }
    });

    // Form validation schema
    const validationSchema = yup.object().shape({
        email: yup.string().email('Must be a valid email').required('Email is required'),
        password: yup.string().min(8, 'Password must be at least 8 characters').required('Password is required'),
        mobile: yup
            .string()
            .matches(/^[6-9]\d{9}$/, 'Please enter a valid Indian mobile number')
            .required('Mobile number is required'),
        hospitalName: yup.string().required('Hospital name is required'),
        pincode: yup
            .string()
            .matches(/^\d{6}$/, 'Please enter a valid 6-digit pincode')
            .required('Pincode is required'),
        streetAddress: yup.string().required('Street address is required')
    });

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
            mobile: '',
            hospitalName: '',
            hospitalId: '',
            pincode: '',
            streetAddress: '',
            district: '',
            state: ''
        },
        validationSchema,
        onSubmit: async (values) => {
            if (!fileRef.current) {
                showToast.error('Please upload a document');
                return;
            }

            setLoading(true);
            try {
                const formData = new FormData();
                formData.append('file', fileRef.current);
                formData.append(
                    'data',
                    JSON.stringify({
                        ...values,
                        district: addressDetails?.district,
                        state: addressDetails?.state
                    })
                );

                await dispatch(userRegister(formData)).unwrap();
                showToast.success('Registration successful');
            } catch (error: any) {
                showToast.error(error.message || 'Registration failed');
            } finally {
                setLoading(false);
            }
        }
    });

    return (
        <PageContainer title="Registration" description="this is Registration page">
            <Box p={3}>
                <Typography variant="h4" mb={3}>
                    Registration Form
                </Typography>
                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Email"
                                name="email"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                error={formik.touched.email && Boolean(formik.errors.email)}
                                helperText={formik.touched.email && formik.errors.email}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Password"
                                name="password"
                                type="password"
                                value={formik.values.password}
                                onChange={formik.handleChange}
                                error={formik.touched.password && Boolean(formik.errors.password)}
                                helperText={formik.touched.password && formik.errors.password}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Mobile"
                                name="mobile"
                                value={formik.values.mobile}
                                onChange={formik.handleChange}
                                error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                                helperText={formik.touched.mobile && formik.errors.mobile}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <Autocomplete
                                options={hospitals}
                                getOptionLabel={(option) => option.name}
                                onChange={(_, value) => {
                                    formik.setFieldValue('hospitalName', value?.name || '');
                                    formik.setFieldValue('hospitalId', value?.id || '');
                                }}
                                onInputChange={(_, value) => handleHospitalSearch(value)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Hospital Name"
                                        error={formik.touched.hospitalName && Boolean(formik.errors.hospitalName)}
                                        helperText={formik.touched.hospitalName && formik.errors.hospitalName}
                                    />
                                )}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Pincode"
                                name="pincode"
                                value={formik.values.pincode}
                                onChange={(e) => {
                                    formik.handleChange(e);
                                    handlePincodeSearch(e.target.value);
                                }}
                                error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                                helperText={formik.touched.pincode && formik.errors.pincode}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                label="Street Address"
                                name="streetAddress"
                                value={formik.values.streetAddress}
                                onChange={formik.handleChange}
                                error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
                                helperText={formik.touched.streetAddress && formik.errors.streetAddress}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Thumbnail />
                        </Grid>
                        <Grid item xs={12}>
                            <Button type="submit" variant="contained" color="primary" disabled={loading} fullWidth>
                                {loading ? <CircularProgress size={24} /> : 'Register'}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Box>
        </PageContainer>
    );
};

export default RegisterForm;
