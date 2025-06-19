import React from 'react';
import {
    Box,
    Typography,
    FormGroup,
    FormControlLabel,
    Button,
    Stack,
    InputAdornment
} from '@mui/material';
import CustomCheckbox from 'src/components/forms/theme-elements/CustomCheckbox';
import CustomFormLabel from 'src/components/forms/theme-elements/CustomFormLabel';
import { CustomInputOnlyNumber } from 'src/components/application/InputNumber';
import { showToast } from 'src/utils/toast';

interface FirstStepProps {
    handleNext: () => void;
    formData: {
        mobile: string;
        rememberDevice: boolean;
    };
    setFormData: (data: any) => void;
    isSubmitting: boolean;
}

const FirstStep = ({ handleNext, formData, setFormData, isSubmitting }: FirstStepProps) => {
    const handleMobileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (value.length > 10) return;
        setFormData({ ...formData, mobile: value });
    };

    const validateMobile = (mobile: string): boolean => {
        if (!mobile) {
            showToast.error('Mobile number is required');
            return false;
        }
        if (!mobile.match(/^[6-9]\d{9}$/)) {
            showToast.error('Please enter a valid Indian mobile number');
            return false;
        }
        return true;
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (validateMobile(formData.mobile)) {
            handleNext();
        }
    };

    return (
        <Box>
            <Typography variant="h4" fontWeight="700">
                Welcome to Mentally
            </Typography>
            <Typography variant="subtitle1" color="textSecondary" mt={2} mb={4}>
                Your Mental Health Companion
            </Typography>

            <form onSubmit={handleSubmit}>
                <Stack>
                    <Box>
                        <CustomFormLabel htmlFor="mobile">Mobile</CustomFormLabel>
                        <CustomInputOnlyNumber
                            name="mobile"
                            variant="outlined"
                            maxLength={10}
                            value={formData.mobile}
                            onChange={handleMobileChange}
                            fullWidth
                            required
                            InputProps={{
                                startAdornment: (
                                    <InputAdornment position="start">
                                        <span style={{ display: 'flex', alignItems: 'center' }}>
                                            <img
                                                src="https://upload.wikimedia.org/wikipedia/en/4/41/Flag_of_India.svg"
                                                alt="India Flag"
                                                style={{ width: '20px', height: '15px', marginRight: '5px' }}
                                            />
                                            +91
                                        </span>
                                    </InputAdornment>
                                ),
                                style: { height: '50px' }
                            }}
                        />
                    </Box>

                    <Stack justifyContent="space-between" direction="row" alignItems="center" my={2}>
                        <FormGroup>
                            <FormControlLabel
                                control={
                                    <CustomCheckbox
                                        checked={formData.rememberDevice}
                                        onChange={(e) => setFormData({ ...formData, rememberDevice: e.target.checked })}
                                    />
                                }
                                label="Remember this Device"
                            />
                        </FormGroup>
                    </Stack>
                </Stack>
                <Box>
                    <Button
                        color="primary"
                        variant="contained"
                        size="large"
                        fullWidth
                        type="submit"
                        disabled={isSubmitting}
                    >
                        {isSubmitting ? 'Sending OTP...' : 'Send OTP'}
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default FirstStep; 