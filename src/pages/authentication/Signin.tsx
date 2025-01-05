/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState, FormEvent, useRef, useContext } from 'react';
// import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import InputAdornment from '@mui/material/InputAdornment';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import TextField from '@mui/material/TextField';
import IconifyIcon from 'components/base/IconifyIcon';
import { signIn } from 'request/request';
// import { authRoutes } from 'routes/paths';
import { Alert, MenuItem, Select } from '@mui/material';
import { Content } from 'Context/UserContext';
import { useNavigate } from 'react-router-dom';

// interface User {
//   [key: string]: string;
// }

const Signin = () => {
  // const [user, setUser] = useState<User>({ email: '', password: '' });
  const [showPassword, setShowPassword] = useState(false);
  const value = useContext(Content);
  const navigate = useNavigate();
  const formRef = useRef(null as any);
  const [errorMessage, setErrorMessage] = useState('');
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let obj: { role: string } = {
      role: '',
    };
    formData.forEach((value, key) => {
      obj = {
        ...obj,
        [key]: value,
      };
    });
    signIn({ data: obj, link: '/auth/sign-in' })
      .then((res) => {
        const { data } = res.data;
        value?.setUser({
          ...data,
          role: obj.role,
        });
        navigate(`/pages/${obj.role}/dashboard`);
      })
      .catch((err) => {
        const { data } = err.response.data;
        setErrorMessage(data);
      });
    // console.log(user);
  };

  return (
    <>
      <Typography align="center" variant="h4">
        Sign In
      </Typography>
      <Typography my={1.5} align="center" variant="body2">
        Welcome back! Let's continue with,
      </Typography>
      {errorMessage && (
        <Alert
          severity="error"
          onClose={() => {
            setErrorMessage('');
          }}
        >
          {errorMessage}.
        </Alert>
      )}
      <Stack
        ref={formRef}
        component="form"
        mt={3}
        onSubmit={handleSubmit}
        direction="column"
        gap={2}
      >
        <TextField
          id="username"
          name="username"
          type="text"
          variant="filled"
          placeholder="Username"
          fullWidth
          autoFocus
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:mail-at-sign-02" />
              </InputAdornment>
            ),
          }}
        />
        <TextField
          id="password"
          name="password"
          type={showPassword ? 'text' : 'password'}
          variant="filled"
          placeholder="Password"
          fullWidth
          required
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <IconifyIcon icon="hugeicons:lock-key" />
              </InputAdornment>
            ),
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => setShowPassword(!showPassword)}
                  sx={{ border: 'none', bgcolor: 'transparent !important' }}
                  edge="end"
                >
                  <IconifyIcon
                    icon={showPassword ? 'fluent-mdl2:view' : 'fluent-mdl2:hide-3'}
                    color="neutral.light"
                  />
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
        <Divider>Login sebagai</Divider>
        <Select required name={'role'}>
          <MenuItem value={'guru'}>Guru</MenuItem>
          <MenuItem value={'santri'}>Santri</MenuItem>
          <MenuItem value={'admin'}>Admin</MenuItem>
        </Select>
        <Button
          sx={{ marginTop: '12px' }}
          type="submit"
          variant="contained"
          size="medium"
          fullWidth
        >
          Sign In
        </Button>
      </Stack>
    </>
  );
};

export default Signin;
