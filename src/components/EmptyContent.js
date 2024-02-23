import PropTypes from 'prop-types';
// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Typography, Box } from '@material-ui/core';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  padding: theme.spacing(4, 2)
}));

// ----------------------------------------------------------------------

EmptyContent.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  description: PropTypes.string
};

export default function EmptyContent({ title, description, img, ...other }) {
  return (
    <RootStyle {...other}>
      <Box
        component="img"
        alt="empty content"
        src={img || '/static/illustrations/illustration_empty_content.svg'}
        sx={{ height: 100, mb: 1 }}
      />

      <Typography variant={description ? 'subtitle2' : 'caption'} gutterBottom>
        {title}
      </Typography>

      {description && (
        <Typography
          variant="caption"
          sx={{ color: 'text.secondary' }}
          gutterBottom
        >
          {description}
        </Typography>
      )}
    </RootStyle>
  );
}
