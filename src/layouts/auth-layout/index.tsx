import { PropsWithChildren, useContext } from 'react';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import ButtonBase from '@mui/material/ButtonBase';
import { Navigate, useLocation } from 'react-router-dom';
import { Content } from 'Context/UserContext';
import Logo from "components/Logo";

const AuthLayout = ({ children }: PropsWithChildren) => {
  const value = useContext(Content);
  const location = useLocation();
  if (value?.role !== '') {
    return <Navigate to={`/pages/${value?.role}/dashboard`} replace state={{ from: location }} />;
  }
  return (
    <>
      <Stack
        component="main"
        alignItems="center"
        justifyContent="center"
        px={1}
        py={7}
        width={1}
        minHeight="100vh"
        position="relative"
      >
        <ButtonBase
          component={Link}
          href="/"
          disableRipple
          sx={{ position: 'absolute', top: 24, left: 24 }}
        >
          <Logo />
        </ButtonBase>
        <Paper sx={{ px: 2, py: 3, width: 1, maxWidth: 380 }}>{children}</Paper>
      </Stack>
    </>
  );
};

export default AuthLayout;
