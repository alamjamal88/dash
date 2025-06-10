import Button from '@mui/material/Button';

import { styled } from '@mui/material/styles';
import { AppBar, Chip, Toolbar, Typography } from '@mui/material';

import { NavLink } from 'react-router-dom';

import { useLocation } from 'react-router-dom';
import { NavLinks } from './NavLinks';

export const NavBar = () => {
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

    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <>
            {NavLinks.map((navlink, i) => (
                <Toolbar key={i}>
                    <Button color="inherit" onClick={() => scrollToSection(navlink.to)}>
                        {navlink.title}
                    </Button>
                </Toolbar>
            ))}
        </>
    );
};
