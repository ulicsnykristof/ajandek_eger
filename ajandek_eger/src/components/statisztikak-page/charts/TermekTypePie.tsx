import { ResponsivePie } from "@nivo/pie";

function TermekTypePie(props: any) {
  return (
    <>
      <ResponsivePie
        data={props.data}
        margin={{ top: 30, right: 70, bottom: 30, left: 70 }}
        borderWidth={1}
        borderColor={{
          from: "color",
          modifiers: [["darker", 0.2]],
        }}
      />
    </>
  );
}

export default TermekTypePie;
