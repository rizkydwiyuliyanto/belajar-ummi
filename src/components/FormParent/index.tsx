import { Stack } from '@mui/material';
import React from 'react';

const index= (props: { children: React.ReactNode, rest: object }) => {
    return (
        <>
            <Stack
                padding={4}
                component="form"
                mt={3}
                direction="column"
                gap={2}
                {...props.rest}
            >
                {props.children}
            </Stack>
        </>
    )
};

export default index;