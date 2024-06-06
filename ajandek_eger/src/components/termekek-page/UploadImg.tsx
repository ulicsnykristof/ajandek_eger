import axios from "axios";
import React, { useState } from "react";
import { Button } from "react-bootstrap";

function UploadImg() {
  const [file, setFile] = useState<File | undefined>();
  let fileName;
  function handleOnChange(e: React.FocusEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
  }

  async function handleClickKep(e: React.SyntheticEvent) {
    e.preventDefault;

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
  }

  const handleClicktermek = async () => {
    try {
      console.log(termek);
      await axios.post("http://localhost:8080/addTermek", termek);
    } catch (err) {}
  };

  const [termek, setTermek] = useState({
    cikkszam: null,
    vonalkod: null,
    nev: null,
    img: null,
    eladarnetto: null,
    eladarbrutto: null,
    db: null,
    tipus: null,
    szin: null,
    meret: null,
  });

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setTermek((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <>
      <div
        style={{
          float: "right",
          width: "30%",
          marginRight: "8%",
          marginTop: "30px",
        }}
      >
        <h4>Termék adatok</h4>
        <input
          style={{ width: "400px" }}
          type="text"
          placeholder="Cikkszam"
          onChange={handleChange}
          name="cikkszam"
        />
        <br />
        <br />
        <input
          style={{ width: "400px" }}
          type="text"
          placeholder="Vonalkód"
          onChange={handleChange}
          name="vonalkod"
        />
        <br />
        <br />
        <input
          style={{ width: "400px" }}
          type="text"
          placeholder="Név"
          onChange={handleChange}
          name="nev"
        />
        <br />
        <br />
        <input
          style={{ width: "400px" }}
          type="text"
          placeholder="Nettó eladási ár"
          onChange={handleChange}
          name="eladarnetto"
        />
        <br />
        <br />
        <input
          style={{ width: "400px" }}
          type="text"
          placeholder="Bruttó eladási ár"
          onChange={handleChange}
          name="eladarbrutto"
        />
        <br />
        <br />
        <input
          style={{ width: "400px" }}
          type="text"
          placeholder="Darabszám"
          onChange={handleChange}
          name="db"
        />
        <br />
        <br />
        <input
          style={{ width: "400px" }}
          type="text"
          placeholder="Típus"
          onChange={handleChange}
          name="tipus"
        />
        <br />
        <br />
        <input
          style={{ width: "400px" }}
          type="text"
          placeholder="Szín"
          onChange={handleChange}
          name="szin"
        />
        <br />
        <br />
        <input
          style={{ width: "400px" }}
          type="text"
          placeholder="Méret"
          onChange={handleChange}
          name="meret"
        />
        <br />
        <br />
        <Button type="submit" onClick={handleClicktermek}>
          Feltöltés
        </Button>

        <br />
        <br />
        <input type="file" name="image" onChange={handleOnChange} />
        <Button type="submit" onClick={handleClickKep}>
          Kép Feltöltés
        </Button>
      </div>
    </>
  );
}

export default UploadImg;
