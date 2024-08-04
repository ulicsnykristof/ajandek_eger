import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import GetImage from "../termekek-page/GetImage";
import { MouseEvent } from "react";
import { useForm, FormProvider } from "react-hook-form";

function AdministrationPage() {
  let inputs: any[] = [];

  type Temp = {
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

  const [temp, setTemp] = useState<Temp>({
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

  ////////////////////////////////////////////////////////////////////////////

  const [termekek, setTermekek] = useState<any[]>([]);
  useEffect(() => {
    const fetchAllTermek = async () => {
      try {
        const res = await axios.get("http://localhost:8080/all");
        setTermekek(res.data);
        temp.nev = res.data[0].nev;
        temp.db = res.data[0].db;
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTermek();
  }, []);

  ///////////////////////////////////////////////////////////////////////////

  const addElement = (e: MouseEvent<HTMLElement>) => {
    const elementName = e.currentTarget.id;

    const newDiv = document.createElement("div");

    newDiv.innerHTML = `
    <div id="admin-generated-main" class="admin-generated-main">
      <span>${elementName}</span><span> + 1</span>
    </div>`;

    const parent1 = document.getElementById("teszt");

    parent1?.appendChild(newDiv);

    termekek.map((t) => {
      if (t.nev === elementName) {
        t.db++;
        inputs.push(t);
      }
    });
  };

  function subElement(e: MouseEvent<HTMLElement>) {
    const elementName = e.currentTarget.id;

    const newDiv = document.createElement("div");

    newDiv.innerHTML = `
    <div id="admin-generated-main" class="admin-generated-main">
      <span>${elementName}</span><span> - 1</span>
    </div>`;

    const parent1 = document.getElementById("teszt");

    parent1?.appendChild(newDiv);

    termekek.map((t) => {
      if (t.nev === elementName) {
        t.db--;
        inputs.push(t);
      }
    });
  }

  /////////////////////////////////////////////////////////////////////////

  function clearItems() {
    const parent1 = document.getElementById("teszt");

    parent1?.remove();

    inputs = [];

    window.location.reload();
  }

  /////////////////////////////////////////////////////////////////////////

  const methods = useForm();
  const uploadItems = methods.handleSubmit(async () => {
    console.log(inputs);
    inputs.map(async (i) => {
      try {
        await axios.post("http://localhost:8080/updateTermek", i);
      } catch (err) {}
    });

    window.location.reload();
  });

  //////////////////////////////////////////////////////////////////////////
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(4);

  const indexOfLastRecord = currentPage * recordsPerPage;
  const indexOfFirstRecord = indexOfLastRecord - recordsPerPage;
  const currentRecords = termekek.slice(indexOfFirstRecord, indexOfLastRecord);
  const nPages = Math.ceil(termekek.length / recordsPerPage);

  const pageNumbers = [...Array(nPages + 1).keys()].slice(1);

  const goToNextPage = () => {
    if (currentPage !== nPages) setCurrentPage(currentPage + 1);
  };
  const goToPrevPage = () => {
    if (currentPage !== 1) setCurrentPage(currentPage - 1);
  };

  return (
    <>
      <div className="admin-main-grid">
        <div className="admin-in-left-div">
          <div className="admin-in-table">
            <Table responsive style={{ width: "800px" }}>
              <tbody>
                {currentRecords.map((termek) => (
                  <tr key={termek.cikkszam + "00"} style={{ height: "100px" }}>
                    <td width={100}>
                      <GetImage ck={termek.cikkszam} />
                    </td>
                    <td width={300}>
                      <p>{termek.nev}</p>
                      <p>{termek.cikkszam}</p>
                      <p>
                        {termek.db} db{" "}
                        {termek.db < termek.fogyas ? (
                          <span style={{ color: "red" }}>Alacsony készlet</span>
                        ) : null}
                      </p>
                    </td>
                    <td width={120}>
                      <p
                        style={{
                          marginTop: "40px",
                          fontSize: "20px",
                        }}
                      >
                        {termek.eladarbrutto} Ft
                      </p>
                    </td>
                    <td width={200}>
                      <Button
                        onClick={addElement}
                        className="admin-table-button-plus"
                        id={termek.nev}
                      >
                        <p style={{ fontSize: "30px" }}>+</p>
                      </Button>
                      <Button
                        onClick={subElement}
                        className="admin-table-button-minus"
                        id={termek.nev}
                      >
                        <p style={{ fontSize: "30px" }}>-</p>
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </div>
        </div>
        <div className="admin-in-right-div">
          <div className="admin-right-buttons">
            <Button onClick={uploadItems}>Mentés</Button>
            <Button onClick={clearItems}>Mégse</Button>
          </div>
          <div>
            <div id="teszt"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdministrationPage;
