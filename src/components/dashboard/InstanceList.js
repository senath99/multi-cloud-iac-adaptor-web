import React, { useEffect, useState } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// material
import {
  Box,
  Grid,
  Button,
  Dialog,
  Typography,
  IconButton,
  Link
} from '@material-ui/core';
//icons
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import DownloadForOfflineOutlinedIcon from '@material-ui/icons/DownloadForOfflineOutlined';
import { makeStyles } from '@material-ui/core/styles';
import { useSnackbar } from 'notistack';

//constants

// slices
// import {
//   deleteDataSet,
//   resetStepperStatus,
//   cancelDataSet,
//   getESGDataSets,
//   emptyDataRecords
// } from '../../../../redux/slices/data-sets';
import { PATH_DASHBOARD } from 'src/routes/paths';
import { useHistory } from 'react-router';
import { useTheme } from '@material-ui/core/styles';
import DataList from '../utils/DataList';
import { getInstances } from 'src/redux/slices/data-sets';
import RuleAddEditForm from '../utils/RuleAddEditForm';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  }
}));

export default function InstanceList() {
  const dispatch = useDispatch();
  const theme = useTheme();

  const { esgData, isLoading } = useSelector((state) => state.datasets);

  const [open, setOpen] = useState(false);

  const [hover, setHover] = useState(null);
  const handleAddNewOpen = (event) => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getInstances());
  }, []);

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'right', mb: 2 }}>
        <Button
          size="small"
          startIcon={<Icon icon={plusFill} />}
          onClick={handleAddNewOpen}
        >
          Create Rule
        </Button>
      </Box>
      <DataList ESGData={esgData} isLoading={isLoading} ondeleteDataSet={{}} />

      <Dialog open={open} maxWidth={false} disableEscapeKeyDown={true}>
        <Grid container sx={{ p: 4 }}>
          <RuleAddEditForm />
        </Grid>
      </Dialog>
    </Box>
  );
}
