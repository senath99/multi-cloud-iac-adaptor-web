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
  Divider,
  Dialog
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import SwitchSelector from 'react-switch-selector';

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import minusFill from '@iconify/icons-eva/minus-outline';
import archiveOutline from '@iconify/icons-eva/archive-outline';
import DropDownFilter from '../DropDownFilter';

import { v4 as uuidv4 } from 'uuid';
import ControlledTextField from './ProviderForms/ControlledTextField';
import ControlledDropdown from './ProviderForms/ControlledDropdown';
import { PATH_DASHBOARD } from 'src/routes/paths';
import {
  getAwsModel,
  getAzureModel,
  getUniqueId
} from './DataModels/DataFormatters';
import {
  saveInstance,
  saveInstanceMock,
  validateResource
} from 'src/redux/slices/data-sets';
import { useSnackbar } from 'notistack';
import LoadingScreen from '../LoadingScreen';
import ComingSoon from 'src/components/utils/ProviderForms/ComingSoon';
import ViolationAccordian from './ProviderForms/ViolationAccordian';
import { useDispatch } from 'react-redux';

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

const AZURE_PROTOCALS = [
  { name: 'Tcp', value: 'Tcp' },
  { name: 'Udp', value: 'Udp' },
  { name: 'Icmp', value: 'Icmp' },
  { name: 'Icmpv6', value: 'Icmpv6' }
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

const AZURE_ADRESS_PREFIX = [
  { name: 'VirtualNetwork', value: 'VirtualNetwork' },
  { name: 'AzureLoadBalancer', value: 'AzureLoadBalancer' },
  { name: 'Internet', value: 'Internet' },
  { name: '*', value: '*' }
];

function RuleAddEditForms({ className }) {
  const classes = useStyles();
  const history = useHistory();
  const [options, setOptions] = useState(['']);
  const [basicOpen, setBasicOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [groupTfid, setSecurityTfid] = useState('');
  const [ruleErrors, setRuleErrors] = useState([]);

  const [awsTags, setAwsTags] = useState({
    key1: { key: '', value: '', id: 'key1' }
  });
  //azure states
  const [azureTags, setAzureTags] = useState({
    key1: { key: '', value: '', id: 'key1' }
  });

  const [azureGroupName, setAzureGroupName] = useState('');
  const [azureNetworkLocation, setAzureGroupLocation] = useState('');
  const [azureResourceGroup_name, setAzureResourceGroup_name] = useState('');
  const [azureSecurityRule_name, setAzureSecurityRuleName] = useState('');
  const { enqueueSnackbar } = useSnackbar();
  const [isLoading, setLoading] = useState(false);

  useEffect(() => {
    const tfid = getUniqueId();
    setSecurityTfid(tfid);

    handleAddOption(tfid);
    handleAzureAddOption(tfid);
  }, []);

  const dispatch = useDispatch();
  const [azureGroups, setAzureGroups] = useState({});
  const [securityAWSGroups, setAWSSecurityGroups] = useState({});
  const [resourceViolations, setresourceViolations] = useState([]);
  const [resourceWarnings, setresourceWarnings] = useState([]);

  const [anchorel, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorel);

  const handleClose = async (allow) => {
    if (allow == 1) {
      const response = handleDeleteDataSet();
    } else {
      setAnchorEl(null);
    }
  };

  const handleClick = async (event) => {
    setAnchorEl(event.currentTarget);
  };

  const theme = useTheme();

  const formik = useFormik({
    initialValues: {
      stack_name: '',
      security_group_name: '',
      network_security_group_name: ''
    },
    // validationSchema: validateSchema(),

    onSubmit: async (values, { setSubmitting, resetForm }) => {
      setLoading(true);
      let awsModel = {};
      let azureModel = {};
      let response = {};

      handleClose();
      if (basicOpen) {
        awsModel = getAwsModel(
          values.stack_name,
          groupTfid,
          values.security_group_name,
          securityAWSGroups,
          awsTags
        );
        response = await saveInstance(awsModel);
      } else {
        azureModel = getAzureModel(
          values.stack_name,
          groupTfid,
          values?.network_security_group_name,
          azureNetworkLocation,
          azureResourceGroup_name,
          azureGroups,
          azureTags
        );
        response = await saveInstance(azureModel);
      }
      if (response.status == 200) {
        enqueueSnackbar('Resource create was successful.', {
          variant: 'success'
        });
        history.push(`${PATH_DASHBOARD.general.dashboard}`);
      } else {
        enqueueSnackbar('Resource create was unsuccessful.', {
          variant: 'error'
        });
      }
      setLoading(false);
      handleClose();
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

  const handleAddOption = (tfid) => {
    const gui = getUniqueId();

    setAWSSecurityGroups({
      ...securityAWSGroups,
      [`${gui}`]: {
        moduleType: 'security-group-rule',
        tfId: `${gui}`,
        type: 'ingress',
        fromPort: '',
        toPort: '',
        protocol: 'tcp',
        cidrBlocks: [''],
        securityGroupId: `${tfid}.id`,
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
    let cidrValues = group.cidrBlocks;

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

    setFieldValue('securityRules', securityAWSGroups);
    // console.log({ [indexNo]: { ...group, [property]: value } });
  };

  //AZURE

  const handleAzureAddOption = (tfid) => {
    const gui = getUniqueId();
    setAzureGroups({
      ...azureGroups,
      [gui]: {
        moduleType: 'network-security-rule',
        tfId: `${gui}`,
        name: '',
        priority: '',
        direction: 'Outbound',
        access: 'Allow',
        protocol: 'Tcp',
        sourcePortRange: '*',
        destinationPortRange: '*',
        sourceAddressPrefix: '*',
        destinationAddressPrefix: '*',
        resourceGroupName: '',
        networkSecurityGroupName: `${tfid}.name`
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

  const handleRuleErrors = () => {
    const securityRules = securityAWSGroups;

    Object.values(securityRules).map((item) => {
      Object.entries(item).forEach(([key, value]) => {
        if (value == null || value == undefined || value == '') {
          setRuleErrors({ ...ruleErrors, [key]: `${key} is required` });
        } else {
          delete item[key];
          setRuleErrors({ ...ruleErrors, item });
        }
      });
    });
  };

  const onCreateAwsTag = () => {
    const id = uuidv4();
    setAwsTags({ ...awsTags, [id]: { key: '', value: '', id: id } });
  };

  const onChangeAwsTags = (value, property, indexNo) => {
    let group = awsTags[indexNo];

    let dataValue = value;

    setAwsTags({
      ...awsTags,
      [indexNo]: { ...group, [property]: dataValue, id: indexNo }
    });

    setFieldValue('awsTags', awsTags);
    // console.log({ [indexNo]: { ...group, [property]: value } });
  };

  const handleremoveTags = (index) => {
    let tags = awsTags;

    delete tags[index];
    setAwsTags({ ...tags });
  };

  const onCreateAzureTag = () => {
    const id = uuidv4();
    setAzureTags({ ...azureTags, [id]: { key: '', value: '', id: id } });
  };

  const onChangeAzureTags = (value, property, indexNo) => {
    let group = azureTags[indexNo];

    let dataValue = value;

    setAzureTags({
      ...azureTags,
      [indexNo]: { ...group, [property]: dataValue, id: indexNo }
    });

    setFieldValue('azureTags', azureTags);
    // console.log({ [indexNo]: { ...group, [property]: value } });
  };

  const handleremoveAzureTags = (index) => {
    let tags = azureTags;

    delete tags[index];
    setAzureTags({ ...tags });
  };

  const validateResources = async () => {
    const awsModel = getAwsModel(
      values.stack_name,
      groupTfid,
      values.security_group_name,
      securityAWSGroups,
      awsTags
    );
    const response = await validateResource(awsModel);

    return response;
  };

  const handleDeleteDataSet = async () => {
    const response = await dispatch(handleDeleteDataSet(values.stack_name));
    if (response.status === 200) {
      enqueueSnackbar('Resource destroyed successfully.', {
        variant: 'success'
      });
    } else {
      enqueueSnackbar('Resource not destroyed successfully.', {
        variant: 'error'
      });
    }
  };

  return (
    <React.Fragment>
      {isLoading ? (
        <Box sx={{ py: '150px', display: 'flex', justifyContent: 'center' }}>
          <ComingSoon />
        </Box>
      ) : (
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
                label="Stack Name"
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
                  label="Security Group Name"
                  {...getFieldProps('security_group_name')}
                  error={Boolean(
                    touched.security_group_name && errors.security_group_name
                  )}
                  helperText={
                    touched.security_group_name && errors.security_group_name
                  }
                  className={classes.margin}
                  data-testid={'firstName'}
                />
                <Typography variant="caption">
                  Create the Security Group Tags
                </Typography>
                {Object.values(awsTags).map((item, thisIndex) => {
                  return (
                    <Box sx={{ mt: 2 }}>
                      <Grid container direction="row" spacing={1}>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            size="small"
                            value={item?.key}
                            onChange={(event) => {
                              const securityType = event.target.value;
                              onChangeAwsTags(securityType, 'key', item?.id);
                            }}
                            // error={!options[index]}
                            label={`Key ${thisIndex + 1}`}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            size="small"
                            value={item?.value}
                            onChange={(event) => {
                              const securityType = event.target.value;
                              onChangeAwsTags(securityType, 'value', item?.id);
                            }}
                            // error={!options[index]}
                            label={`Value ${thisIndex + 1}`}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            data-testid={'pollDelete'}
                            onClick={() => {
                              handleremoveTags(item?.id);
                            }}
                          >
                            <Icon icon={archiveOutline} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}
                <Box display="block" sx={{ my: 2 }}>
                  <Button
                    size="small"
                    onClick={() => onCreateAwsTag()}
                    startIcon={<Icon icon={plusFill} />}
                    // disabled={options.length >= 4}
                  >
                    Add a Tag
                  </Button>
                </Box>
                <Typography variant="caption">
                  Create the Security Group Rule/Rules
                </Typography>

                {Object.values(securityAWSGroups).map((option, index) => {
                  return (
                    <Box key={index} sx={{ mb: 2, mt: 2 }}>
                      <ControlledDropdown
                        options={AWS_SECURITY_TYPES}
                        value={option?.type}
                        property="type"
                        tfid={option?.tfId}
                        onChange={onchangeAwsSecurityGroups}
                        defaultValue={'ingress'}
                        label="Type"
                      />

                      <ControlledDropdown
                        options={AWS_SECURITY_PROTOOCALS}
                        value={option?.protocol}
                        property={'protocol'}
                        tfid={option?.tfId}
                        onChange={onchangeAwsSecurityGroups}
                        defaultValue={'tcp'}
                        label={'Protocol'}
                      />

                      <Grid container direction="row" spacing={1}>
                        <Grid item xs={6}>
                          <ControlledTextField
                            value={option?.fromPort}
                            property={'fromPort'}
                            tfid={option?.tfId}
                            onChange={onchangeAwsSecurityGroups}
                            label={'From Port'}
                            className={classes.margin}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <ControlledTextField
                            value={option?.toPort}
                            property={'toPort'}
                            tfid={option?.tfId}
                            onChange={onchangeAwsSecurityGroups}
                            label={'To Port'}
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
                              label={`Cidr ${thisIndex + 1}`}
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
                            startIcon={<Icon icon={minusFill} />}
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
                  onClick={() => handleAddOption(groupTfid)}
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
                  sx={{ mb: 1 }}
                  data-testid={'firstName'}
                />

                <Grid container direction="row" spacing={1} sx={{ mb: 1 }}>
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

                <Typography variant="caption">
                  Create the Security Group Tags
                </Typography>
                {Object.values(azureTags).map((item, thisIndex) => {
                  return (
                    <Box>
                      <Grid container direction="row" spacing={1}>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            size="small"
                            value={item?.key}
                            onChange={(event) => {
                              const securityType = event.target.value;
                              onChangeAzureTags(securityType, 'key', item?.id);
                            }}
                            // error={!options[index]}
                            label={`Key ${thisIndex + 1}`}
                          />
                        </Grid>
                        <Grid item xs={5}>
                          <TextField
                            fullWidth
                            size="small"
                            value={item?.value}
                            onChange={(event) => {
                              const securityType = event.target.value;
                              onChangeAzureTags(
                                securityType,
                                'value',
                                item?.id
                              );
                            }}
                            // error={!options[index]}
                            label={`Value ${thisIndex + 1}`}
                          />
                        </Grid>
                        <Grid item xs={2}>
                          <IconButton
                            data-testid={'pollDelete'}
                            onClick={() => {
                              handleremoveAzureTags(item?.id);
                            }}
                          >
                            <Icon icon={archiveOutline} />
                          </IconButton>
                        </Grid>
                      </Grid>
                    </Box>
                  );
                })}
                <Box display="block" sx={{ my: 2 }}>
                  <Button
                    size="small"
                    onClick={() => onCreateAzureTag()}
                    startIcon={<Icon icon={plusFill} />}
                    // disabled={options.length >= 4}
                  >
                    Add a Tag
                  </Button>
                </Box>

                <Typography variant="caption">
                  Create the Network Security Group Rule/Rules
                </Typography>

                {Object.values(azureGroups).map((option, indexAZ) => {
                  return (
                    <Box key={indexAZ} sx={{ mb: 2, mt: 2 }}>
                      <ControlledTextField
                        value={option?.name}
                        property="name"
                        tfid={option?.tfId}
                        onChange={onchangeAzureSecurityGroups}
                        label="Network Security Rule Name"
                        sx={{ mb: 1 }}
                      />
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
                            tfid={option?.tfId}
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
                            tfid={option?.tfId}
                            onChange={onchangeAzureSecurityGroups}
                            defaultValue={'Allow'}
                            label={`Access`}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <ControlledDropdown
                            options={AZURE_PROTOCALS}
                            value={option?.protocol}
                            property={'protocol'}
                            tfid={option?.tfId}
                            onChange={onchangeAzureSecurityGroups}
                            defaultValue={'Tcp'}
                            label={`Protocol`}
                          />
                        </Grid>
                      </Grid>

                      <Grid container direction="row" spacing={1} mb={1}>
                        <Grid item xs={6}>
                          <ControlledTextField
                            value={option?.sourcePortRange}
                            property="sourcePortRange"
                            tfid={option?.tfId}
                            onChange={onchangeAzureSecurityGroups}
                            label={`Source Port Range`}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <ControlledTextField
                            value={option?.destinationPortRange}
                            property="destinationPortRange"
                            tfid={option?.tfId}
                            onChange={onchangeAzureSecurityGroups}
                            label={`Destination Port Range`}
                          />
                        </Grid>
                      </Grid>
                      <Grid container direction="row" spacing={1} mb={1}>
                        <Grid item xs={6}>
                          <ControlledDropdown
                            options={AZURE_ADRESS_PREFIX}
                            value={option?.sourceAddressPrefix}
                            property={'sourceAddressPrefix'}
                            tfid={option?.tfId}
                            onChange={onchangeAzureSecurityGroups}
                            defaultValue={AZURE_ADRESS_PREFIX[0]?.value}
                            label={`Source Address Prefix`}
                          />
                        </Grid>
                        <Grid item xs={6}>
                          <ControlledDropdown
                            options={AZURE_ADRESS_PREFIX}
                            value={option?.destinationAddressPrefix}
                            property="destinationAddressPrefix"
                            tfid={option?.tfId}
                            onChange={onchangeAzureSecurityGroups}
                            defaultValue={AZURE_ADRESS_PREFIX[0]?.value}
                            label={`Destination Address Prefix`}
                          />
                        </Grid>
                      </Grid>

                      <ControlledTextField
                        value={option?.networkSecurityGroupName}
                        property="networkSecurityGroupName"
                        tfid={option?.tfId}
                        onChange={onchangeAzureSecurityGroups}
                        label={`Network Security Group Name`}
                        disabled
                        // disabled
                      />
                      {Object.values(azureGroups).length > 1 && (
                        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                          <Button
                            size="small"
                            sx={{ my: 2 }}
                            onClick={() =>
                              handleAzureDeleteOption(option?.tfId)
                            }
                            startIcon={<Icon icon={minusFill} />}
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
                  onClick={() => handleAzureAddOption(groupTfid)}
                  startIcon={<Icon icon={plusFill} />}
                  disabled={options.length >= 4}
                >
                  Add Security Group Rule
                </Button>
              </Collapse>

              <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <Button
                  size="small"
                  // type="submit"
                  onClick={handleClick}
                  variant="contained"
                  sx={{ my: 2 }}
                  startIcon={<Icon icon={plusFill} />}
                  disabled={options.length >= 4}
                >
                  Create Resource
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
      )}

      <Dialog
        open={open}
        onClose={handleClose}
        maxWidth={false}
        disableEscapeKeyDown={true}
        anchorel={anchorel}
      >
        <Box
          sx={{
            minHeight: 600,
            // width: 900,
            p: 4
          }}
        >
          <ViolationAccordian
            violations={resourceViolations}
            handleCancel={handleClose}
            validateResource={validateResources}
            handleSubmit={handleSubmit}
          />
        </Box>
      </Dialog>
    </React.Fragment>
  );
}

export default RuleAddEditForms;
