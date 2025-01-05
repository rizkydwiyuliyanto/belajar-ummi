/* eslint-disable @typescript-eslint/no-explicit-any */
// import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import imgNotFound from "assets/images/img-not-found.png";
import { showImage } from 'request/request';
import { CardHeader } from '@mui/material';
import React from 'react';

export default function index({ Value, children }: { Value: any, children: React.ReactNode }) {
    const filePath: string = `uploads/tingkatan/${Value?.foto}`;
    return (
        <Card
            sx={{
                // border: "1px solid red",
                backgroundColor: "#F5F5F7",
                boxShadow: "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
                // boxShadow: "rgba(0, 0, 0, 0.1) 0px 10px 50px"
            }}>
            <CardHeader
                // avatar={
                //     <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                //         R
                //     </Avatar>
                // }
                // action={
                //     <IconButton aria-label="settings">
                //         <MoreVertIcon />
                //     </IconButton>
                // }
                title={"Ummi "+Value?.nama_tingkatan}
                subheader="Jumlah materi:"
            />
            <CardMedia
                sx={{
                    height: 140, boxShadow: "rgba(67, 71, 85, 0.27) 0px 0px 0.25em, rgba(90, 125, 188, 0.05) 0px 0.25em 1em"
                }}
                image={Value?.foto ? showImage({ filePath: filePath }) : imgNotFound}
                title={Value?.nama_tingkatan}
            />
            <CardContent sx={{
                marginTop: "25px",
                height: "80px",
                display:"none",
                overflowY: "scroll",
                // padding: "0.5em 0.95em",
                // backgroundColor: "#FFFFFF",
                overflowX: "hidden",
            }}>
                <Typography variant="body2" sx={{ color: 'text.secondary', fontSize:11.5 }}>
                    {Value?.keterangan}
                </Typography>
            </CardContent>
            <CardActions sx={{ marginTop: "20px" }}>
                {children}
            </CardActions>
        </Card>
    );
}
