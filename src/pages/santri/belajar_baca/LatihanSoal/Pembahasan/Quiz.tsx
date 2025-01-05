/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import ItemSoal from "./ItemSoal";
import { Box, Button, Stack, Typography, useMediaQuery } from "@mui/material";
import CustomizedDialogs from "components/DialogSoal";
import React, { useEffect, useState } from "react";
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
    }, [props.Index])
    return (
        <>
            <Stack justifyContent={"space-between"} direction={isMobile ? "column" : "row"} alignItems={"center"}>
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

const Quiz = (props: { Result: any }) => {
    const result = props.Result;
    const [index, setIndex] = useState(0);
    const [openDialog, setOpenDialog] = useState(false);
    const isMobile = useMediaQuery(maxMobile);
    const handleCloseModal = (idx?: any) => {
        if (idx) setIndex(idx - 1);
        setOpenDialog(false);
    }
    useEffect(() => {
    }, [])
    return (
        <>
            <Stack sx={{ marginTop: "12px" }} direction={"column"}>
                <Stack direction={"row"} justifyContent={"center"} columnGap={1} sx={{ width: "100%" }}>
                    {isMobile &&
                        <Button
                            variant={"contained"}
                            size={"small"}
                            onClick={() => {
                                setOpenDialog(true)
                            }}
                        >
                            Cek jawaban
                        </Button>

                    }
                </Stack>
                <Pages
                    Index={index}
                    SetIndex={setIndex}
                    Length={result.length}
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
                                    TotalDijawab={result[index]?.soal?.total_dijawab}
                                    JawabanPilihan={result[index]?.soal?.id_pilihan}
                                />

                            </>
                        }
                    </Box>
                </Pages>
                <Box
                    padding={1}
                    sx={{
                        width: "800px",
                        margin: "0px auto 0 auto",
                        // border: "1px solid red",
                    }}
                >
                    <Typography sx={{
                        marginBottom: "7px",
                        // lineHeight:"2px"
                    }}>
                        Pembahasan
                    </Typography>
                    <Typography variant={"body2"} sx={{ fontWeight: "700" }}>
                        Jawaban: {result[index]?.soal?.abjad}. {result[index]?.soal?.text}
                    </Typography>
                    <Typography variant={"body2"}>
                        {result[index]?.soal?.pembahasan}
                    </Typography>
                </Box>
                {isMobile ?
                    <CustomizedDialogs
                        HandleClose={handleCloseModal}
                        Open={openDialog}
                        Title={"Jawaban"}
                    >
                        <Stack direction={"column"} rowGap={1}>
                            {result.map((x: any, idx: number) => {
                                let style = {
                                    color: "black",
                                    backgroundColor: "#ffffff",
                                    border: "1px solid black",
                                }
                                if (x?.soal?.abjad) {
                                    style = {
                                        color: "white",
                                        backgroundColor: "#546FFF",
                                        border: "unset",
                                    }
                                }
                                if (idx === index) {
                                    style = {
                                        color: "black",
                                        backgroundColor: "#eeeeee",
                                        border: "1px solid black",
                                    }
                                }
                                const text = x?.soal?.abjad ? x?.soal?.abjad : idx + 1
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

                        </Stack>
                    </CustomizedDialogs>
                    :
                    <Box
                        padding={1}
                        sx={{
                            width: "800px",
                            margin: "12px auto 0 auto",
                            // border: "1px solid red",
                            display: "grid",
                            gap: "5px",
                            justifyContent: "center",
                            gridTemplateColumns: "repeat(auto-fit, minmax(32px, 0fr))"
                        }}
                    >
                        {result.map((x: any, idx: number) => {
                            let style = {
                                color: "black",
                                backgroundColor: "#ffffff",
                                border: "1px solid black",
                            }
                            if (x?.soal?.abjad) {
                                style = {
                                    color: "white",
                                    backgroundColor: "#546FFF",
                                    border: "unset",
                                }
                            }
                            if (idx === index) {
                                style = {
                                    color: "black",
                                    backgroundColor: "#eeeeee",
                                    border: "1px solid black",
                                }
                            }
                            const text = x?.soal?.abjad ? x?.soal?.abjad : idx + 1
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
                    </Box>
                }

            </Stack>
        </>
    );
};

export default Quiz;