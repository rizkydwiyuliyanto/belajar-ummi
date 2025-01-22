/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import CustomPaper from 'components/CustomPaper';
import Footer from 'components/Footer';
// import Select, { SelectChangeEvent } from '@mui/material/Select';
// import { Stack, Box, Typography, MenuItem, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { select } from 'request/request';
import { Box, Stack, Table, TableBody, TableCell, TableHead, TableRow, Typography, useMediaQuery } from '@mui/material';
import useFetch from 'hooks/useFetch';
import GeneratePDF from "components/GeneratePDF/index";
import { maxMobile } from 'utils/mediaQuery';

// import { useMediaQuery } from "@mui/material";
const GridContainer = ({ children }: { children: any }) => {
    const isMobile = useMediaQuery(maxMobile);
    return (
        <>
            <div style={{
                display: "grid",
                gap: "22px",
                gridTemplateColumns: `repeat(auto-fit, minmax(${isMobile ? "100%" : "400px"}, 1fr))`
            }}>
                {children}
            </div>
        </>
    )
}
const ItemKategori = ({ Data }: { Data: any }) => {
    const params = useParams();
    const { id_santri } = params;
    const { loading, result } = useFetch({ link: `/kategori/nilai_kategori?id_santri=${id_santri}&id_kategori=${Data?.id_kategori}` });
    const color = (nilai: any) => {
        if (nilai >= Data?.nilai) {
            return "green"
        }
        return "red";
    }
    return (
        <>
            <TableCell>
                <Typography variant={"caption"} sx={{ fontWeight: "600" }}>{Data?.nama_kategori}</Typography>
            </TableCell>
            <TableCell align='center'>
                {!loading ?
                    <Typography color={result.length > 0 ? color(result[0]["nilai"]) : "black"} variant={"caption"}>
                        {result.length > 0 ? result[0]["nilai"] : "-"}
                    </Typography>
                    :
                    <Typography variant={"caption"}>
                        
                    </Typography>
                }

            </TableCell>
            <TableCell>
                <Typography variant={"caption"} sx={{ fontWeight: "600" }}>{Data?.nilai}</Typography>
            </TableCell>
        </>
    )
}
const index = () => {
    const [dataHasil, setDataHasil] = useState<any>([]);
    const params = useParams();
    const { id_santri } = params;
    const {result, loading} : {result: any, loading: boolean} = useFetch({link:`/santri/get_data/${id_santri}`});
    const getData = async () => {
        try {
            const data: any[] = [];
            const tingkatan = await select({ link: "/tingkatan/get_data" });
            const kategori = await select({ link: "/kategori/nama_kategori" })
            const dataTingkatan: [] = tingkatan?.data.data;
            dataTingkatan.forEach((item: any) => {
                const dataKategori: [] = kategori?.data.data
                const newData = dataKategori.filter((x: any) => {
                    return x?.id_tingkatan === item.id_tingkatan;
                });
                if (newData.length > 0) {
                    data.push(newData.map((x: any) => { return { ...x, ...item } }));
                }
            })
            setDataHasil(data);
            // console.log(kategori?.data.data)
        } catch (err) {
            console.log(err);
        }
    }
    // kategori/nama_kategori;
    // tingkatan/get_data;
    const isMobile = useMediaQuery(maxMobile);
    const ref = useRef(null as any);
    useEffect(() => {
        getData();
    }, []);
    return (
        <>
            <CustomContainer>
                <ContentParent>
                    <CustomPaper Title={"Tabel penilaian"} Form={!isMobile ? <GeneratePDF Ref={ref}/> : ""}>
                        <Box ref={ref}>
                            <Stack direction={"column"} rowGap={1.25}>
                                {!loading &&
                                    <>
                                        <Stack paddingY={"10px"}>
                                            <Typography variant={"h6"}>Santri: {result?.nama_lengkap}</Typography>
                                            {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
                                        </Stack>
                                        <GridContainer>
                                            {dataHasil.length > 0 &&
                                                <>
                                                    {dataHasil.map((x: any) => {
                                                        const tingkatan = x[0];
                                                        return (
                                                            <>
                                                                <Stack direction={"column"} rowGap={1.25}>
                                                                    <Typography variant={"h6"} sx={{ borderBottom: "1.2px solid #dddddd", paddingBottom: "8px" }}>{tingkatan?.nama_tingkatan}</Typography>
                                                                    <Box sx={{
                                                                        borderRadius: "7px",
                                                                        boxShadow: "rgba(0, 0, 0, 0.15) 2.4px 2.4px 3.2px"
                                                                    }}>
                                                                        <Table sx={{width:"100%"}}>
                                                                            <TableHead>
                                                                                <TableRow>
                                                                                    <TableCell>Kategori</TableCell>
                                                                                    <TableCell>Penilaian</TableCell>
                                                                                    <TableCell>Minimal</TableCell>
                                                                                </TableRow>
                                                                            </TableHead>
                                                                            <TableBody>
                                                                                {x.map((y: any) => {
                                                                                    return (
                                                                                        <TableRow sx={{ border: "none" }}>
                                                                                            <ItemKategori Data={y} />
                                                                                        </TableRow>
                                                                                    )
                                                                                })}
                                                                            </TableBody>
                                                                        </Table>
                                                                    </Box>
                                                                </Stack>
                                                            </>
                                                        )
                                                    })}
                                                </>
                                            }
                                        </GridContainer>
                                    </>
                                }
                            </Stack>
                        </Box>
                    </CustomPaper>
                </ContentParent>
                <Footer />
            </CustomContainer>
        </>
    );
};

export default index;
