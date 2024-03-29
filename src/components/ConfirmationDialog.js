import PropTypes from 'prop-types';
// material
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  DialogContentText,
  Button
} from '@material-ui/core';

// ----------------------------------------------------------------------

ConfirmationDialog.propTypes = {
  open: PropTypes.bool.isRequired,
  onApprove: PropTypes.func,
  onClose: PropTypes.func,
  title: PropTypes.string,
  sx: PropTypes.object,
  description: PropTypes.string
};

export default function ConfirmationDialog({
  open = false,
  onApprove,
  onClose,
  title,
  description,
  sx,
  ...other
}) {
  return (
    <Dialog
      open={open}
      onClose={onClose}
      aria-labelledby="alert-dialog-slide-title"
      aria-describedby="alert-dialog-slide-description"
      sx={sx}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          {description}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={onApprove}>
          Yes
        </Button>
        <Button onClick={onClose}>Cancel</Button>
      </DialogActions>
    </Dialog>
  );
}
