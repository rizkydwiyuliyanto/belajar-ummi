import { CloseOutlined } from "@mui/icons-material";
import { useTheme, Snackbar, Button, IconButton, Stack, Typography, Alert } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import uploadImg from "./../../assets/images/uploadImg.png";
import filePdf from "./../../assets/images/filePDF.png";
const primary = "#176ede";
/* eslint-disable @typescript-eslint/no-explicit-any */
const FileInput = (props: { onFileChange: any, SetFileInput: any }) => {
    const theme = useTheme();
    const wrapperRef = useRef<HTMLDivElement | any>();
    const bpSMd = theme.breakpoints.down("sm");
    const [file, setFile] = useState<any>(null);
    const [open, setOpen] = useState<boolean>(false);
    useEffect(() => {
        props.onFileChange(file);
    }, [file])
    const handleClose = (reason: string | any) => {
        if (reason === "clickaway") {
            return;
        }
        setOpen(false);
    };
    const onDragEnter = () => wrapperRef.current.classList.add("dragover");

    const onDragLeave = () => wrapperRef.current.classList.remove("dragover");

    const onDrop = () => wrapperRef.current.classList.remove("dragover");
    const onFileDrop = (e: any) => {
        const newFile = e.target.files[0];
        if (newFile && newFile.type === "application/pdf") {
            setFile(newFile);
        } else {
            setOpen(true);
        }
    };
    const returnSize = (file: any) => {
        const fileSizeInBytes = file.size; // Example file size in bytes
        let fileSize;

        if (fileSizeInBytes >= 1048576) {
            fileSize = (fileSizeInBytes / 1048576).toFixed(2) + " MB";
        } else {
            fileSize = (fileSizeInBytes / 1024).toFixed(2) + " KB";
        }
        return fileSize;
    };
    return (
        <>
            <Stack
                direction={{ xs: 'column', md: 'row' }}
                spacing={1}
                justifyContent="center"
                alignItems="center"
                sx={{ marginBottom: 3 }}
            >
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: "40px",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        letterSpacing: 1,
                        color: primary,
                        [bpSMd]: { fontSize: "20px" },
                    }}
                >
                    PDF
                </Typography>
                <Typography
                    variant="h1"
                    sx={{
                        fontSize: "40px",
                        textTransform: "uppercase",
                        fontWeight: "bold",
                        letterSpacing: 1,
                        color: "text.primary",
                        [bpSMd]: { fontSize: "20px" },
                    }}
                >
                    to Image
                </Typography>
            </Stack>
            {!file && (
                <Button
                    ref={wrapperRef}
                    className="drop-file-input"
                    onDragEnter={onDragEnter}
                    onDragLeave={onDragLeave}
                    onDrop={onDrop}
                >
                    <div className="drop-file-input__label">
                        <img src={uploadImg} alt="" />
                        <p>Drag & Drop your files here</p>
                    </div>
                    <input type="file" accept=".pdf" value="" onChange={onFileDrop} />
                </Button>
            )}
            {file ? (
                <div className="drop-file-preview">
                    <p className="drop-file-preview__title">Uploaded file</p>
                    <div className="drop-file-preview__item">
                        <img src={filePdf} alt="PDF Icon" />
                        <div className="drop-file-preview__item__info">
                            <p>{file.name}</p>
                            <p>{returnSize(file)}</p>
                        </div>
                        <IconButton onClick={() => {
                            setFile(null)
                            props.SetFileInput([])
                        }}>
                            <CloseOutlined />
                        </IconButton>
                    </div>
                </div>
            ) : null}
            <Snackbar
                anchorOrigin={{
                    vertical: "top",
                    horizontal: "right",
                }}
                open={open}
                autoHideDuration={4000}
                onClose={handleClose}
            >
                <Alert onClose={handleClose} severity="error" sx={{ width: "100%" }}>
                    Please upload pdf only
                </Alert>
            </Snackbar>
        </>
    )
}

export default FileInput;