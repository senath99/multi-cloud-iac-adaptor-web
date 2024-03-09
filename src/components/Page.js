import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import { EMPTY_STRING } from '../utils/constants';
import { forwardRef, useEffect, useCallback } from 'react';
// material
import { Box } from '@material-ui/core';
// utils
import track from '../utils/analytics';

import md5 from 'md5-hash';

// ----------------------------------------------------------------------

const Page = forwardRef(({ children, title = '', ...other }, ref) => {
  const { pathname } = useLocation();

  return (
    <Box ref={ref} {...other}>
      <Helmet>
        <title>{title}</title>
      </Helmet>
      {children}
    </Box>
  );
});

Page.propTypes = {
  children: PropTypes.node.isRequired,
  title: PropTypes.string
};

export default Page;
