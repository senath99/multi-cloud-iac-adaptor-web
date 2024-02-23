import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';

// material
import { Box, Button } from '@material-ui/core';
//icons
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';

import { makeStyles } from '@material-ui/core/styles';

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

import DataList from '../utils/DataList';
import { getInstances } from 'src/redux/slices/data-sets';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center'
  }
}));

export default function InstanceList() {
  const dispatch = useDispatch();
  const history = useHistory();

  const { esgData, isLoading } = useSelector((state) => state.datasets);

  const handleAddNewOpen = (event) => {
    history.push(PATH_DASHBOARD.general.ruleAdd);
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
    </Box>
  );
}
