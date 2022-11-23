import { alpha } from '@material-ui/core/styles';

// ----------------------------------------------------------------------

function createGradient(color1, color2) {
  return `linear-gradient(to bottom, ${color1}, ${color2})`;
}

// SETUP COLORS
const PRIMARY = {
  lighter: '#FDD7D8',
  light: '#F8899F',
  main: '#E93B81',
  dark: '#A71D70',
  darker: '#6F0B5B'
};
const SECONDARY = {
  lighter: '#FEEFEF',
  light: '#FCCED7',
  main: '#F5ABC9',
  dark: '#B0568C',
  darker: '#752064'
};
// const SECONDARY = {
//   lighter: '#FCEDF1',
//   light: '#F1C4D9',
//   main: '#D291BC',
//   dark: '#97498C',
//   darker: '#601B64'
// };
const INFO = {
  lighter: '#D9F4FB',
  light: '#8BCCE9',
  main: '#3d84b8',
  dark: '#1E4D84',
  darker: '#0B2658'
};
const SUCCESS = {
  lighter: '#DBF9F2',
  light: '#8EE0DB',
  main: '#3c9099',
  dark: '#1E596E',
  darker: '#0B2F49'
};
const WARNING = {
  lighter: '#FEF9E8',
  light: '#FAE7B9',
  main: '#f1ca89',
  dark: '#AD7E45',
  darker: '#73441A'
};
const ERROR = {
  lighter: '#FEF1E9',
  light: '#FBC9BE',
  main: '#f29191',
  dark: '#AE495A',
  darker: '#741B3A'
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

const GRADIENTS = {
  primary: createGradient(PRIMARY.light, PRIMARY.main),
  info: createGradient(INFO.light, INFO.main),
  success: createGradient(SUCCESS.light, SUCCESS.main),
  warning: createGradient(WARNING.light, WARNING.main),
  error: createGradient(ERROR.light, ERROR.main)
};

const COMMON = {
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
    action: { active: GREY[600], ...COMMON.action }
  },
  dark: {
    ...COMMON,
    text: { primary: '#fff', secondary: GREY[500], disabled: GREY[600] },
    background: { paper: GREY[800], default: GREY[900], neutral: GREY[500_16] },
    action: { active: GREY[500], ...COMMON.action }
  }
};

export default palette;
