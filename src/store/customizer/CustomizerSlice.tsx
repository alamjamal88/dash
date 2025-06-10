import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface StateType {
    activeDir?: string; // This can be ltr or rtl
    activeMode?: string; // This can be light or dark
    activeTheme?: string; // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
    SidebarWidth?: number;
    MiniSidebarWidth?: number;
    TopbarHeight?: number;
    isCollapse?: boolean;
    isLayout?: string;
    isSidebarHover?: boolean;
    isMobileSidebar?: boolean;
    isHorizontal?: boolean;
    isLanguage?: string;
    isCardShadow?: boolean;
    borderRadius?: number;
}

const initialState: StateType = {
    activeDir: 'ltr',
    activeMode: 'light', // This can be light or dark
    activeTheme: 'PURPLE_THEME', // BLUE_THEME, GREEN_THEME, BLACK_THEME, PURPLE_THEME, ORANGE_THEME
    SidebarWidth: 270,
    MiniSidebarWidth: 87,
    TopbarHeight: 70,
    isLayout: 'boxed', // This can be full or boxed
    isCollapse: false, // to make sidebar Mini by default
    isSidebarHover: false,
    isMobileSidebar: false,
    isHorizontal: false,
    isLanguage: 'en',
    isCardShadow: false,
    borderRadius: 5
};

export const CustomizerSlice = createSlice({
    name: 'customizer',
    initialState,
    reducers: {
        setTheme: (state: StateType, action: PayloadAction<string>) => {
            state.activeTheme = action.payload;
        },
        setDarkMode: (state: StateType, action: PayloadAction<string>) => {
            state.activeMode = action.payload;
        },

        setDir: (state: StateType, action: PayloadAction<string>) => {
            state.activeDir = action.payload;
        },
        setLanguage: (state: StateType, action: PayloadAction<string>) => {
            state.isLanguage = action.payload;
        },
        setCardShadow: (state: StateType, action: PayloadAction<boolean>) => {
            state.isCardShadow = action.payload;
        },
        toggleSidebar: (state) => {
            state.isCollapse = !state.isCollapse;
        },
        hoverSidebar: (state: StateType, action: PayloadAction<boolean>) => {
            state.isSidebarHover = action.payload;
        },
        toggleMobileSidebar: (state) => {
            state.isMobileSidebar = !state.isMobileSidebar;
        },
        toggleLayout: (state: StateType, action: PayloadAction<string>) => {
            state.isLayout = action.payload;
        },
        toggleHorizontal: (state: StateType, action: PayloadAction<boolean>) => {
            state.isHorizontal = action.payload;
        },
        setBorderRadius: (state: StateType, action: PayloadAction<number>) => {
            state.borderRadius = action.payload;
        }
    }
});

export const {
    setTheme,
    setDarkMode,
    setDir,
    toggleSidebar,
    hoverSidebar,
    toggleMobileSidebar,
    toggleLayout,
    setBorderRadius,
    toggleHorizontal,
    setLanguage,
    setCardShadow
} = CustomizerSlice.actions;

export default CustomizerSlice.reducer;
