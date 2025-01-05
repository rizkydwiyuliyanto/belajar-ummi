/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';

export default function FormDialog({ Open, HandleClose, children }: { Open: boolean, HandleClose: any, children: any }) {

    return (
        <React.Fragment>
            <Dialog
                open={Open}
                // onClose={HandleClose}
            >
                <DialogTitle></DialogTitle>
                <DialogContent>
                    {children}
                </DialogContent>
                <DialogActions>
                    <Button onClick={HandleClose}>Keluar</Button>
                </DialogActions>
            </Dialog>
        </React.Fragment>
    );
}
