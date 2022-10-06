import { createTheme } from '@mui/material/styles'

export const mainTheme = createTheme({
    breakpoints: {
        keys: ['xs', 'sm', 'md', 'lg', 'xl'],
        values: {
            xs: 0,
            sm: 480,
            md: 768,
            lg: 992,
            xl: 1200,
        },
    },
    palette: {
        primary: {
            main: '#208800',
            light: '#196600',
            dark: '#123800',
        },
        secondary: {
            main: '#3385FF',
        },
        error: {
            main: '#DE0B00',
        },
        warning: {
            main: '#E4F24C',
            dark: '#FFB649',
        },
        background: {
            default: '#0C3348',
            paper: '#fff',
        },
    },
    typography: {
        fontFamily: 'Roboto, sans-serif',
        fontSize: 10,
        h5: {
            fontWeight: 500,
            fontSize: '1.4em',
            lineHeight: '16px',
        },
        h6: {
            fontWeight: 500,
            fontSize: '1.2em',
            lineHeight: '16px',
        },
        subtitle1: {
            lineHeight: '16px',
            fontSize: '1em',
        },
        body1: {
            lineHeight: '16px',
            fontSize: '1em',
            fontWeight: 400,
        },
    },
    shape: {
        borderRadius: 8,
    },
})
