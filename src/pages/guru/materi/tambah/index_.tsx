/* eslint-disable @typescript-eslint/no-explicit-any */
import CustomContainer from 'components/CustomContainer';
import ContentParent from 'components/ContentParent';
import Footer from 'components/Footer';
import FormParent from "components/FormParent";
import CustomPaper from 'components/CustomPaper';
import { FormEvent, useRef, useState } from 'react';
import { Button  } from '@mui/material';
// import CustomeUploadAudio from "components/CustomUploadAudio";
import CustomUploadPDF from 'components/CustomUploadPDF';
import { inputFoto } from 'request/request';
import {
  CircularProgress,
} from "@mui/material";
import { useNavigate, useParams } from 'react-router-dom';

const Dashboard = () => {
  const formRef = useRef(null as any);
  const [fileInput, setFileInput] = useState<any>([]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const { id_tingkatan } = useParams();
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    inputFoto({ link: 'materi/tambah_halaman', id: id_tingkatan, formData: { "files_halaman": fileInput } })
      .then((res) => {
        setLoading(false);
        setFileInput([]);
        setTimeout(() => {
          navigate(`/pages/guru/materi/detail_tingkatan/${id_tingkatan}`);
        }, 250);
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false)
      });
  }
  return (
    <>
      <CustomContainer>
        <ContentParent>
          <CustomPaper Title={"Tambah materi"}>
            <FormParent
              rest={{
                onSubmit: handleSubmit,
                ref: formRef
              }}
            >
                <CustomUploadPDF setFileInput={setFileInput} />
                {fileInput.length > 0 &&
                  <Button
                    disabled={loading}
                    sx={{ marginTop: '27px', mx: "auto", width: "100%" }} type="submit" variant="contained" size="medium">
                    {!loading ? "Submit" : <CircularProgress />}
                  </Button>
                }
            </FormParent>
          </CustomPaper>
        </ContentParent>
        <Footer />
      </CustomContainer>
    </>
  );
};

export default Dashboard;
