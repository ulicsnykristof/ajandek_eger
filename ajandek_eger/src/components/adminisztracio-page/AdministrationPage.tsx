import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Table } from "react-bootstrap";
import GetImage from "../termekek-page/GetImage";
import { MouseEvent } from "react";
import { useForm } from "react-hook-form";
import Pagination from "../pagination/Pagination";

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

  const [temp] = useState<Temp>({
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

  let alreadyAdded: string[] = [];

  const addElement = (e: MouseEvent<HTMLElement>) => {
    const elementName = e.currentTarget.id;

    let count = 1;
    let vm = false;
    for (let i = 0; i < alreadyAdded.length; i++) {
      if (alreadyAdded[i] === elementName) {
        count++;
        vm = true;
      }
    }

    alreadyAdded.push(elementName);

    const idname = elementName + "count";

    if (vm) {
      const update = document.getElementById(idname);
      console.log(update);
      const newSpan = document.createElement("span");
      newSpan.innerHTML = `<span id="${idname}"> +${count}</span>`;
      update?.parentNode?.replaceChild(newSpan, update);
    } else {
      const newDiv = document.createElement("div");

      newDiv.innerHTML = `
    <div id="admin-generated-main" class="admin-generated-main">
      <div class="admin-generated-inner"><span>${elementName}</span><span id="${idname}"> +${count}</span></div>
    </div>`;
      const parent1 = document.getElementById("admin-generated-parent");
      parent1?.appendChild(newDiv);
    }

    termekek.map((t) => {
      if (t.nev === elementName) {
        t.db++;
        inputs.push(t);
      }
    });

    console.log(inputs);
  };

  function subElement(e: MouseEvent<HTMLElement>) {
    const elementName = e.currentTarget.id;

    let count = -1;
    let vm = false;
    for (let i = 0; i < alreadyAdded.length; i++) {
      if (alreadyAdded[i] === elementName) {
        count--;
        vm = true;
      }
    }

    alreadyAdded.push(elementName);

    const idname = elementName + "count";

    if (vm) {
      const update = document.getElementById(idname);
      console.log(update);
      const newSpan = document.createElement("span");
      newSpan.innerHTML = `<span id="${idname}"> ${count}</span>`;
      update?.parentNode?.replaceChild(newSpan, update);
    } else {
      const newDiv = document.createElement("div");

      newDiv.innerHTML = `
    <div id="admin-generated-main" class="admin-generated-main">
      <div class="admin-generated-inner"><span>${elementName}</span><span id="${idname}"> ${count}</span></div>
    </div>`;
      const parent1 = document.getElementById("admin-generated-parent");
      parent1?.appendChild(newDiv);
    }

    termekek.map((t) => {
      if (t.nev === elementName) {
        t.db--;
        inputs.push(t);
      }
    });
  }

  /////////////////////////////////////////////////////////////////////////

  function clearItems() {
    const parent1 = document.getElementById("admin-generated-parent");

    parent1?.remove();

    inputs = [];

    window.location.reload();
  }

  // Update

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

  // Pagination
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

  // Search
  const [query, setQuery] = useState("");

  return (
    <>
      <div className="admin-main-grid">
        <div className="admin-in-left-div">
          <Pagination
            pageNumbers={pageNumbers}
            goToNextPage={goToNextPage}
            goToPrevPage={goToPrevPage}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
          <input
            type="text"
            placeholder="Keresés..."
            onChange={(e) => setQuery(e.target.value)}
          />
          <div className="admin-in-table">
            <Table responsive style={{ width: "800px" }}>
              <tbody>
                {currentRecords
                  .filter((t) => t.nev.toLowerCase().includes(query))
                  .map((termek) => (
                    <tr className="admin-table-row" key={termek.cikkszam}>
                      <td className="admin-table-td-img">
                        <GetImage
                          ck={termek.cikkszam}
                          width="100px"
                          height="100px"
                        />
                      </td>
                      <td className="admin-table-td-nev">
                        <p className="admin-table-p-nev">{termek.nev}</p>
                      </td>
                      <td className="admin-table-td-db">
                        <p className="admin-table-p-db">{termek.db} db </p>
                      </td>
                      <td className="admin-table-td-ar">
                        <p className="admin-table-p-ar">
                          {termek.eladarbrutto} Ft
                        </p>
                      </td>
                      <td className="admin-table-td-btn">
                        <Button
                          onClick={addElement}
                          className="admin-table-button-plus"
                          id={termek.nev}
                        >
                          <p className="admin-table-td-btn-text">+</p>
                        </Button>
                        <Button
                          onClick={subElement}
                          className="admin-table-button-minus"
                          id={termek.nev}
                        >
                          <p className="admin-table-td-btn-text">-</p>
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
            <Button
              className="admin-right-buttons-mentes"
              onClick={uploadItems}
            >
              Mentés
            </Button>
            <Button className="admin-right-buttons-megse" onClick={clearItems}>
              Mégse
            </Button>
          </div>
          <div>
            <div id="admin-generated-parent"></div>
          </div>
        </div>
      </div>
    </>
  );
}

export default AdministrationPage;
