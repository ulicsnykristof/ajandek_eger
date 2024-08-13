import { Button } from "react-bootstrap";
import { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";

function ExcelImport() {
  // onchange states ////////////////////////////////////////////////
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState("");

  // onchange event /////////////////////////////////////////////////
  const handleFile = (e: any) => {
    let selectedFile = e.target.files[0];
    let fileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    ];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        setTypeError("");
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e: any) => {
          setExcelFile(e.target.result);
        };
      } else {
        setTypeError("Please select only excel files");
        setExcelFile(null);
      }
    } else {
      console.log("please select your file");
    }
  };

  // submit event //////////////////////////////////////////////////
  const handleFileSubmit = (e: any) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log(data);

      data.map(async (i) => {
        try {
          await axios.post("http://localhost:8080/addTermek", i);
        } catch (err) {
          console.log("Can't upload excel");
          console.log(err);
        }
      });
    }
  };

  return (
    <>
      <div className="excel-import-main">
        <form onSubmit={handleFileSubmit}>
          <input type="file" required onChange={handleFile} />
          <Button type="submit">Importálás</Button>
          {typeError && (
            <div className="alert alert-danger" role="alert">
              {typeError}
            </div>
          )}
        </form>
      </div>
    </>
  );
}

export default ExcelImport;
