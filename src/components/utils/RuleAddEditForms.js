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
import SwitchSelector from 'react-switch-selector';

import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
import archiveOutline from '@iconify/icons-eva/archive-outline';
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

function RuleAddEditForms({
  onCreateUser,
  onEditUser,
  singleUser,
  isEditMode,
  permissions,
  className,
  countries,
  groups,
  dataRestrictions
}) {
  const classes = useStyles();
  const [options, setOptions] = useState(['']);
  const formik = useFormik({});
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

  const handleOptionChange = (event, index) => {
    let _options = [...options];
    _options.splice(index, 1, event.target.value);
    setOptions(_options);
    setFieldValue('options', _options);
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
              // {...getFieldProps('firstName')}
              // error={Boolean(touched.firstName && errors.firstName)}
              // helperText={touched.firstName && errors.firstName}
              className={classes.margin}
              data-testid={'firstName'}
            />
            <Box sx={{ my: 3, height: 40, width: '60%' }}>
              <SwitchSelector
                // onChange={() => {
                //   setBasicOpen(!basicOpen);
                //   setAdvancedOpen(!advancedOpen);
                //   // setSearchCommand('');
                // }}
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
            <TextField
              fullWidth
              size="small"
              label="Type the Security Group Name"
              // {...getFieldProps('firstName')}
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
                  <TextField
                    sx={{ mb: 1 }}
                    fullWidth
                    size="small"
                    value={options[index]}
                    onChange={(event) => {
                      handleOptionChange(event, index);
                    }}
                    error={!options[index]}
                    label={`Type`}
                  />

                  <TextField
                    sx={{ mb: 1 }}
                    fullWidth
                    size="small"
                    value={options[index]}
                    onChange={(event) => {
                      handleOptionChange(event, index);
                    }}
                    error={!options[index]}
                    label={`Protocol`}
                  />

                  <Grid container direction="row" spacing={1}>
                    <Grid item xs={6}>
                      <TextField
                        fullWidth
                        size="small"
                        value={options[index]}
                        onChange={(event) => {
                          handleOptionChange(event, index);
                        }}
                        error={!options[index]}
                        label={`From Port`}
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
                        error={!options[index]}
                        label={`To Port`}
                      />
                    </Grid>
                  </Grid>

                  {options.map((option, index) => {
                    return (
                      <Box key={index} sx={{ mt: 2 }}>
                        <TextField
                          sx={{ width: '49%' }}
                          fullWidth
                          size="small"
                          value={options[index]}
                          onChange={(event) => {
                            handleOptionChange(event, index);
                          }}
                          error={!options[index]}
                          label={`Type`}
                          InputProps={{
                            endAdornment: (
                              <InputAdornment>
                                <IconButton
                                  data-testid={'pollDelete'}
                                  onClick={() => {
                                    handleDeleteOption(index);
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
                    onClick={handleAddOption}
                    startIcon={<Icon icon={plusFill} />}
                    disabled={options.length >= 4}
                  >
                    Add CIDR Block
                  </Button>
                  <Box sx={{ display: 'flex', justifyContent: 'right' }}>
                    {/* <IconButton
                      data-testid={'pollDelete'}
                      onClick={() => {
                        handleDeleteOption(index);
                      }}
                    >
                      <Icon icon={archiveOutline} />
                    </IconButton> */}

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
          </Form>
        </FormikProvider>
      </Box>
    </React.Fragment>
  );
}

export default RuleAddEditForms;
