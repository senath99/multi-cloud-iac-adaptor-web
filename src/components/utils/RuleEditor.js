import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import clsx from 'clsx';

import { useFormik } from 'formik';
import { Form, FormikProvider } from 'formik';

// material
import {
  Box,
  TextField,
  Typography,
  Grid,
  Button,
  InputAdornment,
  Collapse,
  IconButton,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import SwitchSelector from 'react-switch-selector';

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import archiveOutline from '@iconify/icons-eva/archive-outline';
import DropDownFilter from '../DropDownFilter';

import { v4 as uuidv4 } from 'uuid';
import ControlledTextField from './ProviderForms/ControlledTextField';
import ControlledDropdown from './ProviderForms/ControlledDropdown';
import { PATH_DASHBOARD } from 'src/routes/paths';
import {
  getAWSRefactorModel,
  getAwsModel,
  getAzureModel
} from './DataModels/DataFormatters';
import {
  getInstancesByStackId,
  saveInstance
} from 'src/redux/slices/data-sets';
import { useDispatch, useSelector } from 'react-redux';

// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(3)
  },
  helperText: {
    padding: theme.spacing(0, 2),
    color: 'red'
  }
}));

// ----------------------------------------------------------------------
const AWS_SECURITY_TYPES = [
  { name: 'ingress', value: 'ingress' },
  { name: 'egress', value: 'egress' }
];

const AWS_SECURITY_PROTOOCALS = [
  { name: 'tcp', value: 'tcp' },
  { name: 'udp', value: 'udp' },
  { name: 'icmp', value: 'icmp' },
  { name: 'icmpv6', value: 'icmpv6' }
];

const AZURE_LOCATIONS = [
  { name: 'East US', value: 'East US' },
  { name: 'West Europe', value: 'West Europe' }
];

const AZURE_DIRECTIONS = [
  { name: 'Inbound', value: 'Inbound' },
  { name: 'Outbound', value: 'Outbound' }
];

const AZURE_ACCESS = [
  { name: 'Allow', value: 'Allow' },
  { name: 'Deny', value: 'Deny' }
];

function RuleEditor({ id, editStack, provider, className }) {
  const classes = useStyles();
  const history = useHistory();
  const dispatch = useDispatch();
  const [options, setOptions] = useState(['']);
  const [basicOpen, setBasicOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [groupTfid, setSecurityTfid] = useState('');

  //azure states

  const [azureGroupName, setAzureGroupName] = useState('');
  const [azureNetworkLocation, setAzureGroupLocation] = useState('');
  const [azureResourceGroup_name, setAzureResourceGroup_name] = useState('');
  const [azureSecurityRule_name, setAzureSecurityRuleName] = useState('');

  const [azureGroups, setAzureGroups] = useState({});
  const [securityAWSGroups, setAWSSecurityGroups] = useState({});

  useEffect(() => {
    if (provider == 'aws') {
      setAWSSecurityGroups(editStack?.securityModules);
    } else {
      const networkGroup = editStack?.networkGroup;
      setAzureGroupLocation(networkGroup?.location);
      setAzureResourceGroup_name();
      setAzureGroups(editStack?.networkModules);
    }
  }, []);

  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      stack_name: editStack?.stack_name,
      security_group_name: editStack?.securityGroup?.name,
      network_security_group_name: editStack?.networkGroup?.name
    },

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      let awsModel = {};
      let azureModel = {};
      let response = {};
      if (basicOpen) {
        awsModel = getAwsModel(
          values.stack_name,
          groupTfid,
          values.security_group_name,
          securityAWSGroups
        );
        response = await saveInstance(awsModel);
      } else {
        azureModel = getAzureModel(
          values.stack_name,
          groupTfid,
          values.security_group_name,
          azureNetworkLocation,
          azureResourceGroup_name,
          securityAWSGroups
        );

        response = await saveInstance(azureModel);
      }
    }
  });

  const {
    values,
    errors = { options: [''] },
    touched = { options: [''] },
    resetForm,
    getFieldProps,
    setFieldValue,
    handleSubmit,
    isSubmitting
  } = formik;

  const handleAddOption = () => {
    const gui = uuidv4();

    setAWSSecurityGroups({
      ...securityAWSGroups,
      [`${gui}-id`]: {
        moduleType: 'security-group-rule',
        tfId: `${gui}-id`,
        type: 'ingress',
        fromPort: '',
        toPort: '',
        protocol: 'tcp',
        cidrBlocks: [''],
        securityGroupId: `${groupTfid}.id`,
        id: gui
      }
    });
  };

  const handleDeleteOption = (index) => {
    let groupValues = securityAWSGroups;

    delete groupValues[index];
    setAWSSecurityGroups({ ...groupValues });
  };

  const handleAddCIDROption = (indexNo) => {
    let group = securityAWSGroups[indexNo];
    let cidrValues = group.cidrBlocks;

    setAWSSecurityGroups({
      ...securityAWSGroups,
      [indexNo]: { ...group, ['cidrBlocks']: [...cidrValues, ''] }
    });
  };

  const handleDeleteCidrOption = (index, indexNo) => {
    let group = securityAWSGroups[index];
    let cidrValues = group?.cidrBlocks;

    if (cidrValues.length !== 1) {
      cidrValues.splice(indexNo, 1);

      setAWSSecurityGroups({
        ...securityAWSGroups,
        [index]: { ...group, ['cidrBlocks']: [...cidrValues] }
      });
    }
  };

  const onchangeAwsSecurityGroups = (value, property, indexNo, index) => {
    let group = securityAWSGroups[indexNo];
    let dataValue = value;

    if (property == 'cidrBlocks') {
      let cidrValues = [...group.cidrBlocks];
      cidrValues.splice(index, 1, value);

      dataValue = cidrValues;
    }

    setAWSSecurityGroups({
      ...securityAWSGroups,
      [indexNo]: { ...group, [property]: dataValue }
    });
    // console.log({ [indexNo]: { ...group, [property]: value } });
  };

  //AZURE

  const handleAzureAddOption = (index) => {
    const gui = uuidv4();
    setAzureGroups({
      ...azureGroups,
      [`${gui}-id`]: {
        moduleType: 'network-security-rule',
        tfId: `${gui}-id`,
        name: '',
        priority: 0,
        direction: '',
        access: '',
        protocol: '',
        sourcePortRange: '*',
        destinationPortRange: '*',
        sourceAddressPrefix: '*',
        destinationAddressPrefix: '*',
        resourceGroupName: '',
        networkSecurityGroupName: `${groupTfid}.name`
      }
    });
  };

  const handleAzureDeleteOption = (index) => {
    let groupValue = azureGroups;

    delete groupValue[index];
    setAzureGroups({ ...groupValue });
  };

  const onchangeAzureSecurityGroups = (value, property, indexNo) => {
    let group = azureGroups[indexNo];
    let dataValue = value;

    setAzureGroups({
      ...azureGroups,
      [indexNo]: { ...group, [property]: dataValue }
    });
  };

  const handleCancel = () => {
    history.push(`${PATH_DASHBOARD.general.dashboard}`);
  };

  return (
    <React.Fragment>
      <Box container sx={{ minWidth: '60vw', maxWidth: '60vw', pt: '40px' }}>
        <FormikProvider value={formik}>
          <Form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            className={clsx(classes.root, className)}
            enablereinitialize="true"
          >
            <TextField
              fullWidth
              size="small"
              label="Type the Stack Name"
              {...getFieldProps('stack_name')}
              error={Boolean(touched.stack_name && errors.stack_name)}
              helperText={touched.stack_name && errors.stack_name}
              className={classes.margin}
              data-testid={'stack_name'}
            />
            <Box sx={{ my: 3, height: 40, width: '60%' }}>
              <SwitchSelector
                onChange={() => {
                  setBasicOpen(!basicOpen);
                  setAdvancedOpen(!advancedOpen);
                }}
                options={[
                  {
                    label: 'AWS',
                    value: 'aws',
                    selectedBackgroundColor: '#098380'
                  },
                  {
                    label: 'Azure',
                    value: 'advanced',
                    selectedBackgroundColor: '#098380'
                  }
                ]}
                // initialSelectedIndex={Boolean(singleChart) ? 1 : 0}
                backgroundColor={'#EDEFF1'}
                fontSize={'large'}
              />
            </Box>

            <Collapse
              in={basicOpen}
              sx={{
                mx: theme.spacing(3)
              }}
            >
              <TextField
                fullWidth
                size="small"
                label="Type the Security Group Name"
                {...getFieldProps('security_group_name')}
                // error={Boolean(touched.firstName && errors.firstName)}
                // helperText={touched.firstName && errors.firstName}
                className={classes.margin}
                data-testid={'firstName'}
              />

              <Typography variant="caption">
                Create the Security Group Rule/Rules
              </Typography>

              {Object.values(securityAWSGroups).map((option, index) => {
                return (
                  <Box key={index} sx={{ mb: 2, mt: 2 }}>
                    <ControlledDropdown
                      options={AWS_SECURITY_TYPES}
                      value={option?.type}
                      property="protocol"
                      tfid={option?.tfId}
                      onChange={onchangeAwsSecurityGroups}
                      defaultValue="ingress"
                      label="Type"
                    />

                    <ControlledDropdown
                      options={AWS_SECURITY_PROTOOCALS}
                      value={option?.protocol}
                      property={'protocol'}
                      tfid={option?.tfId}
                      onChange={onchangeAwsSecurityGroups}
                      defaultValue={'tcp'}
                    />

                    <Grid container direction="row" spacing={1}>
                      <Grid item xs={6}>
                        <ControlledTextField
                          value={option?.fromPort}
                          property={'fromPort'}
                          tfid={option?.tfId}
                          onChange={onchangeAwsSecurityGroups}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <ControlledTextField
                          value={option?.toPort}
                          property={'toPort'}
                          tfid={option?.tfId}
                          onChange={onchangeAwsSecurityGroups}
                        />
                      </Grid>
                    </Grid>

                    {option?.cidrBlocks.map((optionCidr, thisIndex) => {
                      return (
                        <Box key={index} sx={{ mt: 2 }}>
                          <TextField
                            sx={{ width: '49%' }}
                            fullWidth
                            size="small"
                            value={optionCidr}
                            onChange={(event) => {
                              const securityType = event.target.value;
                              onchangeAwsSecurityGroups(
                                securityType,
                                'cidrBlocks',
                                option?.tfId,
                                thisIndex
                              );
                            }}
                            // error={!options[index]}
                            label={`Type`}
                            InputProps={{
                              endAdornment: (
                                <InputAdornment>
                                  <IconButton
                                    data-testid={'pollDelete'}
                                    onClick={() => {
                                      handleDeleteCidrOption(
                                        option?.tfId,
                                        thisIndex
                                      );
                                    }}
                                  >
                                    <Icon icon={archiveOutline} />
                                  </IconButton>
                                </InputAdornment>
                              )
                            }}
                          />
                        </Box>
                      );
                    })}
                    <Button
                      size="small"
                      sx={{ my: 2 }}
                      onClick={() => handleAddCIDROption(option?.tfId)}
                      startIcon={<Icon icon={plusFill} />}
                      // disabled={options.length >= 4}
                    >
                      Add CIDR Block
                    </Button>
                    {Object.values(securityAWSGroups).length > 1 && (
                      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                        <Button
                          size="small"
                          sx={{ my: 2 }}
                          onClick={() => handleDeleteOption(option?.tfId)}
                          startIcon={<Icon icon={plusFill} />}
                          disabled={options.length >= 4}
                        >
                          Remove Security Group Rule
                        </Button>
                      </Box>
                    )}

                    <Divider orientation="horizontal" sx={{ mt: 2 }} />
                  </Box>
                );
              })}
              <Button
                size="small"
                sx={{ my: 2 }}
                onClick={handleAddOption}
                startIcon={<Icon icon={plusFill} />}
                disabled={options.length >= 4}
              >
                Add Security Group Rule
              </Button>
            </Collapse>
            <Collapse
              in={advancedOpen}
              sx={{
                mx: theme.spacing(3)
              }}
            >
              <TextField
                fullWidth
                size="small"
                label={`NetWork Security Group Name`}
                {...getFieldProps('network_security_group_name')}
                // error={Boolean(touched.firstName && errors.firstName)}
                // helperText={touched.firstName && errors.firstName}
                className={classes.margin}
                data-testid={'firstName'}
              />

              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  <DropDownFilter
                    sx={{ mb: 1 }}
                    label={`Location`}
                    defaultValue={'East US'}
                    size="small"
                    data={AZURE_LOCATIONS}
                    value={azureNetworkLocation}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      setAzureGroupLocation(securityType);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    value={azureResourceGroup_name}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      setAzureResourceGroup_name(securityType);
                    }}
                    // error={!options[index]}
                    label={`Resource Group Name`}
                  />
                </Grid>
              </Grid>
              <TextField
                fullWidth
                size="small"
                value={azureResourceGroup_name}
                onChange={(event) => {
                  const securityType = event.target.value;
                  setAzureResourceGroup_name(securityType);
                }}
                // error={!options[index]}
                label="Network Security Rule Name"
              />

              <Typography variant="caption">
                Create the Network Security Group Rule/Rules
              </Typography>

              {Object.values(azureGroups).map((option, indexAZ) => {
                return (
                  <Box key={indexAZ} sx={{ mb: 2, mt: 2 }}>
                    <Grid container direction="row" spacing={1} mb={1}>
                      <Grid item xs={6}>
                        <ControlledTextField
                          value={option?.priority}
                          property="priority"
                          tfid={option?.tfId}
                          onChange={onchangeAzureSecurityGroups}
                          label="Priority"
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <ControlledDropdown
                          options={AZURE_DIRECTIONS}
                          value={option?.direction}
                          property={'direction'}
                          tfid={option?.id}
                          onChange={onchangeAzureSecurityGroups}
                          defaultValue={'Inbound'}
                          label={`Direction`}
                        />
                      </Grid>
                    </Grid>

                    <Grid container direction="row" spacing={1} mb={1}>
                      <Grid item xs={6}>
                        <ControlledDropdown
                          options={AZURE_ACCESS}
                          value={option?.access}
                          property={'access'}
                          tfid={option?.id}
                          onChange={onchangeAzureSecurityGroups}
                          defaultValue={'Allow'}
                          label={`Access`}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <ControlledDropdown
                          options={AWS_SECURITY_PROTOOCALS}
                          value={option?.protocol}
                          property={'protocol'}
                          tfid={option?.id}
                          onChange={onchangeAzureSecurityGroups}
                          defaultValue={'tcp'}
                          label={`Protocol`}
                        />
                      </Grid>
                    </Grid>

                    <Grid container direction="row" spacing={1} mb={1}>
                      <Grid item xs={6}>
                        <ControlledTextField
                          value={option?.sourcePortRange}
                          property="sourcePortRange"
                          tfid={option?.id}
                          onChange={onchangeAzureSecurityGroups}
                          label={`Source Port Range`}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <ControlledTextField
                          value={option?.destinationPortRange}
                          property="destinationPortRange"
                          tfid={option?.id}
                          onChange={onchangeAzureSecurityGroups}
                          label={`Destination Port Range`}
                        />
                      </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={1} mb={1}>
                      <Grid item xs={6}>
                        <ControlledTextField
                          value={option?.sourceAddressPrefix}
                          property="sourceAddressPrefix"
                          tfid={option?.id}
                          onChange={onchangeAzureSecurityGroups}
                          label={`Source Address Prefix`}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <ControlledTextField
                          value={option?.destinationAddressPrefix}
                          property="destinationAddressPrefixype"
                          tfid={option?.id}
                          onChange={onchangeAzureSecurityGroups}
                          label={`Destination Address Prefix`}
                        />
                      </Grid>
                    </Grid>

                    <ControlledTextField
                      value={option?.networkSecurityGroupName}
                      property="networkSecurityGroupName"
                      tfid={option?.id}
                      onChange={onchangeAzureSecurityGroups}
                      label={`Network Security Group Name`}
                      disabled
                    />
                    {Object.values(azureGroups).length > 1 && (
                      <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                        <Button
                          size="small"
                          sx={{ my: 2 }}
                          onClick={() => handleAzureDeleteOption(option?.id)}
                          startIcon={<Icon icon={plusFill} />}
                          disabled={options.length >= 4}
                        >
                          Remove Security Group Rule
                        </Button>
                      </Box>
                    )}
                    <Divider orientation="horizontal" sx={{ mt: 2 }} />
                  </Box>
                );
              })}
              <Button
                size="small"
                sx={{ my: 2 }}
                onClick={() => handleAzureAddOption()}
                startIcon={<Icon icon={plusFill} />}
                disabled={options.length >= 4}
              >
                Add Security Group Rule
              </Button>
            </Collapse>

            <Box sx={{ display: 'flex', justifyContent: 'right' }}>
              <Button
                size="small"
                type="submit"
                variant="contained"
                sx={{ my: 2 }}
                startIcon={<Icon icon={plusFill} />}
                disabled={options.length >= 4}
              >
                Create Rule
              </Button>

              <Button
                sx={{ ml: 4, my: 2 }}
                size="small"
                variant="contained"
                onClick={handleCancel}
                disabled={options.length >= 4}
              >
                Cancel
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </Box>
    </React.Fragment>
  );
}

export default RuleEditor;
