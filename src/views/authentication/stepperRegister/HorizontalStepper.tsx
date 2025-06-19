import React from 'react';
import { Box, Stepper, Step, StepLabel } from '@mui/material';

const steps = ['Mobile Number', 'OTP Verification', 'Complete Registration'];

interface HorizontalStepperProps {
    activeStep: number;
}

const HorizontalStepper = ({ activeStep }: HorizontalStepperProps) => {
    return (
        <Box sx={{ width: '100%', mb: 5 }}>
            <Stepper activeStep={activeStep} alternativeLabel>
                {steps.map((label) => (
                    <Step key={label}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
};

export default HorizontalStepper; 