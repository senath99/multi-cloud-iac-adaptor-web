import { Chip } from '@material-ui/core';
import {
  experimentalStyled as styled,
  useTheme
} from '@material-ui/core/styles';
import ChevronIcon from '@material-ui/icons/ChevronRightRounded';
import PropTypes from 'prop-types';

const wrapper = styled('div')(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexWrap: 'wrap',
  '& > *': {
    margin: theme.spacing(0.5)
  }
}));

Trend.propTypes = {
  trendValue: PropTypes.number,
  inverted: PropTypes.bool
};

export default function Trend({ trendValue = 0, inverted }) {
  const theme = useTheme();
  const trendNumber = Math.round(Math.abs(trendValue));
  return (
    <wrapper>
      <Chip
        size="small"
        icon={
          trendValue >= 0 ? (
            <ChevronIcon sx={{ transform: 'rotate(-90deg)', mt: '-1px' }} />
          ) : (
            <ChevronIcon sx={{ transform: 'rotate(90deg)', mt: '-1px' }} />
          )
        }
        label={
          trendValue >= 0 ? `Up by ${trendNumber}%` : `Down by ${trendNumber}%`
        }
        sx={{
          color: !inverted
            ? trendValue >= 0
              ? theme.palette.common.white
              : theme.palette.common.black
            : trendValue >= 0
            ? theme.palette.common.black
            : theme.palette.common.white,
          fontSize: 12,
          span: {
            mt: '-1px !important'
          }
        }}
        color={
          !inverted
            ? trendValue >= 0
              ? 'primary'
              : 'warning'
            : trendValue >= 0
            ? 'warning'
            : 'primary'
        }
      />
    </wrapper>
  );
}
