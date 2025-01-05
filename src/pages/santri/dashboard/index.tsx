/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import WeekCalendar from 'components/sections/dashboard/week-calendar';
import Footer from 'components/common/Footer';
import { useContext } from 'react';
import { Content } from 'Context/UserContext';
import useFetch from 'hooks/useFetch';
import HasilMengaji from './HasilMengaji';

const Dashboard = () => {
  const value: any = useContext(Content);
  const r: any = value?.user || {};
  const { result, loading }: { result: any, loading: boolean } = useFetch({ link: "dashboard_santri/card_dashboard_data/"+r?.id_santri });
  return (
    <Stack direction={{ xs: 'column', md: 'row' }}>
      <Stack p={3.5} spacing={3.5} direction="column" width={{ xs: 1, md: 'calc(100% - 460px)' }}>
        {!loading
          &&
          <HasilMengaji Data={result["tingkatan"]} />
        }
        <Box display={{ xs: 'none', md: 'block' }}>
          <Footer />
        </Box>
      </Stack>

      <Box
        width={{ xs: 1, md: 460 }}
        height={{ xs: 'auto', md: 'calc(100vh - 90px)' }}
        overflow="scroll"
        bgcolor="info.main"
        position="sticky"
        top={90}
        sx={{
          '&:hover, &:focus': {
            '&::-webkit-scrollbar-thumb': {
              visibility: 'visible',
            },
          },
        }}
      >
        <Stack p={3.5} spacing={3.5} width={1} direction="column">
          <WeekCalendar />
        </Stack>

        <Box display={{ xs: 'block', md: 'none' }}>
          <Footer />
        </Box>
      </Box>
    </Stack>
  );
};

export default Dashboard;
