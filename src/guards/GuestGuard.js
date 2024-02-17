import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

GuestProtect.propTypes = {
  children: PropTypes.node
};

export default function GuestProtect({ children }) {
  const { isLoading, isAuthenticated } = useAuth();
  const next = new URLSearchParams(window.location.search).get('next');

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (isAuthenticated) {
    return <Redirect to={next ? next : PATH_DASHBOARD.root} />;
  }

  return <>{children}</>;
}
