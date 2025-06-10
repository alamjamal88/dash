// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import React from 'react';
import Menuitems from './MenuItems';
import MenuItemTemp, { MenuitemsType } from './MenuItemsTemp';

import { useLocation } from 'react-router-dom';
import { Box, List, useMediaQuery } from '@mui/material';
import { useSelector, useDispatch } from 'src/store/Store';
import { toggleMobileSidebar } from 'src/store/customizer/CustomizerSlice';
import NavItem from './NavItem';
import NavCollapse from './NavCollapse';
import NavGroup from './NavGroup/NavGroup';
import { AppState } from 'src/store/Store';

const updateHrefWithTemp = (menuItems: MenuitemsType[]): MenuitemsType[] => {
    return menuItems.map((item) => {
        // Add '/temp' to the href property
        const updatedItem = { ...item, href: item.href ? `/temp${item.href}` : undefined };

        // Recursively update children if present
        if (item.children && item.children.length > 0) {
            updatedItem.children = updateHrefWithTemp(item.children);
        }

        return updatedItem;
    });
};

// Update the Menuitems array

const SidebarItems = () => {
    const { pathname } = useLocation();
    const pathDirect = pathname;
    const pathWithoutLastPart = pathname.slice(0, pathname.lastIndexOf('/'));
    const customizer = useSelector((state: AppState) => state.customizer);
    const { isAuthenticated } = useSelector((state: AppState) => state.authReducer);

    const lgUp = useMediaQuery((theme: any) => theme.breakpoints.up('lg'));
    const hideMenu: any = lgUp ? customizer.isCollapse && !customizer.isSidebarHover : '';
    const dispatch = useDispatch();
    const menuItem = isAuthenticated ? Menuitems : updateHrefWithTemp(MenuItemTemp);
    return (
        <Box sx={{ px: 3 }}>
            <List sx={{ pt: 2 }} className="sidebarNav">
                {menuItem.map((item: any) => {
                    // {/********SubHeader**********/}
                    if (item.subheader) {
                        return <NavGroup item={item} hideMenu={hideMenu} key={item.subheader} />;

                        // {/********If Sub Menu**********/}
                        /* eslint no-else-return: "off" */
                    } else if (item.children) {
                        return (
                            <NavCollapse
                                menu={item}
                                pathDirect={pathDirect}
                                hideMenu={hideMenu}
                                pathWithoutLastPart={pathWithoutLastPart}
                                level={1}
                                key={item.id}
                                onClick={() => dispatch(toggleMobileSidebar())}
                            />
                        );

                        // {/********If Sub No Menu**********/}
                    } else {
                        return (
                            <NavItem
                                item={item}
                                key={item.id}
                                pathDirect={pathDirect}
                                hideMenu={hideMenu}
                                onClick={() => dispatch(toggleMobileSidebar())}
                            />
                        );
                    }
                })}
            </List>
        </Box>
    );
};
export default SidebarItems;
