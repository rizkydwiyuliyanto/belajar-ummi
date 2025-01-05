import * as React from 'react';
import Button from '@mui/material/Button';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import { DialogContentText, Stack, Typography } from '@mui/material';

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    '& .MuiDialogContent-root': {
        padding: theme.spacing(2),
    },
    '& .MuiDialogActions-root': {
        padding: theme.spacing(1),
    },
}));

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function CustomizedDialogs({ children, HandleClose, Open, Title }: { children: any, HandleClose: any, Open: boolean, Title: string }) {
    const handleClose = () => {
        HandleClose()
    };

    return (
        <React.Fragment>
            <BootstrapDialog
                onClose={handleClose}
                aria-labelledby="customized-dialog-title"
                open={Open}
                scroll={"paper"}
                fullScreen={true}
            >
                <DialogTitle sx={{ m: 0 }} id="customized-dialog-title" >
                    <Stack direction={"row"} justifyContent={"space-between"} alignItems={"center"}>
                        <Typography>
                            {Title}
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                        >
                            <CloseIcon />
                        </IconButton>
                    </Stack>
                </DialogTitle>

                <DialogContent dividers>
                    <DialogContentText>
                        {children}
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button autoFocus onClick={handleClose}>
                        Close
                    </Button>
                </DialogActions>
            </BootstrapDialog>
        </React.Fragment>
    );
}
