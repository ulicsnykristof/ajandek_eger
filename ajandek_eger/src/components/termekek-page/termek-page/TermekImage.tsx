import { useSearchParams } from "react-router-dom";
import GetImage from "../GetImage";
import { useState } from "react";
import { Button } from "react-bootstrap";

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

  const onSubmit = () => {};

  return (
    <>
      <div className="termek-details-img">
        <GetImage ck={cikkszam} />
        <br />
        <form action="">
          <input type="file" name="image" onChange={handleOnChange} />
          <Button type="submit" onClick={onSubmit}>
            Kép Módosítása
          </Button>
        </form>
      </div>
    </>
  );
}

export default TermekImage;
