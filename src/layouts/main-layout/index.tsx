import { useState, PropsWithChildren } from 'react';
import Stack from '@mui/material/Stack';
import Sidebar from 'layouts/main-layout/sidebar';
import Topbar from 'layouts/main-layout/topbar';
import PrivateRoute from 'components/PrivateRoutes';

const MainLayout = ({ children }: PropsWithChildren) => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  return (
    <PrivateRoute>
      <Stack width={1} minHeight="100vh">
        <Sidebar
          mobileOpen={mobileOpen}
          setMobileOpen={setMobileOpen}
          setIsClosing={setIsClosing}
        />
        <Stack
          component="main"
          direction="column"
          width={{ xs: 1, lg: 'calc(100% - 252px)' }}
          flexGrow={1}
        >
          <Topbar isClosing={isClosing} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
          {children}
        </Stack>
      </Stack>
    </PrivateRoute>
  );
};

export default MainLayout;
