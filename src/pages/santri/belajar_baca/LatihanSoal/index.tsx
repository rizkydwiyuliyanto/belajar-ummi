/* eslint-disable @typescript-eslint/no-explicit-any */
import { FormControl, MenuItem, Select, Typography, Stack, Button, Box, TableContainer, Table, TableHead, TableBody, TableRow, TableCell } from '@mui/material';
import CustomPaper from 'components/CustomPaper';
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import { useContext, useEffect, useState } from 'react';
import Quiz from "./Quiz";
import TimeQuiz from "./TimeQuiz";
import useFetch from 'hooks/useFetch';
import { Content } from 'Context/UserContext';
import { NavLink } from 'react-router-dom';
import CustomGrid from "components/CustomGrid";
import TingkatanCard from "components/TingkatanCard";
import { select } from 'request/request';

// import Time from "./Time";

const DataNilai = (props: { Data: any, Columns: any }) => {
    const [pilihLevel, setPilihLevel] = useState(0);
    const handleChange = ((e: any) => {
        setPilihLevel(e.target.value);
        console.log(props?.Data[e.target.value]);
    })
    return (
        <>
            <Stack direction={"column"} rowGap={1.25}>
                <Typography variant={"h5"} marginBottom={"9px"}>Pembahasan</Typography>
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
                                <MenuItem value={0}>1</MenuItem>
                                <MenuItem value={1}>2</MenuItem>
                                <MenuItem value={2}>3</MenuItem>
                            </Select>
                        </Stack>
                    </Stack>
                </FormControl>
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
                            {props.Data
                                .filter((x: any) => { return x?.id_level == pilihLevel + 1 })
                                .map((elem: any) => {
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
            </Stack>
        </>
    )
}

const PilihTingkatan = (props: { HandleChange: any }) => {
    const { result, loading } = useFetch({ link: '/tingkatan/get_data' });
    const level = [0, 1, 2, 3, 4, 5];
    return (
        <>
            {!loading &&
                <CustomGrid>
                    {level.map((x: any) => {
                        const value = result[x];
                        return (
                            <>
                                <TingkatanCard Value={value}>
                                    <Stack direction={"column"} sx={{ width: "100%" }}>
                                        <Button
                                            size="small"
                                            variant={"contained"}
                                            fullWidth
                                            onClick={() => { props?.HandleChange(x + 1) }}
                                        >
                                            Mulai Quiz
                                        </Button>
                                    </Stack>
                                </TingkatanCard>
                            </>
                        )
                    })}
                </CustomGrid>
            }
        </>
    )
}

const index = () => {
    const [pilihLevel, setPilihLevel] = useState<number | any>();
    const [start, setStart] = useState(false);
    const [isCompleted, setIsCompleted] = useState(false);
    const value = useContext(Content);
    const r: { id_santri?: string } = value?.user || {};
    const { result, loading } = useFetch({ link: "/pembahasan/get_data/" + r?.id_santri })
    const stopQuiz = () => {
        setStart(false);
    }
    const handleChange = ((e: any) => {
        setPilihLevel(e);
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
    useEffect(() => {
        if (pilihLevel) {
            select({ link: "/soal/get_data?level=" + pilihLevel }).then(res => {
                const { data } = res.data;
                if (data?.length > 0) {
                    setStart(true);
                    return
                }
                alert("Soal belum ada");
            }).catch(err => {
                console.log(err)
            });
        }
    }, [pilihLevel])
    return (
        <>
            <CustomContainer>
                <ContentParent>
                    <CustomPaper Title={'Quiz'}>
                        {/* <Time/> */}
                        {!start ?
                            <Stack justifyContent={"center"} direction={"column"}>
                                <PilihTingkatan HandleChange={handleChange} />
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