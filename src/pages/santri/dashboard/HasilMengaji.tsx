/* eslint-disable @typescript-eslint/no-explicit-any */
import SliderWrapper from 'components/common/SliderWrapper';
import Table from './Table';

const HasilMengaji = ({ Data }: { Data: any }) => {
    return (
        <>
            <SliderWrapper title="Koreksi Guru" SliderCard={Table} data={Data} />
            {/* <pre>{JSON.stringify(Data, null, 2)}</pre> */}
        </>
    )
};

export default HasilMengaji;