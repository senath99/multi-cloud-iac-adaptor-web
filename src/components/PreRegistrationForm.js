import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import clsx from 'clsx';
import { isEqual, pick } from 'lodash';
import * as Yup from 'yup';
import PropTypes from 'prop-types';
import { Form, FormikProvider, useFormik } from 'formik';
import { useSnackbar } from 'notistack';
import { PATH_DASHBOARD } from '../routes/paths';
// components

// material ui
import {
  Box,
  TextField,
  Typography,
  FormHelperText,
  Button,
  Grid,
  InputLabel,
  Select,
  FormControl,
  MenuItem,
  InputAdornment,
  Radio,
  Checkbox,
  Link,
  Autocomplete
} from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { LoadingButton } from '@material-ui/lab';
// constants

import CircleUnchecked from '@material-ui/icons/CheckCircleOutline';
import CircleChecked from '@material-ui/icons/RadioButtonUncheckedOutlined';
import DropDownFilter from './DropDownFilter';
import { useMemo } from 'react';
import countryList from 'react-select-country-list';
import SuccessPage from 'src/views/SuccessPage';
import { registerClient } from 'src/redux/slices/blog';
// ----------------------------------------------------------------------

// ----------------------------------------------------------------------
const useStyles = makeStyles((theme) => ({
  margin: {
    marginBottom: theme.spacing(3)
  },
  helperText: {
    padding: theme.spacing(0, 2)
  }
}));

PreRegistrationForm.propTypes = {
  onCreateDigitalResourceContainer: PropTypes.func,
  onUpdateDigitalResourceContainer: PropTypes.func,
  singleContainer: PropTypes.object,
  interestGroups: PropTypes.array,
  isEditMode: PropTypes.bool,
  setInitialDigitalResourceContainer: PropTypes.func,
  className: PropTypes.string
};

function PreRegistrationForm({}) {
  const { enqueueSnackbar } = useSnackbar();
  const history = useHistory();
  const queryParams = new URLSearchParams(window.location.search);
  const [eulaStatus, setEulaStatus] = useState(false);
  const [countries, setCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [eula, setEula] = useState(null);
  const [stage, setStage] = useState(0);

  useEffect(() => {
    fetch('/documents/countries.json')
      .then((response) => response.json())
      .then((json) => setCountries(json));

    fetch('/documents/eula.json')
      .then((response) => response.json())
      .then((json) => setEula(json));
  }, []);

  const ContainerSchemaValues = Yup.object().shape({
    fName: Yup.string().min(2).max(55).required().label('First Name'),
    lName: Yup.string().min(2).max(55).required().label('Last Name'),
    companyName: Yup.string().min(2).max(55).required().label('Business Name'),
    companyMail: Yup.string()
      .email()
      .required('Email Address is required')
      .label('Business Email'),
    country: Yup.mixed().required().label('Country'),
    address1: Yup.string().min(2).max(55).required().label('Address 1'),
    address2: Yup.string().min(2).max(55).required().label('Address 2'),
    city: Yup.string().min(2).max(55).required().label('City'),
    state: Yup.string().min(2).max(55).required().label('State'),
    postalCode: Yup.string().min(2).max(55).required().label('Postal Code'),
    phoneNumber: Yup.string().min(2).max(55).required().label('Phone Number'),
    isEulaAccepted: Yup.bool().oneOf([true], 'Field must be checked')
  });

  const getRegistrationDTO = (values) => {
    return {
      marketplaceToken: queryParams.get('x-amzn-marketplace-token'),
      companyDetails: {
        country: { name: selectedCountry },
        addressLine1: values.address1,
        addressLine2: values.address2,
        city: values.city,
        province: values.province,
        postalCode: values.postalCode,
        phoneNumber: values.phoneNumber,
        contactPerson: {
          fName: values.fName,
          lName: values.lName
        }
      },
      companyName: values.companyName,
      businessEmail: values.companyMail,
      clientName: values.portalCode,
      clientDomain: values.clientDomain,
      eULAVersion: eula.eULAVersion,
      eULAAccpeted: values.eULAAccpeted
    };
  };

  const initialSchemaValues = {
    fName: '',
    lName: '',
    companyMail: '',
    companyName: '',
    country: '',
    address1: '',
    address2: '',
    city: '',
    state: '',
    postalCode: '',
    phoneNumber: '',
    portalCode: '',
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
    setSelectedCountry({
      name: value?.ecountry_name_en,
      m49Code: value?.m49Code
    });
    setFieldValue('country', {
      name: value?.ecountry_name_en,
      m49Code: value?.m49Code
    });
  };

  return (
    <>
      {stage == 1 ? (
        <SuccessPage />
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
                  {...getFieldProps('fName')}
                  error={Boolean(touched.fName && errors.fName)}
                  helperText={touched.fName && errors.fName}
                  className={classes.margin}
                  data-testid="fname"
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Type the Last Name"
                  {...getFieldProps('lName')}
                  error={Boolean(touched.lName && errors.lName)}
                  helperText={touched.lName && errors.lName}
                  className={classes.margin}
                  data-testid="lName"
                />
              </Grid>
            </Grid>
            <TextField
              autoComplete="off"
              fullWidth
              label={'Type the Business Email'}
              {...getFieldProps('companyMail')}
              error={Boolean(touched.companyMail && errors.companyMail)}
              helperText={touched.companyMail && errors.companyMail}
              className={classes.margin}
              data-testid="companyEmail"
            />
            <TextField
              autoComplete="off"
              fullWidth
              label="Type the Company Name"
              {...getFieldProps('companyName')}
              error={Boolean(touched.companyName && errors.companyName)}
              helperText={touched.companyName && errors.companyName}
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
                  error={Boolean(touched.country && errors.country)}
                  helperText={touched.country && errors.country}
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
              {...getFieldProps('address1')}
              error={Boolean(touched.address1 && errors.address1)}
              helperText={touched.address1 && errors.address1}
              className={classes.margin}
              data-testid="address1"
            />
            <TextField
              autoComplete="off"
              fullWidth
              multiline
              label="Type Address Line 2"
              maxRows={5}
              {...getFieldProps('address2')}
              error={Boolean(touched.address2 && errors.address2)}
              helperText={touched.address2 && errors.address2}
              className={classes.margin}
              data-testid="address2"
            />
            <Grid direction="row" container spacing={3}>
              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Type the City"
                  {...getFieldProps('city')}
                  error={Boolean(touched.city && errors.city)}
                  helperText={touched.city && errors.city}
                  className={classes.margin}
                  data-testid="city"
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Type the State/Province"
                  {...getFieldProps('state')}
                  error={Boolean(touched.state && errors.state)}
                  helperText={touched.state && errors.state}
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
                  {...getFieldProps('postalCode')}
                  error={Boolean(touched.postalCode && errors.postalCode)}
                  helperText={touched.postalCode && errors.postalCode}
                  className={classes.margin}
                  data-testid="postalCode"
                />
              </Grid>

              <Grid item xs={12} md={6} lg={6}>
                <TextField
                  autoComplete="off"
                  fullWidth
                  label="Type the Phone Number"
                  {...getFieldProps('phoneNumber')}
                  error={Boolean(touched.phoneNumber && errors.phoneNumber)}
                  helperText={touched.phoneNumber && errors.phoneNumber}
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
