import { first, filter, orderBy, sum } from 'lodash';
import { capitalCase } from 'change-case';
import moment from 'moment';
import {
  OVERALL,
  TEXT_DIMENSIONS,
  DATA_SET_DOC_TYPE,
  ACCESS_TOKEN,
  EMPTY_STRING,
  MONTH_NAMES
} from './constants';
import {
  fCurrency,
  fNumber,
  fPercent,
  fShortenNumber,
  fShortenNumberRounded
} from './formatNumber';
import jwtDecode from 'jwt-decode';
import { format, parseISO } from 'date-fns';

export const getOverall = (department) => department.name === OVERALL;
export const getAbsences = (element) => element.name === 'Absences';
export const getProperDepartments = (department) => department.name !== OVERALL;
export const getNoResponses = (element) => element.reason === 'No Response';
export const getLeaves = (element) => element.reason === 'Leave';
export const getSegmentsExceptAbsences = (element) =>
  element.name !== 'Absences';
export const getOne = (data) => {
  return first(data) || {};
};
export function descendingComparator(a, b, orderBy) {
  let aOrderBy =
    typeof a[orderBy] === 'string'
      ? a[orderBy].toLocaleLowerCase()
      : a[orderBy];
  let bOrderBy =
    typeof b[orderBy] === 'string'
      ? b[orderBy].toLocaleLowerCase()
      : b[orderBy];

  if (bOrderBy < aOrderBy) {
    return -1;
  }
  if (bOrderBy > aOrderBy) {
    return 1;
  }
  return 0;
}
export function getComparator(order, orderBy) {
  return order === 'desc'
    ? (a, b) => descendingComparator(a, b, orderBy)
    : (a, b) => -descendingComparator(a, b, orderBy);
}
export function applySortFilter(array, comparator, query, attribute) {
  const stabilizedThis = array?.map((el, index) => [el, index]);
  stabilizedThis.sort((a, b) => {
    const order = comparator(a[0], b[0]);
    if (order !== 0) return order;
    return a[1] - b[1];
  });

  if (query) {
    array = filter(array, (_question) => {
      return (
        _question[attribute].toLowerCase().indexOf(query.toLowerCase()) !== -1
      );
    });
    return array;
  }
  return stabilizedThis.map((el) => el[0]);
}

export const hasDecimal = (num) => {
  return !!(num % 1);
};

export const containsRole = (roles = [], rolePrefix = '') => {
  return roles.reduce((a, r) => a || r.includes(rolePrefix), false);
};

export const getWorkplaceWellbeingDescriptors = (
  workplaceWellbeing,
  employeeEngagement
) => {
  const overall = getOne(workplaceWellbeing.departments.filter(getOverall));
  const previous = workplaceWellbeing.overall.previous;
  const current = workplaceWellbeing.overall.current;
  let descriptors = [];
  descriptors.push({
    label: 'Health Index',
    labelType: 'TEXT',
    value: current,
    description: `Your employees show ${current}% positivity towards your organisation.`
  });
  if (previous) {
    descriptors.push({
      label:
        current > previous
          ? 'Better'
          : current < previous
          ? 'Down'
          : 'No Change',
      labelType: 'ICON',
      value: current - previous,
      description: `${Math.abs(current - previous)}% ${
        current > previous ? 'up' : current < previous ? 'down' : 'change'
      } from last period.`
    });
  } else {
    descriptors.push({
      label: 'No Change',
      labelType: 'ICON',
      value: 0,
      description: 'We are yet to collect responses.'
    });
  }
  if (overall) {
    descriptors.push({
      label: 'Segments',
      labelType: 'ICON',
      value: overall.data,
      description:
        'These are the segments in which your organisational health is measured.'
    });
  }
  if (employeeEngagement) {
    const highlyEngaged = (
      getOne(employeeEngagement.departments.filter(getOverall))?.data || []
    ).find((segment) => segment.name === 'Highly Engaged') || {
      name: '',
      data: 0
    };
    if (highlyEngaged.data && highlyEngaged.data > 0)
      descriptors.push({
        label: 'Engagement',
        labelType: 'ICON',
        value: highlyEngaged.data || 0,
        description: `${
          highlyEngaged.data || 0
        }% of your employees are highly engaged.`
      });
  }
  return descriptors;
};

export function applySort(posts, sortBy) {
  if (sortBy === 'latest') {
    posts = orderBy(posts, ['createdAt'], ['desc']);
  }
  if (sortBy === 'oldest') {
    posts = orderBy(posts, ['createdAt'], ['asc']);
  }
  if (sortBy === 'popular') {
    posts = orderBy(posts, ['view'], ['desc']);
  }
  return posts;
}

export function chartFormatter(val, type, skipFormat) {
  switch (type) {
    case 'CURRENCY':
      return fCurrency(val);

    case 'PERCENT':
      let temp = val;
      if (temp < 1 && !skipFormat) {
        temp = temp * 100.0;
      }
      return fPercent(temp);

    case 'NUMBER':
      return fShortenNumber(val);

    case 'NUMBER-SHORT':
      return fShortenNumberRounded(val);

    default:
      return fNumber(val);
  }
}

export function getAsPercentage(val, total) {
  return (val / total) * 100;
}

export function getTotal(items, prop) {
  return items.reduce((a, b) => {
    return a + parseFloat(b[prop]);
  }, 0);
}

export function getAccessToken() {
  const accessToken = localStorage.getItem(ACCESS_TOKEN);
  if (accessToken) {
    return accessToken;
  }
  return EMPTY_STRING;
}

export function getChartColors(chartType) {
  if (chartType === 'pie') {
    return [
      '#8267BE', // dark purple
      '#3FA796', // green
      '#FFBD35', // yellow
      '#D885A3', // shade pink
      '#516BEB', // blue
      '#A267AC', // purple
      '#98DDCA' // light green
    ];
  } else if (['line', 'area'].includes(chartType)) {
    return [
      '#516BEB', // blue
      '#98DDCA', // light green,
      '#D885A3', // shade pink,
      '#3FA796', // green
      '#A267AC', // purple
      '#FFBD35', // yellow
      '#8267BE' // dark purple
    ];
  } else if (chartType === 'bar') {
    return [
      '#73BFE9', // light blue
      '#3FA796', // green
      '#FFBD35', // yellow
      '#8267BE', // dark purple
      '#D885A3', // shade pink
      '#516BEB', // blue
      '#A267AC', // purple
      '#98DDCA' // light green
    ];
  } else if (chartType === 'radar') {
    return [
      '#8267BE', // dark purple
      '#3FA796', // green
      '#FFBD35', // yellow
      '#D885A3', // shade pink
      '#516BEB', // blue
      '#A267AC', // purple
      '#98DDCA' // light green
    ];
  } else if (chartType === 'heatmap') {
    return [
      '#8267BE', // dark purple
      '#3FA796', // green
      '#FFBD35', // yellow
      '#D885A3', // shade pink
      '#516BEB', // blue
      '#A267AC', // purple
      '#98DDCA' // light green
    ];
  }
}

export function getRAGColors(value) {
  if (value >= 75) {
    return ['#3FA796']; // theme.palette.primary.main
  } else if (value > 65) {
    return ['#1890FF']; // theme.palette.info.main
  } else if (value > 51) {
    return ['#FFBD35']; // yellow
  } else if (value > 35) {
    return ['#FFC107']; // theme.palette.warning.main,
  } else {
    return ['#FF4842']; // theme.palette.error.main
  }
}

export function getMaterialColors(value) {
  if (value >= 80) {
    return 'primary';
  } else if (value > 65) {
    return 'secondary';
  } else if (value > 50) {
    return 'success';
  } else if (value > 35) {
    return 'info';
  } else if (value > 20) {
    return 'warning';
  } else {
    return 'error';
  }
}

export function formatMeasureLabel(label) {
  if (label.includes('.')) {
    const name = label.split('.')[1];
    return capitalCase(name);
  } else {
    return label;
  }
}

export function updateQueryStringParameter(uri, key, value) {
  var re = new RegExp('([?&])' + key + '=.*?(&|$)', 'i');
  var separator = uri.indexOf('?') !== -1 ? '&' : '?';
  if (uri.match(re)) {
    return uri.replace(re, '$1' + key + '=' + value + '$2');
  } else {
    return uri + separator + key + '=' + value;
  }
}

export function getTimeRangeByRangeName(timeFrame = ' ', index = 0) {
  const timerange = timeFrame.toLowerCase().split(' ');
  const rangeIndex = timerange[0] == 'this' ? 0 + index : 1 + index;
  const timePeriod = timerange[1];
  const startDate = format(
    new Date(moment().subtract(rangeIndex, timePeriod).startOf(timePeriod)._d),
    'yyyy-MM-dd'
  );
  const endDate = format(
    new Date(moment().subtract(rangeIndex, timePeriod).endOf(timePeriod)._d),
    'yyyy-MM-dd'
  );
  return [startDate, endDate];
}

export function updateSearchParams(name, value, history) {
  var newUrl = updateQueryStringParameter(window.location.href, name, value);
  history.replace({
    pathname: history.pathname,
    search: newUrl.split('?')[1]
  });
}

export const documentTypeFormater = (type) => {
  if (type === DATA_SET_DOC_TYPE.ESG_KPIS.VALUE) {
    return DATA_SET_DOC_TYPE.ESG_KPIS.LABEL;
  } else {
    return type;
  }
};

export const granularityToDateFormat = (granularity) => {
  switch (granularity) {
    case 'week':
      return 'dd MMM yyyy';
    case 'quarter':
      return 'yyyy QQQ';
    case 'year':
      return 'yyyy';
    default:
      return 'MMM yyyy';
  }
};

export const getAccessTokenDecoded = (accessToken) => {
  return jwtDecode(accessToken);
};

export const getNestedProperty = (object, propertyPath) => {
  const propertyValue = propertyPath
    .split('.')
    .reduce((accumulatedResult, currentProperty) => {
      return accumulatedResult && accumulatedResult[currentProperty];
    }, object);
  return propertyValue;
};

export const getFileTypeLabel = (fileType) => {
  return `(Only ${fileType} will be accepted)`;
};

export const getFileSizeLabel = (fileSize) => {
  return `(Only ${fileSize} of maximum file size will be accepted)`;
};

export const checkUndefinedOrNull = (data) => {
  if (data == undefined || !data) {
    return true;
  }
  return false;
};

/**
 * Formats dates according to selected granularity.
 * @param {*} date - Date from Cube data ISO format.
 * @param {*} granularity - Selected granularity i.e. year, month, quarter
 * @returns - Formatted date.
 */
export const formatDateLabel = (date, granularity) => {
  try {
    return format(parseISO(date), granularityToDateFormat(granularity));
  } catch (error) {
    return date;
  }
};

export const getIRPeriod = (dateRangeName) => {
  const rangeType = dateRangeName.toLowerCase().split(' ')[0];
  const timerange = dateRangeName.toLowerCase().split(' ')[1];

  const today = new Date();
  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  switch (timerange) {
    case 'month': {
      if (today.getMonth() == 0) {
        const monthName = MONTH_NAMES[11];
        const derivedYear = currentYear - 1;
        return `${monthName} ${derivedYear}`;
      } else {
        const month =
          rangeType == 'this' ? today.getMonth() : today.getMonth() - 1;
        const monthName = MONTH_NAMES[month];
        return `${monthName} ${currentYear}`;
      }
    }
    case 'quarter': {
      var quarter =
        rangeType == 'this'
          ? Math.floor((currentMonth + 3) / 3)
          : Math.floor((currentMonth + 3) / 3) - 1;
      if (quarter == 0) {
        quarter = 4;
        const derivedYear = currentYear - 1;
        return `Q${quarter} ${derivedYear}`;
      }
      return `Q${quarter} ${currentYear}`;
    }
    case 'year':
      const year =
        rangeType == 'this' ? today.getFullYear() : today.getFullYear() - 1;
      return year;
    default:
      return dateRangeName;
  }
};
