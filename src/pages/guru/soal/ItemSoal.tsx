/* eslint-disable @typescript-eslint/no-explicit-any */

import {
    Box,
    Stack,
    Typography,
    useMediaQuery
} from '@mui/material';
import { url } from 'request/request';
import { maxMobile } from 'utils/mediaQuery';
// const Pilihan = ({ label, jawaban }: { label: string, jawaban: any }) => {
//     const color = jawaban ? "green" : "error"
//     return (
//         <Stack alignItems={"center"} direction={"row"} spacing={2}>
//             <Stack alignItems={"center"} direction={"row"} spacing={2}>
//                 <Typography color={color} variant={"body2"}>{label}</Typography>
//             </Stack>
//         </Stack>
//     )
// }
const ItemSoal = ({ Soal, PilihanItem, Idx }: { Soal: any, PilihanItem: any, Idx: number }) => {
    const {
        // audio,
        gambar
    } = Soal;
    const isMobile = useMediaQuery(maxMobile);
    return (
        <>
            <Stack
                direction={"column"}
                spacing={2}
                sx={{
                    width: "100%"
                }}
            >
                <Box sx={{ marginBottom: "17px", display: "flex" }}>
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
                                    <div style={{ width: "100%", height: "80%" }}>
                                        <img src={url + "/uploads/" + gambar} alt={"Soal-" + Idx} />
                                    </div>
                                }
                            </div>
                        </div>
                    </Stack>
                </Box>
                <Stack direction={"column"} spacing={2} sx={{ marginTop: "12px" }}>
                    {PilihanItem.map((x: any, idx: number) => {
                        let total: any = 0;
                        if (x?.total_dipilih > 0) {
                            total = ((x?.total_dipilih / Soal?.total_dijawab) * 100).toFixed(2);
                        }
                        let audio: string = "";
                        if (x?.audio) {
                            audio = `${url}/uploads/${x?.audio}`
                        }
                        const color = x?.jawaban === "1" ? "green" : "black"
                        return (
                            <Stack key={idx} alignItems={"center"} direction={"row"} spacing={2}>
                                {/* <Pilihan
                                    label={x?.abjad}
                                    jawaban={x?.jawaban}
                                /> */}
                                <Stack direction={"row"} columnGap={2} alignItems={"start"} sx={{ width: "100%" }}>
                                    <Typography sx={{ fontWeight: "700" }} color={color}>
                                        {x?.abjad}
                                    </Typography>
                                    <Stack direction={"column"} rowGap={0.5} sx={{ width: "100%" }}>
                                        <audio controls style={{ width: isMobile ? "100%" : "50%" }}>
                                            <source src={audio} type="audio/mpeg" />
                                        </audio>
                                        <Typography variant={"body2"} sx={{
                                            fontWeight: "bold",
                                            marginTop: "7px"
                                        }}>
                                            {total} %
                                            {/* {Soal?.total_dijawab } */}
                                        </Typography>
                                    </Stack>
                                </Stack>
                            </Stack>
                        )
                    })}
                </Stack>
            </Stack>
        </>
    )
};

export default ItemSoal;