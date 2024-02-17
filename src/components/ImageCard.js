/*
 * Project: Dynamedics Portal Web
 * Created Date: Wednesday August 18th 2021
 * Author: Dinusha Madhuranga
 * -----
 * Last Modified: Wednesday August 18th 2021 1:58:39 pm
 * Last Modified: Sunday May 22nd 2022 5:53:24 pm
 * Modified By: Dinusha Madhuranga at <dmadhuranga@mitrai.com>
 *              KasunSKarunasekara at <kkarunasekara@mitrai.com>
 * -----
 * Copyright (c) 2021 Mitra Sparks
 * -----
 * HISTORY:
 * 2022-05-22	Added secondary caption option
 */

import PropTypes from 'prop-types';
import { Icon } from '@iconify/react';
import fileFill from '@iconify/icons-eva/file-fill';
import closeFill from '@iconify/icons-eva/close-fill';
import { motion, AnimatePresence } from 'framer-motion';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import {
  Box,
  List,
  Link,
  ListItem,
  Typography,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction
} from '@material-ui/core';
// utils
import { fData } from '../utils/formatNumber';
//
import { MIconButton } from './@material-extend';
import { varFadeInRight } from './animate';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',

  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  clickable: false,
  padding: theme.spacing(5, 1),
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    flexDirection: 'row',
    height: 270
  }
}));

// ----------------------------------------------------------------------

ImageCard.propTypes = {
  caption: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  sx: PropTypes.object
};

export default function ImageCard({
  title,
  caption,
  secondaryCaption,
  error = false,
  sx,
  disabled = true,
  src,
  ...other
}) {
  return (
    <Box sx={{ width: '100%', ...sx }} {...other}>
      <DropZoneStyle>
        <Box component="img" alt="select file" src={src} sx={{ height: 160 }} />

        <Box
          sx={{
            p: 1,
            ml: { md: 2 }
          }}
        >
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>

          {caption && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {caption}
            </Typography>
          )}
        </Box>
      </DropZoneStyle>
    </Box>
  );
}
