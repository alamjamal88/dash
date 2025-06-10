import { Container } from '@mui/material';
import { HomeSection, Contact, FAQ, Features, Footer, HowItWorks } from './MainPage';
import { Navbar } from './Header';
export default function MainPage() {
    return (
        <>
            <Navbar />
            <Container maxWidth="md">
                <HomeSection />
                <HowItWorks />
                <Features />
                <FAQ />
                <Contact />
            </Container>
            <Footer />
        </>
    );
}
