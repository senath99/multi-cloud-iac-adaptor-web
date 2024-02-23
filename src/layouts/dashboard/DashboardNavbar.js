import PropTypes from 'prop-types';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, AppBar, Toolbar } from '@material-ui/core';

// material
import { Link as RouterLink } from 'react-router-dom';

// ----------------------------------------------------------------------

const RootStyle = styled(AppBar)(({ theme }) => ({
  // position: 'static',
  boxShadow: 'none',
  backdropFilter: 'blur(6px)',
  WebkitBackdropFilter: 'blur(6px)', // Fix on Mobile
  backgroundColor: alpha(theme.palette.background.default, 0.72)
}));

const ToolbarStyle = styled(Toolbar)(({ theme }) => ({
  padding: 2,
  minHeight: '60px',
  background: theme.palette.gradients.toolbar
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',

  padding: theme.spacing(0, 2, 2, 2)
}));
// ----------------------------------------------------------------------

DashboardNavbar.propTypes = {
  onOpenSidebar: PropTypes.func
};

export default function DashboardNavbar() {
  return (
    <RootStyle>
      <ToolbarStyle variant="dense">
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            '& > *:not(:first-of-type)': {
              ml: { xs: 1.5, sm: 2, lg: 3 }
            }
          }}
        >
          <RouterLink to="/" style={{ color: 'white', textDecoration: 'none' }}>
            <HeaderStyle sx={{ mt: 2 }}>Multi Cloud IAC Adapter</HeaderStyle>
          </RouterLink>
        </Box>
      </ToolbarStyle>
    </RootStyle>
  );
}
