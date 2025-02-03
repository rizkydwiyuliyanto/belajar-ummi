/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import CustomPaper from 'components/CustomPaper';
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, Grid, IconButton, Stack } from '@mui/material';
import Footer from 'components/Footer';
import { NavLink } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import { Download, RemoveRedEye } from '@mui/icons-material';
import { showImage } from 'request/request';

const Form = (props: { Id: any }) => {
  return (
    <NavLink to={'/pages/admin/materi/tambah_materi/' + props.Id}>
      <Button variant={'contained'}>Tambah materi</Button>
    </NavLink>
  );
};

const index = () => {
  const params = useParams();
  const { id_tingkatan } = params;
  const { loading, result } = useFetch({ link: "/materi/get_data/" + id_tingkatan });
  const [open, setOpen] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  const handleClickOpen = (url: any, index: number) => {
    setSelectedImage({ url, index });
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };
  const downloadImage = (url: any, index: any) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `slide-${index + 1}.jpg`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    handleClose();
  };
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  // const { result } = useFetch({ link: '/tingkatan/detail/' + nama_tingkatan.split("-").join(" ") });
  useEffect(() => {
    console.log(params);
  }, [])
  return (
    <>
      <CustomContainer>
        <ContentParent>
          <CustomPaper Title={"Isi buku"} Form={<Form Id={id_tingkatan} />}>
            {!loading &&
              <>
                <Grid container spacing={3}>
                  {result.map((x: any, index: number) => {
                    const src = `${showImage({ filePath: x?.file_foto })}`;
                    return (
                      <Grid item xs={12} sm={4} key={index}>
                        <Box
                          sx={{ width: "100%", height: "250px" }}
                          className="img-card"
                        >
                          <img
                            src={src}
                            alt={`Page ${index + 1}`}
                            style={{
                              width: "100%",
                              height: "100%",
                              objectFit: "cover",
                            }}
                          />
                          <Stack
                            direction="row"
                            spacing={1}
                            sx={{ position: "absolute", top: 2, right: 2 }}
                          >
                            <IconButton
                              onClick={() => handleClickOpen(src, index + 1)}
                              className="btn-bg"
                            >
                              <RemoveRedEye />
                            </IconButton>
                            <IconButton onClick={() => downloadImage(src, index + 1)}
                              className="btn-bg">
                              <Download />
                            </IconButton>
                          </Stack>
                        </Box>
                      </Grid>
                    )
                  })}
                </Grid>
                <Dialog
                  open={open}
                  onClose={handleClose}
                  scroll={"paper"}
                  aria-labelledby="scroll-dialog-title"
                  aria-describedby="scroll-dialog-description"
                >
                  <DialogTitle>Preview</DialogTitle>
                  <DialogContent>
                    <img
                      src={selectedImage?.url}
                      alt={selectedImage?.url}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </DialogContent>
                  <DialogActions sx={{ p: 2 }}>
                    <Button variant="outlined" onClick={handleClose}>
                      Cancel
                    </Button>
                    <Button
                      variant="contained"
                      onClick={() =>
                        downloadImage(selectedImage.url, selectedImage.index)
                      }
                    >
                      Download
                    </Button>
                  </DialogActions>
                </Dialog>
              </>
            }
          </CustomPaper>
        </ContentParent>
        <Footer />
      </CustomContainer>
    </>
  );
};

export default index;
