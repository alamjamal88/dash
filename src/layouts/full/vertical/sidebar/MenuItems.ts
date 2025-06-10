import { uniqueId } from 'lodash-es';

interface MenuitemsType {
    [x: string]: any;
    id?: string;
    navlabel?: boolean;
    subheader?: string;
    title?: string;
    icon?: any;
    href?: string;
    children?: MenuitemsType[];
    chip?: string;
    chipColor?: string;
    variant?: string;
    external?: boolean;
}
import {
    IconAward,
    IconBoxMultiple,
    IconPoint,
    IconAlertCircle,
    IconNotes,
    IconCalendar,
    IconMail,
    IconTicket,
    IconEdit,
    IconCurrencyDollar,
    IconApps,
    IconFileDescription,
    IconFileDots,
    IconFiles,
    IconBan,
    IconStar,
    IconMoodSmile,
    IconBorderAll,
    IconBorderHorizontal,
    IconBorderInner,
    IconBorderVertical,
    IconBorderTop,
    IconUserCircle,
    IconPackage,
    IconMessage2,
    IconBasket,
    IconChartLine,
    IconChartArcs,
    IconChartCandle,
    IconChartArea,
    IconChartDots,
    IconChartDonut3,
    IconChartRadar,
    IconLogin,
    IconUserPlus,
    IconRotate,
    IconBox,
    IconShoppingCart,
    IconAperture,
    IconLayout,
    IconSettings,
    IconHelp,
    IconZoomCode,
    IconBoxAlignBottom,
    IconBoxAlignLeft,
    IconBorderStyle2,
    IconAppWindow,
    IconNotebook,
    IconFileCheck,
    IconChartHistogram,
    IconChartPie2,
    IconChartScatter,
    IconChartPpf,
    IconChartArcs3,
    IconListTree,
    IconHome
} from '@tabler/icons-react';

const Menuitems = [
    {
        id: uniqueId(),
        title: 'Dashboard',
        icon: IconHome,
        href: '/dashboards/',
        children: [
            {
                id: uniqueId(),
                title: 'Modern',
                icon: IconPoint,
                href: '/dashboards/modern',
                chip: 'New',
                chipColor: 'secondary'
            },
            {
                id: uniqueId(),
                title: 'eCommerce',
                icon: IconPoint,
                href: '/dashboards/ecommerce'
            }
        ]
    },

    {
        id: uniqueId(),
        title: 'Apps',
        icon: IconApps,
        href: '/apps/',
        children: [
            {
                id: uniqueId(),
                title: 'Invoice',
                icon: IconPoint,
                href: '/apps/invoice/',
                children: [
                    {
                        id: uniqueId(),
                        title: 'List',
                        icon: IconPoint,
                        href: '/apps/invoice/list'
                    },
                    {
                        id: uniqueId(),
                        title: 'Create',
                        icon: IconPoint,
                        href: '/apps/invoice/create'
                    },
                    {
                        id: uniqueId(),
                        title: 'Detail',
                        icon: IconPoint,
                        href: '/apps/invoice/detail/PineappleInc.'
                    },
                    {
                        id: uniqueId(),
                        title: 'Edit',
                        icon: IconPoint,
                        href: '/apps/invoice/edit/PineappleInc.'
                    }
                ]
            }
        ]
    }
];

export default Menuitems;
