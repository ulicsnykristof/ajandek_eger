import { Button } from "react-bootstrap";
import { useState } from "react";
import * as XLSX from "xlsx";
import axios from "axios";
import AlertModal from "../confirmation-modal/AlertModal";

function ExcelImport() {
  // onchange states
  const [excelFile, setExcelFile] = useState(null);
  const [typeError, setTypeError] = useState("");

  // onchange event
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
        setTypeError("Nem megmelelő formátumú fájl");
        setExcelFile(null);
      }
    } else {
      console.log("please select your file");
    }
  };

  // modal setup
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);

  // submit event
  //let goodFormat = true;
  let [goodFormat, setGoodFormat] = useState(true);

  const handleFileSubmit = (e: any) => {
    e.preventDefault();
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      console.log(data);

      data.map((d: any) => {
        if (
          typeof d.cikkszam === "undefined" ||
          typeof d.vonalkod === "undefined" ||
          typeof d.nev === "undefined" ||
          typeof d.eladarnetto === "undefined" ||
          typeof d.eladarbrutto === "undefined" ||
          typeof d.fogyas === "undefined" ||
          typeof d.tipus === "undefined" ||
          typeof d.szin === "undefined" ||
          typeof d.meret === "undefined"
        ) {
          setGoodFormat(false);
          goodFormat = false;
          console.log(goodFormat);
        }
      });
      console.log(goodFormat);
      if (goodFormat) {
        data.map(async (i) => {
          try {
            await axios.post("http://localhost:8080/addTermek", i);
          } catch (err) {
            console.log("Can't upload excel");
            console.log(err);
          }
        });

        console.log("excel uploaded successfully");
      } else {
        console.log("Can't upload excel because of bad format");
      }
      setShow(true);
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
      <AlertModal
        show={show}
        handleClose={handleClose}
        moadlTitle="Excel import"
        moadlBody={
          goodFormat
            ? "Sikeres feltöltés"
            : "Sikertelen feltöltés, rossz excel formátum"
        }
      />
    </>
  );
}

export default ExcelImport;
