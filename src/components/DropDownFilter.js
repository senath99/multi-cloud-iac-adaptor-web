/*
 * Project: Dynamedics Portal Web
 * Created Date: Friday July 2nd 2021
 * Author: Nalinda Wijayagunawardhane
 * -----
 * Last Modified: Friday July 2nd 2021 8:10:01 am
 * Modified By: Nalinda Wijayagunawardhane at <nwijayagunawardhane@mitrai.com>
 * -----
 * Copyright (c) 2021 Mitra Sparks
 * -----
 * HISTORY:
 *
 * 2021-11-02	SS	Added a clear field option to Drop down filter.
 */

import PropTypes from 'prop-types';
// material
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Box,
  InputAdornment,
  ButtonGroup,
  Tooltip
} from '@material-ui/core';
import { LoadingButton } from '@material-ui/lab';
import { filter, uniq, map } from 'lodash';
import { OVERALL } from '../utils/constants';

//icons
import { Icon } from '@iconify/react';
import CancelIcon from '@iconify/icons-eva/close-fill';

// ----------------------------------------------------------------------

DropDownFilter.propTypes = {
  data: PropTypes.array,
  label: PropTypes.string,
  value: PropTypes.string,
  loadingOptions: PropTypes.array,
  property: PropTypes.string,
  onChange: PropTypes.func,
  clearChange: PropTypes.func,
  sx: PropTypes.object
};

export default function DropDownFilter({
  data,
  label,
  onChange,
  clearChange,
  sx,
  value,
  property = 'name',
  disabled,
  ...other
}) {
  return (
    <Box sx={{ ...sx }}>
      <FormControl fullWidth variant="outlined">
        <InputLabel id={`${label}-label`}>{label}</InputLabel>
        <Select
          labelId={`${label}-label`}
          id={label}
          value={value}
          onChange={onChange}
          label={label}
          disabled={disabled}
          {...other}
          // fullWidth
          endAdornment={
            value &&
            clearChange && (
              <InputAdornment sx={{ cursor: 'pointer', mr: 2 }}>
                <Icon width={22} icon={CancelIcon} onClick={clearChange}></Icon>
              </InputAdornment>
            )
          }
        >
          {filter(uniq(map(data, property)), (_) => _ !== OVERALL).map(
            (department, index) => {
              return (
                <MenuItem key={index} value={department}>
                  {department}
                </MenuItem>
              );
            }
          )}
        </Select>
      </FormControl>
    </Box>
  );
}
