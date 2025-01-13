/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomPaper from 'components/CustomPaper';
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
// import { Typography } from '@mui/material';
import useFetch from 'hooks/useFetch';
import { Box, Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { select } from 'request/request';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import {
    useEffect,
    useState
} from 'react';
interface Columns {
    id: string,
    label: string
}

const Nilai = ({ IdSantri, Tingkatan }: { IdSantri: any, Tingkatan: any }) => {
    const [data, setData] = useState<any>({});
    const [loading, setLoading] = useState(true);
    const getData = async () => {
        select({ link: `/tingkatan/cek_kategori?id_santri=${IdSantri}` })
            .then(res => {
                const { data } = res.data;
                setData(data?.status);
                setLoading(false);
            }).catch(err => {
                console.log(err);
            })
    }
    const cekNilai: any = (idTingkatan: any) => {
        if (data[idTingkatan]["status"] === "Lanjut") return <CheckCircleIcon fontSize={"small"} color={"success"} />;
        return "";
    }
    useEffect(() => {
        getData()
    }, []);
    return (
        <>
            {Tingkatan.map((z: any) => {
                return (
                    <>
                        <TableCell>
                            <Stack direction={"column"} alignItems={"center"}>
                                {/* <Typography variant={"caption"}>Belum lulus</Typography> */}
                                <Stack direction={"column"} alignItems={"center"}>
                                    <Box>
                                        {!loading && cekNilai(z?.id_tingkatan)}
                                    </Box>
                                    <NavLink to={`/pages/guru/asesmen/${IdSantri}/${z?.id_tingkatan}`}>
                                        <Button color={"primary"} size={"small"} sx={{ margin: 0 }}>
                                            <Typography variant={"caption"}>
                                                Berikan nilai
                                            </Typography>
                                        </Button>
                                    </NavLink>
                                </Stack>
                            </Stack>
                        </TableCell>
                    </>
                )
            })}
        </>
    )
}

const AssesmentTable = ({ Columns, Data }: { Columns: Columns[], Data: any }) => {
    const { result, loading } = useFetch({ link: '/tingkatan/get_data' });
    return (
        <>
            {/* <pre>{JSON.stringify(result, null, 2)}</pre> */}
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }}>
                    <TableHead>
                        <TableRow>
                            {Columns.map((x: Columns) => {
                                return (
                                    <TableCell>
                                        {x?.label}
                                    </TableCell>
                                )
                            })}
                            {!loading &&
                                <>
                                    {result.map((x: any) => {
                                        return (
                                            <TableCell align={"center"}>
                                                {x?.nama_tingkatan}
                                            </TableCell>
                                        )
                                    })}
                                </>
                            }
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {Data.map((x: any) => {
                            return (
                                <>
                                    <TableRow>
                                        {Columns.map((y: Columns) => {
                                            return (
                                                <TableCell>{x[y?.id]}</TableCell>
                                            )
                                        })}
                                        <Nilai Tingkatan={result} IdSantri={x?.id_santri} />
                                    </TableRow>
                                </>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    )
}
const index = () => {
    const { result, loading } = useFetch({ link: '/santri/get_data' });
    const columns: Columns[] = [
        {
            "id": "nama_lengkap",
            "label": "Santri"
        }
    ];
    return (
        <>
            <CustomContainer>
                <ContentParent>
                    <CustomPaper Title={'Asesmen'}>
                        {!loading &&
                            <>
                                <Stack direction={"row"} alignItems={"center"} columnGap={1.1}>
                                    <CheckCircleIcon fontSize={"small"} color={"success"} />
                                    <Typography>: Lulus</Typography>
                                </Stack>
                                <AssesmentTable Data={result} Columns={columns} />
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