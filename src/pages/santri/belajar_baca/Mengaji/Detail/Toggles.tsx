/* eslint-disable @typescript-eslint/no-explicit-any */
import Stack from '@mui/material/Stack';
import ToggleButton from '@mui/material/ToggleButton';
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup';
import GridViewIcon from '@mui/icons-material/GridView';
import CropOriginalIcon from '@mui/icons-material/CropOriginal';
// import React from 'react';
const Toggles = (props: { SetValue: any, Value: any }) => {

    const handleChange = (
        event: React.MouseEvent<HTMLElement>,
        newAlignment: any,
    ) => {
        console.log(event);
        props.SetValue(newAlignment);
    };

    const control = {
        value: props.Value,
        onChange: handleChange,
        exclusive: true,
    };
    return (
        <>
            <Stack spacing={2} sx={{ alignItems: 'center', justifyContent: "flex-end", marginBottom: "20px" }}>
                <ToggleButtonGroup color={"primary"} size="small" {...control} aria-label="Small sizes">
                    <ToggleButton value="grid" key="grid">
                        <GridViewIcon />
                    </ToggleButton>,
                    <ToggleButton value="slide" key="slide">
                        <CropOriginalIcon />
                    </ToggleButton>,
                </ToggleButtonGroup>
            </Stack>
        </>
    )
}

export default Toggles;