import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { MouseEvent } from "react";
import GetImage from "./GetImage";

function TermekekTable() {
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const btnid = e.currentTarget.id;
    const ck = "/termekek/termek?cikkszam=" + btnid;
    navigate(ck, {
      state: { param1: "1", param2: "2", param3: "3" },
    });
  };

  const [termekek, setTermekek] = useState<any[]>([]);
  useEffect(() => {
    const fetchAllPlanet = async () => {
      try {
        const res = await axios.get("http://localhost:8080/all");
        setTermekek(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllPlanet();
  }, []);

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
      <div className="termek-table-main">
        <nav className="termek-table-pagination">
          <ul className="pagination justify-content-center">
            <li className="page-item">
              <a className="page-link" onClick={goToPrevPage} href="#">
                Előző
              </a>
            </li>
            {pageNumbers.map((pgNumber) => (
              <li
                key={pgNumber}
                className={`page-item ${
                  currentPage == pgNumber ? "active" : ""
                } `}
              >
                <a
                  onClick={() => setCurrentPage(pgNumber)}
                  className="page-link"
                  href="#"
                >
                  {pgNumber}
                </a>
              </li>
            ))}
            <li className="page-item">
              <a className="page-link" onClick={goToNextPage} href="#">
                Következő
              </a>
            </li>
          </ul>
        </nav>

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
                  <p>{termek.db} db</p>
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
                    id={termek.cikkszam}
                    onClick={handleClick}
                    style={{ marginTop: "40px", marginRight: "5px" }}
                  >
                    Szerkesztés
                  </Button>
                  <Button style={{ marginTop: "40px" }}>Törlés</Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      </div>
    </>
  );
}

export default TermekekTable;
