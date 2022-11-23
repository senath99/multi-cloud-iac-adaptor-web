// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';
// hooks

// components

import Page from '../components/Page';
import Logo from '../components/Logo';
import PreRegistrationForm from 'src/components/PreRegistrationForm';

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
          <PreRegistrationForm />
        </Box>
      </Container>
    </RootStyle>
  );
}
