import { ResponsivePie } from "@nivo/pie";

function TermekTypePie(props: any) {
  return (
    <>
      <ResponsivePie
        data={props.data}
        margin={{ top: 0, right: 100, bottom: 100, left: 100 }}
        borderWidth={1}
        startAngle={-35}
        innerRadius={0.3}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
      />
    </>
  );
}

export default TermekTypePie;
