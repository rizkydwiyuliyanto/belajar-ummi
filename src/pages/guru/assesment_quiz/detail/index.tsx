/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, MenuItem, Select, Typography, Stack, Button, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import CustomPaper from 'components/CustomPaper';
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import { useState } from 'react';
import useFetch from 'hooks/useFetch';
import { NavLink, useParams } from 'react-router-dom';

// import Time from "./Time";

const DataNilai = (props: { Data: any, Columns: any }) => {
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            {props.Columns.map((elem: any) => {
                                return (
                                    <TableCell>
                                        {elem?.label}
                                    </TableCell>
                                )
                            })}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props.Data.map((elem: any) => {
                            return (
                                <>
                                    <TableRow>
                                        {props.Columns.map((elem2: any) => {
                                            return (
                                                <TableCell>
                                                    {elem[elem2?.name]}
                                                </TableCell>
                                            )
                                        })}
                                        <TableCell style={{display:"none"}}>
                                            <NavLink to={"/pages/santri/latihan/latihan_soal/pembahasan/" + elem?.id_nilai}>
                                                <Button variant={"contained"} size={"small"}>
                                                    Lihat pembahasan
                                                </Button>
                                            </NavLink>
                                        </TableCell>
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
    const [pilihLevel, setPilihLevel] = useState(1);
    const params = useParams();
    const { id_santri } = params;
    const { result, loading } = useFetch({ link: "/pembahasan/get_data/" + id_santri })
    const handleChange = ((e: any) => {
        setPilihLevel(e.target.value);
    })
    interface Column {
        align: string;
        name: string;
        primaryTrue?: boolean;
        label: string;
    }
    const columns: Column[] = [
        {
            align: "",
            name: "total_benar",
            label: "Total benar"
        },
        {
            align: "",
            name: "jumlah_soal",
            label: "Jumlah soal"
        },
        {
            align: "",
            name: "nilai",
            label: "Nilai"
        },
        {
            align: "",
            name: "tanggal_masuk",
            label: "Tanggal"
        },
    ]
    return (
        <>
            <CustomContainer>
                <ContentParent>
                    <CustomPaper Title={'Quiz'}>
                        {/* <Time/> */}
                        <Stack justifyContent={"center"}>
                            <FormControl>
                                <Stack alignItems={"end"} spacing={1}>
                                    <Stack direction={"column"} spacing={1}>
                                        <Typography variant={"caption"}>
                                            Pilih level
                                        </Typography>
                                        <Select
                                            labelId="demo-simple-select-label"
                                            id="demo-simple-select"
                                            value={pilihLevel}
                                            sx={{
                                                width: "100px",
                                            }}
                                            onChange={handleChange}
                                        >
                                            <MenuItem value={1}>1</MenuItem>
                                            <MenuItem value={2}>2</MenuItem>
                                            <MenuItem value={3}>3</MenuItem>
                                            <MenuItem value={4}>4</MenuItem>
                                            <MenuItem value={5}>5</MenuItem>
                                            <MenuItem value={6}>6</MenuItem>
                                        </Select>
                                    </Stack>
                                </Stack>
                            </FormControl>
                        </Stack>
                        {(!loading) &&
                            <Box
                                sx={{
                                    marginTop: "22px"
                                }}
                            >
                                <DataNilai
                                    Columns={columns}
                                    Data={result.filter((x: any) => {return x?.id_level == pilihLevel})}
                                />
                            </Box>
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