import TermekTypePie from "./charts/TermekTypePie";

function StatisztikakPage() {
  const data = [
    {
      id: "python",
      label: "python",
      value: 428,
      color: "hsl(99, 70%, 50%)",
    },
    {
      id: "php",
      label: "php",
      value: 42,
      color: "hsl(129, 70%, 50%)",
    },
    {
      id: "elixir",
      label: "elixir",
      value: 303,
      color: "hsl(303, 70%, 50%)",
    },
    {
      id: "ruby",
      label: "ruby",
      value: 475,
      color: "hsl(86, 70%, 50%)",
    },
    {
      id: "javascript",
      label: "javascript",
      value: 583,
      color: "hsl(308, 70%, 50%)",
    },
  ];

  return (
    <>
      <div className="stat-main-grid">
        <div className="stat-in-div">
          <h3>Termék Típusok</h3>
          <TermekTypePie data={data} />
        </div>
        <div className="stat-in-div">
          <h1>chart2</h1>
        </div>
        <div className="stat-in-div">
          <h1>chart3</h1>
        </div>
      </div>
    </>
  );
}

export default StatisztikakPage;
