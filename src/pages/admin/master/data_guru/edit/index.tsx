/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import CustomPaper from 'components/CustomPaper';
import { Alert, Button, Stack, TextField, Typography } from '@mui/material';
import Grid from '@mui/material/Grid';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { select, update } from 'request/request';
import { useNavigate, useParams } from 'react-router-dom';
const index = () => {
  const formRef = useRef(null as any);
  const [selectedData, setSelectedData] = useState<any>({});
  const [loading, setLoading] = useState<boolean>(true);
  const params = useParams();
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const getData = () => {
    select({ link: '/guru/get_data/' + params?.id_guru })
      .then((res) => {
        const { data } = res.data;
        setSelectedData(data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
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
    update({ data: obj, link: '/guru/edit', id: params?.id_guru })
      .then((res) => {
        const { data } = res;
        console.log(data);
        navigate('/pages/admin/master/data_guru');
      })
      .catch((err) => {
        const { data } = err.response;
        setErrorMessage(data.data);
        // console.log(data);
      });
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <>
      <CustomContainer>
        <ContentParent>
          {!loading && (
            <CustomPaper Title={'Edit guru'}>
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
                      defaultValue={selectedData?.nama_lengkap}

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
                      defaultValue={selectedData?.no_hp}

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
                        defaultValue={selectedData?.tanggal_lahir}

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
                      defaultValue={selectedData?.username}

                      fullWidth
                    />
                  </Grid>
                  <Grid item md={3}>
                    <TextField
                      id="password"
                      name="password"
                      variant="filled"
                      color={'secondary'}
                      defaultValue={selectedData?.password}
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
                      defaultValue={selectedData?.alamat}
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
          )}
        </ContentParent>
        <Footer />
      </CustomContainer>
    </>
  );
};

export default index;
