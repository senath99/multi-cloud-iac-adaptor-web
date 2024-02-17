/*
 * Project: Dynamedics Supplier Portal Web
 * Created Date: Tuesday April 11th 2023
 * Author: Senath Sadeesha
 * -----
 * Last Modified: Tuesday April 11th 2023 5:27:15 pm
 * Modified By: Senath Sadeesha at <sweerasinghe@mitrai.com>
 * -----
 * Copyright (c) 2023 Mitra Sparks
 * -----
 * HISTORY:
 */

import settings2Outline from '@iconify/icons-eva/settings-2-outline';
import { Icon } from '@iconify/react';
import { useSnackbar } from 'notistack';
import { useRef, useState } from 'react';
import { Link as RouterLink, useHistory } from 'react-router-dom';
// material
import {
  Box,
  Button,
  Divider,
  IconButton,
  MenuItem,
  Typography
} from '@material-ui/core';
import { alpha } from '@material-ui/core/styles';
// routes
import { PATH_DASHBOARD } from '../../routes/paths';
// hooks
import useAuth from '../../hooks/useAuth';
import useIsMountedRef from '../../hooks/useIsMountedRef';
// components
import { MIconButton } from '../../components/@material-extend';
import MenuPopover from '../../components/MenuPopover';
import { AppsOutlined } from '@mui/icons-material';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Settings',
    icon: settings2Outline,
    linkTo: PATH_DASHBOARD.user.account
  }
];

// ----------------------------------------------------------------------

export default function WaffleMenu() {
  const history = useHistory();
  const anchorRef = useRef(null);
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  const handleLogout = async () => {
    try {
      await logout();
      history.replace('/');
      if (isMountedRef.current) {
        handleClose();
      }
    } catch (error) {
      console.error(error);
      enqueueSnackbar('Unable to logout', { variant: 'error' });
    }
  };

  return (
    <>
      <MIconButton
        ref={anchorRef}
        onClick={handleOpen}
        className={'profile-settings'}
        sx={{
          padding: 0,
          width: 44,
          height: 44,
          ...(open && {
            '&:before': {
              zIndex: 1,
              content: "''",
              width: '100%',
              height: '100%',
              borderRadius: '50%',
              position: 'absolute',
              bgcolor: (theme) => alpha(theme.palette.grey[900], 0.72)
            }
          })
        }}
      >
        <IconButton width={30} height={30}>
          <AppsOutlined style={{ color: 'white', width: 30, height: 30 }} />
        </IconButton>
      </MIconButton>

      <MenuPopover
        open={open}
        onClose={handleClose}
        anchorEl={anchorRef.current}
        sx={{ width: 220 }}
      >
        <Box sx={{ my: 1.5 }}>
          <Typography variant="subtitle2" noWrap>
            {user.displayName}
          </Typography>
          <Typography
            variant="caption"
            component={'div'}
            title={user.email}
            sx={{ color: 'text.secondary' }}
            noWrap
          >
            {user.email}
          </Typography>
        </Box>

        <Divider sx={{ my: 1 }} />

        {MENU_OPTIONS.map((option) => (
          <MenuItem
            key={option.label}
            to={option.linkTo}
            component={RouterLink}
            onClick={handleClose}
            sx={{ typography: 'body2', py: 1, px: 2.5 }}
          >
            <Box
              component={Icon}
              icon={option.icon}
              sx={{
                mr: 2,
                width: 24,
                height: 24
              }}
            />

            {option.label}
          </MenuItem>
        ))}

        <Box sx={{ p: 2, pt: 1.5 }}>
          <Button
            fullWidth
            color="inherit"
            variant="outlined"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </Box>
      </MenuPopover>
    </>
  );
}
