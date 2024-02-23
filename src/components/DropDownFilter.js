import PropTypes from 'prop-types';
// material
import {
  FormControl,
  MenuItem,
  Select,
  InputLabel,
  Box,
  InputAdornment
} from '@material-ui/core';
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
  defaultValue,
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
          defaultValue={defaultValue}
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
