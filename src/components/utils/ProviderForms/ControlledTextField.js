import { TextField } from '@material-ui/core';

export default function ControlledTextField({
  value,
  property,
  tfid,
  onChange,
  label,
  ...other
}) {
  return (
    <TextField
      sx={{ mb: 1 }}
      fullWidth
      size="small"
      type="number"
      value={value}
      onChange={(event) => {
        const securityType = event.target.value;
        onChange(securityType, property, tfid);
      }}
      // error={!options[index]}
      label={label}
      {...other}
    />
  );
}
