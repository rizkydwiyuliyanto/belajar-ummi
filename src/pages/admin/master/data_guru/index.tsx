/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Button, Stack } from '@mui/material';
import Footer from 'components/common/Footer';
// import Activity from 'components/sections/dashboard/activity';
import { spacing } from 'utils/space';
import CustomPaper from 'components/CustomPaper';
import CustomTable from 'components/CustomTable';
import { NavLink, useNavigate } from 'react-router-dom';
import DialogDelete from 'components/DialogDelete';
import useFetch from '../../../../hooks/useFetch';
import { useState } from 'react';
import { remove } from 'request/request';
// import { useState } from 'react';
const Form = () => {
  return (
    <NavLink to={'/pages/admin/master/data_guru/tambah'}>
      <Button variant={'contained'}>Tambah data guru</Button>
    </NavLink>
  );
};
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
    name: 'id_guru',
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

const index = () => {
  const { result, loading, reload } = useFetch({ link: '/guru/get_data' });
  const navigate = useNavigate();
  const [id, setId] = useState('');
  // navigate.
  const handleUpdate = (x: string) => {
    navigate('/pages/admin/master/data_guru/edit/' + x);
  };
  const handleDelete = (e: string) => {
    setId(e);
  };
  return (
    <>
      <DialogDelete
        Title={'Hapus data guru?'}
        OpenDialog={Boolean(id)}
        Data={result.find((x: any) => {
          return x?.id_guru === id;
        })}
        HandleClose={() => {
          setId('');
        }}
        HandleDelete={() => {
          remove({ link: '/guru/delete', id: id })
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
      <Stack p={spacing.padding} spacing={spacing.space} direction="column">
        <Stack
          width={1}
          spacing={spacing.space}
          direction={{ xs: 'column', sm: 'row', md: 'column', xl: 'row' }}
        >
          <CustomPaper Title={'Data guru'} Form={<Form />}>
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
        </Stack>

        <Box display={{ xs: 'none', md: 'block' }}>
          <Footer />
        </Box>
      </Stack>
    </>
  );
};

export default index;
