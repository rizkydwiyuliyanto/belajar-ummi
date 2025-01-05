/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import CustomPaper from 'components/CustomPaper';
import Footer from 'components/Footer';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Stack, Box, Typography, MenuItem, Button, TextField } from '@mui/material';
import { useEffect, useRef, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMediaQuery } from "@mui/material";
import WaveSurfer from 'wavesurfer.js'

import {
    inputBaris,
    remove,
    select,
    url
} from 'request/request';
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

const FormFile = (props: { Title: string, Name: string, Accept: string }) => {
    const barContainer = useRef<HTMLDivElement | any>();
    const barRef = useRef<HTMLDivElement | any>();
    const barTextRef = useRef<HTMLDivElement | any>();
    const uploadRef = useRef<HTMLDivElement | any>();
    const syncRef = useRef<HTMLDivElement | any>();
    const startUpload = (e: any) => {
        const { files }: { files: any } = e.target;
        const reader = new FileReader();
        const pBar = barRef.current;
        const pText = barTextRef.current;
        if (files[0]) {
            reader.onloadstart = () => {
                pBar.style.width = '0%';
                pText.style.display = 'block';
                pText.innerTiext = '0%';
                uploadRef.current.style.display = "none";
                // cBtn.style.display = 'none';
            };
            reader.onprogress = (event) => {
                const progress =
                    (event.loaded / event.total) * 100;
                pBar.style.width = `${progress}%`;
                syncRef.current.style.display = "flex";
                pText.innerText = `${Math.round(progress)}%`;
                console.log(progress);
            };
            reader.onload = () => {
                const uploadTime = 4000;
                const interval = 50;
                const steps = uploadTime / interval;
                let currentStep = 0;
                const updateProgress = () => {
                    const progress = (currentStep / steps) * 100;
                    pBar.style.width = `${progress}%`;
                    pText.innerText = `${Math.round(progress)}%`;
                    currentStep++;

                    if (currentStep <= steps) {
                        setTimeout(updateProgress, interval);
                    } else {
                        pBar.style.width = '100%';
                        pText.innerText = '100%';
                        syncRef.current.style.display = "none";
                        uploadRef.current.style.display = "flex";
                    }
                };
                setTimeout(updateProgress, interval);
            };
            reader.readAsDataURL(files[0]);
        }
    }
    return (
        <div className="center">
            <div className="title">{props?.Title}</div>
            <div className="progress-container" ref={barContainer}>
                <div className="progress-bar" ref={barRef}></div>
                <div className="progress-text" ref={barTextRef}></div>
            </div>
            <div className="dropzone">
                <div ref={syncRef} className='syncing'>
                    <div className={"image-parent-upload"}>
                        <img src="https://100dayscss.com/codepen/syncing.svg" className="center-absolute" />
                    </div>
                </div>
                <div ref={uploadRef} className='uploadFile'>
                    <Stack direction={"column"} sx={{ height: "100%" }} rowGap={2}>
                        <div className={"image-parent-upload"}>
                            <img src="https://100dayscss.com/codepen/upload.svg" className="center-absolute" />
                        </div>
                        <div>
                            <span className="filename"></span>
                            <input required onChange={startUpload} name={props?.Name} type="file" className="input" accept={props?.Accept} />
                            <div className="upload-btn">Upload file</div>
                        </div>
                    </Stack>
                </div>
            </div>
        </div>
    )
}

const UploadImage = () => {
    const matches: boolean = useMediaQuery("(max-width:799px)");
    // const date = new Date();
    return (
        <>
            <Stack direction={matches ? "column" : "row"} gap={2} justifyContent={"center"}>
                <FormFile Title={"Upload foto"} Name={"foto"} Accept={"image/*"} />
                <FormFile Title={"Upload audio"} Name={"audio"} Accept={".mp3,audio/*"} />
            </Stack>

        </>
    )
}

const AudioPlayer = ({ Image, Audio, Key }: { Image: any, Audio: any, Key: any }) => {
    const refAudio = useRef<HTMLDivElement | null>(null);
    const refWaveSufver = useRef<WaveSurfer | null>(null);
    const isMobile = useMediaQuery(maxMobile);
    useEffect(() => {
        if (!refAudio.current) return;

        refWaveSufver.current = WaveSurfer.create({
            container: refAudio.current,
            waveColor: '#4F4A85',
            progressColor: '#383351',
            width: "200px",
            dragToSeek: true
        })
        refWaveSufver.current.load(Audio);
        return () => {
            refWaveSufver.current?.destroy();
        }
    }, [Audio])
    return (
        <>
            <div className="player" key={Key}>
                <div className="imgBx" onClick={() => {
                    refWaveSufver.current?.play()
                    // refWaveSufver.current?.on('interaction', () => {
                    // })
                }}>
                    <img src={Image} alt="Luka Chuppi" />
                </div>
                <div ref={refAudio} style={{ display: isMobile ? "none" : "block" }}>

                </div>
                {/* <audio controls>
                    <source src={Audio} type="audio/mpeg" />
                </audio> */}
            </div>
        </>
    )
}

const index = () => {
    const params = useParams();
    const { id_tingkatan } = params;
    const [halaman, setHalaman] = useState(1);
    const [halamanValue, setHalamanValue] = useState(1);
    const formRef = useRef(null as any);
    const matches: boolean = useMediaQuery("(max-width:799px)");
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [jumlahHalaman, setJumlahHalaman] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState<any[]>([]);
    const [sbmitLoading, setSbmitLoading] = useState<any>(false);
    const getJumlahHalaman = () => {
        select({ link: `/baris/jumlah_halaman?id_tingkatan=${id_tingkatan}` }).then(res => {
            const jumlahHalaman = res.data?.data;
            setJumlahHalaman(jumlahHalaman);
            setLoading(false);
        }).catch(err => {
            console.log(err);
        })
    };

    const deleteBaris = (id: any) => {
        remove({ link: "baris/delete_baris", id: id }).then(() => {
            getJumlahHalaman();
            getBaris();
        }).catch(err => {
            console.log(err);
        })
    }

    const handleClick = () => {
        const formData = new FormData(formRef.current);
        // console.log(halaman);
        setSbmitLoading(true)
        inputBaris({ link: "baris/input_baris?id_tingkatan=" + id_tingkatan + "&halaman=" + halamanValue, formData: formData }).then(() => {
            getBaris();
            setSbmitLoading(false);
            getJumlahHalaman();
            alert("Input berhasil")
        }).catch(err => {
            setSbmitLoading(false);
            console.log(err);
        });
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
                        {!loading &&
                            <Box
                                component={"form"}
                                ref={formRef}
                            >
                                <div>
                                    <UploadImage />
                                </div>
                                <Stack sx={{ marginTop: "12px" }} direction={"column"} alignItems={"center"}>
                                    <Stack alignItems={matches ? "end" : "center"}>
                                        <Stack rowGap={1} direction={matches ? "column" : "row"} alignItems={matches ? "start" : "center"}>
                                            <Typography sx={{ marginRight: "12px" }}>
                                                Input halaman:
                                            </Typography>
                                            <TextField
                                                InputProps={{ inputProps: { min: 1 } }}
                                                type={"number"}
                                                defaultValue={1}
                                                value={halamanValue}
                                                onChange={(e: any) => {
                                                    setHalamanValue(e.target.value);
                                                }}

                                            />
                                        </Stack>
                                        <Button disabled={false} sx={{ marginLeft: "17px" }} variant={"contained"} size={"small"} onClick={handleClick}>
                                            {sbmitLoading ? "Wait..." : "Submit"}
                                        </Button>
                                    </Stack>
                                </Stack>
                            </Box>
                        }
                        {
                            !loading ?
                                <Stack direction={"column"} sx={{ marginTop: "22px" }}>
                                    {/* <pre>
                                        {JSON.stringify(data[0],null,2)}
                                    </pre> */}
                                    <SelectPage Index={halaman} SetIndex={setHalaman} Length={jumlahHalaman} />
                                    <Box sx={{
                                        width: matches ? "100%" : "80%",
                                        margin: "27px auto 0 auto"
                                    }}>
                                        {data.length > 0 && data.map((x: any) => {
                                            const foto: string = url + "/uploads/" + x?.foto;
                                            const audio: string = url + "/uploads/" + x?.audio;

                                            return (
                                                <Stack
                                                    sx={{
                                                        marginBottom: "22px"
                                                    }}
                                                    direction={"column"}
                                                >
                                                    <Stack justifyContent={"space-between"} alignItems={"center"} sx={{ marginBottom: "12px", width: "100%", marginLeft: "auto" }}>
                                                        <Typography variant={"body2"} sx={{ textAlign: 'center' }}>Baris : {x?.baris}</Typography>
                                                        <Button onClick={() => {
                                                            deleteBaris(x?.id_foto_baris);
                                                        }} variant={"contained"} color={"error"} size={"small"}>Delete</Button>
                                                    </Stack>
                                                    <AudioPlayer Key={`${x?.halaman}-${x?.baris}`} Image={foto} Audio={audio} />
                                                </Stack>
                                            )
                                        })}
                                    </Box>
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
