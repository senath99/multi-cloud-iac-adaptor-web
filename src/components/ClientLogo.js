import { Box } from '@material-ui/core';
import { CLIENT_LOGO_FILE } from '../utils/constants';
import { mediaBaseUrl } from '../config';

// ----------------------------------------------------------------------

export default function ClientLogo({ client, ...other }) {
  return (
    <Box
      component="img"
      alt="client-logo"
      src={`${mediaBaseUrl}/${client}/${CLIENT_LOGO_FILE}`}
      // maxHeight={32}
      paddingRight={1}
      {...other}
    />
  );
}
