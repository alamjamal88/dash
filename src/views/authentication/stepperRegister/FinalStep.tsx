import React from 'react';
import { Box, Typography, Button, Stack, Grid, Autocomplete } from '@mui/material';
import CustomTextField from 'src/components/forms/theme-elements/CustomTextField';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import { showToast } from 'src/utils/toast';
import * as yup from 'yup';

interface Hospital {
    id: string;
    name: string;
}

interface FinalStepProps {
    handleBack: () => void;
    formData: {
        email: string;
        password: string;
        confirmPassword: string;
        hospitalName: string;
        hospitalId: string;
        pincode: string;
        streetAddress: string;
        district: string;
        state: string;
    };
    setFormData: (data: any) => void;
    isSubmitting: boolean;
    hospitals: Hospital[];
    handleHospitalSearch: (searchTerm: string) => void;
    handlePincodeSearch: (pincode: string) => void;
    addressDetails: {
        district: string;
        state: string;
    } | null;
    handleNext: () => void;
}

const validationSchema = yup.object().shape({
    email: yup.string().email('Must be a valid email').required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password must be at least 8 characters')
        .matches(/[A-Z]/, 'Password must contain at least one uppercase letter')
        .matches(/[a-z]/, 'Password must contain at least one lowercase letter')
        .matches(/[0-9]/, 'Password must contain at least one number')
        .matches(/[^A-Za-z0-9]/, 'Password must contain at least one special character')
        .required('Password is required'),
    confirmPassword: yup
        .string()
        .oneOf([yup.ref('password')], 'Passwords must match')
        .required('Confirm password is required'),
    hospitalName: yup.string().required('Hospital name is required'),
    pincode: yup
        .string()
        .matches(/^\d{6}$/, 'Please enter a valid 6-digit pincode')
        .required('Pincode is required'),
    streetAddress: yup.string().required('Street address is required')
});

const FinalStep = ({
    handleBack,
    formData,
    setFormData,
    isSubmitting,
    hospitals,
    handleHospitalSearch,
    handlePincodeSearch,
    addressDetails,
    handleNext
}: FinalStepProps) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        validationSchema
            .validate(formData, { abortEarly: false })
            .then(() => {
                handleNext();
            })
            .catch((err) => {
                if (err instanceof yup.ValidationError) {
                    err.inner.forEach((error) => {
                        if (error.path) {
                            showToast.error(error.message);
                        }
                    });
                }
            });
    };

    const handleFieldChange = (field: string, value: string) => {
        setFormData({ ...formData, [field]: value });
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="700" mb={4}>
                Complete Registration
            </Typography>

            <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="email">Email Address</CustomFormLabel>
                        <CustomTextField
                            id="email"
                            name="email"
                            value={formData.email}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange('email', e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="password">Password</CustomFormLabel>
                        <CustomTextField
                            id="password"
                            name="password"
                            type="password"
                            value={formData.password}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange('password', e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="confirmPassword">Confirm Password</CustomFormLabel>
                        <CustomTextField
                            id="confirmPassword"
                            name="confirmPassword"
                            type="password"
                            value={formData.confirmPassword}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange('confirmPassword', e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="hospitalName">Hospital Name</CustomFormLabel>
                        <Autocomplete
                            options={hospitals}
                            getOptionLabel={(option) => option.name}
                            value={hospitals.find((h) => h.id === formData.hospitalId) || null}
                            onChange={(_, value) => {
                                setFormData({
                                    ...formData,
                                    hospitalName: value?.name || '',
                                    hospitalId: value?.id || ''
                                });
                            }}
                            onInputChange={(_, value) => handleHospitalSearch(value)}
                            renderInput={(params) => (
                                <CustomTextField {...params} fullWidth required />
                            )}
                        />
                    </Grid>
                    <Grid item xs={12} md={6}>
                        <CustomFormLabel htmlFor="pincode">Pincode</CustomFormLabel>
                        <CustomTextField
                            id="pincode"
                            name="pincode"
                            value={formData.pincode}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                handleFieldChange('pincode', e.target.value);
                                handlePincodeSearch(e.target.value);
                            }}
                            fullWidth
                            required
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
                            value={formData.streetAddress}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => handleFieldChange('streetAddress', e.target.value)}
                            fullWidth
                            required
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Stack direction="row" spacing={2}>
                            <Button color="inherit" onClick={handleBack} fullWidth>
                                Back
                            </Button>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                disabled={isSubmitting}
                                fullWidth
                            >
                                {isSubmitting ? 'Registering...' : 'Complete Registration'}
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
            </form>
        </Box>
    );
};

export default FinalStep; 