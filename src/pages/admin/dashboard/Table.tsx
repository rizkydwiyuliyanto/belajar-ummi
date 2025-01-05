/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { rows } from 'data/taskOverview';
import { NavLink } from 'react-router-dom';
import { Button } from '@mui/material';

const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'nama_lengkap',
    headerName: 'Santri',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 220,
  },
  {
    field: 'username',
    headerName: 'Username',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 220,
  },
  {
    field: 'password',
    headerName: 'Password',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 220,
  },
  {
    field: 'tanggal_lahir',
    headerName: 'Tanggal lahir',
    headerAlign: 'right',
    align: 'right',
    editable: false,
    flex: 1,
    minWidth: 100,
  },
];

interface TaskOverviewTableProps {
  searchText: string;
  Data: any;
}

const TaskOverviewTable = ({ searchText, Data }: TaskOverviewTableProps) => {
  const apiRef = useGridApiRef<GridApi>();

  useEffect(() => {
    apiRef.current.setQuickFilterValues(searchText.split(/\b\W+\b/).filter((word) => word !== ''));
  }, [searchText]);

  return (
    <DataGrid
      apiRef={apiRef}
      density="standard"
      columns={columns}
      rows={Data}
      rowHeight={60}
      disableColumnResize
      disableColumnMenu
      disableColumnSelector
      disableRowSelectionOnClick
      initialState={{
        pagination: { paginationModel: { pageSize: 5 } },
      }}
      autosizeOptions={{
        includeOutliers: true,
        includeHeaders: false,
        outliersFactor: 1,
        expand: true,
      }}
      slots={{
        pagination: DataGridFooter,
      }}
      checkboxSelection
      pageSizeOptions={[5]}
    />
  );
};


const Table = ({ Data, Title }: { Data: any, Title: any }) => {
  const [searchText] = useState('');

  return (
    <Stack direction="column" spacing={1} width={1}>
      <Stack alignItems="center" justifyContent="space-between">
        <Typography variant="h4" minWidth={200}>
          {Title}
        </Typography>
        <NavLink to={""} style={{ display: "none" }}>
          <Button variant={"contained"}>Tambah santri</Button>
        </NavLink>
      </Stack>
      <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
        <TaskOverviewTable Data={Data} searchText={searchText} />
      </Paper>
    </Stack>
  );
};

export default Table;