/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import ViewHeadlineIcon from '@mui/icons-material/ViewHeadline';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { FormEvent, useEffect, useState, useRef } from 'react';
import { create, inputFoto } from 'request/request';
import { Box, Button, Stack, TextField, Typography, useMediaQuery } from '@mui/material';
import { maxMobile } from 'utils/mediaQuery';
// const handleText = (col: any, value: any) => {
//     setSoal(soal.map((x: any, idx: number) => {
//         return idx === col ? { ...x, text: value } : x
//     }))
// }
// const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
//     e.preventDefault();
//     const arrLengt: [] = soal.filter((x: any) => {
//         return x.jawaban == 1
//     })
//     if (arrLengt.length === 0) {
//         alert("Pilih jawaban yang benar");
//         return;
//     }
//     const idSoal = props?.Data ? props?.Data?.soal?.id_soal : makeid(7);
//     const soalValue = {
//         pertanyaan: pertanyaan,
//         pembahasan: pembahasan,
//         id_level: props.Level,
//         id_soal: idSoal
//     };
//     const inputPilihan = (index: any) => {
//         let currentIdx = index
//         const link = props?.Data ? "/soal/edit_pilihan" : "/soal/input_pilihan"
//         create({ data: { ...soal[index], id_soal: idSoal }, link: link }).then(() => {
//             currentIdx += 1;
//             if (currentIdx < soal.length) {
//                 inputPilihan(currentIdx);
//             } else {
//                 if (props?.Data) {
//                     props.SetUpdate(null);
//                 } else {
//                     props.SetJumlahForm(0);
//                 }
//                 setTimeout(() => {
//                     props.GetData();
//                     alert("Input berhasil")
//                 }, 200)
//             }
//         }).catch(err => {
//             console.log(err);
//             return;
//         });
//     }
//     const link = props?.Data ? "/soal/edit_soal" : "/soal/input_soal"
//     create({ data: soalValue, link: link }).then(() => {
//         const formData = new FormData(formRef.current);
//         inputFoto({ formData: formData, link: "/soal/input_file", id: idSoal }).then(() => {
//             inputPilihan(0);
//         })
//     }).catch(err => {
//         console.log(err);
//     });
// }
const Pilihan = ({
    label,
    // HandleText,
    // DefaultValue,
    HandleJawaban,
    // IsMobile,
    StartIcon }: {
        label: string,
        // HandleText: any,
        // DefaultValue: any,
        HandleJawaban: any,
        // IsMobile?: boolean,
        StartIcon: any
    }) => {
    return (
        <Stack sx={{ width: "100%" }} alignItems={"start"} direction={"column"} spacing={0}>
            <Stack sx={{ width: "100%" }} alignItems={"center"} justifyContent={"space-between"} direction={"row"}>
                <Stack alignItems={"center"} spacing={1}>
                    <ViewHeadlineIcon />
                    <Typography variant={"body2"}>{label}</Typography>
                </Stack>
                <Button
                    onClick={HandleJawaban}
                    startIcon={StartIcon}
                />
            </Stack>
            {/* <TextField
                defaultValue={DefaultValue || ""}
                size={"small"}
                required
                onBlur={(e) => HandleText(e.target.value)}
                variant={"outlined"}
                placeholder={"Text"}
                fullWidth
            /> */}
            <div>
                <input required name={label} type={"file"} accept={".mp3,audio/*"} />
            </div>
        </Stack>
    )
};

const GambarForm = ({ FormRef }: { FormRef: any }) => {
    return (
        <>
            <Box
                component={"form"}
                ref={FormRef}
            >
                <div>
                    <Stack gap={1}>
                        <Stack direction={"column"} gap={1} sx={{ width: "100%" }}>
                            <label className={"label-soal"} htmlFor={"gambar"}>Upload gambar</label>
                            <input required style={{ width: "100%" }} name={"gambar"} id={"gambar"} className="soal-file" type="file" accept={"image/*"} />
                        </Stack>
                        {/* <Stack direction={"column"} gap={1} sx={{ width: "100%" }}>
                            <label className={"label-soal"} htmlFor={"audio"}>Upload audio</label>
                            <input required style={{ width: "100%" }} name={"audio"} id={"audio"} className="soal-file" type="file" accept={".mp3,audio/*"} />
                        </Stack> */}
                    </Stack>
                </div>
            </Box>
        </>
    )
}

const TextForm = (props: { SetJumlahForm?: any, Level: any, GetData: any, Data?: any, SetUpdate?: any, IsMobile?: boolean, IsSet: boolean }) => {
    const [pertanyaan, setPertanyaan] = useState("");
    const [pembahasan, setPembahasan] = useState("");
    const [buttonDisabled, setButtonDisabled] = useState(false);
    const [soal, setSoal] = useState<any>([
        {
            abjad: "A",
            text: "",
            jawaban: 0
        },
        {
            abjad: "B",
            text: "",
            jawaban: 0
        },
        {
            abjad: "C",
            text: "",
            jawaban: 0
        },
        {
            abjad: "D",
            text: "",
            jawaban: 0
        }
    ]);
    // const [buttonDisabled, setButtonDisabled] = useState<boolean>(true);
    const formRef = useRef(null as any);
    const formRefSoal = useRef(null as any);
    function makeid(length: number) {
        let result = '';
        const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        const charactersLength = characters.length;
        let counter = 0;
        while (counter < length) {
            result += characters.charAt(Math.floor(Math.random() * charactersLength));
            counter += 1;
        }
        return result;
    }
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const arrLengt: [] = soal.filter((x: any) => {
            return x.jawaban == 1
        })
        if (arrLengt.length === 0) {
            alert("Pilih jawaban yang benar");
            return;
        }
        const formData = new FormData(formRef.current);
        const idSoal = props?.Data ? props?.Data?.soal?.id_soal : makeid(7);
        const inputPilihan = (index: any) => {
            let currentIdx = index
            // const link = props?.Data ? "/soal/edit_pilihan" : "/soal/input_pilihan"
            const link = props?.Data ? "/soal/edit_pilihan_suara" : "/soal/input_pilihan_suara"
            const gambar = new FormData();
            const file: any = formData.get(soal[index]["abjad"])
            gambar.append("audio", file);
            gambar.append("abjad", soal[index]["abjad"]);
            gambar.append("jawaban", soal[index]["jawaban"]);
            inputFoto({ formData: gambar, link: link, id: idSoal }).then(() => {
                currentIdx += 1;
                if (currentIdx < soal.length) {
                    inputPilihan(currentIdx);
                } else {
                    if (props?.Data) {
                        props.SetUpdate(null);
                    } else {
                        props.SetJumlahForm(0);
                    }
                    setTimeout(() => {
                        props.GetData();
                        setButtonDisabled(false)
                        alert("Input berhasil")
                    }, 200)
                }
            }).catch(err => {
                console.log(err);
                return;
            });
        }
        const soalValue = {
            pertanyaan: pertanyaan,
            pembahasan: pembahasan,
            id_level: props.Level,
            id_soal: idSoal
        };
        const link = props?.Data ? "/soal/edit_soal" : "/soal/input_soal"
        setButtonDisabled(true)
        create({ data: soalValue, link: link }).then(() => {
            const formData2 = new FormData(formRefSoal.current);
            inputFoto({ formData: formData2, link: "/soal/input_file", id: idSoal }).then(() => {
                inputPilihan(0);
            })
        }).catch(err => {
            console.log(err);
        });
    }
    const handleJawaban = (col: any) => {
        const arr = soal.map((x: any) => {
            return {
                ...x,
                jawaban: 0
            }
        })
        setSoal(arr.map((x: any, idx: number) => {
            return idx === col ? { ...x, jawaban: 1 } : x
        }))
    }
    const Icon = (col: any) => {
        if (soal[col].jawaban) {
            return <CheckIcon color={"success"} />
        }
        return <CloseIcon color={"error"} />
    }
    useEffect(() => {
        if (props?.Data) {
            const soal = props?.Data?.soal;
            setPertanyaan(soal?.pertanyaan);
            setPembahasan(soal?.pembahasan);
            setSoal(props?.Data?.pilihan.map((x: any) => {
                return {
                    abjad: x?.abjad,
                    text: x?.text,
                    jawaban: x?.jawaban,
                    id_pilihan: x?.id_pilihan
                }
            }))
        }
    }, []);
    const isMobile = useMediaQuery(maxMobile);
    return (
        <>
            {props?.IsSet &&
                <Box
                    component={"form"}
                    ref={formRef}
                    onSubmit={handleSubmit}
                >
                    <Stack
                        direction={"column"}
                        spacing={2}
                    >
                        <GambarForm FormRef={formRefSoal} />
                        <Box>
                            <TextField
                                multiline={true}
                                rows={3}
                                variant={"outlined"}
                                // sx={{}}
                                onBlur={(e: any) => {
                                    setPertanyaan(e.target.value)
                                }}
                                defaultValue={pertanyaan}
                                placeholder={"Masukkan pertanyaan"}
                                fullWidth
                            />
                        </Box>
                        <Stack direction={{ xs: "column", md: "row" }} sx={{ width: "100%" }} alignItems={"start"} spacing={3}>
                            <Stack direction={"column"} sx={{ width: "100%" }} spacing={2}>
                                {soal.map((x: any, idx: number) => {
                                    return (
                                        <>
                                            <Stack sx={{ width: "100%" }} alignItems={"center"} direction={"row"} spacing={2}>
                                                <Pilihan
                                                    label={x?.abjad}
                                                    // DefaultValue={x?.text}
                                                    // HandleText={(value: string) => handleText(idx, value)}
                                                    HandleJawaban={() => { handleJawaban(idx) }}
                                                    StartIcon={Icon(idx)}
                                                // IsMobile={props.IsMobile}
                                                />
                                            </Stack>
                                        </>
                                    )
                                })}
                            </Stack>
                            <TextField
                                multiline={true}
                                rows={4}
                                variant={"outlined"}
                                onBlur={(e: any) => {
                                    setPembahasan(e.target.value)
                                }}
                                defaultValue={pembahasan}
                                placeholder={"Pembahasan"}
                                sx={{
                                    width: isMobile ? "100%" : "60%",
                                }}
                                required
                            />

                        </Stack>
                    </Stack>

                    <Button
                        size={"small"} sx={{
                            marginTop: "14px"
                        }}
                        variant={"contained"}
                        type={"submit"}
                        disabled={buttonDisabled}
                    >
                        {buttonDisabled ? "Wait..." : "Submit"}
                    </Button>
                </Box>
            }
        </>
    )
}

const FormTambahSoal = (props: { SetJumlahForm?: any, Level: any, GetData: any, Data?: any, SetUpdate?: any, IsMobile?: boolean }) => {
    const [isSet, setIsSet] = useState(false);
    const isMobile = useMediaQuery(maxMobile);
    const handleClick = () => {
        if (props?.Data) {
            props.SetUpdate(null);
        } else {
            props.SetJumlahForm(0);
        }
    }
    useEffect(() => {
        setIsSet(true);
    }, [])
    return (
        <>
            <Stack
                sx={{
                    boxShadow: isMobile ? "none" : "rgba(9, 30, 66, 0.25) 0px 4px 8px -2px, rgba(9, 30, 66, 0.08) 0px 0px 0px 1px",
                    width: "100%"
                }}
                direction={"column"}
                spacing={2}
                px={isMobile ? 0 : 4}
                py={2}
            >
                <Stack alignItems={"center"} direction={"row"} justifyContent={"space-between"}>
                    <Stack alignItems={"center"} direction={"row"} spacing={2}>
                        <ViewColumnIcon fontSize={"large"} />
                        <Typography variant={props?.IsMobile ? "h6" : "h4"} sx={{ fontWeight: "700" }}>
                            Form Soal
                        </Typography>
                    </Stack>
                    <Button
                        onClick={handleClick}
                        sx={{
                            width: "60px",
                            marginLeft: "auto",
                            display: "flex",
                            justifyContent: "center"
                        }}
                        // variant={"contained"}
                        // color={"error"}
                        startIcon={<CloseIcon />}
                    >
                    </Button>
                </Stack>
                <Stack direction={"column"}>
                    <TextForm
                        IsMobile={props?.IsMobile}
                        GetData={props?.GetData}
                        Level={props?.Level}
                        Data={props?.Data}
                        SetUpdate={props.SetUpdate}
                        SetJumlahForm={props.SetJumlahForm}
                        IsSet={isSet}
                    />
                </Stack>
            </Stack>
        </>
    )
}



export default FormTambahSoal;