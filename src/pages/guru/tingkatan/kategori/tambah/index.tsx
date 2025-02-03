import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import CustomPaper from 'components/CustomPaper';
import { FormEvent, useRef } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { create } from 'request/request';
const index = () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const formRef = useRef(null as any);
    const params = useParams();
    const navigate = useNavigate();
    const { id_tingkatan } = params;
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        let obj = {
            id_tingkatan: id_tingkatan
        };
        formData.forEach((value, key) => {
            obj = {
                ...obj,
                [key]: value,
            };
        });
        create({ data: obj, link: "/kategori/tambah" })
            .then(() => {
                navigate('/pages/admin/materi/kategori_tingkatan/' + id_tingkatan);
            })
            .catch(err => {
                console.log(err);
            })
    }
    return (
        <>
            <CustomContainer>

                <ContentParent>
                    <CustomPaper Title={"Tambah kategori"}>
                        <Box
                            component={"form"}
                            ref={formRef}
                            onSubmit={handleSubmit}
                        >
                            <Stack direction={"row"} columnGap={1}>
                                <TextField required name={"nama_kategori"} placeholder={"Kategori"} />
                                <TextField required name={"nilai"} placeholder={"Nilai"} type={"number"} />
                                <Button type={"submit"} variant={"contained"} >Submit</Button>
                            </Stack>
                        </Box>
                    </CustomPaper>
                </ContentParent>
                <Footer />
            </CustomContainer>
        </>
    )
}
export default index;