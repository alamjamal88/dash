import mock from '../mock';
import { sub } from 'date-fns';
import { Chance } from 'chance';
import s1 from 'src/assets/images/products/s1.jpg';
import s2 from 'src/assets/images/products/s2.jpg';
import s3 from 'src/assets/images/products/s3.jpg';
import s4 from 'src/assets/images/products/s4.jpg';
import s5 from 'src/assets/images/products/s5.jpg';
import s6 from 'src/assets/images/products/s6.jpg';
import s7 from 'src/assets/images/products/s7.jpg';
import s8 from 'src/assets/images/products/s8.jpg';
import s9 from 'src/assets/images/products/s9.jpg';
import s10 from 'src/assets/images/products/s10.jpg';
import s11 from 'src/assets/images/products/s11.jpg';
import s12 from 'src/assets/images/products/s12.jpg';

const chance = new Chance();

const ProductsData = [
    {
        title: 'How Innovation Works',
        price: 275,
        discount: 25,
        related: false,
        salesPrice: 350,
        category: ['books'],
        gender: 'Men',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#1890FF'],
        photo: s1,
        id: 1,
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
        description: chance.paragraph({ sentences: 2 })
    },
    {
        title: 'Psalms Book for Growth',
        price: 89,
        discount: 10,
        related: true,
        salesPrice: 99,
        category: ['books'],
        gender: 'Women',
        rating: 3,
        stock: false,
        qty: 1,
        colors: ['#1890FF', '#94D82D', '#FF4842'],
        photo: s2,
        id: 2,
        created: sub(new Date(), { days: 10, hours: 8, minutes: 69 }),
        description: chance.paragraph({ sentences: 2 })
    },
    {
        title: 'The Psychology of Money',
        price: 125,
        discount: 12,
        related: false,
        salesPrice: 137,
        category: ['fashion', 'books'],
        gender: 'Kids',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#FF4842', '#1890FF', '#94D82D'],
        photo: s3,
        id: 3,
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
        description: chance.paragraph({ sentences: 2 })
    },
    {
        title: 'Boat Headphone',
        price: 50,
        discount: 15,
        related: true,
        salesPrice: 65,
        category: ['electronics'],
        gender: 'Men',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#1890FF', '#94D82D', '#FFC107'],
        photo: s4,
        id: 4,
        created: sub(new Date(), { days: 4, hours: 9, minutes: 40 }),
        description: chance.paragraph({ sentences: 2 })
    },
    {
        title: 'MacBook Air Pro',
        price: 650,
        discount: 250,
        related: true,
        salesPrice: 900,
        category: ['fashion', 'electronics'],
        gender: 'Women',
        rating: 3,
        stock: false,
        qty: 1,
        colors: ['#00AB55', '#000000'],
        photo: s5,
        id: 5,
        created: sub(new Date(), { days: 2, hours: 5, minutes: 50 }),
        description: chance.paragraph({ sentences: 2 })
    },
    {
        title: 'Gaming Console',
        price: 25,
        discount: 6,
        related: true,
        salesPrice: 31,
        category: ['electronics'],
        gender: 'Men',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#FFC0CB', '#FF4842'],
        photo: s6,
        id: 6,
        created: sub(new Date(), { days: 2, hours: 9, minutes: 45 }),
        description: chance.paragraph({ sentences: 2 })
    },
    {
        title: 'Red Valvet Dress',
        price: 150,
        discount: 50,
        related: false,
        salesPrice: 200,
        category: ['fashion'],
        gender: 'Women',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#FF4842', '#1890FF', '#94D82D'],
        photo: s7,
        id: 7,
        created: sub(new Date(), { days: 6, hours: 10, minutes: 0 }),
        description: chance.paragraph({ sentences: 2 })
    },
    {
        title: 'Shoes for Girls',
        price: 300,
        discount: 80,
        related: false,
        salesPrice: 380,
        category: ['fashion', 'toys'],
        gender: 'Women',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#1890FF', '#94D82D', '#FFC107'],
        photo: s8,
        id: 8,
        created: sub(new Date(), { days: 7, hours: 5, minutes: 20 }),
        description: chance.paragraph({ sentences: 2 })
    },
    {
        title: 'Short & Sweet Purse',
        price: 175,
        discount: 25,
        related: false,
        salesPrice: 200,
        category: ['fashion'],
        gender: 'Women',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#00AB55', '#000000'],
        photo: s9,
        id: 9,
        created: sub(new Date(), { days: 8, hours: 6, minutes: 20 }),
        description: chance.paragraph({ sentences: 2 })
    },
    {
        title: 'Toy Dino for Fun',
        price: 210,
        discount: 40,
        related: false,
        salesPrice: 250,
        category: ['toys'],
        gender: 'Kids',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#FFC0CB', '#FF4842'],
        photo: s10,
        id: 10,
        created: sub(new Date(), { days: 6, hours: 6, minutes: 20 }),
        description: chance.paragraph({ sentences: 2 })
    },
    {
        title: 'Cute Soft Teddybear',
        price: 285,
        discount: 60,
        related: false,
        salesPrice: 345,
        category: ['toys'],
        gender: 'Kids',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#FF4842', '#1890FF', '#94D82D'],
        photo: s11,
        id: 11,
        created: sub(new Date(), { days: 1, hours: 6, minutes: 20 }),
        description: chance.paragraph({ sentences: 2 })
    },
    {
        title: 'Little Angel Toy',
        price: 5,
        discount: 5,
        related: false,
        salesPrice: 10,
        category: ['toys'],
        gender: 'Kids',
        rating: 3,
        stock: true,
        qty: 1,
        colors: ['#1890FF', '#94D82D', '#FFC107'],
        photo: s12,
        id: 12,
        created: sub(new Date(), { days: 9, hours: 6, minutes: 20 }),
        description: chance.paragraph({ sentences: 2 })
    }
];

mock.onGet('/api/data/eCommerce/ProductsData').reply(() => {
    return [200, ProductsData];
});

export default ProductsData;
