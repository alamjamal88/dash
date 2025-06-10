import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import { Chip } from '@mui/material';

import { NavLink } from 'react-router-dom';

import { useLocation } from 'react-router-dom';

export const NavLinks = [
    {
        title: 'About Us',
        to: '/about'
    },
    {
        title: 'Blog',
        to: '/blog'
    },
    {
        title: 'Portfolio',
        new: true,
        to: '/portfolio'
    },

    {
        title: 'Dashboard',
        to: 'temp/dashboards/modern'
    },
    {
        title: 'Pricing',
        to: '/pricing'
    },
    {
        title: 'Contact',
        to: '/contact'
    }
];

const Navigations = () => {
    const StyledButton = styled(Button)(({ theme }) => ({
        fontSize: '15px',
        a: {
            color: theme.palette.text.secondary
        },

        fontWeight: 500,
        '&.active': {
            backgroundColor: 'rgba(93, 135, 255, 0.15)',
            a: {
                color: theme.palette.primary.main
            }
        }
    }));

    const location = useLocation();
    const pathname = location.pathname;

    return (
        <>
            {NavLinks.map((navlink, i) => (
                <StyledButton
                    color="inherit"
                    className={pathname === navlink.to ? 'active' : 'not-active'}
                    variant="text"
                    key={i}
                >
                    <NavLink to={navlink.to}>
                        {navlink.title}{' '}
                        {navlink.new ? (
                            <Chip
                                label="New"
                                size="small"
                                sx={{
                                    ml: '6px',
                                    borderRadius: '8px',
                                    color: 'primary.main',
                                    backgroundColor: 'rgba(93, 135, 255, 0.15)'
                                }}
                            />
                        ) : null}
                    </NavLink>
                </StyledButton>
            ))}
        </>
    );
};

export default Navigations;
