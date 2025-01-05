/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import CustomPaper from 'components/CustomPaper';
import Footer from 'components/Footer';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Stack, Box, Typography, MenuItem, Button } from '@mui/material';
import { useContext, useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import WaveSurfer from 'wavesurfer.js'
import FormDialog from './FormDialog';

import {
    create,
    inputFoto,
    select,
    url,
} from 'request/request';
import { Content } from 'Context/UserContext';
import { maxMobile } from 'utils/mediaQuery';

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


const AudioPlayer = ({
    Loading,
    Hasil,
    Image,
    Audio,
    Key,
    GetData,
    Data,
    ButtonNext,
    ButtonPrev }: {
        Loading: boolean,
        Hasil: any,
        Image: any,
        Audio: any,
        Key: any,
        GetData: any,
        Data: any,
        ButtonNext: any,
        ButtonPrev: any
    }) => {
    const value: any = useContext(Content)?.user;
    const refAudio = useRef<HTMLDivElement | null>(null);
    const refWaveSufver = useRef<WaveSurfer | null>(null);
    const isMobile = useMediaQuery(maxMobile);
    const [isUpload, setIsUpload] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const { id_santri } = value;
    const {
        id_foto_baris
    } = Data;
    const formRef = useRef(null as any);
    const handleClose = () => {
        setOpenDialog(false);
    }
    const tambah = (e: any) => {
        const formData = new FormData(formRef.current);
        const obj = {
            id_foto_baris: id_foto_baris,
            id_santri: id_santri
        };
        setIsUpload(true);
        const { files }: { files: any } = e.target;
        if (files[0]) {
            create({ data: obj, link: "/suara_santri/tambah" }).then((res) => {
                const { data } = res.data;
                console.log(data);
                inputFoto({ link: 'suara_santri/input_audio', id: data, formData: formData })
                    .then(() => {
                        // const uri = URL.createObjectURL(files);
                        setIsUpload(false);
                        GetData();
                    })
                    .catch((err) => {
                        setIsUpload(false);
                        console.log(err);
                    });
            })
        }
    }
    const edit = (e: any) => {
        const formData = new FormData(formRef.current);
        const id_suara_santri = Hasil[0]?.id_suara_santri;
        const { files }: { files: any } = e.target;
        setIsUpload(true);
        if (files[0]) {
            inputFoto({ link: 'suara_santri/input_audio', id: id_suara_santri, formData: formData })
                .then(() => {
                    // const uri = URL.createObjectURL(files);
                    setIsUpload(false);
                    setTimeout(() => {
                        GetData();
                    }, 500)
                })
                .catch((err) => {
                    console.log(err);
                    setIsUpload(false);
                });
        }
    }
    // const filePathAudio = `${url}/uploads/mengaji/`;
    let suaraSantri = "";
    if (Hasil.length > 0) {
        suaraSantri = url + "/uploads/mengaji/" + Hasil[0]?.suara;
    }
    // `${url}/uploads/${x?.audio}`
    useEffect(() => {
        if (!refAudio.current) return;

        refWaveSufver.current = WaveSurfer.create({
            container: refAudio.current,
            waveColor: '#4F4A85',
            progressColor: '#383351',
            width: "210px",
            height: 70
        })
        refWaveSufver.current.load(Audio);
        return () => {
            refWaveSufver.current?.destroy();
        }
    }, [Audio]);
    return (
        <>
            <Stack direction={"column"} sx={{ width: "100%" }}>
                <div className="player" style={{ flexDirection: "column" }} key={Key}>
                    <Stack direction={"row"} sx={{ width: "100%" }} alignItems={"center"} columnGap={1.5} justifyContent={"space-between"}>
                        {!isMobile && ButtonPrev}
                        <Stack direction={"row"} sx={{ width: !isMobile ? "75%" : "100%" }} alignItems={"center"}>
                            <div className="imgBx">
                                <img src={Image} alt="Luka Chuppi" onClick={() => {
                                    refWaveSufver.current?.play()
                                }} />
                            </div>
                            <div ref={refAudio} style={{ display: !isMobile ? "block" : "none" }}>

                            </div>
                        </Stack>
                        {!isMobile && ButtonNext}
                    </Stack>
                </div>
                {isMobile &&
                    <Stack direction={"row"} columnGap={1.5} sx={{ width: "100%", marginTop: "10px" }} justifyContent={"space-between"}>
                        {ButtonPrev}
                        <Button
                            variant={"contained"}
                            size={"small"}
                            disabled={Loading}
                            sx={{ flex: 1 }}
                            onClick={() => {
                                setOpenDialog(true)
                            }}>
                            {!Loading ? "Buka Form" : "Wait..."}
                        </Button>
                        {ButtonNext}
                    </Stack>
                }
            </Stack>
            <Box>
                {!isMobile ?
                    <form
                        ref={formRef}
                        style={{ width: "75%", margin: "12px auto 0 auto", }}
                    >
                        <Stack direction={"row"} sx={{ width: "100%" }} columnGap={1} alignItems={"center"}>
                            {suaraSantri ?
                                <>
                                    <Stack direction={"column"} alignItems={"center"} sx={{ width: "100%" }} rowGap={1}>
                                        <Stack direction={"row"} columnGap={1} alignItems={"center"}>
                                            <Box>
                                                <label htmlFor={"audio"} style={{ width: "100%" }}>
                                                    {isUpload ? "Wait..." : "Ulang upload"}
                                                </label>
                                                <input disabled={isUpload} onChange={edit} id={"audio"} name={"audio"} type="file" accept={".mp3,audio/*"} style={{ display: "none" }} />
                                            </Box>
                                            {!Loading &&
                                                <div key={Date.now()}>
                                                    <audio controls>
                                                        <source src={suaraSantri} type="audio/mpeg" />
                                                    </audio>
                                                </div>
                                            }
                                        </Stack>
                                        <Stack direction={"row"} columnGap={0.5}>
                                            <Typography variant={"body2"}>Koreksi guru: </Typography>
                                            <Typography variant={"body2"}>
                                                {Hasil[0]?.koreksi ? Hasil[0]?.koreksi : "-"}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </>
                                :
                                <>
                                    <Stack direction={"row"} columnGap={1} alignItems={"center"} sx={{ margin: "0 auto" }}>
                                        <Box>
                                            <label htmlFor={"audio"} style={{ width: "100%" }}>
                                                {isUpload ? "Wait..." : "Upload file"}
                                            </label>
                                            <input disabled={isUpload} onChange={tambah} id={"audio"} name={"audio"} type="file" accept={".mp3,audio/*"} style={{ display: "none" }} />
                                        </Box>
                                    </Stack>
                                </>
                            }
                        </Stack>
                    </form>
                    :
                    <FormDialog HandleClose={handleClose} Open={openDialog}>
                        <form ref={formRef}>
                            {suaraSantri ?
                                <>
                                    <Stack direction={"column"} rowGap={1}>
                                        <Stack sx={{ width: "100%" }} direction={"column"} columnGap={1} justifyContent={"center"} alignItems={"center"}>
                                            <Box sx={{ marginBottom: "15px" }}>
                                                <label htmlFor={"audio"} style={{ width: "100%" }}>
                                                    {isUpload ? "Wait..." : "Ulang upload"}
                                                </label>
                                                <input disabled={isUpload} onChange={edit} id={"audio"} name={"audio"} type="file" accept={".mp3,audio/*"} style={{ display: "none" }} />
                                            </Box>
                                            {!Loading &&
                                                <div key={Date.now()}>
                                                    <audio controls>
                                                        <source src={suaraSantri} type="audio/mpeg" />
                                                    </audio>
                                                </div>
                                            }
                                        </Stack>
                                        <Stack direction={"column"} rowGap={0.5}>
                                            <Typography variant={"body2"} align={"center"}>Koreksi guru: </Typography>
                                            <Typography variant={"body2"} align={"center"}>
                                                {Hasil[0]?.koreksi ? Hasil[0]?.koreksi : "-"}
                                            </Typography>
                                        </Stack>
                                    </Stack>
                                </>
                                :
                                <>
                                    <Stack sx={{ width: "100%" }} direction={"column"} columnGap={1} alignItems={"center"}>
                                        <Box sx={{ marginBottom: "15px" }}>
                                            <label htmlFor={"audio"} style={{ width: "100%" }}>
                                                {isUpload ? "Wait..." : "Upload file"}
                                            </label>
                                            <input disabled={isUpload} onChange={tambah} id={"audio"} name={"audio"} type="file" accept={".mp3,audio/*"} style={{ display: "none" }} />
                                        </Box>
                                    </Stack>
                                </>
                            }
                        </form>
                    </FormDialog>
                }
            </Box>
        </>
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
    const value: any = useContext(Content)?.user;
    const { id_santri } = value;
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
                setLoadingAudio(false);
                setSelectedAudio(data)
            }).catch(err => {
                console.log(err);
            })
        }
    }
    const changeHalaman = (x: any) => {
        setHalaman(x);
        setCurrentIndex(0);
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
        if (!loading) {
            getBaris();
        }
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
                                        <SelectPage Index={halaman} SetIndex={changeHalaman} Length={jumlahHalaman} />
                                    }
                                    <Stack sx={{ marginTop: "12px" }} justifyContent={"center"} direction={"row"} alignItems={"center"} columnGap={1}>

                                        <Box sx={{
                                            width: matches ? "100%" : "80%",
                                        }}>
                                            {data.length > 0 ? data.map((x: any, idx: number) => {
                                                const foto: string = url + "/uploads/" + x?.foto;
                                                const audio: string = url + "/uploads/" + x?.audio;
                                                return (
                                                    <>
                                                        {idx === currentIndex &&
                                                            <Stack
                                                                sx={{
                                                                    marginBottom: "22px",

                                                                }}
                                                                direction={"column"}
                                                            >
                                                                <Stack justifyContent={"space-between"} alignItems={"center"} sx={{ marginBottom: "12px", width: "100%", marginLeft: "auto" }}>
                                                                    <Typography variant={"body2"} sx={{ textAlign: 'center' }}>Baris : {x?.baris}</Typography>
                                                                </Stack>
                                                                <div>
                                                                    <AudioPlayer
                                                                        Loading={loadingAudio}
                                                                        Hasil={selectedAudio}
                                                                        GetData={getAudio}
                                                                        Key={`${x?.halaman}-${x?.baris}`}
                                                                        Data={x}
                                                                        ButtonNext={
                                                                            <Button
                                                                                variant={"contained"}
                                                                                onClick={() => { handleClick(1) }}
                                                                                disabled={currentIndex >= data.length - 1}
                                                                            >
                                                                                Next
                                                                            </Button>
                                                                        }
                                                                        ButtonPrev={
                                                                            <Button
                                                                                variant={"contained"}
                                                                                onClick={() => { handleClick(-1) }}
                                                                                disabled={currentIndex === 0}
                                                                            >
                                                                                Prev
                                                                            </Button>
                                                                        }
                                                                        Image={foto}
                                                                        Audio={audio}
                                                                    />
                                                                </div>
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
                                    </Stack>
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
