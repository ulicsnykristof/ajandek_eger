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
      id: "us",
      color: "hsl(289, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 115,
        },
        {
          x: "helicopter",
          y: 22,
        },
        {
          x: "boat",
          y: 144,
        },
        {
          x: "train",
          y: 64,
        },
        {
          x: "subway",
          y: 114,
        },
        {
          x: "bus",
          y: 104,
        },
        {
          x: "car",
          y: 199,
        },
        {
          x: "moto",
          y: 147,
        },
        {
          x: "bicycle",
          y: 2,
        },
        {
          x: "horse",
          y: 97,
        },
        {
          x: "skateboard",
          y: 268,
        },
        {
          x: "others",
          y: 132,
        },
      ],
    },
    {
      id: "germany",
      color: "hsl(123, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 95,
        },
        {
          x: "helicopter",
          y: 258,
        },
        {
          x: "boat",
          y: 116,
        },
        {
          x: "train",
          y: 150,
        },
        {
          x: "subway",
          y: 178,
        },
        {
          x: "bus",
          y: 255,
        },
        {
          x: "car",
          y: 180,
        },
        {
          x: "moto",
          y: 280,
        },
        {
          x: "bicycle",
          y: 154,
        },
        {
          x: "horse",
          y: 182,
        },
        {
          x: "skateboard",
          y: 215,
        },
        {
          x: "others",
          y: 277,
        },
      ],
    },
    {
      id: "norway",
      color: "hsl(100, 70%, 50%)",
      data: [
        {
          x: "plane",
          y: 131,
        },
        {
          x: "helicopter",
          y: 4,
        },
        {
          x: "boat",
          y: 281,
        },
        {
          x: "train",
          y: 6,
        },
        {
          x: "subway",
          y: 62,
        },
        {
          x: "bus",
          y: 222,
        },
        {
          x: "car",
          y: 119,
        },
        {
          x: "moto",
          y: 23,
        },
        {
          x: "bicycle",
          y: 54,
        },
        {
          x: "horse",
          y: 16,
        },
        {
          x: "skateboard",
          y: 295,
        },
        {
          x: "others",
          y: 153,
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
          <p>Össztermék szám: {datal}</p>
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
