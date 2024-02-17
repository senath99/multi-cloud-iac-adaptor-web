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
  const { user, isAuthenticated } = useAuth();

  const sendPageViewEvent = useCallback(() => {
    track.pageview({
      // user_id: md5(user.email),
      page_path: pathname,
      page_title: title,
      user_authenticated: isAuthenticated,
      user_client_name: (user || {}).clientName || EMPTY_STRING,
      user_email: (user || {}).email || EMPTY_STRING
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    sendPageViewEvent();
  }, [sendPageViewEvent]);

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
