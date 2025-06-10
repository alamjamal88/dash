import React from 'react';
import {
    Box,
    Typography,
    Button,
    Card,
    CardContent,
    Grid,
    Accordion,
    AccordionSummary,
    AccordionDetails,
    useTheme
} from '@mui/material';
import MemoryIcon from '@mui/icons-material/Memory';
import PlayCircleFilledWhiteIcon from '@mui/icons-material/PlayCircleFilledWhite';
import SpaIcon from '@mui/icons-material/Spa';
import EmojiObjectsIcon from '@mui/icons-material/EmojiObjects';
import SecurityIcon from '@mui/icons-material/Security';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import Slider from 'react-slick';
import { LineChart } from '@mui/x-charts/LineChart';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import './Carousel.css';
import ContactForm from 'src/components/frontend-pages/contact/form/index.tsx';
import PageContainer from 'src/components/container/PageContainer';

// Smooth scroll helper
const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
};

// Navbar

// Hero section
export function HomeSection() {
    return (
        <PageContainer
            title="Mentally Brain Health & Recovery Platform"
            description="Mentally is a digital platform supporting recovery from memory loss, stress, stroke, dementia, and more with evidence-based games and lifestyle tools."
            meta={[
                { property: 'og:title', content: 'Mentally  Brain Health & Recovery' },
                {
                    property: 'og:description',
                    content: 'Recover better with evidence-based digital games and guidance from Mentally.'
                },
                { property: 'og:type', content: 'website' },
                {
                    name: 'keywords',
                    content:
                        'mental health India, therapy app, online counseling, mental wellness, self-care, Indian mental health, stress relief, depression help, anxiety support, Mentally app'
                },
                { name: 'author', content: 'Mentally' }
                // ...add more as needed
            ]}
        >
            <motion.div initial={{ opacity: 0, y: 60 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
                <Box id="home" sx={{ textAlign: 'center', mt: 8, mb: 10 }}>
                    <img
                        src="https://cdn.pixabay.com/photo/2017/01/31/13/14/brain-2029363_1280.png"
                        alt="Mentally Logo"
                        style={{ maxWidth: 120, marginBottom: 18 }}
                    />
                    <Typography variant="h2" gutterBottom sx={{ fontWeight: 'bold' }}>
                        Mentally
                    </Typography>
                    <Typography variant="h5" color="text.secondary" gutterBottom>
                        Digital Partner for Brain Health & Recovery
                    </Typography>
                    <Typography sx={{ mt: 2, mb: 4, color: 'text.secondary' }}>
                        Cognitive recovery and wellness through evidence-based games, lifestyle tools, and progress
                        tracking for memory loss, stress, stroke, dementia, and more.
                    </Typography>
                    <Button variant="contained" color="primary" size="large" onClick={() => scrollToSection('how')}>
                        Learn How It Works
                    </Button>
                </Box>
            </motion.div>
        </PageContainer>
    );
}

// How It Works
export function HowItWorks() {
    return (
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Box id="how" sx={{ mt: 10, mb: 8 }}>
                <Typography variant="h4" gutterBottom>
                    How Mentally Works
                </Typography>
                <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                        <ListItem icon={<MemoryIcon color="primary" />}>
                            Mentally uses sensory and motor challenges to activate brain areas important for cognitive
                            function.
                        </ListItem>
                        <ListItem icon={<PlayCircleFilledWhiteIcon color="secondary" />}>
                            Users multitask: navigate courses, collect targets, avoid distractions.
                        </ListItem>
                        <ListItem icon={<EmojiObjectsIcon color="warning" />}>
                            An adaptive algorithm customizes activity in real time.
                        </ListItem>
                        <ListItem icon={<SpaIcon color="success" />}>
                            Routine: 25 min/day, 5 days/week, at least 4 weeks (or as prescribed).
                        </ListItem>
                        <ListItem icon={<SecurityIcon color="action" />}>
                            Caregivers can track progress via Mentor Insights dashboard.
                        </ListItem>
                    </Grid>
                    <Grid item xs={12} sm={6} sx={{ display: 'flex', alignItems: 'center' }}>
                        {/* Sample line chart for demo */}
                        <Box width="100%">
                            <Typography variant="h6" sx={{ mb: 1 }}>
                                Example Progress
                            </Typography>
                            <LineChart
                                height={180}
                                series={[{ data: [2, 5, 7, 9, 11, 13], label: 'Cognitive Score' }]}
                                xAxis={[{ data: ['Week 1', '2', '3', '4', '5', '6'], scaleType: 'band' }]}
                            />
                        </Box>
                    </Grid>
                </Grid>
            </Box>
        </motion.div>
    );
}

// Reusable list item
type ListItemProps = {
    icon: React.ReactNode;
    children: React.ReactNode;
};

export function ListItem({ icon, children }: ListItemProps) {
    return (
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Box sx={{ mr: 2 }}>{icon}</Box>
            <Typography>{children}</Typography>
        </Box>
    );
}

// Feature Carousel
export function FeaturesCarousel() {
    const theme = useTheme();
    const features = [
        {
            icon: <MemoryIcon sx={{ fontSize: 38, color: theme.palette.primary.main }} />,
            title: 'Cognitive Games',
            desc: 'Games to boost memory, focus, and mental flexibility.'
        },
        {
            icon: <SpaIcon sx={{ fontSize: 38, color: theme.palette.success.main }} />,
            title: 'Lifestyle Coaching',
            desc: 'Daily habits, mindfulness practices, wellness tips.'
        },
        {
            icon: <EmojiObjectsIcon sx={{ fontSize: 38, color: theme.palette.warning.main }} />,
            title: 'Caregiver Support',
            desc: 'Mentor Insights dashboard for families and therapists.'
        },
        {
            icon: <SecurityIcon sx={{ fontSize: 38, color: theme.palette.action.active }} />,
            title: 'Privacy First',
            desc: 'Your data is safe and never shared without your consent.'
        }
    ];
    const settings = {
        dots: true,
        infinite: true,
        speed: 600,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        responsive: [{ breakpoint: 900, settings: { slidesToShow: 1 } }]
    };
    return (
        <Box sx={{ mt: 1.5 }}>
            <Slider {...settings}>
                {features.map((f, i) => (
                    <Box key={i} sx={{ px: 2 }}>
                        <Card elevation={4} sx={{ minHeight: 210, textAlign: 'center', p: 2 }}>
                            <CardContent>
                                {f.icon}
                                <Typography variant="h6" sx={{ mt: 1, mb: 1 }}>
                                    {f.title}
                                </Typography>
                                <Typography color="text.secondary">{f.desc}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                ))}
            </Slider>
        </Box>
    );
}

// Features
export function Features() {
    return (
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Box id="features" sx={{ mt: 10, mb: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Features
                </Typography>
                <FeaturesCarousel />
            </Box>
        </motion.div>
    );
}

// FAQ section
export const faqs = [
    {
        q: 'Who is Mentally for?',
        a: 'Anyone recovering from cognitive challenges like memory loss, forgetfulness, stroke, dementia, stress, and more.'
    },
    {
        q: 'Is Mentally a replacement for medication?',
        a: 'No, Mentally complements prescribed treatments. Always follow your doctor’s advice.'
    },
    {
        q: 'How long should I use Mentally each day?',
        a: 'For best results, play for 25 minutes a day, 5 days a week, for at least 4 weeks, or as prescribed.'
    },
    {
        q: 'Can family members see my progress?',
        a: 'Yes, with your permission, caregivers or loved ones can monitor progress via Mentor Insights.'
    },
    {
        q: 'Is my data safe?',
        a: 'Absolutely! Your personal information is private and never shared without your consent.'
    }
];

export function FAQ() {
    return (
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Box id="faq" sx={{ mt: 10, mb: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Frequently Asked Questions
                </Typography>
                {faqs.map((f, i) => (
                    <Accordion key={f.q} defaultExpanded={i === 0}>
                        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
                                {f.q}
                            </Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Typography>{f.a}</Typography>
                        </AccordionDetails>
                    </Accordion>
                ))}
            </Box>
        </motion.div>
    );
}

// Contact form using Formik + Yup + formik-mui
export function Contact() {
    const [sent, setSent] = React.useState(false);
    return (
        <motion.div initial={{ opacity: 0, y: 60 }} whileInView={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
            <Box id="contact" sx={{ mt: 10, mb: 8 }}>
                <Typography variant="h4" gutterBottom>
                    Contact Us
                </Typography>
                <Typography sx={{ mb: 2 }}>
                    Have a question, suggestion, or want early access? Fill the form below.
                </Typography>
                <ContactForm />
            </Box>
        </motion.div>
    );
}

// Footer
export function Footer() {
    return (
        <Box
            sx={{
                py: 4,
                background: '#f9f9f9',
                textAlign: 'center',
                mt: 8,
                borderTop: '1px solid #eee'
            }}
        >
            <Typography variant="body2" color="text.secondary">
                © {new Date().getFullYear()} Mentally. All rights reserved. &nbsp;|&nbsp;
                <Button size="small" color="inherit">
                    Privacy Policy
                </Button>
            </Typography>
        </Box>
    );
}

// Main app
