import { Link as RouterLink } from 'react-router-dom';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// material
import { Box, Button, Typography, Container, Link } from '@material-ui/core';
// components
import Page from '../components/Page';
import Logo from '../components/Logo';
import { PATH_AUTH } from '../routes/paths';
// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  display: 'flex',
  minHeight: '100%',
  alignItems: 'center'
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: { padding: theme.spacing(5, 5, 0) }
}));

// ----------------------------------------------------------------------

export default function SuccessPage() {
  return (
    <RootStyle title="experienz">
      <HeaderStyle>
        <RouterLink to="/">
          <Logo />
        </RouterLink>
      </HeaderStyle>

      <Container>
        <Box sx={{ maxWidth: 500, margin: 'auto', textAlign: 'center' }}>
          {/* <Box
            component="img"
            alt="500"
            src="/static/brand/logo___.svg"
            sx={{ width: '100%', maxHeight: 100 }}
          /> */}
          <Box
            component="img"
            alt="500"
            src="/static/brand/banner.png"
            sx={{ width: '100%', minHeight: 300 }}
          />
          <Typography variant="h6" textAlign="left" sx={{ mt: 5 }}>
            Registration Successful!
          </Typography>
          <Typography textAlign="left" sx={{ mt: 2 }}>
            You have successfully completed the registration. We are setting up
            your account. You will receive a confirmation email shortly.
          </Typography>
          <Typography textAlign="left" sx={{ mt: 2 }}>
            Please contact <Link>info@experienz.co.uk</Link> if you didn't
            receive the email.
          </Typography>
        </Box>
      </Container>
    </RootStyle>
  );
}
