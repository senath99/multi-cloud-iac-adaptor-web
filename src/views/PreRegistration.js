import { Icon } from '@iconify/react';
import { Link as RouterLink } from 'react-router-dom';
import twitterFill from '@iconify/icons-eva/twitter-fill';
import facebookFill from '@iconify/icons-eva/facebook-fill';
import linkedinFill from '@iconify/icons-eva/linkedin-fill';
import instagramFilled from '@iconify/icons-ant-design/instagram-filled';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  Button,
  Tooltip,
  Container,
  Typography,
  InputAdornment,
  OutlinedInput
} from '@material-ui/core';
// hooks
import useCountdown from '../hooks/useCountdown';
// components
import { MIconButton } from '../components/@material-extend';
import Page from '../components/Page';
import Logo from '../components/Logo';
import ContainerAddEditForm from 'src/components/PreRegistrationForm';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(2)
}));

const HeaderStyle = styled('header')(({ theme }) => ({
  top: 0,
  left: 0,
  lineHeight: 0,
  width: '100%',
  position: 'absolute',
  padding: theme.spacing(3, 3, 0),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(5, 5, 0)
  }
}));

// ----------------------------------------------------------------------

export default function ComingSoon() {
  return (
    <RootStyle title="experienz">
      <HeaderStyle>
        <Logo />
      </HeaderStyle>

      <Container>
        <Box sx={{ px: 40 }}>
          <ContainerAddEditForm />
        </Box>
      </Container>
    </RootStyle>
  );
}
