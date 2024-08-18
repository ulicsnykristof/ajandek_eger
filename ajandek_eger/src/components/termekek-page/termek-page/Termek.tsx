import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import TermekImage from "./TermekImage";
import { Button, Modal } from "react-bootstrap";

function Termek() {
  const [sParam] = useSearchParams();
  const cikkszam = sParam.get("cikkszam");

  // Confirmation modal init //////////////////////////////////////////////////////////////
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleFormSubmit = (e: { preventDefault: () => void }) => {
    e.preventDefault();
    setShow(true);
  };

  ///////////////////////////////////////////////////////////////
  const [termek, setTermek] = useState<any[]>([]);
  useEffect(() => {
    const fetchAllTermek = async () => {
      try {
        const res = await axios.get("http://localhost:8080/all/" + cikkszam);
        setTermek(res.data);
        inputs.cikkszam = res.data[0].cikkszam;
        inputs.nev = res.data[0].nev;
        inputs.vonalkod = res.data[0].vonalkod;
        inputs.eladarnetto = res.data[0].eladarnetto;
        inputs.eladarbrutto = res.data[0].eladarbrutto;
        inputs.db = res.data[0].db;
        inputs.fogyas = res.data[0].fogyas;
        inputs.tipus = res.data[0].tipus;
        inputs.szin = res.data[0].szin;
        inputs.meret = res.data[0].meret;
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTermek();
  }, []);

  // TypeScript object type definition

  type Inputs = {
    id: any;
    cikkszam: any;
    vonalkod: any;
    nev: any;
    eladarnetto: any;
    eladarbrutto: any;
    db: any;
    fogyas: any;
    tipus: any;
    szin: any;
    meret: any;
  };

  const [inputs, setInputs] = useState<Inputs>({
    id: "",
    cikkszam: "",
    vonalkod: "",
    nev: "",
    eladarnetto: "",
    eladarbrutto: "",
    db: "",
    fogyas: "",
    tipus: "",
    szin: "",
    meret: "",
  });

  /*const handleChange = (e: { target: { name: any; value: any } }) => {
    setTermek((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
*/

  // Initialisation of the inputs object using the Inputs type
  const validate = (newInputs: Inputs): Errors => {
    const newErrors: Errors = {};
    if (newInputs.cikkszam === "") {
      newErrors.cikkszam = "Nem lehet üres!";
    }
    return newErrors;
  };
  // Partial means the object doesn't need to contain all keys
  // Record is used to create more complex object types
  type Errors = Partial<Record<keyof Inputs, string>>;
  const [errors, setErrors] = useState<Errors>(validate(inputs));

  type Touched = Partial<Record<keyof Inputs, boolean>>;
  const [touched, setTouched] = useState<Touched>({});

  const methods = useForm();

  const onSubmit = methods.handleSubmit(async () => {
    if (Object.keys(errors).length === 0 && errors.constructor === Object) {
      console.log("Success");
      try {
        console.log(inputs);
        await axios.post("http://localhost:8080/updateTermek", inputs);
        console.log("update success");
      } catch (err) {}
    } else {
      console.log(errors);
      console.log("Cant submit");
    }
    setShow(false);
  });

  return (
    <>
      <div className="termek-details-main-grid">
        <div>
          <h4 className="termek-details-header">Termék adatok</h4>

          {termek.map(
            (t) => (
              (inputs.id = t.id),
              (
                <div key={t.cikkszam} className="termek-details-main-div">
                  <div className="termek-details-div">
                    <div className="termek-details-p">
                      <p>Cikkszam: </p>
                    </div>
                    <div>
                      {errors.cikkszam && touched.cikkszam ? (
                        <p>{errors.cikkszam}</p>
                      ) : null}
                      <input
                        className="termek-details-input"
                        type="text"
                        name="cikkszam"
                        onChange={(event) => {
                          setInputs({
                            ...inputs,
                            cikkszam: event.target.value,
                          });
                          setErrors(
                            validate({
                              ...inputs,
                              cikkszam: event.target.value,
                            })
                          );
                        }}
                        defaultValue={inputs.cikkszam}
                        onBlur={() =>
                          setTouched({ ...touched, cikkszam: true })
                        }
                        disabled
                      />
                    </div>
                  </div>
                  <div className="termek-details-div">
                    <div className="termek-details-p">
                      <p>Vonalkód: </p>
                    </div>
                    <input
                      className="termek-details-input"
                      type="text"
                      name="vonalkod"
                      onChange={(event) => {
                        setInputs({ ...inputs, vonalkod: event.target.value });
                        setErrors(
                          validate({ ...inputs, vonalkod: event.target.value })
                        );
                      }}
                      defaultValue={t.vonalkod}
                      onBlur={() => setTouched({ ...touched, vonalkod: true })}
                    />
                  </div>
                  <div className="termek-details-div">
                    <div className="termek-details-p">
                      <p>Név: </p>
                    </div>
                    <input
                      className="termek-details-input"
                      type="text"
                      name="nev"
                      onChange={(event) => {
                        setInputs({ ...inputs, nev: event.target.value });
                        setErrors(
                          validate({ ...inputs, nev: event.target.value })
                        );
                      }}
                      defaultValue={t.nev}
                      onBlur={() => setTouched({ ...touched, nev: true })}
                    />
                  </div>
                  <div className="termek-details-div">
                    <div className="termek-details-p">
                      <p>Nettó eladási ár: </p>
                    </div>
                    <input
                      className="termek-details-input"
                      type="text"
                      name="eladarnetto"
                      onChange={(event) => {
                        setInputs({
                          ...inputs,
                          eladarnetto: event.target.value,
                        });
                        setErrors(
                          validate({
                            ...inputs,
                            eladarnetto: event.target.value,
                          })
                        );
                      }}
                      defaultValue={t.eladarnetto}
                      onBlur={() =>
                        setTouched({ ...touched, eladarnetto: true })
                      }
                    />
                  </div>
                  <div className="termek-details-div">
                    <div className="termek-details-p">
                      <p>Bruttó eladási ár: </p>
                    </div>
                    <input
                      className="termek-details-input"
                      type="text"
                      name="eladarbrutto"
                      onChange={(event) => {
                        setInputs({
                          ...inputs,
                          eladarbrutto: event.target.value,
                        });
                      }}
                      defaultValue={t.eladarbrutto}
                      onBlur={() =>
                        setTouched({ ...touched, eladarbrutto: true })
                      }
                    />
                  </div>
                  <div className="termek-details-div">
                    <div className="termek-details-p">
                      <p>Darabszám: </p>
                    </div>
                    <input
                      className="termek-details-input"
                      type="text"
                      name="db"
                      onChange={(event) => {
                        setInputs({ ...inputs, db: event.target.value });
                        setErrors(
                          validate({ ...inputs, db: event.target.value })
                        );
                      }}
                      defaultValue={t.db}
                      onBlur={() => setTouched({ ...touched, db: true })}
                    />
                  </div>
                  <div className="termek-details-div">
                    <div className="termek-details-p">
                      <p>Kritikus darabszám: </p>
                    </div>
                    <input
                      className="termek-details-input"
                      type="text"
                      name="db"
                      onChange={(event) => {
                        setInputs({ ...inputs, fogyas: event.target.value });
                        setErrors(
                          validate({ ...inputs, fogyas: event.target.value })
                        );
                      }}
                      defaultValue={t.fogyas}
                      onBlur={() => setTouched({ ...touched, fogyas: true })}
                    />
                  </div>
                  <div className="termek-details-div">
                    <div className="termek-details-p">
                      <p>Tipus: </p>
                    </div>
                    <input
                      className="termek-details-input"
                      type="text"
                      name="tipus"
                      onChange={(event) => {
                        setInputs({ ...inputs, tipus: event.target.value });
                        setErrors(
                          validate({ ...inputs, tipus: event.target.value })
                        );
                      }}
                      defaultValue={t.tipus}
                      onBlur={() => setTouched({ ...touched, tipus: true })}
                    />
                  </div>
                  <div className="termek-details-div">
                    <div className="termek-details-p">
                      <p>Szín: </p>
                    </div>
                    <input
                      className="termek-details-input"
                      type="text"
                      name="szin"
                      onChange={(event) => {
                        setInputs({ ...inputs, szin: event.target.value });
                        setErrors(
                          validate({ ...inputs, szin: event.target.value })
                        );
                      }}
                      defaultValue={t.szin}
                      onBlur={() => setTouched({ ...touched, szin: true })}
                    />
                  </div>
                  <div className="termek-details-div">
                    <div className="termek-details-p">
                      <p>Méret: </p>
                    </div>
                    <input
                      className="termek-details-input"
                      type="text"
                      name="meret"
                      onChange={(event) => {
                        setInputs({ ...inputs, meret: event.target.value });
                        setErrors(
                          validate({ ...inputs, meret: event.target.value })
                        );
                      }}
                      defaultValue={t.meret}
                      onBlur={() => setTouched({ ...touched, meret: true })}
                    />
                  </div>
                  <div className="termek-details-button-div">
                    <button
                      onClick={handleFormSubmit}
                      className="termek-details-button"
                    >
                      Módosítás
                    </button>
                    <button className="termek-details-button">Törlés</button>
                  </div>
                </div>
              )
            )
          )}
        </div>
        <div>
          <TermekImage />
        </div>
      </div>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Termék módosítása</Modal.Title>
        </Modal.Header>
        <Modal.Body>Biztos módosítja a termék adatait?</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Mégse
          </Button>
          <Button variant="primary" onClick={onSubmit}>
            Módosítása
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Termek;
