import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Logo from 'src/layouts/full/shared/logo/Logo';
import { NavLinks } from './NavLinks';
import { Chip, Toolbar } from '@mui/material';

const MobileSidebar = () => {
    const scrollToSection = (id: string) => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
    };
    return (
        <>
            <Box px={3}>
                <Logo />
            </Box>
            <Box p={3}>
                <Stack direction="column" spacing={2}>
                    {NavLinks.map((navlink, i) => (
                        <Toolbar key={i}>
                            <Button color="inherit" onClick={() => scrollToSection(navlink.to)}>
                                {navlink.title}
                            </Button>
                        </Toolbar>
                    ))}
                </Stack>
            </Box>
        </>
    );
};

export default MobileSidebar;
