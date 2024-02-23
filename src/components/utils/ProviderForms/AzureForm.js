import React, { useState } from 'react';

import { useFormik } from 'formik';

// material
import {
  Box,
  TextField,
  Typography,
  Grid,
  Button,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { useTheme } from '@material-ui/core/styles';

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import DropDownFilter from '../DropDownFilter';

import { v4 as uuidv4 } from 'uuid';
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
  stackName: 'aws-stack',
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
      moduleType: 'security-group',
      tfId: '',
      name: ''
    },
    {
      moduleType: 'security-group-rule',
      tfId: '',
      type: '',
      fromPort: 0,
      toPort: 0,
      protocol: '',
      cidrBlocks: [],
      securityGroupId: ''
    }
  ]
};

function RuleAddEditForms({ className }) {
  const classes = useStyles();
  const [options, setOptions] = useState(['']);
  const [basicOpen, setBasicOpen] = useState(true);
  const [advancedOpen, setAdvancedOpen] = useState(false);

  const [azureGroups, setAzureGroups] = useState({
    0: {
      moduleType: 'network-security-rule',
      tfId: '',
      name: '',
      priority: null,
      direction: '',
      access: '',
      protocol: '',
      sourcePortRange: '*',
      destinationPortRange: '*',
      sourceAddressPrefix: '*',
      destinationAddressPrefix: '*',
      resourceGroupName: '',
      networkSecurityGroupName: '',
      id: 0
    }
  });
  const [securityAWSGroups, setAWSSecurityGroups] = useState({
    0: {
      moduleType: 'security-group-rule',
      tfId: '334434334333434',
      type: 'ingress',
      fromPort: 0,
      toPort: 0,
      protocol: 'tcp',
      cidrBlocks: [''],
      securityGroupId: '',
      id: 0
    }
  });

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
    const gui = uuidv4();

    setAWSSecurityGroups({
      ...securityAWSGroups,
      [gui]: {
        moduleType: 'security-group-rule',
        tfId: '334434334333434',
        type: 'ingress',
        fromPort: 0,
        toPort: 0,
        protocol: 'tcp',
        cidrBlocks: [''],
        securityGroupId: '',
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
    // console.log({ [indexNo]: { ...group, [property]: value } });
  };

  //AZURE

  const handleAzureAddOption = (index) => {
    const gui = uuidv4();
    setAzureGroups({
      ...azureGroups,
      [gui]: {
        moduleType: 'network-security-rule',
        tfId: '',
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
        networkSecurityGroupName: '',
        id: gui
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
    // console.log({ [indexNo]: { ...group, [property]: value } });
  };

  return (
    <React.Fragment>
      <Box container sx={{ minWidth: '60vw', maxWidth: '60vw', pt: '20px' }}>
        <Typography variant="caption">
          Create the Network Security Group Rule/Rules
        </Typography>

        {Object.values(azureGroups).map((option, indexAZ) => {
          return (
            <Box key={indexAZ} sx={{ mb: 2, mt: 2 }}>
              <TextField
                sx={{ mb: 1 }}
                fullWidth
                size="small"
                value={option?.name}
                onChange={(event) => {
                  const securityType = event.target.value;
                  onchangeAzureSecurityGroups(securityType, 'name', option?.id);
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
                    value={option?.priority}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      onchangeAzureSecurityGroups(
                        securityType,
                        'priority',
                        option?.id
                      );
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
                    value={option?.direction}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      onchangeAzureSecurityGroups(
                        securityType,
                        'direction',
                        option?.id
                      );
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
                    value={option?.access}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      onchangeAzureSecurityGroups(
                        securityType,
                        'access',
                        option?.id
                      );
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
                    value={option?.protocol}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      onchangeAzureSecurityGroups(
                        securityType,
                        'protocol',
                        option?.id
                      );
                    }}
                  />
                </Grid>
              </Grid>

              <Grid container direction="row" spacing={1} mb={1}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    value={option?.sourcePortRange}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      onchangeAzureSecurityGroups(
                        securityType,
                        'sourcePortRange',
                        option?.id
                      );
                    }}
                    // error={!options[index]}
                    label={`Source Port Range`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    value={option?.destinationPortRange}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      onchangeAzureSecurityGroups(
                        securityType,
                        'destinationPortRange',
                        option?.id
                      );
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
                    value={option?.sourceAddressPrefix}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      onchangeAzureSecurityGroups(
                        securityType,
                        'sourceAddressPrefix',
                        option?.id
                      );
                    }}
                    // error={!options[index]}
                    label={`Source Address Prefix`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    value={option?.destinationAddressPrefix}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      onchangeAzureSecurityGroups(
                        securityType,
                        'destinationAddressPrefixype',
                        option?.id
                      );
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
                    value={option[indexAZ]}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      onchangeAzureSecurityGroups(
                        securityType,
                        'resourceGroupName',
                        option?.id
                      );
                    }}
                    // error={!options[index]}
                    label={`Resource Group Name`}
                  />
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    value={option?.resourceGroupName}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      onchangeAzureSecurityGroups(
                        securityType,
                        'networkSecurityGroupName',
                        option?.id
                      );
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
                  onClick={() => handleAzureDeleteOption(option?.id)}
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
          onClick={() => handleAzureAddOption()}
          startIcon={<Icon icon={plusFill} />}
          disabled={options.length >= 4}
        >
          Add Security Group Rule
        </Button>
      </Box>
    </React.Fragment>
  );
}

export default RuleAddEditForms;
