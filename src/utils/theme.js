import { createMuiTheme } from '@material-ui/core/styles';

const theme = createMuiTheme(

    { "palette": { "common": { "black": "#000", "white": "#fff" }, "background": { "paper": "#fff", "default": "#fafafa" }, "primary": { "light": "rgba(248, 222, 158, 1)", "main": "rgba(244, 180, 26, 1)", "dark": "rgba(173, 124, 4, 1)", "contrastText": "#fff" }, "secondary": { "light": "rgba(42, 115, 164, 1)", "main": "rgba(20, 61, 89, 1)", "dark": "rgba(14, 42, 60, 1)", "contrastText": "#fff" }, "error": { "light": "#e57373", "main": "#f44336", "dark": "#d32f2f", "contrastText": "#fff" }, "text": { "primary": "rgba(0, 0, 0, 0.87)", "secondary": "rgba(0, 0, 0, 0.54)", "disabled": "rgba(0, 0, 0, 0.38)", "hint": "rgba(0, 0, 0, 0.38)" } } }


)

export default theme;