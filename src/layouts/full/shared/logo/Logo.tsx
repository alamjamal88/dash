import { FC } from 'react';
import { useSelector } from 'src/store/Store';
import { Link } from 'react-router-dom';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoDark } from 'src/assets/images/logos/dark-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoDarkRTL } from 'src/assets/images/logos/dark-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoLight } from 'src/assets/images/logos/light-logo.svg';
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import { ReactComponent as LogoLightRTL } from 'src/assets/images/logos/light-logo.svg';
import { styled } from '@mui/material';
import { AppState } from 'src/store/Store';

const Logo: FC = () => {
    const customizer = useSelector((state: AppState) => state.customizer);
    const LinkStyled = styled(Link)(() => ({
        height: customizer.TopbarHeight,
        width: customizer.isCollapse ? '50px' : '180px',
        overflow: 'hidden',
        display: customizer.isCollapse ? 'none' : 'flex',
        // paddingRight: '30px',
        // paddingTop:'20px',
        marginTop: customizer.isCollapse ? '10px' : '5px'
    }));

    if (customizer.activeDir === 'ltr') {
        return (
            <LinkStyled
                to="/"
                style={{
                    // display: 'flex',
                    alignItems: 'center'
                }}
            >
                {customizer.activeMode === 'dark' ? <LogoLight /> : <LogoDark />}
            </LinkStyled>
        );
    }

    return (
        <LinkStyled
            to="/"
            style={{
                // display: 'flex',
                alignItems: 'center'
            }}
        >
            {customizer.activeMode === 'dark' ? <LogoDarkRTL /> : <LogoLightRTL />}
        </LinkStyled>
    );
};

export default Logo;
