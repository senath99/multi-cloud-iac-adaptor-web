import DropDownFilter from 'src/components/DropDownFilter';

export default function ControlledDropdown({
  options,
  value,
  property,
  tfid,
  onChange,
  defaultValue,
  label
}) {
  return (
    <DropDownFilter
      sx={{ mb: 1 }}
      label={label}
      defaultValue={defaultValue}
      size="small"
      data={options}
      value={value}
      onChange={(event) => {
        const securityType = event.target.value;
        onChange(securityType, property, tfid);
      }}
    />
  );
}
