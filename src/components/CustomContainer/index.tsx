import { Stack } from "@mui/material";
import React from "react";
import { spacing } from 'utils/space';

const index = (props:{ children: React.ReactNode }) => {
    return (
        <>
            <Stack p={spacing.padding} spacing={spacing.space} direction="column">
                {props.children}
            </Stack>
        </>
    )
};

export default index;