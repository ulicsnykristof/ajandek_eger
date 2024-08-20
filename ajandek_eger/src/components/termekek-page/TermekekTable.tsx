import { Button, Table } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { MouseEvent } from "react";
import GetImage from "./GetImage";
import Pagination from "../pagination/Pagination";

function TermekekTable() {
  // On 'szerkeszt' button click navigate to 'termekek' page
  const navigate = useNavigate();

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    const btnid = e.currentTarget.id;
    const ck = "/termekek/termek?cikkszam=" + btnid;
    navigate(ck, {
      state: { param1: "1", param2: "2", param3: "3" },
    });
  };

  // On 'törlés' button clicks, deletes the selected item
  const handleClickDelete = async (e: MouseEvent<HTMLElement>) => {
    const btnid = e.currentTarget.id;

    try {
      await axios.delete("http://localhost:8080/deleteTermek/" + btnid);
    } catch (err) {}

    try {
      await axios.delete("http://localhost:8080/deleteImage/" + btnid);
    } catch (err) {}
  };

  // Get all data from database to 'termekek'
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

  // Pagination
  const [currentPage, setCurrentPage] = useState(1);
  const [recordsPerPage] = useState(5);

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
        <Pagination
          pageNumbers={pageNumbers}
          goToNextPage={goToNextPage}
          goToPrevPage={goToPrevPage}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />

        <Table responsive style={{ width: "800px" }}>
          <tbody>
            {currentRecords.map((termek) => (
              <tr key={termek.cikkszam + "00"} style={{ height: "100px" }}>
                <td width={100}>
                  <GetImage ck={termek.cikkszam} width="100px" height="100px" />
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
                    id={termek.cikkszam}
                    onClick={handleClick}
                    style={{ marginTop: "40px", marginRight: "5px" }}
                  >
                    Szerkesztés
                  </Button>
                  <Button
                    id={termek.cikkszam}
                    onClick={handleClickDelete}
                    style={{ marginTop: "40px" }}
                  >
                    Törlés
                  </Button>
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
