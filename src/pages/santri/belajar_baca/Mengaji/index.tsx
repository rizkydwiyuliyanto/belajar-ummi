/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Stack, Typography, useMediaQuery } from '@mui/material';
import CustomPaper from 'components/CustomPaper';
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';

import useFetch from 'hooks/useFetch';
import { useContext, useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { select, url } from 'request/request';
import { Content } from 'Context/UserContext';
import { maxMobile } from 'utils/mediaQuery';

const Tingkatan = ({ Value, Nilai, Lanjut, Next, Prev, PrevTingkatan }: { Value: any, Nilai: any, Lanjut: boolean, Next: any, Prev: any, PrevTingkatan: any }) => {
    const isMobile = useMediaQuery(maxMobile);
    const {
        id_tingkatan,
        nama_tingkatan,
        foto,
        // keterangan
    } = Value;
    console.log(Nilai)
    const fotoUrl = `${url}/uploads/tingkatan/${foto}`
    return (
        <>
            <div className="card-list">
                <article className="card">
                    {/* <figure className="card-image">
                    </figure> */}
                    <div className="card-header">
                        {!isMobile && Prev}
                        <Stack direction={"row"} justifyContent={"center"} alignItems={"center"} sx={{ flex: 1 }}>
                            <Stack direction={"row"} alignItems={"center"} columnGap={1.2}>
                                <a href="#">{nama_tingkatan}</a>
                                <img style={{
                                    width: "60px",
                                    height: "75px",
                                    objectFit: "contain"
                                }} src={fotoUrl} alt={id_tingkatan} />
                            </Stack>
                        </Stack>
                        {!isMobile && Next}
                    </div>
                    <div className="card-footer">
                        <Stack direction={"column"} rowGap={1.2} sx={{ marginBottom: "12px" }}>
                            {Nilai?.detail.map((x: any) => {
                                const color = x?.nilai >= x?.batas_nilai ? "green" : "red"
                                return (
                                    <div className="detail-nilai-kategori">
                                        <Stack direction={"column"} rowGap={1.2}>
                                            <Typography variant={"body2"}>{x?.nama_kategori}</Typography>
                                            <Stack direction={"column"} rowGap={0.5}>
                                                <Typography variant={"h5"}>{">="}{x?.batas_nilai}</Typography>
                                                <Typography variant={"h5"} color={color}>{x?.nilai}</Typography>
                                            </Stack>
                                        </Stack>
                                    </div>
                                )
                            })}
                        </Stack>
                        <Stack direction={"column"} rowGap={1} sx={{ width: "100%" }}>
                            {isMobile &&
                                <Stack direction={"row"} justifyContent={"space-between"} columnGap={2} sx={{width: "100%" }}>
                                    {Prev}
                                    {Next}
                                </Stack>
                            }
                            {Lanjut ?
                                <NavLink
                                    to={`/pages/santri/latihan/mengaji/${id_tingkatan}`}
                                    style={{
                                        textDecoration: 'none', display: 'flex', justifyContent: "flex-end", flex: 1
                                    }}
                                >
                                    <Button sx={{ color: "white", width: "100%" }} variant={"contained"} size={"small"} color={"success"}>
                                        Mulai
                                    </Button>
                                </NavLink>
                                :
                                <Button disabled={!Lanjut} sx={{ color: "white", flex: 1 }} variant={"contained"} size={"small"} color={"success"}>
                                    {PrevTingkatan} Belum lulus
                                </Button>
                            }
                        </Stack>
                    </div>
                </article>
            </div>
        </>
    )
}

const index = () => {
    const { result } = useFetch({ link: '/tingkatan/get_data' });
    const [loading, setLoading] = useState(true);
    const [nilai, setNilai] = useState<any>();
    const value: any = useContext(Content)?.user;
    const { id_santri } = value;
    const [currentIndex, setCurrentIndex] = useState(0);
    const handleClick = (x: any) => {
        setCurrentIndex(prev => prev + x);
    }
    const cekLanjut = (idTingkatan: string) => {
        const { status } = nilai[idTingkatan];
        if (status === "Lanjut") return true;
        return false;
    }
    const getNilaiKategori = () => {
        select({ link: `/tingkatan/cek_kategori?id_santri=${id_santri}` })
            .then((res) => {
                const { data }: { data: any } = res.data;
                setNilai(data?.status);
                setLoading(false)
            })
            .catch(err => {
                console.log(err);
            })
    }
    useEffect(() => {
        getNilaiKategori();
    }, [])
    return (
        <>
            <CustomContainer>
                <ContentParent>
                    <CustomPaper Title={'Ummi'}>
                        {!loading &&
                            <>
                                <Box>
                                    <Stack justifyContent={"center"} direction={"row"} alignItems={"start"} columnGap={1}>
                                        <Box>
                                            {result.map((x: any, idx: number) => {
                                                let lanjut = true;
                                                if (idx > 0) {
                                                    lanjut = cekLanjut(result[idx - 1]["id_tingkatan"]);
                                                }
                                                return (
                                                    <Box>
                                                        {idx === currentIndex &&
                                                            <>
                                                                <Tingkatan
                                                                    Lanjut={lanjut}
                                                                    Nilai={nilai[x?.id_tingkatan]}
                                                                    PrevTingkatan={idx > 0 ? result[idx - 1]["nama_tingkatan"] : ""}
                                                                    Value={x}
                                                                    Prev={
                                                                        <Button
                                                                            variant={"contained"}
                                                                            size={"small"}
                                                                            onClick={() => { handleClick(-1) }}
                                                                            disabled={currentIndex === 0}
                                                                        >
                                                                            Prev
                                                                        </Button>
                                                                    }
                                                                    Next={
                                                                        <Button
                                                                            variant={"contained"}
                                                                            size={"small"}
                                                                            onClick={() => { handleClick(1) }}
                                                                            disabled={currentIndex >= result.length - 1}
                                                                        >Next</Button>
                                                                    }
                                                                />
                                                            </>
                                                        }
                                                    </Box>
                                                )
                                            })}
                                        </Box>
                                    </Stack>
                                </Box>
                            </>
                        }
                    </CustomPaper>
                    {/* <Activity /> */}
                </ContentParent>
                <Footer />
            </CustomContainer>
        </>
    )
};

export default index;