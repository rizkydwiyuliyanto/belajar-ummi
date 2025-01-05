import { Stack } from '@mui/material';
import { spacing } from 'utils/space';

const index = (props: { children: React.ReactNode }) => {
  return (
    <Stack
      width={1}
      spacing={spacing.space}
      direction={{ xs: 'column', sm: 'row', md: 'column', xl: 'row' }}
    >
        { props.children }
    </Stack>
  );
};

export default index;
