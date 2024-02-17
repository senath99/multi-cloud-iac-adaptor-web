/*
 * Project: Dynamedics Portal Web
 * Created Date: Sunday August 21st 2022
 * Author: Senath Weerasinghe
 * -----
 * Last Modified: Sunday August 21st 2022 6:13:20 pm
 * Modified By: Senath Weerasinghe at <sweerasinghe@mitrai.com>
 * -----
 * Copyright (c) 2022 Mitra Sparks
 * -----
 * HISTORY:
 */

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
