import { useSearchParams } from "react-router-dom";
import GetImage from "../GetImage";
import { useState } from "react";
import { Button, Modal } from "react-bootstrap";

function TermekImage() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShow(true);
  };

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
    setShow(false);
    if (typeof file === "undefined") return;
    const formData = new FormData();
    fileName = formData.get("upload-file")!;
    formData.append("file", file);
    if (cikkszam != null) {
      formData.append("cikkszam", cikkszam);
    }
    await fetch("http://localhost:8080/changeImage", {
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
        <Button type="submit" onClick={handleFormSubmit}>
          Kép Módosítása
        </Button>

        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Kép módosítása</Modal.Title>
          </Modal.Header>
          <Modal.Body>Biztos módosítja a képet?</Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Mégse
            </Button>
            <Button variant="primary" onClick={onSubmit}>
              Módosítása
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </>
  );
}

export default TermekImage;
