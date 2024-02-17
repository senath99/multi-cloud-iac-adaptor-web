import { motion } from 'framer-motion';
// material
import { alpha, experimentalStyled as styled } from '@material-ui/core/styles';
import { Box } from '@material-ui/core';
//
import Logo from './Logo';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  height: '100%',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  backgroundColor: theme.palette.background.default
}));

// ----------------------------------------------------------------------

export default function BrandLoadingScreen({ ...other }) {
  return (
    <RootStyle {...other}>
      <motion.div
        initial={{ rotateY: 0 }}
        animate={{ rotateY: 360 }}
        transition={{
          duration: 2,
          ease: 'easeInOut',
          repeatDelay: 1,
          repeat: Infinity
        }}
      >
        <Box
          component="img"
          alt="logo"
          src={'/static/brand/logo_brand.png'}
          height={30}
          {...other}
        />
      </motion.div>

      <Box
        component={motion.div}
        animate={{
          scale: [1.2, 1, 1, 1.2, 1.2],
          rotate: [270, 0, 0, 270, 270],
          opacity: [0.25, 1, 1, 1, 0.25],
          borderRadius: ['25%', '25%', '50%', '50%', '25%']
        }}
        transition={{ ease: 'linear', duration: 3.2, repeat: Infinity }}
        sx={{
          width: 50,
          height: 50,
          borderRadius: '25%',
          position: 'absolute',
          border: (theme) =>
            `solid 3px ${alpha(theme.palette.primary.dark, 0.4)}`
        }}
      />

      <Box
        component={motion.div}
        animate={{
          scale: [1, 1.2, 1.2, 1, 1],
          rotate: [0, 270, 270, 0, 0],
          opacity: [1, 0.25, 0.25, 0.25, 1],
          borderRadius: ['25%', '25%', '50%', '50%', '25%']
        }}
        transition={{
          ease: 'linear',
          duration: 3.2,
          repeat: Infinity
        }}
        sx={{
          width: 80,
          height: 80,
          borderRadius: '25%',
          position: 'absolute',
          border: (theme) =>
            `solid 8px ${alpha(theme.palette.primary.dark, 0.8)}`
        }}
      />
    </RootStyle>
  );
}
