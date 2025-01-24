import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import CustomPaper from 'components/CustomPaper';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { FormEvent, useRef, useState } from 'react';
import { create } from 'request/request';
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
    create({ data: obj, link: '/guru/tambah' })
      .then((res) => {
        const { data } = res;
        console.log(data);
        navigate("/pages/admin/master/data_guru");
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
          <CustomPaper Title={'Tambah guru'}>
            <Stack
              padding={4}
              onSubmit={handleSubmit}
              ref={formRef}
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
              <Grid container spacing={2} justifyContent={'space-between'} alignItems={"flex-end"}>
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
                <Grid item md={3}>
                  <TextField
                    id="no_hp"
                    name="no_hp"
                    variant="filled"
                    rows={3}
                    color={'secondary'}
                    placeholder="Nomor HP"
                    fullWidth
                  />
                </Grid>
                <Grid item md={3}>
                  <Stack direction={"column"} rowGap={1}>
                    <Typography variant={"caption"} color={"#54577a"}>
                      Tanggal lahir :
                    </Typography>
                    <TextField
                      id="tanggal_lahir"
                      name="tanggal_lahir"
                      variant="filled"
                      type={"date"}
                      color={'secondary'}
                      placeholder="Tanggal lahir"
                      fullWidth
                    />
                  </Stack>
                </Grid>
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
                    id="alamat"
                    name="alamat"
                    variant="filled"
                    rows={4}
                    multiline
                    color={'secondary'}
                    placeholder="Alamat"
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
