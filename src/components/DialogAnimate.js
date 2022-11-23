/*
 * Project: Dynamedics Portal Web
 * Created Date:  Monday, August 27th 2021 6.30 am
 * Author: senath999
 * -----
 * Last Modified: September 6th 2021 7.58 pm
 *
 * Modified By: Senath Weerasinghe at <sweerasinghe@mitrai.com>
 * -----
 * Copyright (c) 2021 Mitra Sparks
 * -----
 * HISTORY:
 */

import PropTypes from 'prop-types';
import { motion, AnimatePresence } from 'framer-motion';
// material
import { Dialog } from '@material-ui/core';
//
import { varFadeIn } from '../components/animate/variants/fade';

// ----------------------------------------------------------------------

DialogAnimate.propTypes = {
  open: PropTypes.bool.isRequired,
  animate: PropTypes.object,
  onClose: PropTypes.func,
  children: PropTypes.node.isRequired
};

export default function DialogAnimate({
  open = false,
  animate,
  onClose,
  children,
  ...other
}) {
  return (
    <AnimatePresence>
      {open && (
        <Dialog
          fullWidth
          maxWidth="xs"
          open={open}
          onClose={onClose}
          PaperComponent={motion.div}
          PaperProps={{
            sx: {
              borderRadius: 2,
              bgcolor: 'background.paper'
            },
            ...(animate || varFadeIn)
          }}
          {...other}
        >
          {children}
        </Dialog>
      )}
    </AnimatePresence>
  );
}
