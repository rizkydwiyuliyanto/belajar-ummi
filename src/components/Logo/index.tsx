import Image from 'components/base/Image';
import LogoImg from 'assets/images/logo-baru-ummi.png';
import { Stack, Typography } from '@mui/material';

const index = () => {
    return (
        <>
            <Stack direction={"row"} alignItems={"center"}>
                <Image src={LogoImg} alt="logo" height={40} width={40} sx={{ mr: 1.25 }} />
                <Stack direction={"column"} padding={0} margin={0}>
                    <Typography variant="h5" color="text.primary" letterSpacing={1}>
                        Aplikasi
                    </Typography>
                    <Typography sx={{ lineHeight: 1 }} variant="body2" color="text.primary" letterSpacing={1}>
                        Belajar Al-Quran dengan Ummi
                    </Typography>
                </Stack>
            </Stack>
        </>
    )
}

export default index;