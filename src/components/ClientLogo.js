/*
 * Project: Dynamedics Portal Web
 * Created Date: Friday July 8th 2022
 * Author: Naveen Mendis
 * -----
 * Last Modified: Saturday July 9th 2022 1:40:25 am
 * Modified By: Naveen Mendis at <naveenm@mitrai.com>
 * -----
 * Copyright (c) 2022 Mitra Sparks
 * -----
 * HISTORY:
 */

// material
import { Box } from '@material-ui/core';
import { CLIENT_LOGO_FILE } from '../utils/constants';
import { mediaBaseUrl } from '../config';
import useAuth from '../hooks/useAuth';

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
