/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomPaper from 'components/CustomPaper';
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import CustomTable from 'components/CustomTable';
import useFetch from 'hooks/useFetch';

interface Column {
    align: string;
    name: string;
    primaryTrue?: boolean;
    label: string;
    link?: boolean;
}
const columns: Column[] = [
    {
        align: '',
        primaryTrue: true,
        name: 'nama_lengkap',
        label: 'Santri',
    },
    {
        align: '',
        name: 'nama_lengkap',
        label: 'Santri',
    },
    {
        align: '',
        name: 'level',
        label: 'Level',
        link: true
    },
    {
        align: '',
        name: 'nilai',
        label: 'Score',
    },
    {
        align: '',
        name: 'status',
        label: 'Status',
    },
];
const index = () => {
    const { result, loading } = useFetch({ link: '/selesai/assessment' });

    return (
        <>
            <CustomContainer>
                <ContentParent>
                    <CustomPaper Title={'Asesmen'}>
                        {!loading && (
                            <CustomTable
                                Columns={columns}
                                Data={result}
                                NoSearch={true}
                            />
                        )}
                    </CustomPaper>
                    {/* <Activity /> */}
                </ContentParent>
                <Footer />
            </CustomContainer>
        </>
    )
};

export default index;