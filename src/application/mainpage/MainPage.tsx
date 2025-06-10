import React, { useState } from 'react';
import {
    Box,
    Typography,
    TextField,
    MenuItem,
    Button,
    Card,
    CardContent,
    Grid,
    FormControlLabel,
    Checkbox,
    Divider,
    IconButton
} from '@mui/material';
import PageContainer from 'src/components/container/PageContainer';
import HpHeader from './HpHeader';
import HeaderAlert from './HeaderAlert';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';
import { useDispatch } from 'src/store/Store';
import { addItem } from 'src/store/cart/cartSlice';

const bindingOptions = [
    { title: 'Loose Sheets', image: 'path/to/loose_sheets_image.svg' },
    { title: 'Corner Stapling', image: 'path/to/corner_stapling_image.svg' },
    { title: 'Spiral Binding', image: 'path/to/spiral_binding_image.svg' },
    { title: 'Wiro Binding', image: 'path/to/wiro_binding_image.svg' },
    { title: 'Hard Binding', image: 'path/to/hard_binding_image.svg' },
    { title: 'Soft Binding', image: 'path/to/soft_binding_image.svg' }
];

const MainPage = () => {
    const [file, setFile] = useState<File | null>(null);
    const [colorType, setColorType] = useState('Grayscale');
    const [printSize, setPrintSize] = useState('A4');
    const [printMedia, setPrintMedia] = useState('Copier - 75gsm');
    const [printSides, setPrintSides] = useState('Double Side');
    const [binding, setBinding] = useState('');
    const [copies, setCopies] = useState(1);
    const [deleteAfterDelivery, setDeleteAfterDelivery] = useState(false);
    const dispatch = useDispatch();

    const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            setFile(event.target.files[0]);
        }
    };

    const handleBindingSelection = (selectedBinding: string) => {
        setBinding(selectedBinding);
    };

    const handleAddToCart = async () => {
        // Construct the payload
        const payload = {
            fileName: file ? file.name : null,
            colorType,
            printSize,
            printMedia,
            printSides,
            binding: binding || 'None',
            copies,
            deleteAfterDelivery
        };
    };

    const handleSave = async () => {
        // Construct the payload
        const payload = {
            fileName: file ? file.name : null,
            colorType,
            printSize,
            printMedia,
            printSides,
            binding: binding || 'None',
            copies,
            deleteAfterDelivery,
            price: 100
        };
        dispatch(
            addItem({
                ...payload
            })
        );
    };

    const handleIncreaseCopies = () => {
        setCopies(copies + 1);
    };

    const handleDecreaseCopies = () => {
        if (copies > 1) {
            setCopies(copies - 1);
        }
    };

    return (
        <PageContainer title="eCommerce Dashboard" description="this is eCommerce Dashboard page">
            <HeaderAlert />
            <HpHeader />
            <Box sx={{ p: 3, px: { md: 10 } }}>
                <Grid container spacing={3}>
                    {/* Left Side (8 Parts) */}
                    <Grid item xs={12} md={8}>
                        {/* Upload Files */}
                        <Box
                            sx={{
                                border: '1px dashed grey',
                                padding: 3,
                                textAlign: 'center',
                                borderRadius: 1,
                                mb: 1
                            }}
                        >
                            <Typography variant="h6" gutterBottom>
                                Start Here By Adding Your Files
                            </Typography>
                            <Button variant="contained" component="label" sx={{ mt: 2 }}>
                                Upload File
                                <input type="file" hidden onChange={handleFileUpload} />
                            </Button>
                            {file && (
                                <Typography variant="body2" color="text.secondary" mt={2}>
                                    {file.name}
                                </Typography>
                            )}
                        </Box>

                        {/* Choose Print Options */}
                        <Box mb={1}>
                            <Typography variant="h5" gutterBottom py={1}>
                                Choose Print Options
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Color / Grayscale Prints"
                                        value={colorType}
                                        onChange={(e) => setColorType(e.target.value)}
                                    >
                                        <MenuItem value="Grayscale">Grayscale</MenuItem>
                                        <MenuItem value="Color">Color</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Choose Print Size"
                                        value={printSize}
                                        onChange={(e) => setPrintSize(e.target.value)}
                                    >
                                        <MenuItem value="A4">A4</MenuItem>
                                        <MenuItem value="A3">A3</MenuItem>
                                        <MenuItem value="Letter">Letter</MenuItem>
                                    </TextField>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                    <TextField
                                        select
                                        fullWidth
                                        label="Choose Print Media"
                                        value={printMedia}
                                        onChange={(e) => setPrintMedia(e.target.value)}
                                    >
                                        <MenuItem value="Copier - 75gsm">Copier - 75gsm</MenuItem>
                                        <MenuItem value="Premium - 100gsm">Premium - 100gsm</MenuItem>
                                        <MenuItem value="Cardstock - 300gsm">Cardstock - 300gsm</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Choose Print Sides */}
                        <Box mb={1}>
                            <Typography variant="h5" gutterBottom py={1}>
                                Choose Print Sides
                            </Typography>
                            <Grid container spacing={2}>
                                <Grid item>
                                    <Button
                                        variant={printSides === 'Single Side' ? 'contained' : 'outlined'}
                                        onClick={() => setPrintSides('Single Side')}
                                    >
                                        Single Side
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Button
                                        variant={printSides === 'Double Side' ? 'contained' : 'outlined'}
                                        onClick={() => setPrintSides('Double Side')}
                                    >
                                        Double Side
                                    </Button>
                                </Grid>
                            </Grid>
                        </Box>

                        {/* Choose Binding Options */}
                        <Box>
                            <Typography variant="h5" gutterBottom py={1}>
                                Choose Binding Options
                            </Typography>
                            <Grid container spacing={3}>
                                {bindingOptions.map((option, index) => (
                                    <Grid item xs={12} sm={6} md={4} key={index}>
                                        <Card
                                            sx={{
                                                cursor: 'pointer',
                                                border: binding === option.title ? '2px solid blue' : '1px solid grey',
                                                '&:hover': { boxShadow: 6 }
                                            }}
                                            onClick={() => handleBindingSelection(option.title)}
                                        >
                                            <CardContent>
                                                <Box textAlign="center">
                                                    <img src={option.image} alt={option.title} width="50" />
                                                    <Typography variant="h6" mt={2}>
                                                        {option.title}
                                                    </Typography>
                                                </Box>
                                            </CardContent>
                                        </Card>
                                    </Grid>
                                ))}
                            </Grid>
                        </Box>
                    </Grid>

                    {/* Right Side (4 Parts) */}
                    <Grid item xs={12} md={4}>
                        <Card
                            sx={{
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                justifyContent: 'space-between',
                                p: 3
                            }}
                        >
                            <Box>
                                <Typography variant="h6" gutterBottom>
                                    Item Summary
                                </Typography>
                                <Divider sx={{ mb: 2 }} />
                                <Typography>
                                    <span style={{ fontWeight: 'bold' }}>File: </span>{' '}
                                    {file ? file.name : 'No file uploaded'}
                                </Typography>
                                <Typography>
                                    <span style={{ fontWeight: 'bold' }}>Print Type:</span> {colorType}
                                </Typography>
                                <Typography>
                                    <span style={{ fontWeight: 'bold' }}>Print Size:</span> {printSize}
                                </Typography>
                                <Typography>
                                    <span style={{ fontWeight: 'bold' }}>Print Media: </span>
                                    {printMedia}
                                </Typography>
                                <Typography>
                                    <span style={{ fontWeight: 'bold' }}>Print Sides: </span>
                                    {printSides}
                                </Typography>
                                <Typography>
                                    <span style={{ fontWeight: 'bold' }}>Binding: </span>
                                    {binding || 'None'}
                                </Typography>
                                <Typography>
                                    <span style={{ fontWeight: 'bold' }}>Copies: </span> {copies}
                                </Typography>
                                <Typography mt={2} variant="h5" color="primary">
                                    Price: ₹100.00
                                </Typography>
                            </Box>

                            <Box>
                                <Box mt={3}>
                                    <Typography variant="subtitle1" gutterBottom>
                                        Copies
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'space-between',
                                            border: '1px solid #ddd',
                                            borderRadius: '8px',
                                            overflow: 'hidden',
                                            width: '120px',
                                            height: '40px'
                                        }}
                                    >
                                        <Button
                                            onClick={handleDecreaseCopies}
                                            sx={{
                                                minWidth: '40px',
                                                borderRight: '1px solid #ddd',
                                                height: '100%'
                                            }}
                                        >
                                            −
                                        </Button>
                                        <Typography
                                            sx={{
                                                flex: 1,
                                                textAlign: 'center',
                                                fontSize: '16px',
                                                fontWeight: 'bold'
                                            }}
                                        >
                                            {copies}
                                        </Typography>
                                        <Button
                                            onClick={handleIncreaseCopies}
                                            sx={{
                                                minWidth: '40px',
                                                borderLeft: '1px solid #ddd',
                                                height: '100%'
                                            }}
                                        >
                                            +
                                        </Button>
                                    </Box>
                                </Box>

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            checked={deleteAfterDelivery}
                                            onChange={(e) => setDeleteAfterDelivery(e.target.checked)}
                                        />
                                    }
                                    label="Delete File After Delivery"
                                />
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    onClick={handleSave}
                                    sx={{ mt: 2 }}
                                >
                                    Save
                                </Button>

                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    fullWidth
                                    onClick={handleAddToCart}
                                    sx={{ mt: 2 }}
                                >
                                    Add to Cart
                                </Button>
                            </Box>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        </PageContainer>
    );
};

export default MainPage;
