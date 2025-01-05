/* eslint-disable @typescript-eslint/no-explicit-any */
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconifyIcon from 'components/base/IconifyIcon';
const MentorCard = ({ data }: { data: any }) => {
    return (
        <Card sx={{ userSelect: 'none' }}>
            <Stack alignItems="center" justifyContent="space-between">
                <Stack alignItems="center" spacing={1}>
                    <CardContent>
                        <Stack direction={"column"} rowGap={1}>
                            {data.map((x: any) => {
                                return (
                                    <>
                                        <Stack alignItems={"center"} justifyContent={"space-between"}>
                                            <Stack direction={"column"}>
                                                <Typography
                                                    variant="subtitle1"
                                                    color="text.primary"
                                                    fontWeight={600}
                                                >
                                                    Level {x.id_level}
                                                </Typography>
                                                <Typography variant="subtitle2" color="text.secondary">
                                                    Jumlah Soal: {x?.total_soal}
                                                </Typography>
                                            </Stack>
                                        </Stack>
                                    </>
                                )
                            })}
                        </Stack>

                    </CardContent>
                </Stack>
                <CardActions disableSpacing>
                    <Button
                        variant="text"
                        size="medium"
                        sx={{
                            display:"none",
                            color: 'primary.main',
                            '& .MuiButton-startIcon': { mr: 0, pointerEvents: 'none' },
                        }}
                        startIcon={<IconifyIcon icon="gridicons:plus-small" />}
                        fullWidth
                    >
                        Tambah
                    </Button>
                </CardActions>
            </Stack>
        </Card>
    );
};
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Total = ({ Data }: { Data: any }) => {
    return (
        <>
            <Stack direction="column" spacing={1.75} width={1}>
                <Stack alignItems="center" justifyContent="space-between">
                    <Typography variant="h4">Total</Typography>
                </Stack>
                <MentorCard data={Data} />
            </Stack>
        </>
    )
}

export default Total;