/*
 * Project: Dynamedics Portal Web
 * Created Date:  Monday September 6th 2021
 * Author: Senath Weerasinghe
 * -----
 * Last Modified: Monday September 6th 2021 10:21:30 am
 * Modified By:  Senath Weerasinghe at <sweerasinghe@mitrai.com>
 * Modified By: Dinusha Madhuranga at <dmadhuranga@mitrai.com>
 * -----
 * Copyright (c) 2021 Mitra Sparks
 * -----
 * HISTORY:
 * * 2021-09-24	Added a prop as other
 */

import { CardHeader } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
export default function CustomCardHeader({ title, ...other }) {
  const theme = useTheme();

  return (
    <CardHeader
      title={title}
      sx={{
        py: 1,

        background: `linear-gradient(90deg, ${theme.palette.info.dark} 0%, ${theme.palette.primary.dark} 50%)`,
        color: theme.palette.common.white
      }}
      {...other}
    />
  );
}
