/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Grid } from "@mui/material";
import FileConverter from './FileConverter';
import FileInput from './FileInput';

const index = (props: { setFileInput: any }) => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [pdfFile, setPdfFile] = useState<any>(null);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  // const textRef = useRef<HTMLSpanElement | any>();
  return (
    <>
      <Grid item className="box">
        <FileInput SetFileInput={props.setFileInput} onFileChange={(file: any) => setPdfFile(file)} />
      </Grid>
      {pdfFile && (
        <Grid item sx={{ width: "100%" }}>
          <FileConverter
            pdfUrl={URL.createObjectURL(pdfFile)}
            fileName={pdfFile.name}
            SetFileInput={props.setFileInput}
          />
        </Grid>
      )}
    </>
  );
};

export default index;
