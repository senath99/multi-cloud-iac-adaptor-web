/*
 * Project: Dynamedics Portal Web
 * Created Date: Thursday April 7th 2022
 * Author: Dinusha Madhuranga
 * -----
 * Last Modified: Wednesday April 27th 2022 08:45:35 am
 * Modified By: Dinusha Madhuranga at <dmadhuranga@mitrai.com>
 * -----
 * Copyright (c) 2022 Mitra Sparks
 * -----
 * HISTORY:
 * 2022-04-27	Added filter function
 * 2022-05-31 Handled absence of data
 * 2022-05-31 Fixed the mean function
 * 2022-06-23 Fixed the removal of dashes Ex-2771
 */

import { maxBy, first, minBy, sumBy, meanBy } from 'lodash';
import { capitalCase } from 'change-case';
import { fDecimal } from '../formatNumber';
import { applyDateFilter } from './DelFunctions';
import { checkUndefinedOrNull } from '../functions';
import { EMPTY_STRING } from '../../utils/constants';

const DEFAULT_JOIN_BY = ':';
const DEFAULT_TIME_FRAME = 'All time';

const CAPITAL_CASE_OPTIONS = { delimiter: ' ' };

export function del(responses) {
  const getPrimaryMeasure = () => {
    const measures = (responses[0] || {})?.query?.measures || [];
    return measures.length >= 1 ? measures[0] : EMPTY_STRING;
  };

  const getDimensions = () => {
    return responses[0].query.dimensions;
  };

  const getTimeDimensionName = () => {
    return responses[0].query.timeDimensions[0].dimension;
  };

  const getFilteredData = (chartData, timeFrame) => {
    const primaryMeasure = getPrimaryMeasure();
    let data = chartData?.map((element) => {
      return { ...element, [primaryMeasure]: Number(element[primaryMeasure]) };
    });

    if (checkAbsenceofData(data)) return EMPTY_STRING;
    if (timeFrame) {
      if (timeFrame && timeFrame != DEFAULT_TIME_FRAME) {
        data = applyDateFilter(data, timeFrame, getTimeDimensionName());
      }
      return data;
    } else {
      return data;
    }
  };

  const maxObject = (timeFrame) => {
    const data = getFilteredData(responses[0].data, timeFrame);
    if (checkAbsenceofData(data)) return EMPTY_STRING;
    return maxBy(data, getPrimaryMeasure());
  };

  const minObject = (timeFrame) => {
    const data = getFilteredData(responses[0].data, timeFrame);
    if (checkAbsenceofData(data)) return EMPTY_STRING;
    return minBy(data, getPrimaryMeasure());
  };

  const maxWithLabel = (
    joinBy = DEFAULT_JOIN_BY,
    timeFrame = DEFAULT_TIME_FRAME
  ) => {
    const object = maxObject(timeFrame);
    if (checkAbsenceofData(object)) return EMPTY_STRING;

    const primaryDimension = first(getDimensions());
    const primaryMeasure = getPrimaryMeasure();
    return `${capitalCase(
      object[primaryDimension],
      CAPITAL_CASE_OPTIONS
    )} ${joinBy} ${fDecimal(object[primaryMeasure])}`;
  };

  const minWithLabel = (
    joinBy = DEFAULT_JOIN_BY,
    timeFrame = DEFAULT_TIME_FRAME
  ) => {
    const object = minObject(timeFrame);

    if (checkAbsenceofData(object)) return EMPTY_STRING;

    const primaryDimension = first(getDimensions());
    const primaryMeasure = getPrimaryMeasure();
    return `${capitalCase(
      object[primaryDimension],
      CAPITAL_CASE_OPTIONS
    )} ${joinBy} ${fDecimal(object[primaryMeasure])}`;
  };

  const total = (timeFrame = DEFAULT_TIME_FRAME) => {
    const data = getFilteredData(responses[0].data, timeFrame);

    if (checkAbsenceofData(data)) return EMPTY_STRING;

    const primaryMeasure = getPrimaryMeasure();
    return sumBy(data, primaryMeasure);
  };

  const mean = (timeFrame = DEFAULT_TIME_FRAME) => {
    const dataResults = getFilteredData(responses[0].data, timeFrame);

    if (checkAbsenceofData(dataResults)) return EMPTY_STRING;
    const primaryMeasure = getPrimaryMeasure();
    return fDecimal(meanBy(dataResults, primaryMeasure));
  };

  const filter = (label) => {
    const dimensions = getDimensions();
    if (dimensions) {
      const dataResults = responses[0].data.filter((dataElement) => {
        return dimensions
          .map((dimension) => dataElement[dimension] === label)
          .includes(true);
      });

      if (checkAbsenceofData(dataResults)) return EMPTY_STRING;

      const newResults = [{ ...responses[0], data: dataResults }];
      return del(newResults);
    }
  };

  const trend = () => {
    const total1 = select(1).total();
    const total2 = select(2).total();
    const trend = (((total1 - total2) / total2) * 100).toFixed(2);
    return `${trend < 0 ? '' : '+'}${trend}`;
  };

  const select = (index) => {
    if (responses.length > 1) {
      return del([{ ...responses[index - 1] }]);
    }
    return del([{ ...responses[0] }]);
  };

  const functions = {
    max: maxWithLabel,
    min: minWithLabel,
    total,
    mean,
    filter,
    select,
    trend
  };

  const parse = (template) => {
    try {
      return new Function(
        'const max = this.max; const min = this.min; const total = this.total; const mean = this.mean; const filter = this.filter; const select = this.select; const trend = this.trend; return `' +
          template +
          '`'
      ).call({ ...functions });
    } catch (error) {
      console.error(error);
      return '';
    }
  };

  return { parse, ...functions };
}

const checkAbsenceofData = (data) => {
  const isDataUnAvailable = checkUndefinedOrNull(data);
  if (isDataUnAvailable) {
    return true;
  }
};
