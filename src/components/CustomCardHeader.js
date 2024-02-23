import { CardHeader } from '@material-ui/core';
import { useTheme } from '@material-ui/core/styles';
export default function CustomCardHeader({ title, ...other }) {
  const theme = useTheme();

  return (
    <CardHeader
      title={title}
      sx={{
        py: 1,

        background: `linear-gradient(90deg, ${theme.palette.info.dark} 0%, ${theme.palette.primary.dark} 50%)`,
        color: theme.palette.common.white
      }}
      {...other}
    />
  );
}
