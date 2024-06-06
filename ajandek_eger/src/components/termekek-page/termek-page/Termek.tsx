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
      <h4>Termék adatok</h4>
      {termek.map((t) => (
        <div key={t.cikkszam} style={{ marginLeft: "20px" }}>
          <br />
          <br />
          <p>Cikkszam: </p>
          <input
            type="text"
            name="cikkszam"
            onChange={handleChange}
            value={t.cikkszam}
            style={{ width: "400px" }}
          />
          <br />
          <br />
          <p>Vonalkód: </p>
          <input
            type="text"
            name="vonalkod"
            onChange={handleChange}
            value={t.vonalkod}
            style={{ width: "400px" }}
          />
          <br />
          <br />
          <p>Név: </p>
          <input
            type="text"
            name="nev"
            onChange={handleChange}
            value={t.nev}
            style={{ width: "400px" }}
          />
          <br />
          <br />
          <p>Nettó eladási ár: </p>
          <input
            type="text"
            name="eladarnetto"
            onChange={handleChange}
            value={t.eladarnetto}
            style={{ width: "400px" }}
          />
          <br />
          <br />
          <p>Bruttó eladási ár: </p>
          <input
            type="text"
            name="eladarbrutto"
            onChange={handleChange}
            value={t.eladarbrutto}
            style={{ width: "400px" }}
          />
          <br />
          <br />
          <p>Darabszám: </p>
          <input
            type="text"
            name="db"
            onChange={handleChange}
            value={t.db}
            style={{ width: "400px" }}
          />
          <br />
          <br />
          <p>Tipus: </p>
          <input
            type="text"
            name="tipus"
            onChange={handleChange}
            value={t.tipus}
            style={{ width: "400px" }}
          />
          <br />
          <br />
          <p>Szín: </p>
          <input
            type="text"
            name="szin"
            onChange={handleChange}
            value={t.szin}
            style={{ width: "400px" }}
          />
          <br />
          <br />
          <p>Méret: </p>
          <input
            type="text"
            name="meret"
            onChange={handleChange}
            value={t.meret}
            style={{ width: "400px" }}
          />
          <br />
          <br />
        </div>
      ))}
    </>
  );
}

export default Termek;
