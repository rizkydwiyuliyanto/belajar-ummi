/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import CustomPaper from 'components/CustomPaper';
import Footer from 'components/Footer';
import { useNavigate, useParams } from 'react-router-dom';
import useFetch from 'hooks/useFetch';
import { Button } from '@mui/material';
import { NavLink } from 'react-router-dom';
import CustomTable from 'components/CustomTable';
import DialogDelete from "components/DialogDelete";
import { useEffect, useState } from 'react';
import { remove } from 'request/request';

interface Column {
    align: string;
    name: string;
    primaryTrue?: boolean;
    label: string;
}

const columns: Column[] = [
    {
        align: "left",
        name: "id_kategori",
        primaryTrue: true,
        label: ""
    },
    {
        align: "left",
        name: "nama_kategori",
        primaryTrue: false,
        label: "Kategori"
    },
    {
        align: "left",
        name: "nilai",
        primaryTrue: false,
        label: "Nilai"
    }
]

const Form = ({ IdTingkatan }: { IdTingkatan: any }) => {
    return (
        <NavLink to={`/pages/admin/materi/kategori_tingkatan/tambah/${IdTingkatan}`}>
            <Button variant={'contained'}>Tambah kategori</Button>
        </NavLink>
    );
};
const index = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { id_tingkatan } = params;
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [selectedId, setSelectedId] = useState<any>("");
    const { result, loading, reload} = useFetch({ link: `kategori?id_tingkatan=${id_tingkatan}` });
    const handleUpdate = (x: any) => {
        navigate(`/pages/admin/materi/kategori_tingkatan/edit/${id_tingkatan}/${x}`);
    }
    const handleClose = () => {
        setOpenDialog(false);
    }
    const handleDelete = () => {
        remove({ link: '/kategori/delete_kategori', id: selectedId })
            .then(() => {
                setSelectedId("");
                handleClose();
                setTimeout(() => {
                    reload(null);
                }, 250);
            })
            .catch((err) => {
                console.log(err);
            });
    }
    useEffect(() => {
        console.log(selectedId)
    }, [selectedId])
    return (
        <>
            <CustomContainer>
                <ContentParent>
                    <CustomPaper Title={"Kategori"} Form={<Form IdTingkatan={id_tingkatan} />}>
                        {!loading &&
                            <>
                                {/* <pre>
                                    {JSON.stringify(result, null, 2)}
                                </pre> */}
                                <CustomTable
                                    HandleUpdate={handleUpdate}
                                    HandleDelete={(x: any) => {
                                        setSelectedId(x);
                                        setOpenDialog(true);
                                    }}
                                    Columns={columns}
                                    Data={result}
                                    NoSearch={true}
                                />
                                <DialogDelete
                                    Title={"Hapus kategori"}
                                    Data={result.find((x: any) => { return x?.id_kategori == selectedId })}
                                    OpenDialog={openDialog}
                                    HandleDelete={handleDelete}
                                    HandleClose={handleClose}
                                    MaxWidth={"sm"}
                                />
                            </>
                        }
                    </CustomPaper>
                </ContentParent>
                <Footer />
            </CustomContainer>
        </>
    );
};

export default index;