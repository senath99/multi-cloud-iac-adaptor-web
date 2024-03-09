import React, { useEffect, useState } from 'react';
import { Box, Card, CardContent } from '@material-ui/core';
import { useParams } from 'react-router-dom';

import RuleEditor from 'src/components/utils/RuleEditor';
import { getInstancesByStackId } from 'src/redux/slices/data-sets';

import { useDispatch, useSelector } from 'react-redux';
import LoadingScreen from 'src/components/LoadingScreen';
import Page from '../components/Page';

export default function RuleEditForm() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { singleStack } = useSelector((state) => state.datasets);
  const [isLoading, setLoading] = useState(true);
  const [provider, setProvider] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);

      try {
        // Dispatch action to get instances by stack id and await its completion
        const response = await dispatch(getInstancesByStackId(id));

        if (response?.status === 200) {
          // Now that dispatch is complete, fetch stack data synchronously

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
    <Page>
      <Box sx={{ px: '15%', mt: '110px', mb: '20px' }}>
        <Card>
          <CardContent>
            <RuleEditor id={id} stackData={singleStack} provider={provider} />
          </CardContent>
        </Card>
      </Box>
    </Page>
  );
}
