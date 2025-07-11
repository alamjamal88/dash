// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import { CardContent, Typography, Button, Box } from '@mui/material';
import starBg from 'src/assets/images/backgrounds/gold.png';
import ParentCard from '../../shared/ParentCard';

import NotificationCode from './code/NotificationCode';

const Banner2 = () => {
    return (
        <ParentCard title="Notification" codeModel={<NotificationCode />}>
            <CardContent sx={{ p: '30px' }}>
                <Typography
                    variant="subtitle1"
                    textAlign="center"
                    mb={2}
                    textTransform="uppercase"
                    color="textSecondary"
                >
                    Level Up
                </Typography>
                <Box textAlign="center">
                    <img src={starBg} alt="star" width={150} />

                    <Typography variant="h5">You reach all Notifications</Typography>
                    <Typography variant="subtitle1" color="textSecondary" mt={1} mb={2}>
                        Congratulations,
                        <br /> Tap to continue next task.
                    </Typography>

                    <Button color="primary" variant="contained" size="large">
                        Yes, Got it!
                    </Button>
                </Box>
            </CardContent>
        </ParentCard>
    );
};

export default Banner2;
