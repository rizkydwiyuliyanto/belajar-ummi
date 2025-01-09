/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomPaper from 'components/CustomPaper';
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import SelectHeader from "components/HeaderSelect";
import { useEffect, useState } from 'react';
import { remove, select } from 'request/request';
import { Box, Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import FormTambahSoal from "./FormTambahSoal";
import ItemSoal from "./ItemSoal";
import useMediaQuery from '@mui/material/useMediaQuery';
import TableViewIcon from '@mui/icons-material/TableView';
import GridViewIcon from '@mui/icons-material/GridView';
import IconButton from '@mui/material/IconButton';
// import MoreVertIcon from '@mui/icons-material/MoreVert';

const FormDelete = (props: { Id: any, SetDelete: any, GetData: any }) => {
    const handleDelete = () => {
        remove({ link: "/soal/delete", id: props?.Id }).then(() => {
            props.SetDelete(null)
            setTimeout(() => {
                props?.GetData();
                alert("Selesai")
            }, 250);
        }).catch((err) => {
            console.log(err);
        });
    }
    return (
        <>
            <Stack
                justifyContent={"center"}
                alignItems={"center"}
                sx={{
                    // border: "1px solid red",
                    position: "absolute",
                    borderRadius: "10px",
                    width: "100%",
                    height: "100%",
                    zIndex: 5,
                    backgroundColor: "#00000088"
                }}
            >
                <Stack spacing={1}>
                    <Button variant={"contained"} color={"error"} onClick={handleDelete}>
                        Hapus
                    </Button>
                    <Button variant={"contained"} color={"primary"} onClick={() => { props.SetDelete(null) }}>
                        Keluar
                    </Button>
                </Stack>
            </Stack>
        </>
    )
}

const GridItems = (props: {
    Result: any,
    IndexUpdate: any,
    SetIndexUpdate: any,
    IndexDelete: any,
    SetIndexDelete: any,
    Level: any,
    GetData: any
}) => {
    const matches = useMediaQuery('(max-width:799px)');
    return (
        <>
            <Stack direction={"column"} spacing={4}>
                {props?.Result.map((x: any, idx: number) => {
                    return (
                        <Stack sx={{ position: "relative" }} justifyContent={"space-between"} alignItems={"center"}>
                            {/* {indexDelete === null &&
                                                            } */}
                            {(props?.IndexUpdate !== idx) &&
                                <>
                                    <Stack direction={"column"} alignItems={"end"} sx={{width: "100%"}} rowGap={2}>
                                        <Stack direction={"row"} spacing={1}>
                                            {/* <Button onClick={() => { props?.SetIndexUpdate(idx) }} color={"primary"} variant={"contained"} size={"small"}>Edit</Button> */}
                                            <Button onClick={() => {
                                                props?.SetIndexDelete(idx)
                                            }} color={"error"} variant={"contained"} size={"small"}>Delete</Button>
                                        </Stack>
                                        <ItemSoal Soal={x?.soal} PilihanItem={x?.pilihan} Idx={idx} />
                                    </Stack>
                                </>
                            }
                            {(props?.IndexDelete !== null && props?.IndexDelete === idx) &&
                                <FormDelete GetData={props.GetData} Id={x?.soal?.id_soal} SetDelete={props?.SetIndexDelete} />
                            }
                            {(props?.IndexUpdate !== null && props?.IndexUpdate === idx) &&
                                <>
                                    <FormTambahSoal IsMobile={matches} GetData={props?.GetData} Level={props?.Level} Data={x} SetUpdate={props.SetIndexUpdate} />
                                </>
                            }
                        </Stack>
                    )
                })}
            </Stack>
        </>
    )
}

const TableItems = (props: {
    Result: any,
    IndexUpdate: any,
    SetIndexUpdate: any,
    IndexDelete: any,
    SetIndexDelete: any,
    Level: any,
    GetData: any
}) => {
    return (
        <>
            <TableContainer>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell>Soal</TableCell>
                            <TableCell>Pembahasan</TableCell>
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {props?.Result.map((x: any, idx: number) => {
                            return (
                                <>
                                    <TableRow>
                                        <TableCell>{x?.soal?.pertanyaan}</TableCell>
                                        <TableCell>{x?.soal?.pembahasan}</TableCell>
                                        <TableCell align={"right"}>
                                            <Stack direction={"row"} spacing={1} justifyContent={"center"}>
                                                <Button onClick={() => { console.log(idx) }} color={"primary"} variant={"contained"} size={"small"}>Edit</Button>
                                                <Button onClick={() => {
                                                    console.log(idx)
                                                }} color={"error"} variant={"contained"} size={"small"}>Delete</Button>
                                            </Stack>
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

const ShowData = (props: {
    Result: any,
    IndexUpdate: any,
    SetIndexUpdate: any,
    IndexDelete: any,
    SetIndexDelete: any,
    Level: any,
    GetData: any,
    Display: any
}) => {
    return (
        <>
            {props?.Display === "grid" && <GridItems
                Result={props?.Result}
                IndexDelete={props?.IndexDelete}
                SetIndexDelete={props?.SetIndexDelete}
                IndexUpdate={props?.IndexUpdate}
                SetIndexUpdate={props?.SetIndexUpdate}
                Level={props?.Level}
                GetData={props?.GetData}
            />}
            {props?.Display === "table" &&
                <TableItems
                    Result={props?.Result}
                    IndexDelete={props?.IndexDelete}
                    SetIndexDelete={props?.SetIndexDelete}
                    IndexUpdate={props?.IndexUpdate}
                    SetIndexUpdate={props?.SetIndexUpdate}
                    Level={props?.Level}
                    GetData={props?.GetData}
                />
            }
        </>
    )
}

const index = () => {
    const [level, setLevel] = useState(1);
    const [result, setResult] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [indexDelete, setIndexDelete] = useState<any>(null);
    const [indexUpdate, setIndexUpdate] = useState<any>(null);
    const [jumlahForm, setJumlahForm] = useState(0);
    const [disabled, setDisabled] = useState(false);
    const [display, setDisplay] = useState<string>("grid");
    const getData = () => {
        select({ link: "/soal/get_data?level=" + level }).then(res => {
            const { data } = res.data;
            setResult(data);
            setLoading(false)
        }).catch(err => {
            console.log(err)
        });
    }
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const item: any[] = [
        {
            value: "1",
            label: "1"
        },
        {
            value: "2",
            label: "2"
        },
        {
            value: "3",
            label: "3"
        },
    ]
    useEffect(() => {
        let a = false
        if (jumlahForm > 0) a = true;
        setDisabled(a);
    }, [jumlahForm])
    useEffect(() => {
        getData();
    }, [level]);
    return (
        <CustomContainer>
            <ContentParent>
                <CustomPaper Title={'Quiz'}>
                    <SelectHeader
                        Label={"Level"}
                        Value={level}
                        SetValue={setLevel}
                        Items={item}
                    />
                    <>
                        {!loading &&
                            <>
                                <Box p={2}>
                                    <Stack sx={{margin:"10px 0"}} direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                                        <Button
                                            variant={"contained"}
                                            size={"small"}
                                            onClick={() => {
                                                setJumlahForm(1);
                                            }}
                                            endIcon={<AddIcon />}
                                            disabled={disabled}
                                        >
                                            Tambah soal
                                        </Button>
                                        <Stack direction={"row"} spacing={2} sx={{display:"none"}}>
                                            <IconButton onClick={() => {
                                                setDisplay("grid")
                                            }}
                                                sx={{
                                                    backgroundColor: display === "grid" ? "#546FFF" : "none",
                                                    color: display === "grid" ? "#000" : "none"
                                                }}
                                            >
                                                <GridViewIcon />
                                            </IconButton>
                                            <IconButton
                                                onClick={() => {
                                                    setDisplay("table")
                                                }}
                                                sx={{
                                                    backgroundColor: display === "table" ? "#546FFF" : "none",
                                                    color: display === "table" ? "#000" : "none"
                                                }}
                                            >
                                                <TableViewIcon />
                                            </IconButton>
                                        </Stack>
                                    </Stack>
                                    <Box sx={{
                                        margin: "17px 0"
                                    }}>
                                        {result.length > 0 ?
                                            <>
                                                <ShowData
                                                    Result={result}
                                                    IndexDelete={indexDelete}
                                                    SetIndexDelete={setIndexDelete}
                                                    IndexUpdate={indexUpdate}
                                                    SetIndexUpdate={setIndexUpdate}
                                                    Level={level}
                                                    GetData={getData}
                                                    Display={display}
                                                />
                                            </>
                                            :
                                            <Typography variant={"body2"}>
                                                Belum ada Soal
                                            </Typography>
                                        }
                                    </Box>
                                    {jumlahForm > 0 &&
                                        <FormTambahSoal GetData={getData} Level={level} SetJumlahForm={setJumlahForm} />
                                    }
                                </Box>
                            </>
                        }
                    </>
                </CustomPaper>
                {/* <Activity /> */}
            </ContentParent>
            <Footer />
        </CustomContainer >
    );
};

export default index;
