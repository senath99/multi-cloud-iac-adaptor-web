import PropTypes from 'prop-types';
import { Redirect } from 'react-router-dom';
// hooks
import useAuth from '../hooks/useAuth';
// routes
import { PATH_PAGE } from '../routes/paths';
// components
import LoadingScreen from '../components/LoadingScreen';

// ----------------------------------------------------------------------

AuthProtect.propTypes = {
  children: PropTypes.node
};

export default function AuthProtect({ children }) {
  const { isLoading } = useAuth();

  if (isLoading) {
    return <LoadingScreen />;
  } else {
    return <Redirect to={PATH_PAGE.page401} />;
  }

  return <>{children}</>;
}
