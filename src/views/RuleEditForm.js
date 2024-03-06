import React, { useEffect, useState } from 'react';
import { Box, Card, Dialog, Typography } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import RuleEditor from 'src/components/utils/RuleEditor';
import { getInstancesByStackId } from 'src/redux/slices/data-sets';
import {
  getAWSRefactorModel,
  getAzureRefactorModel
} from 'src/components/utils/DataModels/DataFormatters';
import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';

export default function RuleEditForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleStack, error } = useSelector((state) => state.datasets);
  const [isLoading, setLoading] = useState(true);
  const [editStack, setSingleStack] = useState({});
  const [provider, setProvider] = useState('');

  const [anchorel, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorel);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Dispatch action to get instances by stack id and await its completion
        const response = await dispatch(getInstancesByStackId(id));

        if (response?.status === 200) {
          // Now that dispatch is complete, fetch stack data synchronously
          let result = {};

          const providerType = response.data?.config?.provider?.type;
          setProvider(providerType);
        }
      } catch (error) {
        // Handle error if dispatch or any other async operation fails
        console.error('Error:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [dispatch]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  return (
    <Box sx={{ mt: 15, mb: 10, px: 30 }}>
      <Card sx={{ display: 'flex', justifyContent: 'center' }}>
        <RuleEditor
          id={id}
          stackData={singleStack}
          provider={provider}
          handleClick={handleClick}
        />
      </Card>
      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false}
        disableEscapeKeyDown={true}
        anchorel={anchorel}
      >
        <Box
          sx={{
            height: 500,
            width: 900,
            p: 4
          }}
        >
          <Typography gutterBottom variant="h6">
            Data Sets
          </Typography>
          TTTTTTTTTTTTT
        </Box>
      </Dialog>
    </Box>
  );
}
