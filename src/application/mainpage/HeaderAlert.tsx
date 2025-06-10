import { useState, useEffect } from 'react';
import { Box, Stack, Typography, Chip, IconButton } from '@mui/material';
import { styled } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { IconX } from '@tabler/icons-react';
import NotificationRight from 'src/assets/images/frontend-pages/homepage/notification-right.png';
import NotificationTopRight from 'src/assets/images/frontend-pages/homepage/notification-top-right.png';
import NotificationLeft from 'src/assets/images/frontend-pages/homepage/notification-left.png';

const NotificationBg = styled(Box)(() => ({
    position: 'absolute',
    right: '20%',
    top: 0
}));

const NotificationBg2 = styled(Box)(() => ({
    position: 'absolute',
    right: 0,
    top: 0
}));

const NotificationBg3 = styled(Box)(() => ({
    position: 'absolute',
    left: 0,
    bottom: '-5px'
}));

const HeaderAlert = () => {
    // State to track if the alert should be visible
    const [isAlertVisible, setIsAlertVisible] = useState(true);
    const [remainingTime, setRemainingTime] = useState(10);

    // Function to handle manual closing of the alert
    const handleAlert = () => {
        setIsAlertVisible(false);
    };

    // Automatically close the alert after 10 seconds
    useEffect(() => {
        if (remainingTime > 0) {
            const interval = setInterval(() => {
                setRemainingTime((prev) => prev - 1);
            }, 1000);

            return () => clearInterval(interval); // Cleanup interval on component unmount or when remainingTime changes
        } else {
            setIsAlertVisible(false); // Hide alert after time reaches 0
        }
    }, [remainingTime]);

    // Sidebar media query
    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));

    return (
        <>
            {isAlertVisible ? (
                <Box bgcolor="primary.main" borderRadius={0} textAlign="center" py="11px" position="relative">
                    <Stack
                        direction={{ xs: 'column', sm: 'row' }}
                        spacing="16px"
                        justifyContent="center"
                        alignItems="center"
                    >
                        {lgUp ? (
                            <Chip
                                label="New"
                                size="small"
                                sx={{
                                    backgroundColor: 'rgba(255,255,255,0.15)',
                                    color: 'white',
                                    borderRadius: '8px'
                                }}
                            />
                        ) : null}

                        <Typography
                            variant="body1"
                            color="white"
                            fontWeight={500}
                            sx={{
                                opacity: '0.8'
                            }}
                            fontSize="13px"
                        >
                            Welcome to InstaXerox - Auto close in {remainingTime}s
                        </Typography>
                    </Stack>
                    <IconButton
                        onClick={handleAlert}
                        color="secondary"
                        sx={{
                            zIndex: 1,
                            position: 'absolute',
                            right: '6px',
                            top: '6px'
                        }}
                    >
                        <IconX size={18} color="white" />
                    </IconButton>
                    <>
                        {lgUp ? (
                            <>
                                <NotificationBg>
                                    <img src={NotificationTopRight} alt="img" width={325} height={30} loading="lazy" />
                                </NotificationBg>
                                <NotificationBg2>
                                    <img src={NotificationRight} alt="img" width={200} height={44} loading="lazy" />
                                </NotificationBg2>
                                <NotificationBg3>
                                    <img src={NotificationLeft} alt="img" width={325} height={44} loading="lazy" />
                                </NotificationBg3>
                            </>
                        ) : null}
                    </>
                </Box>
            ) : null}
        </>
    );
};

export default HeaderAlert;
