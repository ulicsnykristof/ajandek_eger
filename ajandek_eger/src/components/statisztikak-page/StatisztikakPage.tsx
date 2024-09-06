import { useEffect, useState } from "react";
import TermekTypePie from "./charts/TermekTypePie";
import axios from "axios";

function StatisztikakPage() {
  const [termekek, setTermekek] = useState<any[]>([]);
  useEffect(() => {
    const fetchAllTermek = async () => {
      try {
        const res = await axios.get("http://localhost:8080/all");
        setTermekek(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTermek();
  }, []);

  const data = [
    {
      id: "Kiakó Játék",
      label: "Kiakó Játék",
      value: 361,
    },
    {
      id: "Játék Hangszer",
      label: "Játék Hangszer",
      value: 210,
    },
    {
      id: "Póló",
      label: "Póló",
      value: 599,
    },
    {
      id: "Pülss",
      label: "Plüss",
      value: 82,
    },
    {
      id: "Hűtőmágnes",
      label: "Hűtőmágnes",
      value: 381,
    },
  ];

  let chartData: any = [];
  type temp = { id: any; label: any; value: any };
  const [temp] = useState<temp>({ id: "", label: "", value: "" });

  termekek.map((t) => {
    temp.id = t.nev;
    temp.label = t.nev;
    temp.value = t.db;
    console.log(temp);
    chartData.push(temp);
  });
  console.log(chartData);
  const datal = termekek.length;

  return (
    <>
      <div className="stat-main-grid">
        <div className="stat-in-div">
          <h3 className="stat-in-title">Termék Típusok</h3>
          <p>Össztermék szám: {datal}</p>
          <TermekTypePie data={data} />
        </div>
        <div className="stat-in-div">
          <h3 className="stat-in-title">chart2</h3>
        </div>
        <div className="stat-in-div">
          <h3 className="stat-in-title">chart3</h3>
        </div>
      </div>
      <div className="stat-bottom-div">
        <div className="stat-bottom-in-div">
          <h3 className="stat-in-title">chart4</h3>
        </div>
      </div>
    </>
  );
}

export default StatisztikakPage;
