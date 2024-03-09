import { Link as RouterLink } from 'react-router-dom';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Container, Typography } from '@material-ui/core';

// components

import Page from '../../Page';

import Logo from 'src/components/Logo';

// ----------------------------------------------------------------------

const RootStyle = styled(Page)(({ theme }) => ({
  minHeight: '100%',
  display: 'flex',
  alignItems: 'center',
  paddingTop: theme.spacing(15),
  paddingBottom: theme.spacing(10)
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

export default function Success() {
  return (
    <Container>
      <Box sx={{ margin: 'auto', textAlign: 'center' }}>
        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
          <Box
            component="img"
            alt="comingsoon"
            src="/static/brand/success.gif"
          />
        </Box>
        <Typography variant="title" noWrap>
          Resource Validated Successfully!
        </Typography>
        <Typography
          variant="caption"
          textAlign={'center'}
          sx={{ color: 'text.secondary', display: 'block', marginTop: 1 }}
        >
          You could click continue , and start to provision the resource
        </Typography>
      </Box>
    </Container>
  );
}
