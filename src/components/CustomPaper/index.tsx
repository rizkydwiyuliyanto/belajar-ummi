import { Box, Paper, Stack, Typography } from "@mui/material";

const index = (props: { Title: string, Form?: React.ReactNode, children: React.ReactNode }) => {
    return (
        <>
            <Paper sx={{ flex: 1, bgcolor: 'info.main' }}>
                <Stack alignItems="center" justifyContent="space-between" mt={-0.5}>
                    <Typography variant="body1" color="text.primary" fontWeight={700}>
                        {props.Title}
                    </Typography>
                    {props.Form}
                </Stack>
                <Box p={2} mt={2} bgcolor="info.lighter" borderRadius={3}>
                    {props.children}
                </Box>
            </Paper>
        </>
    )
};

export default index;