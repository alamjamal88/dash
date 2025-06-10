import React from 'react';
import AppBar from '@mui/material/AppBar';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled, Theme } from '@mui/material/styles';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { NavBar as Navigations } from './WebNavBar';
import MobileSidebar from './MobileSidebar';
import { IconMenu2 } from '@tabler/icons-react';
import { motion } from 'framer-motion';
import { Box } from '@mui/material';

export function Navbar() {
    const lgUp = useMediaQuery((theme: Theme) => theme.breakpoints.up('sm'));
    const lgDown = useMediaQuery((theme: Theme) => theme.breakpoints.down('sm'));

    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const toggleDrawer = (newOpen: boolean) => () => {
        setOpen(newOpen);
    };
    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7 }}
            >
                <AppBar position="sticky" color="default" elevation={0}>
                    <Container
                        sx={{
                            maxWidth: '1400px !important'
                        }}
                    >
                        <Toolbar>
                            <Logo />
                            <Box sx={{ flexGrow: 1 }} />
                            {lgUp ? (
                                <>
                                    <Stack spacing={1} direction="row" alignItems="center">
                                        <Navigations />
                                    </Stack>
                                    <Button color="primary" variant="contained" href="/auth/login" size="medium">
                                        Log In
                                    </Button>
                                </>
                            ) : null}
                            {lgDown ? (
                                <IconButton color="inherit" aria-label="menu" onClick={handleDrawerOpen}>
                                    <IconMenu2 size="20" />
                                </IconButton>
                            ) : null}
                        </Toolbar>
                    </Container>
                </AppBar>
                <Drawer
                    anchor="left"
                    open={open}
                    variant="temporary"
                    onClose={toggleDrawer(false)}
                    PaperProps={{
                        sx: {
                            width: 270,
                            border: '0 !important',
                            boxShadow: (theme) => theme.shadows[8]
                        }
                    }}
                >
                    <MobileSidebar />
                </Drawer>
            </motion.div>
        </>
    );
}
