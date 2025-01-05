/* eslint-disable @typescript-eslint/no-explicit-any */
import { Download, RemoveRedEye } from "@mui/icons-material";
import * as pdfjsLib from "pdfjs-dist";
import {
  Box,
  Button,
  CircularProgress,
  Grid,
  IconButton,
  Stack,
} from "@mui/material";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import React, { useEffect, useMemo, useRef, useState } from "react";

pdfjsLib.GlobalWorkerOptions.workerSrc = "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/3.5.141/pdf.worker.min.js";
const FileConverter = (props: { pdfUrl: any, fileName: any, SetFileInput: any }) => {
  const myRef = React.createRef<any>();

  const [open, setOpen] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [imageUrls, setImageUrls] = useState<any>([]);
  const [numOfPages, setNumOfPages] = useState<any>(0);
  const [selectedImage, setSelectedImage] = useState<any>(null);
  useEffect(() => {
    setLoading(false);
  }, [imageUrls]);

  const handleClickOpen = (url: any, index: any) => {
    setSelectedImage({ url, index });
    setOpen(true);
  };
  const handleClose = () => {
    setSelectedImage(null);
    setOpen(false);
  };
  const totalRef = useRef<HTMLSpanElement | any>();
  const currentRef = useRef<HTMLSpanElement | any>();
  const renderPage = async (data: any) => {
    try {
      const fileList: File[] = [];
      setLoading(true);
      const imagesList: any[] = [];
      const canvas = document.createElement("canvas");
      canvas.setAttribute("className", "canv");
      const pdf = await pdfjsLib.getDocument({ data }).promise;
      totalRef.current.innerText = pdf.numPages;
      for (let i = 1; i <= pdf.numPages; i++) {
        currentRef.current.innerText = i;
        const page = await pdf.getPage(i);
        const viewport = page.getViewport({ scale: 1.5 });
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        const render_context: any = {
          canvasContext: canvas.getContext("2d"),
          viewport: viewport,
        };
        await page.render(render_context).promise;
        const img = canvas.toDataURL("image/png");
        const blob = await fetch(img).then((res) => res.blob());
        const file = new File([blob], `page-${i}.png`, { type: "image/png" });
        fileList.push(file);
        console.log("push image");
        imagesList.push(img);
      }
      props.SetFileInput(fileList);
      setNumOfPages((e: number) => e + pdf.numPages);
      setImageUrls((e: any) => [...e, ...imagesList]);
    } catch (err) {
      console.log(err)
    }

  };
  const UrlUploader = (url: any) => {
    fetch(url).then((response) => {
      response.blob().then((blob) => {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          const data = atob(e.target.result.replace(/.*base64,/, ""));
          renderPage(data);
        };
        reader.readAsDataURL(blob);
      });
    });
  };

  useMemo(() => {
    UrlUploader(props.pdfUrl);
  }, []);

  useEffect(() => {
    myRef.current.scrollIntoView({ behavior: "smooth", block: "start" });
  }, [imageUrls]);

  const downloadImage = (url: any, index: any) => {
    const a = document.createElement("a");
    a.href = url;
    a.download = `${props.fileName}_${index + 1}.png`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    handleClose();
  };
  return (
    <Box sx={{ my: 3, textAlign: "center" }} ref={myRef} id="image-container">
      {loading ? (
        <>
          <div>
            <CircularProgress />
            <div style={{ display: "flex", justifyContent: "center", width: "100%", marginTop: "7px" }}>
              <span ref={currentRef}></span>
              <span> / </span>
              <span ref={totalRef}>...</span>
            </div>
          </div>
        </>
      ) : (
        <>
          {imageUrls.length > 0 && (
            <>
              <h4 className="drop-file-preview__title">
                Converted Images - {numOfPages}
              </h4>
              <Grid container spacing={3}>
                {imageUrls.map((url: any, index: any) => (
                  <Grid item xs={12} sm={4} key={index}>
                    <Box
                      sx={{ width: "100%", height: "250px" }}
                      className="img-card"
                    >
                      <img
                        src={url}
                        alt={`Page ${index + 1}`}
                        style={{
                          width: "100%",
                          height: "100%",
                          objectFit: "cover",
                        }}
                      />
                      <Stack
                        direction="row"
                        spacing={1}
                        sx={{ position: "absolute", top: 2, right: 2 }}
                      >
                        <IconButton
                          onClick={() => handleClickOpen(url, index)}
                          className="btn-bg"
                        >
                          <RemoveRedEye />
                        </IconButton>
                        <IconButton
                          onClick={() => downloadImage(url, index)}
                          className="btn-bg"
                        >
                          <Download />
                        </IconButton>
                      </Stack>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </>
          )}
        </>
      )}
      <Dialog
        open={open}
        onClose={handleClose}
        scroll={"paper"}
        aria-labelledby="scroll-dialog-title"
        aria-describedby="scroll-dialog-description"
      >
        <DialogTitle id="scroll-dialog-title">Preview</DialogTitle>
        <DialogContent dividers={true}>
          <img
            src={selectedImage?.url}
            alt={selectedImage?.url}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
            }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 2 }}>
          <Button variant="outlined" onClick={handleClose}>
            Cancel
          </Button>
          <Button
            variant="contained"
            onClick={() =>
              downloadImage(selectedImage.url, selectedImage.index)
            }
          >
            Download
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  )
}

export default FileConverter;