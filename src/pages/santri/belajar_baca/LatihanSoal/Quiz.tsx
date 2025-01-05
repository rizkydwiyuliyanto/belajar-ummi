/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemSoal from "./ItemSoal";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import { Content } from "Context/UserContext";
import React, { useContext, useEffect, useState } from "react";
import CustomizedDialogs from "components/DialogSoal/index";
import {
    create,
    select
} from "request/request";
import { maxMobile } from "utils/mediaQuery";


const Pages = (props: { children: React.ReactNode, Index: any, SetIndex: any, Length: number }) => {
    const [prevButtonDisabled, setPrevButtonDisabled] = useState<boolean>(false);
    const [nextButtonDisabled, setNextButtonDisabled] = useState<boolean>(false);
    const isMobile = useMediaQuery(maxMobile);
    useEffect(() => {
        const prevButton = props.Index === 0 ? true : false;
        const nextButton = props.Index === props.Length - 1 ? true : false;
        setPrevButtonDisabled(prevButton);
        setNextButtonDisabled(nextButton);
    }, [props.Index, props.Length])

    return (
        <>
            <Stack justifyContent={"center"} direction={isMobile ? "column" : "row"} columnGap={2} alignItems={"center"}>
                {!isMobile &&
                    <Button onClick={() => {
                        props.SetIndex((prev: number) => prev - 1)

                    }}
                        disabled={prevButtonDisabled}
                    >
                        Prev
                    </Button>
                }

                {props.children}
                {!isMobile &&
                    <Button onClick={() => {
                        props.SetIndex((prev: number) => prev + 1)
                    }}
                        disabled={nextButtonDisabled}
                    >
                        Next
                    </Button>

                }
                {isMobile &&
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"} columnGap={2} sx={{ width: "100%" }}>
                        <Button onClick={() => {
                            props.SetIndex((prev: number) => prev - 1)

                        }}
                            disabled={prevButtonDisabled}
                        >
                            Prev
                        </Button>
                        <Button onClick={() => {
                            props.SetIndex((prev: number) => prev + 1)
                        }}
                            disabled={nextButtonDisabled}
                        >
                            Next
                        </Button>
                    </Stack>
                }
            </Stack>
        </>
    )
}

const Quiz = (props: { Level: any, Time: any, Stop: any }) => {
    const [result, setResult] = useState<any>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [jawaban, setJawaban] = useState<any>([])
    const [index, setIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const value = useContext(Content);

    const getData = () => {
        select({ link: "/soal/get_data?level=" + props.Level }).then(res => {
            const { data } = res.data;
            console.log(data);
            setResult(data);
            setJawaban(data.map((x: any) => {
                return {
                    jawaban: "",
                    id_pilihan: "",
                    id_soal: x?.soal?.id_soal
                }
            }))
            setLoading(false)
        }).catch(err => {
            console.log(err)
        });
    }
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
    const hitungNilai = () => {
        let count = 0;
        const jumlah_soal = result.length;
        console.log(jawaban);
        result.forEach((elem: any, index: number) => {
            const pilihan: any[] = elem?.pilihan;
            const correctAnswer = pilihan.find((x: any) => {
                return x?.jawaban === "1";
            })?.id_pilihan;
            if (correctAnswer === jawaban[index]?.id_pilihan) {
                count += 1;
            }
        });
        return {
            total_benar: count,
            nilai: ((count / jumlah_soal) * 100).toFixed(2),
            jumlah_soal: jumlah_soal
        }
    }

    const selesai = () => {
        const r: { id_santri?: string } = value?.user || {};
        const idNilai = makeid(7);
        const nilai = {
            id_nilai: idNilai,
            id_santri: r.id_santri,
            id_level: props.Level,
            ...hitungNilai()
        }
        // console.log(nilai)
        const inputJawaban = (index: any) => {
            let currentIdx = index;
            const data: any = {
                id_nilai: idNilai,
                id_soal: result[currentIdx]?.soal?.id_soal
            }
            if (jawaban[index]?.id_pilihan) {
                data["id_pilihan"] = jawaban[index]?.id_pilihan;
            }
            create({ data: { id_soal: result[currentIdx]?.soal?.id_soal }, link: "/selesai/input_total_dijawab" }).then(() => {
                create({ data: data, link: "/selesai/input_jawaban" }).then(() => {
                    currentIdx += 1;
                    if (currentIdx < jawaban.length) {
                        inputJawaban(currentIdx);
                    } else {
                        props.Stop()
                        setTimeout(() => {
                            window.location.reload()
                        }, 250)
                    }
                }).catch(err => {
                    console.log(err);
                    return;
                })
            })

        }
        create({ data: nilai, link: "/selesai/input_nilai" }).then(() => {
            inputJawaban(0)
        }).catch(err => {
            console.log(err);
        })
    }
    const isMobile = useMediaQuery(maxMobile);
    const handleCloseModal = (idx?: any) => {
        if (idx) setIndex(idx - 1);
        setOpenDialog(false);
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <Stack sx={{ marginTop: "12px" }} direction={"column"}>
                <Stack direction={"row"} justifyContent={"center"} columnGap={1} sx={{ width: "100%", marginBottom: isMobile ? "0" : "10px" }}>
                    <Button sx={{
                        width: "70px",
                    }}
                        variant={"contained"}
                        size={"small"}
                        onClick={selesai}
                    >
                        Selesai
                    </Button>
                    {isMobile &&
                        <Button
                            variant={"contained"}
                            size={"small"}
                            onClick={() => {
                                setOpenDialog(true)
                            }}
                        // sx={{
                        //     width: "120px",
                        // }}
                        >
                            Cek jawaban
                        </Button>
                    }
                </Stack>
                {!loading &&
                    <>
                        <Pages
                            Index={index}
                            SetIndex={setIndex}
                            Length={result.length}
                        // Result={JSON.stringify(result, null, 2)}
                        >
                            <Box sx={{
                                width: "100%",
                                // margin: "0 auto",
                                height: "100%",
                                boxShadow: isMobile ? "none" : "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
                                borderRadius: "10px",
                                display: "flex",
                                flexDirection: "column"
                                // border: "1px solid red",
                            }}
                                paddingX={2}
                                paddingY={isMobile ? 0 : 3}
                            >
                                {result.length > 0 &&
                                    <>
                                        <ItemSoal
                                            Soal={result[index]?.soal}
                                            PilihanItem={result[index]?.pilihan}
                                            Idx={index}
                                            Jawaban={jawaban[index]?.jawaban}
                                            SetJawaban={(value: any) => {
                                                setJawaban(jawaban.map((x: any, idx: number) => {
                                                    return idx === index ? { ...x, "jawaban": value?.jawaban, "id_pilihan": value?.id_pilihan } : x
                                                }))
                                            }}
                                        />

                                    </>
                                }
                            </Box>
                        </Pages>
                        {isMobile ?
                            <CustomizedDialogs
                                // FullScreen={isMobile}
                                HandleClose={handleCloseModal}
                                Open={openDialog}
                                Title={"Jawaban"}
                            >
                                <Stack direction={"column"} rowGap={1}>
                                    {jawaban.map((x: any, idx: number) => {
                                        let style = {
                                            color: "black",
                                            backgroundColor: "#dddddd",
                                            border: "none",
                                        }
                                        if (x?.jawaban) {
                                            style = {
                                                color: "white",
                                                backgroundColor: "#546FFF",
                                                border: "unset",
                                            }
                                        }
                                        if (idx === index) {
                                            style = {
                                                color: "black",
                                                backgroundColor: "#FF4D5E",
                                                border: "none",
                                            }
                                        }
                                        const text = x?.jawaban ? x?.jawaban : idx + 1;
                                        return (
                                            <Box
                                                component={"button"}
                                                onClick={() => {
                                                    handleCloseModal(idx + 1);
                                                }}
                                                sx={{
                                                    // width: "20px",
                                                    height: "32px",
                                                    display: "flex",
                                                    cursor: "pointer",
                                                    justifyContent: "center",
                                                    alignItems: "center",
                                                    width: "100%",
                                                    ...style
                                                }}
                                            >
                                                <Typography
                                                    variant={"caption"}
                                                >
                                                    {text}
                                                </Typography>
                                            </Box>
                                        )
                                    })}

                                </Stack>
                            </CustomizedDialogs>
                            :
                            <Box
                                padding={1}
                                sx={{
                                    maxWidth: "800px",
                                    margin: "12px auto 0 auto",
                                    // border: "1px solid red",
                                    display: "none",
                                    gap: "5px",
                                    justifyContent: "center",
                                    gridTemplateColumns: "repeat(auto-fit, minmax(32px, 0fr))"
                                }}
                            >
                                {jawaban.map((x: any, idx: number) => {
                                    let style = {
                                        color: "black",
                                        backgroundColor: "#dddddd",
                                        border: "none",
                                    }
                                    if (x?.jawaban) {
                                        style = {
                                            color: "white",
                                            backgroundColor: "#546FFF",
                                            border: "unset",
                                        }
                                    }
                                    if (idx === index) {
                                        style = {
                                            color: "black",
                                            backgroundColor: "#FF4D5E",
                                            border: "none",
                                        }
                                    }
                                    const text = x?.jawaban ? x?.jawaban : idx + 1
                                    return (
                                        <Box
                                            component={"button"}
                                            onClick={() => {
                                                setIndex(idx)
                                            }}
                                            sx={{
                                                // width: "20px",
                                                height: "32px",
                                                display: "flex",
                                                cursor: "pointer",
                                                justifyContent: "center",
                                                alignItems: "center",
                                                ...style
                                            }}
                                        >
                                            <Typography
                                                variant={"caption"}
                                            >
                                                {text}
                                            </Typography>
                                        </Box>
                                    )
                                })}
                            </Box>}

                    </>
                }
            </Stack>
        </>
    );
};

export default Quiz;