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

interface Column {
    align: string;
    name: string;
    primaryTrue?: boolean;
    label: string;
}

const columns: Column[] = [
    {
        align:"left",
        name:"id_kategori",
        primaryTrue:true,
        label:""
    },
    {
        align:"left",
        name:"nama_kategori",
        primaryTrue:false,
        label:"Kategori"
    },
    {
        align:"left",
        name:"nilai",
        primaryTrue:false,
        label:"Nilai"
    }
]

const Form = ({ IdTingkatan }: { IdTingkatan: any }) => {
    return (
        <NavLink to={`/pages/guru/belajar_ummi/kategori_tingkatan/tambah/${IdTingkatan}`}>
            <Button variant={'contained'}>Tambah kategori</Button>
        </NavLink>
    );
};
const index = () => {
    const params = useParams();
    const navigate = useNavigate();
    const { id_tingkatan } = params;
    const { result, loading, } = useFetch({ link: `kategori?id_tingkatan=${id_tingkatan}` });
    const handleUpdate = (x: any) => {
        navigate(`/pages/guru/belajar_ummi/kategori_tingkatan/edit/${id_tingkatan}/${x}`);
    }
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
                                    Columns={columns}
                                    Data={result}
                                    NoSearch={true}
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