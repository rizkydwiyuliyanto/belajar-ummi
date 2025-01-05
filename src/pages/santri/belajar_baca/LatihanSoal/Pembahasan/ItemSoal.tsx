/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */

import { Box, Stack, Typography } from '@mui/material';
import { url } from 'request/request';
const Pilihan = ({ label, Style }: { label: string, Style: any }) => {
    return (
        <Stack alignItems={"center"} direction={"row"} spacing={2}>
            <Stack alignItems={"center"} direction={"row"} spacing={2}>
                <Box
                    component={"button"}
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
    JawabanPilihan,
    TotalDijawab
}: { Soal: any, PilihanItem: any, Idx: number, JawabanPilihan: any, TotalDijawab: any }) => {
    const kunciJawaban = PilihanItem.find((x: any) => {
        return x?.jawaban === "1"
    })?.id_pilihan
    const {
        // audio, 
        gambar
    } = Soal;
    // console.log(Soal)
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
                                <Typography variant={"body1"}>
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
                <Stack direction={"column"} spacing={2} sx={{ marginTop: "5px" }}>
                    {PilihanItem.map((x: any, idx: number) => {
                        let style = {
                            color: "black",
                            backgroundColor: "#d0d0d7",
                            // border: "1px solid black"
                        }
                        let hitungPersen: any = "0";
                        if (x?.total_dipilih > 0) {
                            hitungPersen = ((x?.total_dipilih / TotalDijawab) * 100).toFixed(2);
                        }
                        if (JawabanPilihan === x?.id_pilihan) {
                            style = {
                                color: "white",
                                backgroundColor: "red",
                                // border: "1px solid unset"
                            }
                        }
                        if (kunciJawaban === x?.id_pilihan) {
                            style = {
                                color: "white",
                                backgroundColor: "lightgreen",
                                // border: "1px solid unset"
                            }
                        }
                        let audio: string = "";
                        if (x?.audio) {
                            audio = `${url}/uploads/${x?.audio}`
                        }
                        return (
                            <Stack key={idx} alignItems={"start"} direction={"row"} spacing={2}>
                                <Pilihan
                                    label={x?.abjad}
                                    Style={style}
                                />
                                <Stack direction={"column"} rowGap={0.5} sx={{width: "100%" }}>
                                    <div key={`${Date.now()}`} style={{ width: "100%" }}>
                                        <audio controls style={{ width: "100%" }}>
                                            <source src={audio} type="audio/mpeg" />
                                        </audio>
                                    </div>
                                    <Typography variant={"caption"} sx={{ fontWeight: "700" }}>
                                        {hitungPersen} %
                                    </Typography>
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