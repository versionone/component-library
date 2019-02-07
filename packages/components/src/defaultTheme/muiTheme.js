import { createMuiTheme } from '@material-ui/core/styles';
import { palette } from '../palette';

export const theme = createMuiTheme({
  palette: {
    primary: {
      // light: will be calculated from palette.primary.main,
      main: palette.mango,
      // dark: will be calculated from palette.primary.main,
      // contrastText: will be calculated to contrast with palette.primary.main
    },
    secondary: {
      main: palette.cerulean,
    },
    error: {
      main: palette.sunset,
    },
  },
  typography: {
    useNextVariants: true,
    fontFamily: [
      '"Proxima Nova"',
      '"Lucida Sans Unicode"',
      '"Lucida Grande"',
      'sans-serif',
    ].join(','),
  },
});
