import axios from "axios";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

function Termek() {
  const [sParam] = useSearchParams();
  const cikkszam = sParam.get("cikkszam");

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

  const handleChange = (e: { target: { name: any; value: any } }) => {
    setTermek((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };
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
              <input
                className="termek-details-input"
                type="text"
                name="cikkszam"
                onChange={handleChange}
                value={t.cikkszam}
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
              onChange={handleChange}
              value={t.vonalkod}
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
              onChange={handleChange}
              value={t.nev}
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
              onChange={handleChange}
              value={t.eladarnetto}
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
              onChange={handleChange}
              value={t.eladarbrutto}
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
              onChange={handleChange}
              value={t.db}
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
              onChange={handleChange}
              value={t.tipus}
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
              onChange={handleChange}
              value={t.szin}
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
              onChange={handleChange}
              value={t.meret}
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
