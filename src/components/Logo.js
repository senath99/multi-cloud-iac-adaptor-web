// material
import { Box } from '@material-ui/core';

// ----------------------------------------------------------------------

export default function Logo({
  height = 60,
  logo = '/static/brand/logo.svg',
  ...other
}) {
  return (
    <Box component="img" alt="logo" src={logo} height={height} {...other} />
  );
}
