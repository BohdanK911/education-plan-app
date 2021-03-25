import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: '#61892f'
      },
      secondary: {
        main: '#86c232'
      },
      success: {
        main: '#6b6970'
      },
      error: {
        main: '#f34333'
      },
      contrastThreshold: 3,
      tonalOffset: 0.3
    }
  })
);

export default theme;
