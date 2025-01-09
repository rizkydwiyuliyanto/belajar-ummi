/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, MenuItem, Select, Typography, Stack, Button, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import CustomPaper from 'components/CustomPaper';
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import { useContext, useState } from 'react';
import Quiz from "./Quiz";
import TimeQuiz from "./TimeQuiz";
import useFetch from 'hooks/useFetch';
import { Content } from 'Context/UserContext';
import { NavLink } from 'react-router-dom';

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
                                        <TableCell>
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
    const [pilihLevel, setPilihLevel] = useState();
    const [start, setStart] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const value = useContext(Content);
    const r: { id_santri?: string } = value?.user || {};
    const { result, loading } = useFetch({ link: "/pembahasan/get_data/" + r?.id_santri })
    const stopQuiz = () => {
        setStart(false);
    }
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
    const time = Date.now() + 900000;
    return (
        <>
            <CustomContainer>
                <ContentParent>
                    <CustomPaper Title={'Quiz'}>
                        {/* <Time/> */}
                        {!start ?
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
                                            </Select>
                                        </Stack>
                                        <Button
                                            size={"small"}
                                            variant={"contained"}
                                            onClick={() => {
                                                if (pilihLevel) setStart(true);
                                            }}
                                        >
                                            Lanjut
                                        </Button>
                                    </Stack>
                                </FormControl>
                            </Stack>
                            :
                            <>
                                <Stack justifyContent={"center"}>
                                    <TimeQuiz 
                                        Time={time} 
                                        OnComplete={() => {
                                            setIsCompleted(true);
                                        }}
                                    />
                                </Stack>
                                <Quiz IsCompleted={isCompleted} Stop={stopQuiz} Time={time} Level={pilihLevel} />
                            </>
                        }
                        {(!loading && !start) &&
                            <Box
                                sx={{
                                    marginTop: "22px"
                                }}
                            >
                                <Typography variant={"body1"} sx={{ fontWeight: "700", marginBottom:"12px" }}>
                                    Riwayat {r?.id_santri}
                                </Typography>
                                <DataNilai
                                    Columns={columns}
                                    Data={result}
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