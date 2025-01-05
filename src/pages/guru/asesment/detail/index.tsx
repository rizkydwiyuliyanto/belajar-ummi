/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import CustomPaper from 'components/CustomPaper';
import Footer from 'components/Footer';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Stack, Box, Typography, MenuItem, Button } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import WaveSurfer from 'wavesurfer.js'

import {
    create,
    select,
    update,
    url,
} from 'request/request';
import useFetch from 'hooks/useFetch';

const SelectPage = (props: { Index: any, SetIndex: any, Length: any }) => {
    const handleChange = (event: SelectChangeEvent) => {
        props.SetIndex(event.target.value);
    };
    return (
        <Box sx={{
            marginBottom: "2px",
            width: "190px",
            display: "flex",
            margin: "0 auto",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <Typography variant={"body2"}>Halaman : </Typography>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.Index}
                sx={{
                    width: "60%",
                }}
                onChange={handleChange}
            >
                {/* https://stackoverflow.com/questions/74057046/how-to-use-map-function-with-a-number-state */}
                {props.Length.map((x: any) => {
                    return (
                        <MenuItem value={x?.halaman}>{x?.halaman}</MenuItem>
                    )
                })}
            </Select>
        </Box>
    )
}


const AudioPlayer = ({ Loading, Hasil, Image, GetData, Key }: { Loading: boolean, Hasil: any, Image: any, GetData: any, Key: any, Data: any }) => {
    const [open, setOpen] = useState(false);
    const [text, setText] = useState();
    const refAudio = useRef<HTMLDivElement | null>(null);
    const refWaveSufver = useRef<WaveSurfer | null>(null);
    let suaraSantri = "";
    if (Hasil.length > 0) {
        suaraSantri = url + "/uploads/mengaji/" + Hasil[0]?.suara;
    };
    const handleClick = () => {
        const obj = { "koreksi": text };
        update({ data: obj, link: `/suara_santri/koreksi`, id: Hasil[0]?.id_suara_santri })
            .then(() => {
                handleClose();
                GetData();
            }).catch(err => {
                console.log(err);
            })
    };
    const handleClose = () => {
        setOpen(false);
    }
    const handleClickOpen = () => {
        setOpen(true);
    };
    useEffect(() => {
        if (!Loading) setText(Hasil[0]?.koreksi);
    }, [Loading]);
    useEffect(() => {
        if (!refAudio.current) return;

        refWaveSufver.current = WaveSurfer.create({
            container: refAudio.current,
            waveColor: '#4F4A85',
            progressColor: '#383351',
            width: "200px",
            height: 70
        })
        refWaveSufver.current.load(suaraSantri);
        return () => {
            refWaveSufver.current?.destroy();
        }
    }, [Loading])
    return (
        <>

            <div className="player" style={{ flexDirection: "column" }} key={Key}>
                <Stack>
                    <div className="imgBx" onClick={() => {
                        refWaveSufver.current?.play()
                        // refWaveSufver.current?.on('interaction', () => {
                        // })
                    }}>
                        <img src={Image} alt="Luka Chuppi" />
                    </div>
                    {!Loading &&
                        <>
                            {suaraSantri &&
                                <>
                                    <div ref={refAudio}>

                                    </div>
                                </>

                            }
                            <Dialog
                                open={open}
                                onClose={handleClose}
                                PaperProps={{
                                    component: 'form',
                                    onSubmit: (event: React.FormEvent<HTMLFormElement>) => {
                                        event.preventDefault();
                                        const formData = new FormData(event.currentTarget);
                                        const formJson = Object.fromEntries((formData as any).entries());
                                        const email = formJson.email;
                                        console.log(email);
                                        handleClose();
                                    },
                                }}
                            >
                                <DialogTitle>Koreksi</DialogTitle>
                                <DialogContent>
                                    <DialogContentText>
                                        {/* <pre>
                                        {JSON.stringify(Hasil, null, 2)}
                                    </pre> */}
                                    </DialogContentText>
                                    <TextField
                                        autoFocus
                                        required
                                        margin="dense"
                                        id="koreksi"
                                        name="korkesi"
                                        placeholder={"text"}
                                        type={"text"}
                                        rows={3}
                                        fullWidth
                                        defaultValue={text}
                                        variant={"outlined"}
                                        onChange={(e: any) => {
                                            setText(e.target.value);
                                        }}
                                    // variant="standard"
                                    />
                                </DialogContent>
                                <DialogActions>
                                    <Button onClick={handleClose}>Cancel</Button>
                                    <Button onClick={handleClick}>Submit</Button>
                                </DialogActions>
                            </Dialog>
                        </>
                    }
                </Stack>
                <Stack sx={{ display: "none" }} direction={"row"} columnGap={1} alignItems={"center"}>
                    <Typography>Contoh</Typography>
                </Stack>

            </div>
            {!Loading &&
                <>
                    <Stack sx={{ width: "100%", marginTop:"5px" }} direction={"row"} justifyContent={"center"} columnGap={1} alignItems={"center"}>
                        <Box>
                            {suaraSantri ?
                                <Button onClick={handleClickOpen}>Koreksi</Button>
                                :
                                <Typography>Suara belum ada</Typography>
                            }
                        </Box>
                    </Stack>
                </>
            }
        </>
    )
}

const FormPenilaian = ({ Open, SetOpen }: { Open: boolean, SetOpen: any }) => {
    const params = useParams();
    const formRef = useRef(null as any);
    const {
        id_tingkatan,
        id_santri
    } = params;
    const { result, loading } = useFetch({ link: `/penilaian/santri?id_tingkatan=${id_tingkatan}` })
    const [nilai, setNilai] = useState([]);
    const handleClose = () => {
        SetOpen(false);
    };
    const handleClick = () => {
        const formData = new FormData(formRef.current);
        // eslint-disable-next-line prefer-const
        let obj: any = [];
        formData.forEach((val, key) => {
            const arr = key.split("-");
            const idKategori = arr[0];
            const batas = arr[1];
            if (val !== "") {
                obj.push({
                    id_kategori: idKategori,
                    status: val >= batas ? "Lulus" : "Tidak lulus",
                    nilai: val,
                    sudahInput: cekNilai(idKategori) ? true : false,
                    id_santri: id_santri
                })
            }
        })
        create({ data: obj, link: "/penilaian/input_penilaian" })
            .then(() => {
                getDataNilai(`/penilaian/get_nilai?id_santri=${id_santri}&id_tingkatan=${id_tingkatan}`)
                handleClose()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getDataNilai = (link: any) => {
        select({ link: link })
            .then(res => {
                const { data } = res.data
                setNilai(data);
            }).catch(err => {
                console.log(err)
            })
    }

    const cekNilai = (id_kategori: string) => {
        let result = "";
        const obj: any = nilai.find((x: any) => {
            return x?.id_kategori === id_kategori
        });
        if (obj) {
            result = obj?.nilai;
        }
        return result;
    }

    useEffect(() => {
        if (!loading) {
            getDataNilai(`/penilaian/get_nilai?id_santri=${id_santri}&id_tingkatan=${id_tingkatan}`)
        }
    }, [loading])

    return (
        <Dialog
            open={Open}
            onClose={handleClose}
            PaperProps={{
                component: 'form',
            }}
        >
            <DialogTitle>Penilaian</DialogTitle>
            <DialogContent>
                <DialogContentText>
                    {/* <pre>
                    {JSON.stringify(Hasil, null, 2)}
                </pre> */}
                </DialogContentText>
                {!loading &&
                    <>
                        <form
                            ref={formRef}
                        >
                            <Stack direction={"column"} rowGap={1.2}>
                                {result.map((x: any) => {
                                    const nilai = cekNilai(x?.id_kategori);
                                    return (
                                        <>
                                            <Stack direction={"column"} rowGap={0.5}>
                                                <Typography variant={"body2"} sx={{ fontWeight: "600" }}>
                                                    {x?.nama_kategori}: {x?.batas_nilai}
                                                </Typography>
                                                <TextField
                                                    autoFocus
                                                    required
                                                    name={`${x?.id_kategori}-${x?.batas_nilai}`}
                                                    margin="dense"
                                                    type={"text"}
                                                    fullWidth
                                                    defaultValue={nilai}
                                                    variant={"outlined"}
                                                // variant="standard"
                                                />
                                            </Stack>
                                        </>
                                    )
                                })}
                            </Stack>
                        </form>
                    </>
                }
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}>Cancel</Button>
                <Button onClick={handleClick}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}

const index = () => {
    const params = useParams();
    const { id_tingkatan } = params;
    const [halaman, setHalaman] = useState(1);
    const [selectedAudio, setSelectedAudio] = useState([]);
    const [loadingAudio, setLoadingAudio] = useState(true);
    const matches: boolean = useMediaQuery("(max-width:799px)");
    const [currentIndex, setCurrentIndex] = useState(0);
    const [openPenilaian, setOpenPenilaian] = useState(false);
    const { id_santri } = params;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [jumlahHalaman, setJumlahHalaman] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const getAudio = () => {
        if (data.length > 0) {
            const id_foto_baris = data[currentIndex]?.id_foto_baris;
            setLoadingAudio(true);
            select({ link: `/materi/suara_santri?id_foto_baris=${id_foto_baris}&id_santri=${id_santri}` }).then(res => {
                const { data } = res.data
                console.log(data);
                setLoadingAudio(false);
                setSelectedAudio(data)
            }).catch(err => {
                console.log(err);
            })
        }
    }
    const getJumlahHalaman = () => {
        select({ link: `/baris/jumlah_halaman?id_tingkatan=${id_tingkatan}` }).then(res => {
            const jumlahHalaman = res.data?.data;
            setJumlahHalaman(jumlahHalaman);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    };

    const getBaris = () => {
        select({ link: `/baris?id_tingkatan=${id_tingkatan}&halaman=${halaman}` })
            .then(res => {
                const { data } = res.data;
                console.log(data);
                setData(data);
            }).catch(err => {
                console.log(err);
            })
    }
    const handleClick = (x: any) => {
        setCurrentIndex(prev => prev + x);
    }
    useEffect(() => {
        getAudio()
    }, [currentIndex, data])
    useEffect(() => {
        getJumlahHalaman()
    }, []);
    useEffect(() => {
        if (!loading) getBaris();
    }, [halaman, loading])
    return (
        <>
            <CustomContainer>
                <ContentParent>
                    <CustomPaper Title={"Isi buku"}>
                        {
                            !loading ?
                                <Stack direction={"column"} sx={{ marginTop: "22px" }}>
                                    {/* <pre>
                                        {JSON.stringify(data[0],null,2)}
                                    </pre> */}
                                    {data.length > 0 &&
                                        <SelectPage Index={halaman} SetIndex={setHalaman} Length={jumlahHalaman} />
                                    }
                                    <Stack justifyContent={"center"} direction={"row"} alignItems={"center"} columnGap={1}>
                                        <Button
                                            variant={"contained"}
                                            onClick={() => { handleClick(-1) }}
                                            disabled={currentIndex === 0}
                                        >
                                            Prev
                                        </Button>
                                        <Box sx={{
                                            width: matches ? "100%" : "80%",
                                        }}>
                                            {data.length > 0 ? data.map((x: any, idx: number) => {
                                                const foto: string = url + "/uploads/" + x?.foto;
                                                // const audio: string = url + "/uploads/" + x?.audio;
                                                return (
                                                    <>
                                                        {idx === currentIndex &&
                                                            <Stack
                                                                sx={{
                                                                    marginBottom: "22px"
                                                                }}
                                                                direction={"column"}
                                                            >
                                                                <Stack justifyContent={"space-between"} alignItems={"center"} sx={{ marginBottom: "12px", width: "100%", marginLeft: "auto" }}>
                                                                    <Typography variant={"body2"} sx={{ textAlign: 'center' }}>Baris : {x?.baris}</Typography>
                                                                </Stack>
                                                                <AudioPlayer
                                                                    Loading={loadingAudio}
                                                                    Hasil={selectedAudio}
                                                                    Key={`${x?.halaman}-${x?.baris}`}
                                                                    Data={x}
                                                                    GetData={getAudio}
                                                                    Image={foto}
                                                                // Audio={audio}
                                                                />
                                                            </Stack>
                                                        }
                                                    </>
                                                )
                                            }) :
                                                <>
                                                    <Typography sx={{ textAlign: "center", marginTop: "15px" }}>
                                                        Halaman masih kosong
                                                    </Typography>
                                                </>
                                            }
                                        </Box>
                                        <Button
                                            variant={"contained"}
                                            onClick={() => { handleClick(1) }}
                                            disabled={currentIndex >= data.length - 1}
                                        >
                                            Next
                                        </Button>
                                    </Stack>
                                    <Button
                                        sx={{ margin: "4px auto 0 auto" }}
                                        variant={"contained"}
                                        onClick={() => {
                                            setOpenPenilaian(true);
                                        }}
                                    >
                                        Penilaian
                                    </Button>
                                    <FormPenilaian Open={openPenilaian} SetOpen={setOpenPenilaian} />
                                </Stack>
                                :
                                ""
                        }
                    </CustomPaper>
                </ContentParent>
                <Footer />
            </CustomContainer>
        </>
    );
};

export default index;
