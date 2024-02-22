import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import { isEqual, pick, sortBy } from 'lodash';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { capitalCase } from 'change-case';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { Form, FormikProvider } from 'formik';
import { useSnackbar } from 'notistack';
import jwtDecode from 'jwt-decode';

// material
import {
  Box,
  TextField,
  Typography,
  Grid,
  Button,
  Autocomplete,
  ToggleButtonGroup,
  Checkbox,
  ToggleButton,
  InputAdornment,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  FormHelperText,
  RadioGroup,
  Radio,
  FormControlLabel,
  Collapse,
  Popover,
  IconButton,
  Alert,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';
import SwitchSelector from 'react-switch-selector';

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import archiveOutline from '@iconify/icons-eva/archive-outline';
import DropDownFilter from '../DropDownFilter';
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

const AWS_BODY = {
  stackName: '',
  provider: {
    type: 'aws',
    tfId: 'aws-provider-id',
    region: 'us-east-1'
  },
  backend: {
    type: 'local',
    path: './terraform.tf-demo.tfstate'
  },
  modules: [
    {
      stackName: 'aws-stack',
      provider: {
        type: 'aws',
        tfId: 'aws-provider-id-<<unique-id>>',
        region: 'us-east-1'
      },
      backend: {
        type: 'local',
        path: './terraform.tf-demo.tfstate'
      },
      modules: [
        {
          moduleType: 'security-group',
          tfId: 'sg-id-<<id>>',
          name: 'my-security-group'
        },
        {
          moduleType: 'security-group-rule',
          tfId: 'sgr-id-<<id>>',
          type: 'ingress',
          fromPort: 80,
          toPort: 80,
          protocol: 'tcp',
          cidrBlocks: ['10.0.3.0/32', '10.0.3.128/32'],
          securityGroupId: 'sg-id.id'
        }
      ]
    }
  ]
};

function RuleAddEditForms({ className }) {
  const classes = useStyles();
  const [options, setOptions] = useState(['']);
  const [basicOpen, setBasicOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);
  const [awsSecurityType, setawsSecurityType] = useState(AWS_SECURITY_TYPES[0]);

  const [cidrBlocks, setCidrBlocks] = useState(['']);
  const [securityAWSGroups, setAWSSecurityGroups] = useState([]);
  const formik = useFormik({
    initialValues: {
      security_group_name: '',
      newPassword: '',
      confirmNewPassword: ''
    }
  });
  const theme = useTheme();
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
    setOptions([...options, '']);
  };

  const handleDeleteOption = (index) => {
    let _options = [...options];
    if (options.length !== 1) {
      _options.splice(index, 1);
      setOptions(_options);
      setFieldValue('options', _options);
    }
  };

  const handleAddCIDROption = () => {
    setCidrBlocks([...cidrBlocks, '']);
  };

  const handleDeleteCidrOption = (index) => {
    let _options = [...cidrBlocks];
    if (cidrBlocks.length !== 1) {
      _options.splice(index, 1);
      setCidrBlocks(_options);
      setFieldValue('cidrBlocks', _options);
    }
  };

  const handleOptionChange = (event, index) => {
    let _options = [...options];
    _options.splice(index, 1, event.target.value);
    setOptions(_options);
    setFieldValue('options', _options);
  };

  const onAwsType = (event) => {
    setawsSecurityType(event.target.value);
  };

  const onchangeAwsSecurityGroups = (value, property, indexNo) => {
    let group = securityAWSGroups.filter(
      (item, index) => Object.keys(item)[0] == indexNo
    );

    setAWSSecurityGroups([{ [indexNo]: { [property]: value }, ...group }]);
  };

  return (
    <React.Fragment>
      <Box container sx={{ minWidth: '60vw', maxWidth: '60vw', pt: '20px' }}>
        <FormikProvider value={formik}>
          <Form
            noValidate
            autoComplete="off"
            // onSubmit={handleSubmit}
            className={clsx(classes.root, className)}
            enablereinitialize="true"
          >
            <TextField
              fullWidth
              size="small"
              label="Type the Stack Name"
              {...getFieldProps('stack_name')}
              // error={Boolean(touched.firstName && errors.firstName)}
              // helperText={touched.firstName && errors.firstName}
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

              {options.map((option, index) => {
                return (
                  <Box key={index} sx={{ mb: 2, mt: 2 }}>
                    <DropDownFilter
                      sx={{ mb: 1 }}
                      label="Type"
                      defaultValue={'ingress'}
                      size="small"
                      data={AWS_SECURITY_TYPES}
                      value={securityAWSGroups[index]?.type}
                      onChange={(event) => {
                        const securityType = event.target.value;
                        onchangeAwsSecurityGroups(securityType, 'type', index);
                      }}
                    />

                    <DropDownFilter
                      sx={{ mb: 1 }}
                      label={`Protocol`}
                      defaultValue={'tcp'}
                      size="small"
                      data={AWS_SECURITY_PROTOOCALS}
                      value={securityAWSGroups[index]?.protocol}
                      // value={awsSecurityType}
                      onChange={(event) => {
                        const securityType = event.target.value;
                        onchangeAwsSecurityGroups(
                          securityType,
                          'protocol',
                          index
                        );
                      }}
                    />

                    <Grid container direction="row" spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size="small"
                          value={securityAWSGroups[index]?.fromPort}
                          onChange={(event) => {
                            const securityType = event.target.value;
                            onchangeAwsSecurityGroups(
                              securityType,
                              'fromPort',
                              index
                            );
                          }}
                          // error={!options[index]}
                          label={`From Port`}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size="small"
                          type="number"
                          value={securityAWSGroups[index]?.toPort}
                          onChange={(event) => {
                            const securityType = event.target.value;
                            onchangeAwsSecurityGroups(
                              securityType,
                              'toPort',
                              index
                            );
                          }}
                          // error={!options[index]}
                          label={`To Port`}
                        />
                      </Grid>
                    </Grid>

                    {cidrBlocks.map((option, index) => {
                      return (
                        <Box key={index} sx={{ mt: 2 }}>
                          <TextField
                            sx={{ width: '49%' }}
                            fullWidth
                            size="small"
                            value={options[index]}
                            onChange={(event) => {
                              const securityType = event.target.value;
                              onchangeAwsSecurityGroups(
                                securityType,
                                'toPort',
                                index
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
                                      handleDeleteCidrOption(index);
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
                      onClick={handleAddCIDROption}
                      startIcon={<Icon icon={plusFill} />}
                      disabled={options.length >= 4}
                    >
                      Add CIDR Block
                    </Button>
                    <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                      <Button
                        size="small"
                        sx={{ my: 2 }}
                        onClick={handleDeleteCidrOption}
                        startIcon={<Icon icon={plusFill} />}
                        disabled={options.length >= 4}
                      >
                        Remove Security Group Rule
                      </Button>
                    </Box>

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
                sx={{ my: 2 }}
                // value={options[index]}
                // onChange={(event) => {
                //   handleOptionChange(event, index);
                // }}
                // error={!options[index]}
                label={`NetWork Security Group Name`}
              />

              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  <DropDownFilter
                    sx={{ mb: 1 }}
                    label={`Location`}
                    defaultValue={'East US'}
                    size="small"
                    data={AZURE_LOCATIONS}
                    // value={awsSecurityType}
                    onChange={(event) => {
                      const dateRange = event.target.value;
                      // handleFilterChange('dateRange', dateRange);
                      setawsSecurityType(dateRange);
                    }}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    // value={options[index]}
                    // onChange={(event) => {
                    //   handleOptionChange(event, index);
                    // }}
                    // error={!options[index]}
                    label={`Resource Group Name`}
                  />
                </Grid>
              </Grid>
              <Typography variant="caption">
                Create the Network Security Group Rule/Rules
              </Typography>

              {options.map((option, index) => {
                return (
                  <Box key={index} sx={{ mb: 2, mt: 2 }}>
                    <TextField
                      sx={{ mb: 1 }}
                      fullWidth
                      size="small"
                      value={options[index]}
                      onChange={(event) => {
                        handleOptionChange(event, index);
                      }}
                      // error={!options[index]}
                      label={`Network Security Rule Name`}
                    />

                    <Grid container direction="row" spacing={1} mb={1}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          type="number"
                          size="small"
                          value={options[index]}
                          onChange={(event) => {
                            handleOptionChange(event, index);
                          }}
                          // error={!options[index]}
                          label={`Priority`}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DropDownFilter
                          sx={{ mb: 1 }}
                          label={`Direction`}
                          defaultValue={'Inbound'}
                          size="small"
                          data={AZURE_DIRECTIONS}
                          // value={awsSecurityType}
                          onChange={(event) => {
                            const dateRange = event.target.value;
                            // handleFilterChange('dateRange', dateRange);
                            setawsSecurityType(dateRange);
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid container direction="row" spacing={1} mb={1}>
                      <Grid item xs={6}>
                        <DropDownFilter
                          sx={{ mb: 1 }}
                          label={`Access`}
                          defaultValue={'Allow'}
                          size="small"
                          data={AZURE_ACCESS}
                          // value={awsSecurityType}
                          onChange={(event) => {
                            const dateRange = event.target.value;
                            // handleFilterChange('dateRange', dateRange);
                            setawsSecurityType(dateRange);
                          }}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <DropDownFilter
                          sx={{ mb: 1 }}
                          label={`Protocol`}
                          defaultValue={'tcp'}
                          size="small"
                          data={AWS_SECURITY_PROTOOCALS}
                          // value={awsSecurityType}
                          onChange={(event) => {
                            const dateRange = event.target.value;
                            // handleFilterChange('dateRange', dateRange);
                            setawsSecurityType(dateRange);
                          }}
                        />
                      </Grid>
                    </Grid>

                    <Grid container direction="row" spacing={1} mb={1}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size="small"
                          value={options[index]}
                          onChange={(event) => {
                            handleOptionChange(event, index);
                          }}
                          // error={!options[index]}
                          label={`Source Port Range`}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size="small"
                          value={options[index]}
                          onChange={(event) => {
                            handleOptionChange(event, index);
                          }}
                          // error={!options[index]}
                          label={`Destination Port Range`}
                        />
                      </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={1} mb={1}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size="small"
                          value={options[index]}
                          onChange={(event) => {
                            handleOptionChange(event, index);
                          }}
                          // error={!options[index]}
                          label={`Source Address Prefix`}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size="small"
                          value={options[index]}
                          onChange={(event) => {
                            handleOptionChange(event, index);
                          }}
                          // error={!options[index]}
                          label={`Destination Address Prefix`}
                        />
                      </Grid>
                    </Grid>
                    <Grid container direction="row" spacing={1}>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size="small"
                          value={options[index]}
                          onChange={(event) => {
                            handleOptionChange(event, index);
                          }}
                          // error={!options[index]}
                          label={`Resource Group Name`}
                        />
                      </Grid>
                      <Grid item xs={6}>
                        <TextField
                          fullWidth
                          size="small"
                          value={options[index]}
                          onChange={(event) => {
                            handleOptionChange(event, index);
                          }}
                          // error={!options[index]}
                          label={`Network Security Group Name`}
                        />
                      </Grid>
                    </Grid>

                    <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                      <Button
                        size="small"
                        sx={{ my: 2 }}
                        onClick={handleAddOption}
                        startIcon={<Icon icon={plusFill} />}
                        disabled={options.length >= 4}
                      >
                        Remove Security Group Rule
                      </Button>
                    </Box>

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
          </Form>
        </FormikProvider>
      </Box>
    </React.Fragment>
  );
}

export default RuleAddEditForms;
