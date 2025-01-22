import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import { Button } from "@mui/material";
// https://www.nutrient.io/blog/how-to-convert-html-to-pdf-using-react/
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const index = ({ Ref } : {Ref: any}) => {
  const handleGeneratePDF = async () => {
    console.log("TEST");
    const canvas = await html2canvas(Ref.current, {
      scale: 2, // Increase scale for higher quality
      useCORS: true, // Ensure CORS handling for cross-origin images
    });
    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF("p", "mm", [210, 330]);
    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = (canvas.height * pdfWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 2, pdfWidth - 20, pdfHeight - 20); // Add padding
    pdf.save("report.pdf");
  };
  return (
    <div>
      <Button
        variant={"contained"}
        size={"small"}
        color={"primary"}
        // size={"small"}
        onClick={() => {
          handleGeneratePDF();
        }}
      >
        Generate PDF
      </Button>
    </div>
  );
};

export default index;
