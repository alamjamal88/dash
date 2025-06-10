import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import useMediaQuery from '@mui/material/useMediaQuery';
import { styled } from '@mui/material/styles';
import { useSelector } from 'react-redux';
import Drawer from '@mui/material/Drawer';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import CloseIcon from '@mui/icons-material/Close';
import Icon from '@mui/material/Icon';
import { AppState } from 'src/store/Store';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { Link } from 'react-router-dom';

const HpHeader = () => {
    const AppBarStyled = styled(AppBar)(({ theme }) => ({
        justifyContent: 'center',
        [theme.breakpoints.up('lg')]: {
            minHeight: '60px'
        },
        backgroundColor: theme.palette.primary.light
    }));

    const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
        width: '100%',
        paddingLeft: '0 !important',
        paddingRight: '0 !important',
        color: theme.palette.text.secondary,
        justifyContent: 'space-between'
    }));

    // Redux Selector for Cart Data
    const { cartItems } = useSelector((state: AppState) => state.cartReducer);

    // Calculate Total Items and Total Price
    const totalItems = cartItems.reduce((acc, item) => acc + item.copies, 0);
    const totalPrice = cartItems.reduce((acc, item) => acc + item.copies * item.price, 0);

    // Drawer State
    const [isDrawerOpen, setDrawerOpen] = useState(false);

    const toggleDrawer = (open: boolean) => () => {
        setDrawerOpen(open);
    };

    return (
        <AppBarStyled position="sticky" elevation={0}>
            <Container
                sx={{
                    maxWidth: '1400px !important'
                }}
            >
                <ToolbarStyled>
                    {/* <Typography variant="h6">My Store</Typography> */}

                    <Logo />
                    <Stack spacing={2} direction="row" alignItems="center">
                        {/* Cart Icon with Badge */}
                        <IconButton onClick={toggleDrawer(true)} color="inherit">
                            <Badge badgeContent={totalItems} color="primary">
                                <ShoppingCartIcon />
                            </Badge>
                        </IconButton>

                        {/* Login Button */}
                        <Button color="primary" variant="contained" component={Link} to="/auth/login">
                            Log In
                        </Button>
                    </Stack>
                </ToolbarStyled>
            </Container>

            {/* Drawer for Cart Details */}
            <Drawer
                anchor="right"
                open={isDrawerOpen}
                onClose={toggleDrawer(false)}
                sx={{
                    '& .MuiDrawer-paper': { width: 400, padding: 2 }
                }}
            >
                <Box display="flex" justifyContent="space-between" alignItems="center">
                    <Typography variant="h6">Your Cart</Typography>
                    <IconButton onClick={toggleDrawer(false)}>
                        <CloseIcon />
                    </IconButton>
                </Box>
                <Divider sx={{ my: 2 }} />

                {cartItems.length === 0 ? (
                    <Typography variant="body2" color="text.secondary">
                        Your cart is empty.
                    </Typography>
                ) : (
                    <Box>
                        {cartItems.map((item, index) => (
                            <Box key={index} mb={2}>
                                <Typography variant="subtitle1">{item.fileName || 'Unnamed File'}</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {item.copies} x ₹{item.price.toFixed(2)}
                                </Typography>
                            </Box>
                        ))}
                        <Divider sx={{ my: 2 }} />
                        <Typography variant="subtitle1" fontWeight="bold">
                            Total Items: {totalItems}
                        </Typography>
                        <Typography variant="subtitle1" fontWeight="bold">
                            Total: ₹{totalPrice.toFixed(2)}
                        </Typography>
                    </Box>
                )}

                <Box mt={4}>
                    <Button
                        variant="contained"
                        color="primary"
                        size="large"
                        fullWidth
                        onClick={() => alert('Proceed to Checkout')}
                    >
                        Checkout
                    </Button>
                </Box>
            </Drawer>
        </AppBarStyled>
    );
};

export default HpHeader;
