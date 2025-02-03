/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import CustomPaper from 'components/CustomPaper';
import { FormEvent, useEffect, useRef, useState } from 'react';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useNavigate, useParams } from 'react-router-dom';
import { select, update } from 'request/request';
const index = () => {
    const formRef = useRef(null as any);
    const [selectedData, setSelectedData] = useState<any>({});
    const [loading, setLoading] = useState<boolean>(true);
    const params = useParams();
    const navigate = useNavigate();
    const { id_tingkatan, id_kategori } = params;
    const getData = () => {
        select({ link: '/kategori/get_data/' + id_kategori })
            .then((res) => {
                const { data } = res.data;
                setSelectedData(data);
                setLoading(false);
            })
            .catch((err) => {
                console.log(err);
            });
    };
    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(formRef.current);
        let obj = {};
        formData.forEach((value, key) => {
            obj = {
                ...obj,
                [key]: value,
            };
        });
        update({ data: obj, link: '/kategori/edit', id: id_kategori })
            .then(() => {
                navigate('/pages/admin/materi/kategori_tingkatan/' + id_tingkatan);
            })
            .catch((err) => {
                console.log(err);
                // console.log(data);
            });
    }
    useEffect(() => {
        getData();
    }, [])
    return (
        <>
            <CustomContainer>

                <ContentParent>
                    <CustomPaper Title={"Tambah kategori"}>
                        {!loading &&
                            <Box
                                component={"form"}
                                ref={formRef}
                                onSubmit={handleSubmit}
                            >
                                <Stack direction={"row"} columnGap={1}>
                                    <TextField defaultValue={selectedData?.nama_kategori} required name={"nama_kategori"} placeholder={"Kategori"} />
                                    <TextField defaultValue={selectedData?.nilai} required name={"nilai"} placeholder={"Nilai"} type={"number"} />
                                    <Button type={"submit"} variant={"contained"} >Submit</Button>
                                </Stack>
                            </Box>
                        }
                    </CustomPaper>
                </ContentParent>
                <Footer />
            </CustomContainer>
        </>
    )
}
export default index;