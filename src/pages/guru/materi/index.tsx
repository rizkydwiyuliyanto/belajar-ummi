/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button, Stack } from '@mui/material';
import CustomPaper from 'components/CustomPaper';
import { NavLink } from 'react-router-dom';
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import CustomGrid from "components/CustomGrid";
import Footer from 'components/Footer';
import useFetch from 'hooks/useFetch';
import TingkatanCard from "components/TingkatanCard";
// import { useState } from 'react';


// const Form = () => {
//   return (
//     <NavLink to={'/pages/guru/materi/tambah_tingkatan'}>
//       <Button variant={'contained'}>Tambah tingkatan</Button>
//     </NavLink>
//   );
// };


const index = () => {
  const { result, loading } = useFetch({ link: '/tingkatan/get_data' });
  //   const navigate = useNavigate();
  return (
    <>
      <CustomContainer>
        <ContentParent>
          <CustomPaper Title={'Data tingkatan'}>
            {!loading && (
              <>

                <CustomGrid>
                  {result.map((x: any) => {
                    return (
                      <>
                        <TingkatanCard Value={x}>
                          <Stack direction={"column"} sx={{width: "100%"}}>
                            <NavLink
                              to={`/pages/guru/materi/kategori_tingkatan/${x?.id_tingkatan}`}
                              style={{
                                textDecoration: 'none', width: "100%", display: 'flex', justifyContent: "flex-end", marginBottom:"5px"
                              }}>
                              <Button size="small" variant={"contained"} fullWidth>
                                Kategori
                              </Button>
                            </NavLink>
                            <NavLink
                              to={`/pages/guru/materi/detail_tingkatan/${x?.id_tingkatan}`}
                              style={{
                                textDecoration: 'none', width: "100%", display: 'flex', justifyContent: "flex-end"
                              }}>
                              <Button size="small" variant={"contained"} fullWidth>
                                Isi UMMI
                              </Button>
                            </NavLink>
                          </Stack>
                        </TingkatanCard>
                      </>
                    )
                  })}
                </CustomGrid>
              </>
            )}
          </CustomPaper>
          {/* <Activity /> */}
        </ContentParent>
        <Footer />
      </CustomContainer>
    </>
  );
};

export default index;
