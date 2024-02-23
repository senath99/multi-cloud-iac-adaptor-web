import PropTypes from 'prop-types';

// material
import { experimentalStyled as styled } from '@material-ui/core/styles';
import { Box, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------

const DropZoneStyle = styled('div')(({ theme }) => ({
  outline: 'none',
  display: 'flex',

  textAlign: 'center',
  alignItems: 'center',
  flexDirection: 'column',
  justifyContent: 'center',
  clickable: false,
  padding: theme.spacing(5, 1),
  '&:hover': {
    opacity: 0.72,
    cursor: 'pointer'
  },
  [theme.breakpoints.up('md')]: {
    textAlign: 'left',
    flexDirection: 'row',
    height: 270
  }
}));

// ----------------------------------------------------------------------

ImageCard.propTypes = {
  caption: PropTypes.string,
  error: PropTypes.bool,
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
  onChange: PropTypes.func,
  sx: PropTypes.object
};

export default function ImageCard({
  title,
  caption,
  secondaryCaption,
  error = false,
  sx,
  disabled = true,
  src,
  ...other
}) {
  return (
    <Box sx={{ width: '100%', ...sx }} {...other}>
      <DropZoneStyle>
        <Box component="img" alt="select file" src={src} sx={{ height: 160 }} />

        <Box
          sx={{
            p: 1,
            ml: { md: 2 }
          }}
        >
          <Typography gutterBottom variant="h6">
            {title}
          </Typography>

          {caption && (
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              {caption}
            </Typography>
          )}
        </Box>
      </DropZoneStyle>
    </Box>
  );
}
