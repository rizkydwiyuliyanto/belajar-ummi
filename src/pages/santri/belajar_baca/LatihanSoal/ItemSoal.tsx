/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Stack, Typography } from '@mui/material';
import { url } from 'request/request';
const Pilihan = ({ label, HandleClick, Style }: { label: string, HandleClick: any, Style: any }) => {
    return (
        <Stack alignItems={"center"} direction={"row"} spacing={2}>
            <Stack alignItems={"center"} direction={"row"} spacing={2}>
                <Box
                    component={"button"}
                    onClick={HandleClick}
                    sx={{
                        width: "32px",
                        height: "32px",
                        border: "none",
                        ...Style
                    }}
                >
                    <Typography variant={"body2"}>{label}</Typography>
                </Box>
            </Stack>
        </Stack>
    )
}
const ItemSoal = ({
    Soal,
    PilihanItem,
    Idx,
    SetJawaban,
    Jawaban,
    IsCompleted
}: { Soal: any, PilihanItem: any, Idx: number, SetJawaban: any, Jawaban: any, IsCompleted: any }) => {
    const {
        // audio, 
        gambar
    } = Soal;
    // console.log(JSON.stringify(PilihanItem, null, 2))
    return (
        <>
            <Stack
                direction={"column"}
                spacing={2}
                sx={{ width: "100%" }}
            >
                <Stack direction={"row"} sx={{ width: "100%" }} columnGap={1}>
                    <div className='soal-parent'>
                        <div className="file-soal" style={{ width: "100%" }} key={Idx}>
                            <Stack alignItems={"start"} columnGap={1} direction={"row"} sx={{ marginBottom: "5px" }} className="text-soal">
                                <Typography variant={"body1"}>
                                    {Idx + 1}.
                                </Typography>
                                <Typography sx={{ width: "100%" }} variant={"body1"}>
                                    {Soal.pertanyaan}
                                </Typography>
                            </Stack>
                            {gambar &&
                                <div style={{ width: "100%", height: "80%", display: "flex" }}>
                                    <img width={"100%"} src={url + "/uploads/" + gambar} alt={"Soal-" + Idx} />
                                </div>
                            }
                        </div>
                    </div>
                </Stack>
                <Stack direction={"column"} spacing={2} sx={{ marginTop: "5px", position: "relative" }}>
                    {IsCompleted &&
                        <Box sx={{
                            position: "absolute",
                            width: "104%",
                            height: "104%",
                            top: "50%",
                            left: "50%",
                            transform: "translate(-50%, -50%)",
                            backgroundColor: "#00000045"
                        }}>
                        </Box>
                    }
                    {PilihanItem.map((x: any, idx: number) => {
                        const backgroundColor = Jawaban === x?.abjad ? "#546FFF" : "#d0d0d7";
                        const style = {
                            color: Jawaban === x?.abjad ? "white" : "black",
                            backgroundColor: backgroundColor
                        }
                        let audio: string = "";
                        if (x?.audio) {
                            audio = `${url}/uploads/${x?.audio}`
                        }
                        return (
                            <Stack key={idx} alignItems={"center"} direction={"row"} spacing={2}>
                                <Pilihan
                                    label={x?.abjad}
                                    Style={style}
                                    HandleClick={() => { SetJawaban({ jawaban: x?.abjad, id_pilihan: x?.id_pilihan }) }}
                                />
                                <div key={`${Date.now()}`} style={{ width: "100%" }}>
                                    {/* <span>{audio}</span> */}
                                    <audio controls style={{ width: "100%" }}>
                                        <source src={audio} type="audio/mpeg" />
                                    </audio>
                                </div>
                                {/* <Box>
                                        <Typography>
                                            {x?.text}
                                        </Typography>
                                    </Box> */}
                            </Stack>
                        )
                    })}
                </Stack>
            </Stack>
        </>
    )
};

export default ItemSoal;