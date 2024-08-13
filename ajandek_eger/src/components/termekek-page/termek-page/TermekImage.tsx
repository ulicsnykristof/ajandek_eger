import { useSearchParams } from "react-router-dom";
import GetImage from "../GetImage";
import { useState } from "react";
import { Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

function TermekImage() {
  const [sParam] = useSearchParams();
  const cikkszam = sParam.get("cikkszam");

  const [file, setFile] = useState<File | undefined>();
  let fileName;
  function handleOnChange(e: React.FocusEvent<HTMLInputElement>) {
    const target = e.target as HTMLInputElement & {
      files: FileList;
    };

    setFile(target.files[0]);
  }

  const onSubmit = async () => {
    if (typeof file === "undefined") return;
    const formData = new FormData();
    fileName = formData.get("upload-file")!;
    formData.append("file", file);
    if (cikkszam != null) {
      formData.append("cikkszam", cikkszam);
    }
    await fetch("http://localhost:8080/uploadImage", {
      method: "POST",
      body: formData,
    });
    window.location.reload();
  };

  return (
    <>
      <div className="termek-details-img">
        <GetImage ck={cikkszam} />
        <br />

        <input type="file" name="image" onChange={handleOnChange} />
        <Button type="submit" onClick={onSubmit}>
          Kép Módosítása
        </Button>
      </div>
    </>
  );
}

export default TermekImage;
