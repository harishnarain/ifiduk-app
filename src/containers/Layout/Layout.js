import React from 'react';

import Navbar from '../../components/Navigation/Navbar/Navbar';

const Layout = ({ children }) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

export default Layout;
