/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomPaper from 'components/CustomPaper';
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
// import { Typography } from '@mui/material';
import useFetch from 'hooks/useFetch';
import { Button, Paper, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
interface Columns {
    id: string,
    label: string
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
                                        {result.map((z: any) => {
                                            return (
                                                <>
                                                    <TableCell>
                                                        <Stack direction={"column"} alignItems={"center"}>
                                                            {/* <Typography variant={"caption"}>Belum lulus</Typography> */}
                                                            <NavLink to={`/pages/guru/asesmen/${x?.id_santri}/${z?.id_tingkatan}`}>
                                                                <Button variant={"text"} color={"info"} size={"small"}>
                                                                    <Typography variant={"caption"}>
                                                                        Berikan nilai
                                                                    </Typography>
                                                                </Button>
                                                            </NavLink>
                                                        </Stack>
                                                    </TableCell>
                                                </>
                                            )
                                        })}
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
    ]
    return (
        <>
            <CustomContainer>
                <ContentParent>
                    <CustomPaper Title={'Asesmen'}>
                        {!loading &&
                            <>
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