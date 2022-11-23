/*
 * Project: Dynamedics Portal Web
 * Created Date: Thursday April 7th 2022
 * Author: Dinusha Madhuranga
 * -----
 * Last Modified: Thursday April 7th 2022 5:44:35 pm
 * Modified By: Dinusha Madhuranga at <dmadhuranga@mitrai.com>
 * -----
 * Copyright (c) 2022 Mitra Sparks
 * -----
 * HISTORY:
 */

import moment from 'moment';

export const applyDateFilter = (data = [], timeFrame = ' ', attribute) => {
  const timerange = timeFrame.split(' ');
  const rangeIndex = timerange[0] == 'this' ? 0 : 1;
  const timePeriod = timerange[1];
  const startDate = new Date(
    moment().subtract(rangeIndex, timePeriod).startOf(timePeriod)._d
  ).toISOString();
  const endDate = new Date(
    moment().subtract(rangeIndex, timePeriod).endOf(timePeriod)._d
  ).toISOString();
  return data.filter((d) => {
    return d[attribute] > startDate && d[attribute] < endDate;
  });
};
