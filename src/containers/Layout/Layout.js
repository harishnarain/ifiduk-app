import React from 'react';
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/styles';

import Navbar from '../../components/Navigation/Navbar/Navbar';

const theme = createMuiTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#00b4d8',
    },
    secondary: {
      main: '#90e0ef',
    },
  },
});

const Layout = ({ children }) => (
  <>
    <ThemeProvider theme={theme}>
      <Navbar />
      <main>{children}</main>
    </ThemeProvider>
  </>
);

export default Layout;
