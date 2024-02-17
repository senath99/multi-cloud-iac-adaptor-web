import { alpha } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

export function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY = {
  lighter: '#CAF9E6',
  light: '#61DBC0',
  main: '#0A8A84',
  dark: '#055763',
  darker: '#012E42'
};
const SECONDARY = {
  lighter: '#F9D9EA',
  light: '#DF88C6',
  main: '#95358B',
  dark: '#641A6B',
  darker: '#370A47'
};
const INFO = {
  lighter: '#D1F0FB',
  light: '#73BFE9',
  main: '#1D70B8',
  dark: '#0E4184',
  darker: '#052058'
};
const SUCCESS = {
  lighter: '#C8FBE7',
  light: '#5CE7C9',
  main: '#00B1AA',
  dark: '#006D7F',
  darker: '#003A54'
};
const WARNING = {
  lighter: '#FFF9CD',
  light: '#FFE769',
  main: '#FFCD05',
  dark: '#B78B02',
  darker: '#7A5800'
};
const ERROR = {
  lighter: '#FDE5D4',
  light: '#F59E7F',
  main: '#E03E2C',
  dark: '#A1161E',
  darker: '#6B081E'
};

const GREY = {
  0: '#FFFFFF',
  100: '#F9FAFB',
  200: '#F4F6F8',
  300: '#DFE3E8',
  400: '#C4CDD5',
  500: '#919EAB',
  600: '#637381',
  700: '#454F5B',
  800: '#212B36',
  900: '#161C24',
  500_8: alpha('#919EAB', 0.08),
  500_12: alpha('#919EAB', 0.12),
  500_16: alpha('#919EAB', 0.16),
  500_24: alpha('#919EAB', 0.24),
  500_32: alpha('#919EAB', 0.32),
  500_48: alpha('#919EAB', 0.48),
  500_56: alpha('#919EAB', 0.56),
  500_80: alpha('#919EAB', 0.8)
};

export const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main),
  toolbar: createGradient(PRIMARY.main, SUCCESS.main)
};

export const COMMON = {
  common: { black: '#000', white: '#fff' },
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#fff' },
  info: { ...INFO, contrastText: '#fff' },
  success: { ...SUCCESS, contrastText: GREY[800] },
  warning: { ...WARNING, contrastText: GREY[800] },
  error: { ...ERROR, contrastText: '#fff' },
  grey: GREY,
  gradients: GRADIENTS,
  divider: GREY[500_24],
  action: {
    hover: GREY[500_8],
    selected: GREY[500_16],
    disabled: GREY[500_80],
    disabledBackground: GREY[500_24],
    focus: GREY[500_24],
    hoverOpacity: 0.08,
    disabledOpacity: 0.48
  }
};

const palette = {
  light: {
    ...COMMON,
    text: { primary: GREY[800], secondary: GREY[600], disabled: GREY[500] },
    background: { paper: '#fff', default: '#fff', neutral: GREY[200] },
    action: { active: GREY[600], ...COMMON.action },
    gradient: GRADIENTS.success
  },
  dark: {
    ...COMMON,
    text: { primary: '#fff', secondary: GREY[500], disabled: GREY[600] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16] },
    action: { active: GREY[500], ...COMMON.action }
  },
  gradientSuccess: {}
};

export default palette;
