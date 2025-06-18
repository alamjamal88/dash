import React, { useState, useRef } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Autocomplete,
    CircularProgress,
    Divider,
    Stack,
    Card,
    Grid
} from '@mui/material';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch } from 'src/store/Store';
import { userRegister } from 'src/store/auth/AuthSlice';
import { showToast } from 'src/utils/toast';
import { useDropzone } from 'react-dropzone';
import { axiosPublic } from 'src/utils/axios';
import CustomTextField from '../../../components/forms/theme-elements/CustomTextField';
import CustomFormLabel from '../../../components/forms/theme-elements/CustomFormLabel';
import { registerType } from 'src/types/auth/auth';
import AuthSocialButtons from './AuthSocialButtons';
import Thumbnail from 'src/components/apps/ecommerce/productAdd/Thumbnail';
import PageContainer from 'src/components/container/PageContainer';
import Logo from 'src/layouts/full/shared/logo/Logo';

interface Hospital {
    id: string;
    name: string;
}

interface AddressResponse {
    district: string;
    state: string;
}

const AuthRegister = ({ title, subtitle, subtext }: registerType) => {
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
        confirmPassword: yup
            .string()
            .oneOf([yup.ref('password')], 'Passwords must match')
            .required('Confirm password is required'),
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
            confirmPassword: '',
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
        <>
            {title ? (
                <Typography fontWeight="700" variant="h3" mb={1}>
                    {title}
                </Typography>
            ) : null}

            {subtext}
            <AuthSocialButtons title="Sign up with" />

            <Box mt={3}>
                <Divider>
                    <Typography
                        component="span"
                        color="textSecondary"
                        variant="h6"
                        fontWeight="400"
                        position="relative"
                        px={2}
                    >
                        or sign up with
                    </Typography>
                </Divider>
            </Box>

            <Box component="form" onSubmit={formik.handleSubmit} mt={3}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
                        <CustomTextField
                            id="email"
                            name="email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            error={formik.touched.email && Boolean(formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                        <CustomTextField
                            id="password"
                            name="password"
                            type="password"
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            error={formik.touched.password && Boolean(formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="confirmPassword">Confirm Password</CustomFormLabel>
                        <CustomTextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formik.values.confirmPassword}
                            onChange={formik.handleChange}
                            error={formik.touched.confirmPassword && Boolean(formik.errors.confirmPassword)}
                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="mobile">Mobile</CustomFormLabel>
                        <CustomTextField
                            id="mobile"
                            name="mobile"
                            value={formik.values.mobile}
                            onChange={formik.handleChange}
                            error={formik.touched.mobile && Boolean(formik.errors.mobile)}
                            helperText={formik.touched.mobile && formik.errors.mobile}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <CustomFormLabel htmlFor="hospitalName">Hospital Name</CustomFormLabel>
                        <Autocomplete
                            options={hospitals}
                            getOptionLabel={(option) => option.name}
                            onChange={(_, value) => {
                                formik.setFieldValue('hospitalName', value?.name || '');
                                formik.setFieldValue('hospitalId', value?.id || '');
                            }}
                            onInputChange={(_, value) => handleHospitalSearch(value)}
                            renderInput={(params) => (
                                <CustomTextField
                                    {...params}
                                    error={formik.touched.hospitalName && Boolean(formik.errors.hospitalName)}
                                    helperText={formik.touched.hospitalName && formik.errors.hospitalName}
                                />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="pincode">Pincode</CustomFormLabel>
                        <CustomTextField
                            id="pincode"
                            name="pincode"
                            value={formik.values.pincode}
                            onChange={async (e: React.ChangeEvent<HTMLInputElement>) => {
                                formik.handleChange(e);
                                await handlePincodeSearch(e.target.value);
                            }}
                            error={formik.touched.pincode && Boolean(formik.errors.pincode)}
                            helperText={formik.touched.pincode && formik.errors.pincode}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="district">District</CustomFormLabel>
                        <CustomTextField
                            id="district"
                            name="district"
                            value={addressDetails?.district || ''}
                            disabled
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="state">State</CustomFormLabel>
                        <CustomTextField
                            id="state"
                            name="state"
                            value={addressDetails?.state || ''}
                            disabled
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="streetAddress">Local Address</CustomFormLabel>
                        <CustomTextField
                            id="streetAddress"
                            name="streetAddress"
                            value={formik.values.streetAddress}
                            onChange={formik.handleChange}
                            error={formik.touched.streetAddress && Boolean(formik.errors.streetAddress)}
                            helperText={formik.touched.streetAddress && formik.errors.streetAddress}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Box>
                            <CustomFormLabel>Upload Document</CustomFormLabel>
                            <Box
                                sx={{
                                    border: '2px dashed',
                                    borderColor: 'primary.main',
                                    borderRadius: 2,
                                    p: 3,
                                    textAlign: 'center',
                                    cursor: 'pointer',
                                    '&:hover': {
                                        backgroundColor: 'action.hover'
                                    }
                                }}
                                {...getRootProps()}
                            >
                                <input {...getInputProps()} />
                                <Typography variant="body1" color="primary">
                                    Drag & drop a file here, or click to select
                                </Typography>
                                {fileRef.current && (
                                    <Typography variant="body2" color="textSecondary" mt={1}>
                                        Selected file: {fileRef.current.name}
                                    </Typography>
                                )}
                            </Box>
                        </Box>
                    </Grid>
                    <Grid item xs={12}>
                        <Button
                            type="submit"
                            variant="contained"
                            color="primary"
                            disabled={loading}
                            fullWidth
                            size="large"
                        >
                            {loading ? <CircularProgress size={24} /> : 'Sign Up'}
                        </Button>
                    </Grid>
                </Grid>
            </Box>
            {subtitle}
        </>
    );
};

export default AuthRegister;
