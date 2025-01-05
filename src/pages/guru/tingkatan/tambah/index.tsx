import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import CustomPaper from 'components/CustomPaper';
import { Alert, Button, Stack, TextField } from '@mui/material';
import Grid from '@mui/material/Grid';
import { create, inputFoto } from 'request/request';
import { FormEvent, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomeUploadFotoButton from 'components/CustomUploadFotoButton';
function generateRandomString(length: number) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
}
const index = () => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const formRef = useRef(null as any);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(formRef.current);
    const formFile = new FormData();
    let obj = {
      id_tingkatan: generateRandomString(7)
    };
    const files = ['foto'];
    formData.forEach((value, key) => {
      if (files.includes(key)) {
        formFile.append(key, value);
      } else {
        obj = {
          ...obj,
          [key]: value,
        };
      }
    });
    create({ data: obj, link: '/tingkatan/tambah' })
      .then((res) => {
        const { data } = res.data;
        console.log(res.data);
        inputFoto({ link: 'tingkatan/input_foto', id: data?.id_tingkatan, formData: formFile })
          .then((res) => {
            console.log(res);
            navigate('/pages/guru/materi');
          })
          .catch((err) => {
            console.log(err);
          });
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
          <CustomPaper Title={'Tambah tingkatan'}>
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
              <Grid
                sx={{
                  height: '270px',
                }}
                container
                spacing={2}
                justifyContent={'space-between'}
              >
                <Grid
                  item
                  md={4}
                  sx={{
                    display: 'flex',
                    flexFlow: 'column',
                  }}
                  padding={2}
                  rowGap={2}
                  height={'100%'}
                  justifyContent={'space-between'}
                >
                  <TextField
                    id="nama_tingkatan"
                    required
                    name="nama_tingkatan"
                    variant="filled"
                    color={'secondary'}
                    placeholder="Nama tingkatan"
                    fullWidth
                  />
                  <CustomeUploadFotoButton name={'foto'} label={'Upload foto'} id={'foto'} />
                </Grid>
                <Grid
                  item
                  md={8}
                  padding={2}
                  sx={{
                    display: 'flex',
                    flexFlow: 'column',
                    height: '100%',
                  }}
                >
                  <TextField
                    required
                    id="keterangan"
                    name="keterangan"
                    variant="filled"
                    multiline
                    sx={{
                      flex: '1 1 auto', // Make it grow within the flex container
                      height: '100%', // Full height
                      '& .MuiInputBase-root': {
                        height: '100%', // Make the input root full height
                        alignItems: 'start', // Align text to the top
                      },
                    }}
                    inputProps={{
                      style: {
                        height: '100%', // Ensure the input area is full height
                      },
                    }}
                    color={'secondary'}
                    placeholder="Keterangan"
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
