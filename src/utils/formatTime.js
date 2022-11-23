import { format, formatDistanceToNow } from 'date-fns';

// ----------------------------------------------------------------------

export function fDate(date) {
  return format(new Date(date), 'dd MMMM yyyy');
}

export function fDateTime(date) {
  return format(new Date(date), 'dd MMM yyyy hh:mm a');
}

export function fTime(date) {
  return format(new Date(date), 'hh:mm a');
}

export function fDateWithMonth(date) {
  return format(new Date(date), 'dd MMM');
}

export function fDateTimeSuffix(date) {
  return format(new Date(date), 'dd/MM/yyyy hh:mm p');
}

export function fToNow(date) {
  return formatDistanceToNow(new Date(date), {
    addSuffix: true
  });
}

export function fYear(date) {
  return format(new Date(date), 'yyyy');
}
