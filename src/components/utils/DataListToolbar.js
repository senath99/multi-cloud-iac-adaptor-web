import { useState } from 'react';
import PropTypes from 'prop-types';
// material
import {
  Box,
  Button,
  Toolbar,
  Tooltip,
  IconButton,
  Typography,
  OutlinedInput,
  InputAdornment,
  Grid,
  Divider,
  Dialog,
  DialogActions,
  DialogTitle,
  DialogContent,
  DialogContentText
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

//icons
import { Icon } from '@iconify/react';
import searchFill from '@iconify/icons-eva/search-fill';
import archiveOutline from '@iconify/icons-eva/archive-outline';
import downloadOutline from '@iconify/icons-eva/edit-2-outline';
import {
  useTheme,
  experimentalStyled as styled
} from '@material-ui/core/styles';

import CancelIcon from '@iconify/icons-eva/close-fill';

// ----------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3)
}));

const useStyles = makeStyles((theme) => ({
  iconButton: {
    borderRadius: 0
  }
}));

const SearchStyle = styled(OutlinedInput)(({ theme }) => ({
  width: 320,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter
  }),
  '&.Mui-focused': { boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`
  }
}));

// ----------------------------------------------------------------------

DataListToolbar.propTypes = {
  selected: PropTypes.object,
  filterName: PropTypes.string,
  onFilterName: PropTypes.func,
  handleUpdateUser: PropTypes.func,
  onLoading: PropTypes.bool,
  onClearSearchText: PropTypes.func
};

export default function DataListToolbar({
  selected,
  filterName,
  onFilterName,
  ondeleteDataSet,
  onLoading,
  onClearSearchText,
  onEditOpen
}) {
  const theme = useTheme();
  const isLight = theme.palette.mode === 'light';
  const [openDialogConfirmation, setOpenDialogConfirmation] = useState(false);
  const classes = useStyles();
  const handleOpenDeleteConfirmation = () => {
    setOpenDialogConfirmation(true);
  };

  const handleCloseDeleteConfirmation = () => {
    setOpenDialogConfirmation(false);
  };

  return (
    <RootStyle
      sx={{
        ...(selected.id > -1 && {
          color: isLight ? 'black' : 'text.primary',
          bgcolor: isLight ? 'white' : 'primary.dark'
        })
      }}
    >
      {selected.stack_name == -1 ? (
        <SearchStyle
          value={filterName}
          onChange={onFilterName}
          placeholder="Search by Stack"
          sx={{ width: 'max-content' }}
          startAdornment={
            <>
              <InputAdornment position="start">
                <Box
                  component={Icon}
                  icon={searchFill}
                  sx={{ color: 'text.disabled' }}
                />
              </InputAdornment>
            </>
          }
          endAdornment={
            filterName && (
              <InputAdornment position="end">
                <Box sx={{ cursor: 'pointer', mr: 2, mt: 1 }}>
                  <Icon
                    width={22}
                    icon={CancelIcon}
                    onClick={onClearSearchText}
                  ></Icon>
                </Box>
              </InputAdornment>
            )
          }
        />
      ) : (
        <Typography component="div" variant="subtitle1">
          {selected.stack_name}
        </Typography>
      )}
      {selected.stack_name != -1 && (
        <Box display="flex">
          <Tooltip title="View">
            <IconButton
              disabled={onLoading}
              className={classes.iconButton}
              href={selected.filePath}
              onClick={onEditOpen}
            >
              <Grid
                item
                container
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon icon={downloadOutline} />
                <Typography
                  variant="caption"
                  sx={{
                    px: 1,
                    display: 'block'
                  }}
                >
                  Update
                </Typography>
              </Grid>
            </IconButton>
          </Tooltip>

          <Divider orientation="vertical" flexItem />
          <Tooltip title="Delete">
            <IconButton
              onClick={handleOpenDeleteConfirmation}
              disabled={onLoading}
              className={classes.iconButton}
            >
              <Grid
                item
                container
                sx={{
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <Icon icon={archiveOutline} />
                <Typography variant="caption" sx={{ px: 1, display: 'block' }}>
                  Delete
                </Typography>
              </Grid>
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Dialog
        open={openDialogConfirmation}
        onClose={handleCloseDeleteConfirmation}
        aria-labelledby="alert-dialog-slide-title"
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent sx={{ width: 600 }}>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete{' '}
            <strong>{' ' + selected.stack_name}</strong>?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            onClick={() => {
              ondeleteDataSet();
              handleCloseDeleteConfirmation();
            }}
          >
            Delete
          </Button>
          <Button onClick={handleCloseDeleteConfirmation}>Cancel</Button>
        </DialogActions>
      </Dialog>
    </RootStyle>
  );
}
