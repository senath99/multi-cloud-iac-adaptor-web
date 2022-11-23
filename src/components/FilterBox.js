import PropTypes from 'prop-types';
// material
import { TextField, Autocomplete } from '@material-ui/core';
import { capitalCase } from 'change-case';

// ----------------------------------------------------------------------

FilterBox.propTypes = {
  options: PropTypes.array,
  label: PropTypes.string,
  onChange: PropTypes.func,
  disabled: PropTypes.bool
};

export default function FilterBox({
  options,
  label,
  onChange,
  disabled = false,
  ...other
}) {
  return (
    <Autocomplete
      fullWidth
      name={label}
      onChange={(event) => {
        onChange(label, event.target.textContent);
      }}
      options={options}
      getOptionLabel={(option) => option}
      disabled={disabled}
      {...other}
      renderInput={(params) => (
        <TextField {...params} label={capitalCase(label)} margin="none" />
      )}
    />
  );
}
