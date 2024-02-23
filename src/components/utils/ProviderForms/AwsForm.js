import React, { useState } from 'react';
import { useFormik } from 'formik';

// material
import {
  Box,
  TextField,
  Typography,
  Grid,
  Button,
  InputAdornment,
  IconButton,
  Divider
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import archiveOutline from '@iconify/icons-eva/archive-outline';
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

function RuleAddEditForms({}) {
  const classes = useStyles();

  const [securityAWSGroups, setAWSSecurityGroups] = useState({
    0: {
      moduleType: 'security-group-rule',
      tfId: '334434334333434',
      type: 'ingress',
      fromPort: '',
      toPort: '',
      protocol: 'tcp',
      cidrBlocks: [''],
      securityGroupId: '',
      id: 0
    }
  });

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

  return (
    <React.Fragment>
      <Box container sx={{ minWidth: '60vw', maxWidth: '60vw', pt: '20px' }}>
        <Typography variant="caption">
          Create the Security Group Rule/Rules
        </Typography>

        {Object.values(securityAWSGroups).map((option, index) => {
          return (
            <Box key={index} sx={{ mb: 2, mt: 2 }}>
              <DropDownFilter
                sx={{ mb: 1 }}
                label="Type"
                defaultValue={'ingress'}
                size="small"
                data={AWS_SECURITY_TYPES}
                value={option?.type}
                onChange={(event) => {
                  const securityType = event.target.value;
                  onchangeAwsSecurityGroups(securityType, 'type', option?.id);
                }}
              />

              <DropDownFilter
                sx={{ mb: 1 }}
                label={`Protocol`}
                defaultValue={'tcp'}
                size="small"
                data={AWS_SECURITY_PROTOOCALS}
                value={option?.protocol}
                // value={awsSecurityType}
                onChange={(event) => {
                  const securityType = event.target.value;
                  onchangeAwsSecurityGroups(
                    securityType,
                    'protocol',
                    option?.id
                  );
                }}
              />

              <Grid container direction="row" spacing={1}>
                <Grid item xs={6}>
                  <TextField
                    fullWidth
                    size="small"
                    value={option?.fromPort}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      onchangeAwsSecurityGroups(
                        securityType,
                        'fromPort',
                        option?.id
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
                    value={option?.toPort}
                    onChange={(event) => {
                      const securityType = event.target.value;
                      onchangeAwsSecurityGroups(
                        securityType,
                        'toPort',
                        option?.id
                      );
                    }}
                    // error={!options[index]}
                    label={`To Port`}
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
                          option?.id,
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
                                handleDeleteCidrOption(option?.id, thisIndex);
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
                onClick={() => handleAddCIDROption(option?.id)}
                startIcon={<Icon icon={plusFill} />}
                // disabled={options.length >= 4}
              >
                Add CIDR Block
              </Button>
              <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                <Button
                  size="small"
                  sx={{ my: 2 }}
                  onClick={() => handleDeleteOption(option?.id)}
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

        <Box sx={{ display: 'flex', justifyContent: 'right' }}>
          <Button
            size="small"
            variant="contained"
            sx={{ my: 2 }}
            onClick={handleAddOption}
            startIcon={<Icon icon={plusFill} />}
            disabled={options.length >= 4}
          >
            Create Rule
          </Button>

          <Button
            sx={{ ml: 4, my: 2 }}
            size="small"
            variant="contained"
            onClick={handleAddOption}
            disabled={options.length >= 4}
          >
            Cancel
          </Button>
        </Box>
      </Box>
    </React.Fragment>
  );
}

export default RuleAddEditForms;
