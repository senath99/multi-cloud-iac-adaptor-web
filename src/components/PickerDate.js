import React from 'react';
import { useState } from 'react';

// material
import { TextField } from '@material-ui/core';
import { StaticDatePicker } from '@material-ui/lab';
// components

// ----------------------------------------------------------------------

export default function PickerDate() {
  const [value, setValue] = useState(new Date());

  return (
    <React.Fragment sx={{ height: 200 }}>
      <StaticDatePicker
        orientation="portrait"
        openTo="date"
        inputFormat="dd-mm-yyyy"
        value={value}
        onChange={(newValue) => {
          setValue(newValue);
        }}
        renderInput={(params) => <TextField {...params} />}
      />
    </React.Fragment>
  );
}
