/* eslint-disable @typescript-eslint/no-explicit-any */
import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export default function index(props: {
  Title: string;
  Data: any;
  OpenDialog: boolean;
  HandleClose: any;
  HandleDelete: any;
}) {
  return (
    <React.Fragment>
      <Dialog
        open={props.OpenDialog}
        TransitionComponent={Transition}
        keepMounted
        onClose={props.HandleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{props.Title}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <table style={{
              width:"350px"
            }}>
              <tbody>
                {props.Data &&
                  Object.keys(props.Data).map((prop, idx) => {
                    return (
                      <tr key={idx}>
                        <td align={"left"}>{prop.split("_").join(" ")}</td>
                        <td align={"left"} style={{width:"200px"}}>{props.Data[prop]}</td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={props.HandleClose}>Disagree</Button>
          <Button onClick={props.HandleDelete}>Agree</Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
