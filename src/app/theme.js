import { createMuiTheme, responsiveFontSizes } from '@material-ui/core/styles';

export const themeColors = {
  main: {
    primary: '#61892f',
    secondary: '#86c232',
    success: '#6b6970',
    error: '#474b4f'
  }
};

const { primary, secondary, success, error } = themeColors.main;

const theme = responsiveFontSizes(
  createMuiTheme({
    palette: {
      type: 'dark',
      primary: {
        main: primary
      },
      secondary: {
        main: secondary
      },
      success: {
        main: success
      },
      error: {
        main: error
      },
      contrastThreshold: 3,
      tonalOffset: 0.3
    }
  })
);

export default theme;
