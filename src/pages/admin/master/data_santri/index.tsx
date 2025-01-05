/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@mui/material';
import CustomPaper from 'components/CustomPaper';
import CustomTable from 'components/CustomTable';
import { NavLink, useNavigate } from 'react-router-dom';
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import DialogDelete from 'components/DialogDelete';
import useFetch from 'hooks/useFetch';
import { useState } from 'react';
import { remove } from 'request/request';
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
  {
    align: '',
    name: 'password',
    label: 'Password',
  },
];
const Form = () => {
  return (
    <NavLink to={'/pages/guru/master/data_santri/tambah'}>
      <Button variant={'contained'}>Tambah data santri</Button>
    </NavLink>
  );
};

const index = () => {
  const { result, loading, reload } = useFetch({ link: '/santri/get_data' });
  const navigate = useNavigate();
  const handleUpdate = (x: string) => {
    navigate('/pages/guru/master/data_santri/edit/' + x);
  };
  const handleDelete = (e: string) => {
    setId(e);
  };
  const [id, setId] = useState('');
  return (
    <>
      <DialogDelete
        Title={'Hapus data guru?'}
        OpenDialog={Boolean(id)}
        Data={result.find((x: any) => {
          return x?.id_santri === id;
        })}
        HandleClose={() => {
          setId('');
        }}
        HandleDelete={() => {
          remove({ link: '/santri/delete', id: id })
            .then(() => {
              setId('');
              setTimeout(() => {
                reload(null);
              }, 250);
            })
            .catch((err) => {
              console.log(err);
            });
        }}
      />
      <CustomContainer>
        <ContentParent>
          <CustomPaper Title={'Data santri'} Form={<Form />}>
            {!loading && (
              <CustomTable
                HandleUpdate={handleUpdate}
                HandleDelete={handleDelete}
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
  );
};

export default index;
