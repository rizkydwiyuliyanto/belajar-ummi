// import { Button } from '@mui/material';
import CustomPaper from 'components/CustomPaper';
import CustomTable from 'components/CustomTable';
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import useFetch from 'hooks/useFetch';
import { useNavigate } from 'react-router-dom';
interface Column {
    align: string;
    name: string;
    primaryTrue?: boolean;
    label: string;
}
const columns: Column[] = [
    {
        align: '',
        primaryTrue: true,
        name: 'id_santri',
        label: 'Nama lengkap',
    },
    {
        align: '',
        name: 'nama_lengkap',
        label: 'Nama lengkap',
    },
    {
        align: '',
        name: 'username',
        label: 'Username',
    },
];
const index = () => {
    const { result, loading, reload } = useFetch({ link: '/santri/get_data' });
    const navigate = useNavigate();
    const detail = (idSantri: string) => {
        navigate("/pages/guru/asesmen/quiz/" + idSantri);
    }
    return (
        <>
            <CustomContainer>
                <ContentParent>
                    <CustomPaper Title={'Data santri'}>
                        {!loading && (
                            <CustomTable
                                HandleDetail={detail}
                                Columns={columns}
                                Data={result}
                                Reload={reload}
                            />
                        )}
                    </CustomPaper>
                    {/* <Activity /> */}
                </ContentParent>
                <Footer />
            </CustomContainer>
        </>
    )
}

export default index;