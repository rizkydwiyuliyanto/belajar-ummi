import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import CustomPaper from 'components/CustomPaper';
import { Alert, Button, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { create } from 'request/request';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
const index = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef(null as any);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    let obj = {};
    formData.forEach((value, key) => {
      obj = {
        ...obj,
        [key]: value,
      };
    });
    create({ data: obj, link: '/santri/tambah' })
      .then((res) => {
        const { data } = res;
        console.log(data);
        navigate('/pages/guru/master/data_santri');
      })
      .catch((err) => {
        const { data } = err.response;
        setErrorMessage(data.data);
        // console.log(data);
      });
  };
  return (
    <>
      <CustomContainer>
        <ContentParent>
          <CustomPaper Title={'Tambah santri'}>
            <Stack
              onSubmit={handleSubmit}
              ref={formRef}
              padding={4}
              component="form"
              mt={3}
              direction="column"
              gap={2}
            >
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
              <Grid container spacing={2} justifyContent={'space-between'}>
                <Grid item md={3}>
                  <TextField
                    id="username"
                    name="username"
                    variant="filled"
                    color={'secondary'}
                    placeholder="Username"
                    fullWidth
                  />
                </Grid>
                <Grid item md={3}>
                  <TextField
                    id="password"
                    name="password"
                    variant="filled"
                    color={'secondary'}
                    placeholder="Your Password"
                    fullWidth
                  />
                </Grid>
                <Grid item md={6}>
                  <TextField
                    id="nama_lengkap"
                    name="nama_lengkap"
                    variant="filled"
                    color={'secondary'}
                    placeholder="Nama lengkap"
                    fullWidth
                  />
                </Grid>
              </Grid>

              <Button sx={{ marginLeft: 'auto' }} type="submit" variant="contained" size="medium">
                Submit
              </Button>
            </Stack>
          </CustomPaper>
        </ContentParent>
        <Footer />
      </CustomContainer>
    </>
  );
};

export default index;
