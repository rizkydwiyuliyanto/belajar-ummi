/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import WeekCalendar from 'components/sections/dashboard/week-calendar';
import Footer from 'components/common/Footer';
import { spacing } from 'utils/space';
import useFetch from 'hooks/useFetch';
import Table from './Table';
const Index = () => {
  const { result, loading }: { result: any, loading: boolean } = useFetch({ link: "/dashboard_admin/card_dashboard_data" });

  return (
    <>
      <Stack direction={{ xs: 'column', md: 'row' }}>
        <Stack p={spacing.padding} spacing={spacing.space} direction="column" width={{ xs: 1, md: 'calc(100% - 460px)' }}>
          {!loading &&
            <>
              <Stack direction={"column"} rowGap={1.25}>
                <Table Data={result["guru"]} Title={"Data Guru"}/>
                <Table Data={result["santri"]} Title={"Data Santri"}/>
              </Stack>
            </>
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
          <Stack p={spacing.padding} spacing={spacing.space} width={1} direction="column">
            <WeekCalendar />
          </Stack>

          <Box display={{ xs: 'block', md: 'none' }}>
            <Footer />
          </Box>
        </Box>
      </Stack>
    </>
  );
};

export default Index;
