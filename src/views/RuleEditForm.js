import React, { useEffect, useState } from 'react';
import { Box, Card } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import RuleEditor from 'src/components/utils/RuleEditor';
import { getInstancesByStackId } from 'src/redux/slices/data-sets';
import {
  getAWSRefactorModel,
  getAzureModel
} from 'src/components/utils/DataModels/DataFormatters';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';

export default function RuleEditForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleStack, error } = useSelector((state) => state.datasets);
  const [isLoading, setLoading] = useState(false);
  const [editStack, setSingleStack] = useState();

  useEffect(async () => {
    setLoading(true);

    // Dispatch action to get instances by stack id and await its completion
    const response = await dispatch(getInstancesByStackId(id));

    if (response.status == 200) {
      // Now that dispatch is complete, fetch stack data synchronously
      const provider = singleStack.config.provider.type;
      let stackData = {};
      if (provider == 'aws') {
        stackData = getAWSRefactorModel(singleStack);
      } else {
        stackData = getAzureModel(singleStack);
      }
      setSingleStack(stackData);
    }

    setLoading(false);
  }, []);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ mt: 15, mb: 10, px: 30 }}>
      <Card sx={{ display: 'flex', justifyContent: 'center' }}>
        <RuleEditor id={id} editStack={editStack} />
      </Card>
    </Box>
  );
}
