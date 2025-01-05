/* eslint-disable @typescript-eslint/no-explicit-any */
import { useRef, useState } from 'react';
import Stack from '@mui/material/Stack';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useEffect } from 'react';
import { DataGrid, GridColDef, useGridApiRef, GridApi } from '@mui/x-data-grid';
import DataGridFooter from 'components/common/DataGridFooter';
import { rows } from 'data/taskOverview';
import { url } from 'request/request';
import WaveSurfer from 'wavesurfer.js'

interface TaskOverviewTableProps {
  searchText: string;
  Data?: any;
}

const AudioPlayer = ({ Audio, Image }: { Audio: any, Image: any }) => {
  const refAudio = useRef<HTMLDivElement | null>(null);
  const refWaveSufver = useRef<WaveSurfer | null>(null);
  useEffect(() => {
    if (!refAudio.current) return;

    refWaveSufver.current = WaveSurfer.create({
      container: refAudio.current,
      waveColor: '#4F4A85',
      progressColor: '#383351',
      width: "270px",
      height: 50
    })
    refWaveSufver.current.load(Audio);
    return () => {
      refWaveSufver.current?.destroy();
    }
  }, [Audio])
  return (
    <>
      <img src={Image} style={{ width:"100%" }} height={"60px"} onClick={() => {
        refWaveSufver.current?.play()
        // refWaveSufver.current?.on('interaction', () => {
        // })
      }} />
      <div ref={refAudio} style={{display:"none"}}>

      </div>
    </>
  )
}
const columns: GridColDef<(typeof rows)[number]>[] = [
  {
    field: 'halaman',
    headerName: 'Halaman',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 90,
  },
  {
    field: 'baris',
    headerName: 'Baris',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 90,
  },
  {
    field: 'file',
    headerName: 'File',
    headerAlign: 'center',
    align: 'left',
    editable: false,
    // flex: 1,
    minWidth: 400,
    renderCell: (params: any) => {
      const image = params?.value.split("^-^")[0];
      const audio = params?.value.split("^-^")[1];
      const imageUrl = url + "/uploads/" + image;
      const audioUrl = url + "/uploads/" + audio;
      return (
        <Stack alignItems="center" direction={"column"} columnGap={1} sx={{ paddingRight: "1.25em",width:"100%" }}>
          {/* <audio controls style={{ width: "60%" }}>
            <source src={audioUrl} type="audio/mpeg" />
          </audio> */}
          <AudioPlayer Image={imageUrl} Audio={audioUrl} />
        </Stack>
      );
    },
  },
  {
    field: 'koreksi',
    headerName: 'Koreksi',
    editable: false,
    align: 'left',
    flex: 2,
    minWidth: 350,
  }
];
const TaskOverviewTable = ({
  searchText,
  Data
}: TaskOverviewTableProps) => {
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


const Table = ({ data }: { data: any }) => {
  const [searchText] = useState('');

  return (
    <Stack direction="column" spacing={1} width={1}>
      <Stack alignItems="center" justifyContent="space-between">
        <Typography variant="h4" minWidth={200}>
          {data["nama_tingkatan"]}
        </Typography>
      </Stack>
      <Paper sx={{ mt: 1.5, p: 0, pb: 0.75, minHeight: 411, width: 1 }}>
        <TaskOverviewTable Data={data["suara_santri"]} searchText={searchText} />
      </Paper>
    </Stack>
  );
};

export default Table;