import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Termek() {
  const [sParam] = useSearchParams();
  const cikkszam = sParam.get("cikkszam");

  const validate = (newInputs: Inputs): Errors => {
    const newErrors: Errors = {};

    if (newInputs.cikkszam === "") {
      newErrors.cikkszam = "Nem lehet üres!";
    } else if (!newInputs.cikkszam.includes("@")) {
      newErrors.cikkszam = "Hibás formátum";
    }

    return newErrors;
  };
  // TypeScript object type definition

  ////////////////////////////////////////////////////////////////

  const [termek, setTermek] = useState<any[]>([]);
  useEffect(() => {
    const fetchAllPlanet = async () => {
      try {
        const res = await axios.get("http://localhost:8080/all/" + cikkszam);
        setTermek(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPlanet();
  }, []);

  /*const handleChange = (e: { target: { name: any; value: any } }) => {
    setTermek((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
*/
  type Inputs = {
    cikkszam: string;
    vonalkod: string;
    nev: string;
    netto: string;
    brutto: string;
    db: string;
    fogyas: string;
    tipus: string;
    szin: string;
    meret: string;
  };

  // Initialisation of the inputs object using the Inputs type
  const [inputs, setInputs] = useState<Inputs>({
    cikkszam: "",
    vonalkod: "",
    nev: "",
    netto: "",
    brutto: "",
    db: "",
    fogyas: "",
    tipus: "",
    szin: "",
    meret: "",
  });

  // Partial means the object doesn't need to contain all keys
  // Record is used to create more complex object types
  type Errors = Partial<Record<keyof Inputs, string>>;
  const [errors, setErrors] = useState<Errors>(validate(inputs));

  type Touched = Partial<Record<keyof Inputs, boolean>>;
  const [touched, setTouched] = useState<Touched>({});

  return (
    <>
      <h4 className="termek-details-header">Termék adatok</h4>
      {termek.map((t) => (
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
                  setInputs({ ...inputs, cikkszam: event.target.value });
                  setErrors(
                    validate({ ...inputs, cikkszam: event.target.value })
                  );
                }}
                defaultValue={t.cikkszam}
                //value={inputs.email}
                onBlur={() => setTouched({ ...touched, cikkszam: true })}
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
                setErrors(validate({ ...inputs, nev: event.target.value }));
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
                setInputs({ ...inputs, netto: event.target.value });
                setErrors(validate({ ...inputs, netto: event.target.value }));
              }}
              defaultValue={t.eladarnetto}
              onBlur={() => setTouched({ ...touched, netto: true })}
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
                setInputs({ ...inputs, brutto: event.target.value });
                setErrors(validate({ ...inputs, brutto: event.target.value }));
              }}
              defaultValue={t.eladarbrutto}
              onBlur={() => setTouched({ ...touched, brutto: true })}
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
                setErrors(validate({ ...inputs, db: event.target.value }));
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
                setErrors(validate({ ...inputs, fogyas: event.target.value }));
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
                setErrors(validate({ ...inputs, tipus: event.target.value }));
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
                setErrors(validate({ ...inputs, szin: event.target.value }));
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
                setErrors(validate({ ...inputs, meret: event.target.value }));
              }}
              defaultValue={t.meret}
              onBlur={() => setTouched({ ...touched, meret: true })}
            />
          </div>
          <div className="termek-details-button-div">
            <button className="termek-details-button">Módosítás</button>
            <button className="termek-details-button">Törlés</button>
          </div>
        </div>
      ))}
    </>
  );
}

export default Termek;
