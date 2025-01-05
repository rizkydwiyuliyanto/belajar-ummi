/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { Box, Button, Stack, TextField } from '@mui/material';
import { useState } from 'react';
// import * as React from 'react';

interface Column {
  align: string;
  name: string;
  primaryTrue?: boolean;
  label: string;
}

export default function index(props: {
  HandleUpdate?: any;
  HandleDelete?: any;
  NoSearch?: boolean;
  Reload?: any;
  Columns: Column[];
  Data: any[];
}) {
  const [params, setParams] = useState({});
  const handleChange = (e: any) => {
    setParams({
      ...params,
      [e.target.name]: e.target.value,
    });
  };
  const handleClick = () => {
    props.Reload(params);
  };
  const columns = props.Columns.filter((x) => {
    return !x?.primaryTrue;
  });
  const primaryKey: string =
    props.Columns.find((x) => {
      return x?.primaryTrue;
    })?.name || '';
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableBody>
          <TableRow>
            {props?.NoSearch ? "" :
              <>
                {columns.map((row, idx) => (
                  <TableCell key={idx}>
                    <TextField
                      onBlur={handleChange}
                      size={'small'}
                      name={row.name}
                      placeholder={'By ' + row.label}
                      fullWidth
                    />
                  </TableCell>
                ))}
                <TableCell align={'center'}>
                  <Box
                    sx={{
                      display: 'inline-flex',
                      alignItems: 'center',
                    }}
                  >
                    <Button onClick={handleClick} size={'small'} color={'success'}>
                      Filter
                    </Button>
                    <Button
                      onClick={() => {
                        props.Reload(null);
                      }}
                      size={'small'}
                      color={'error'}
                    >
                      Clear
                    </Button>
                  </Box>
                </TableCell>
              </>}
          </TableRow>
        </TableBody>
        <TableHead>
          <TableRow>
            {columns.map((row, idx) => (
              <TableCell key={idx}>{row.label}</TableCell>
            ))}
            {props?.NoSearch ? "" : <TableCell></TableCell>}
            {props?.HandleDelete || props?.HandleUpdate
              &&
              <TableCell></TableCell>
            }
          </TableRow>
        </TableHead>
        {props.Data.length > 0 ? (
          <TableBody>
            {props.Data.map((x, idx) => {
              return (
                <TableRow key={idx}>
                  {columns.map((row, idx2) => (
                    <TableCell key={idx2}>
                      {x[row.name]}
                    </TableCell>
                  ))}
                  <TableCell align={"right"}>
                    <Stack columnGap={1} justifyContent={"flex-end"} direction={"row"}>
                      {props.HandleUpdate &&
                        <Button
                          size={'small'}
                          sx={{ paddingY: '0.45em' }}
                          onClick={() => { props.HandleUpdate(x[primaryKey]) }}
                          variant={'contained'}
                        >
                          Edit
                        </Button>
                      }
                      {props?.HandleDelete &&
                        <Button
                          size={'small'}
                          sx={{ paddingY: '0.45em' }}
                          onClick={() => { props?.HandleDelete(x[primaryKey]) }}
                          variant={'contained'}
                          color={'error'}
                        >
                          Delete
                        </Button>
                      }
                    </Stack>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        ) : (
          <TableBody>
            <TableRow>
              <TableCell align={'center'} colSpan={columns.length - 1}>
                Data belum ada
              </TableCell>
              <TableCell>
                <Box
                  sx={{
                    width: '145px',
                  }}
                ></Box>
              </TableCell>
            </TableRow>
          </TableBody>
        )}
      </Table>
    </TableContainer>
  );
}
