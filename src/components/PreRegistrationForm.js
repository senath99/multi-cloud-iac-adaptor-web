import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';

// material ui
import {
  Box,
  TextField,
  Typography,
  FormHelperText,
  Grid,
  Checkbox,
  Link,
  Autocomplete
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
// constants

import CircleUnchecked from '@material-ui/icons/CheckCircleOutline';
import CircleChecked from '@material-ui/icons/RadioButtonUncheckedOutlined';
import SuccessPage from 'src/views/SuccessPage';
import { registerClient } from 'src/redux/slices/registration';
import ErrorPage from 'src/views/ErrorPage';
// ----------------------------------------------------------------------

const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(3)
  },
  helperText: {
    padding: theme.spacing(0, 2)
  }
}));

PreRegistrationForm.propTypes = {};

function PreRegistrationForm({}) {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [eulaStatus, setEulaStatus] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [eula, setEula] = useState(null);
  const [stage, setStage] = useState(0);
  const [errorDesc, setErrorDesc] = useState('Unexpected Error');

  useEffect(() => {
    fetch('/documents/countries.json')
      .then((response) => response.json())
      .then((json) => setCountries(json));

    fetch('/documents/eula.json')
      .then((response) => response.json())
      .then((json) => setEula(json));
  }, []);

  const ContainerSchemaValues = Yup.object().shape({
    fNameField: Yup.string()
      .min(1)
      .max(55)
      .required('First Name is required')
      .label('First Name'),
    lNameField: Yup.string()
      .min(1)
      .max(55)
      .required('Last Name is required')
      .label('Last Name'),
    companyNameField: Yup.string()
      .min(1)
      .max(55)
      .required('Business Name is required')
      .label('Business Name'),
    companyMailField: Yup.string()
      .email()
      .required('Business Email is required')
      .label('Business Email'),
    countryField: Yup.mixed().required('Country is required').label('Country'),
    address1Field: Yup.string()
      .min(1)
      .max(55)
      .required('Address 1 is required')
      .label('Address 1'),
    address2Field: Yup.string().min(2).max(55).label('Address 2'),
    cityField: Yup.string().max(55).required('City is required').label('City'),
    stateField: Yup.string()
      .min(1)
      .max(55)
      .required('State is required')
      .label('State'),
    postalCodeField: Yup.string()
      .min(1)
      .max(55)
      .required('Postal Code is required')
      .label('Postal Code'),
    phoneNumberField: Yup.string()
      .max(55)
      .required('Phone Number is required')
      .label('Phone Number'),
    isEulaAccepted: Yup.bool().oneOf(
      [true],
      'You must click on the check box and adhere to the terms and conditons'
    )
  });

  const getRegistrationDTO = (values) => {
    return {
      marketplaceToken: queryParams.get('x-amzn-marketplace-token'),
      companyDetails: {
        country: selectedCountry,
        addressLine1: values.address1Field,
        addressLine2: values.address2Field,
        city: values.cityField,
        province: values.provinceField,
        postalCode: values.postalCodeField,
        phoneNumber: values.phoneNumberField,
        contactPerson: {
          fName: values.fNameField,
          lName: values.lNameField
        }
      },
      companyName: values.companyNameField,
      businessEmail: values.companyMailField,
      clientName: values.companyMailField.split('@')[1].split('.')[0],
      clientDomain: values.companyMailField.split('@')[1],
      eULAVersion: eula.eULAVersion,
      eULAAccepted: values.isEulaAccepted
    };
  };

  const initialSchemaValues = {
    fNameField: '',
    lNameField: '',
    companyMailField: '',
    companyNameField: '',
    countryField: '',
    address1Field: '',
    address2Field: '',
    cityField: '',
    stateField: '',
    postalCodeField: '',
    phoneNumberField: '',
    portalCodeField: '',
    isEulaAccepted: false,
    customerIdentifier: ''
  };

  const changeEulaStatus = () => {
    setEulaStatus(!eulaStatus);
    setFieldValue('isEulaAccepted', !eulaStatus);
  };

  const formik = useFormik({
    initialValues: initialSchemaValues,
    validationSchema: ContainerSchemaValues,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      const data = getRegistrationDTO(values);
      setSubmitting(true);
      const response = await registerClient(data);
      console.log(JSON.stringify(data));
      if (response.status === 200) {
        setStage(1);
        enqueueSnackbar(
          <div>
            <Typography variant="subtitle2">
              Registration was successful.
            </Typography>
          </div>,
          {
            variant: 'success'
          }
        );
      } else {
        setErrorDesc(response?.errorDesc);
        setStage(2);
        enqueueSnackbar(
          <div>
            <Typography variant="subtitle2">
              Registration was unsuccessful.
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {response?.errorDesc}
            </Typography>
          </div>,
          {
            variant: 'error'
          }
        );
      }
      // resetForm();
    }
  });

  const classes = useStyles();
  const {
    errors,
    values,
    touched,
    handleSubmit,
    isSubmitting,
    setFieldValue,
    getFieldProps
  } = formik;

  const changeHandler = (_, value) => {
    console.log(value);
    setSelectedCountry({
      name: value?.country_name_en,
      m49Code: value?.m49
    });
    setFieldValue('countryField', {
      name: value?.country_name_en,
      m49Code: value?.m49
    });
  };

  return (
    <>
      {stage == 1 ? (
        <SuccessPage />
      ) : stage == 2 ? (
        <ErrorPage errorDesc={errorDesc} />
      ) : (
        <FormikProvider value={formik}>
          <Form
            noValidate
            autoComplete="off"
            onSubmit={handleSubmit}
            enablereinitialize="true"
          >
            <Grid direction="row" container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Type the First Name"
                  {...getFieldProps('fNameField')}
                  error={Boolean(touched.fNameField && errors.fNameField)}
                  helperText={touched.fNameField && errors.fNameField}
                  className={classes.margin}
                  data-testid="fname"
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Type the Last Name"
                  {...getFieldProps('lNameField')}
                  error={Boolean(touched.lNameField && errors.lNameField)}
                  helperText={touched.lNameField && errors.lNameField}
                  className={classes.margin}
                  data-testid="lName"
                />
              </Grid>
            </Grid>
            <TextField
              autoComplete="off"
              fullWidth
              label={'Type the Business Email'}
              {...getFieldProps('companyMailField')}
              error={Boolean(
                touched.companyMailField && errors.companyMailField
              )}
              helperText={touched.companyMailField && errors.companyMailField}
              className={classes.margin}
              data-testid="companyEmail"
            />
            <TextField
              autoComplete="off"
              fullWidth
              label="Type the Company Name"
              {...getFieldProps('companyNameField')}
              error={Boolean(
                touched.companyNameField && errors.companyNameField
              )}
              helperText={touched.companyNameField && errors.companyNameField}
              className={classes.margin}
              data-testid="companyName"
            />
            <Autocomplete
              autoComplete="off"
              fullWidth
              options={countries}
              value={selectedCountry?.country_name_en}
              getOptionLabel={(option) => option?.country_name_en}
              onChange={changeHandler}
              filterSelectedOptions
              renderInput={(params) => (
                <TextField
                  {...params}
                  label="Select your country"
                  error={Boolean(touched.countryField && errors.countryField)}
                  helperText={touched.countryField && errors.countryField}
                />
              )}
              sx={{ mb: 2 }}
            />

            <TextField
              autoComplete="off"
              fullWidth
              multiline
              label="Type Address Line 1"
              maxRows={5}
              {...getFieldProps('address1Field')}
              error={Boolean(touched.address1Field && errors.address1Field)}
              helperText={touched.address1Field && errors.address1Field}
              className={classes.margin}
              data-testid="address1"
            />
            <TextField
              autoComplete="off"
              fullWidth
              multiline
              label="Type Address Line 2"
              maxRows={5}
              {...getFieldProps('address2Field')}
              error={Boolean(touched.address2Field && errors.address2Field)}
              helperText={touched.address2Field && errors.address2Field}
              className={classes.margin}
              data-testid="address2"
            />
            <Grid direction="row" container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Type the City"
                  {...getFieldProps('cityField')}
                  error={Boolean(touched.cityField && errors.cityField)}
                  helperText={touched.cityField && errors.cityField}
                  className={classes.margin}
                  data-testid="city"
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Type the State/Province"
                  {...getFieldProps('stateField')}
                  error={Boolean(touched.stateField && errors.stateField)}
                  helperText={touched.stateField && errors.stateField}
                  className={classes.margin}
                  data-testid="state"
                />
              </Grid>
            </Grid>
            <Grid direction="row" container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Type the Postal Code"
                  {...getFieldProps('postalCodeField')}
                  error={Boolean(
                    touched.postalCodeField && errors.postalCodeField
                  )}
                  helperText={touched.postalCodeField && errors.postalCodeField}
                  className={classes.margin}
                  data-testid="postalCode"
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  autoComplete="off"
                  type="number"
                  fullWidth
                  label="Type the Phone Number"
                  {...getFieldProps('phoneNumberField')}
                  error={Boolean(
                    touched.phoneNumberField && errors.phoneNumberField
                  )}
                  helperText={
                    touched.phoneNumberField && errors.phoneNumberField
                  }
                  className={classes.margin}
                  data-testid="pNumber"
                />
              </Grid>
            </Grid>
            <Checkbox
              value={eulaStatus}
              onChange={changeEulaStatus}
              icon={<CircleChecked fontSize={'medium'} />}
              checkedIcon={<CircleUnchecked fontSize={'medium'} />}
            />

            <Typography variant="caption">
              I hereby agree to abide by the terms and conditions as provided in
              the{' '}
              <Link href={eula?.eulaUrl} sx={{ cursor: 'pointer' }}>
                licence agreement
              </Link>
            </Typography>
            <FormHelperText error className={classes.helperText}>
              {touched?.isEulaAccepted && errors?.isEulaAccepted}
            </FormHelperText>
            <Box
              sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 5 }}
            >
              <LoadingButton
                type="submit"
                variant="contained"
                pending={isSubmitting}
              >
                Sign Up
              </LoadingButton>
            </Box>
          </Form>
        </FormikProvider>
      )}
    </>
  );
}

export default PreRegistrationForm;
