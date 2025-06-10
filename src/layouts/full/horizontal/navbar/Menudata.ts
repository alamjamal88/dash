import {
    IconHome,
    IconPoint,
    IconApps,
    IconClipboard,
    IconFileDescription,
    IconBorderAll,
    IconZoomCode,
    IconRotate,
    IconUserPlus,
    IconLogin,
    IconAlertCircle,
    IconSettings,
    IconAppWindow,
    IconListTree,
    IconChartHistogram
} from '@tabler/icons-react';
import { uniqueId } from 'lodash-es';

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
