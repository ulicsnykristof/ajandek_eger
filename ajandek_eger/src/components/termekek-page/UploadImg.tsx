import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import Input from "./Input";
import { useForm, FormProvider } from "react-hook-form";
import ExcelImport from "./ExcelImport";

function UploadImg() {
  const [file, setFile] = useState<File | undefined>();
  let fileName;
  function handleOnChange(e: React.FocusEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
  }

  const [success, setSuccess] = useState(false);

  const methods = useForm();

  const onSubmit = methods.handleSubmit(async () => {
    try {
      console.log(termek);
      await axios.post("http://localhost:8080/addTermek", termek);
    } catch (err) {}

    if (typeof file === "undefined") return;
    const formData = new FormData();
    fileName = formData.get("upload-file")!;
    formData.append("file", file);
    if (termek.cikkszam != null) {
      formData.append("cikkszam", termek.cikkszam);
    }
    await fetch("http://localhost:8080/uploadImage", {
      method: "POST",
      body: formData,
    });
    setSuccess(true);
  });

  const [termek, setTermek] = useState({
    cikkszam: null,
    vonalkod: null,
    nev: null,
    eladarnetto: null,
    eladarbrutto: null,
    db: null,
    fogyas: null,
    tipus: null,
    szin: null,
    meret: null,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setTermek((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div className="termek-upload-main">
        <h4>Termék adatok</h4>

        <FormProvider {...methods}>
          <form onSubmit={(e) => e.preventDefault()} noValidate>
            <Input
              name="cikkszam"
              type="text"
              placeholder="Cikkszam"
              className="termek-upload-input"
              onChange={handleChange}
            />

            <Input
              className="termek-upload-input"
              type="text"
              placeholder="Vonalkód"
              onChange={handleChange}
              name="vonalkod"
            />

            <Input
              className="termek-upload-input"
              type="text"
              placeholder="Név"
              onChange={handleChange}
              name="nev"
            />

            <Input
              className="termek-upload-input"
              type="text"
              placeholder="Nettó eladási ár"
              onChange={handleChange}
              name="eladarnetto"
            />

            <Input
              className="termek-upload-input"
              type="text"
              placeholder="Bruttó eladási ár"
              onChange={handleChange}
              name="eladarbrutto"
            />

            <Input
              className="termek-upload-input"
              type="text"
              placeholder="Darabszám"
              onChange={handleChange}
              name="db"
            />

            <Input
              className="termek-upload-input"
              type="text"
              placeholder="Kritikus darabszám"
              onChange={handleChange}
              name="fogyas"
            />

            <Input
              className="termek-upload-input"
              type="text"
              placeholder="Típus"
              onChange={handleChange}
              name="tipus"
            />

            <Input
              className="termek-upload-input"
              type="text"
              placeholder="Szín"
              onChange={handleChange}
              name="szin"
            />

            <Input
              className="termek-upload-input"
              type="text"
              placeholder="Méret"
              onChange={handleChange}
              name="meret"
            />
            {success && <p className="upload-success">Sikeres feltöltés</p>}
            <input type="file" name="image" onChange={handleOnChange} />
            <br />
            <br />
            <Button type="submit" onClick={onSubmit}>
              Feltöltés
            </Button>
          </form>
        </FormProvider>
        <ExcelImport />
      </div>
    </>
  );
}

export default UploadImg;
