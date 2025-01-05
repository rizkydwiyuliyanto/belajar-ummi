/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import { Typography } from '@mui/material';
const index = (props: { Value: any, SetValue: any, Items: any, Label: string }) => {
    const handleChange = (event: SelectChangeEvent) => {
        props.SetValue(event.target.value);
    };
    return (
        <Box sx={{
            marginBottom: "2px",
            
            display:"flex",
            margin:"0 auto",
            alignItems:"center",
            justifyContent:"center"
        }}>
            <Typography sx={{marginRight:"14px"}} variant={"body2"}>{props.Label} : </Typography>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.Value}
                sx={{
                    width:"100px",
                }}
                onChange={handleChange}
            >
                {props.Items.map((x: {label: any, value: any}) => {
                    return (
                        <MenuItem value={x.value}>{x.label}</MenuItem>
                    )
                })}
            </Select>
        </Box>

    )
}

export default index;