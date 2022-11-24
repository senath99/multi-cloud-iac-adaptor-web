import { Link as RouterLink } from 'react-router-dom';
import { experimentalStyled as styled } from '@material-ui/core/styles';
// material
import {
  Box,
  Button,
  Typography,
  Container,
  Link,
  useTheme
} from '@material-ui/core';
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

export default function ErrorPage({ errorDesc }) {
  const theme = useTheme();
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
            src="/static/illustrations/illustration_500.svg"
            sx={{ width: '100%', maxHeight: 240, my: { xs: 5, sm: 10 } }}
          />
          <Typography variant="h6" textAlign="left" sx={{ mt: 5 }}>
            Registration Unsuccessful!
          </Typography>

          <Typography
            textAlign="left"
            sx={{ mt: 2, color: theme.palette.error.main }}
          >
            {errorDesc}
          </Typography>
          <Typography textAlign="left" sx={{ mt: 2 }}>
            Please contact <Link>info@experienz.co.uk</Link>
          </Typography>
        </Box>
      </Container>
    </RootStyle>
  );
}
