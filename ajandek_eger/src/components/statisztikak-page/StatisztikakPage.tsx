import { useEffect, useState } from "react";
import TermekTypePie from "./charts/TermekTypePie";
import axios from "axios";
import TermekFogyasLine from "./charts/TermekFogyasLine";

function StatisztikakPage() {
  const [termekek, setTermekek] = useState<any[]>([]);
  useEffect(() => {
    const fetchAllTermek = async () => {
      try {
        const res = await axios.get("http://localhost:8080/chartTermekTipus");
        setTermekek(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllTermek();
  }, []);

  const data2 = [
    {
      id: "Fa Kirakó Játék",
      color: "hsl(289, 70%, 50%)",
      data: [
        {
          x: "Hétfő",
          y: 1,
        },
        {
          x: "Kedd",
          y: 2,
        },
        {
          x: "Szerda",
          y: 4,
        },
        {
          x: "Csütörtök",
          y: 1,
        },
        {
          x: "Péntek",
          y: 5,
        },
        {
          x: "Szombat",
          y: 8,
        },
        {
          x: "Vasárnap",
          y: 6,
        },
      ],
    },
    {
      id: "Hangszer Játék",
      color: "hsl(123, 70%, 50%)",
      data: [
        {
          x: "Hétfő",
          y: 1,
        },
        {
          x: "Kedd",
          y: 3,
        },
        {
          x: "Szerda",
          y: 2,
        },
        {
          x: "Csütörtök",
          y: 2,
        },
        {
          x: "Péntek",
          y: 1,
        },
        {
          x: "Szombat",
          y: 5,
        },
        {
          x: "Vasárnap",
          y: 4,
        },
      ],
    },
    {
      id: "Teszt",
      color: "hsl(100, 70%, 50%)",
      data: [
        {
          x: "Hétfő",
          y: 0,
        },
        {
          x: "Kedd",
          y: 0,
        },
        {
          x: "Szerda",
          y: 2,
        },
        {
          x: "Csütörtök",
          y: 1,
        },
        {
          x: "Péntek",
          y: 6,
        },
        {
          x: "Szombat",
          y: 4,
        },
        {
          x: "Vasárnap",
          y: 4,
        },
      ],
    },
  ];

  const datal = termekek.length;

  return (
    <>
      <div className="stat-main-grid">
        <div className="stat-in-div">
          <h3 className="stat-in-title">Termék Típusok</h3>
          <p>Össz terméktípus: {datal}</p>
          <TermekTypePie data={termekek} />
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
          <h3 className="stat-in-title">Termék Fogyás</h3>
          <TermekFogyasLine data={data2} />
        </div>
      </div>
    </>
  );
}

export default StatisztikakPage;
