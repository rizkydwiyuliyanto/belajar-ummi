/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Carousel from 'react-material-ui-carousel'
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const SelectPage = (props: { Index: any, SetIndex: any, Length: any }) => {
    const handleChange = (event: SelectChangeEvent) => {
        props.SetIndex(event.target.value);
    };
    return (
        <Box sx={{
            marginBottom: "2px",
            width: "190px",
            display:"flex",
            margin:"0 auto",
            alignItems:"center",
            justifyContent:"space-between"
        }}>
            <Typography variant={"body2"}>Halaman : </Typography>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.Index}
                sx={{
                    width:"60%",
                }}
                onChange={handleChange}
            >
                {/* https://stackoverflow.com/questions/74057046/how-to-use-map-function-with-a-number-state */}
                {[...Array(props.Length)].map((_x, pages) => {
                    return (
                        <MenuItem value={pages}>{pages + 1}</MenuItem>
                    )
                })}
            </Select>
        </Box>

    )
}
const SlideShow = (props: { children: any, Length: any }) => {
    const [index, setIndex] = useState<number>(0)
    return (
        <>
            <SelectPage Index={index} SetIndex={setIndex} Length={props.Length} />
            <Carousel
                index={index}
                cycleNavigation={false}
                navButtonsAlwaysVisible={true}
                indicators={false} swipe={true}
                autoPlay={false}
                next={(next: any, _active: any) => {
                    setIndex(next)
                }}
                prev={(prev: any, _active: any) => {
                    setIndex(prev)
                }}
            >
                {
                    props.children
                }
            </Carousel >
        </>
    )
};

export default SlideShow;