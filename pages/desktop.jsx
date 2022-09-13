import Panel from "../components/Panel";
import data from "../components/_testData";

export default function Home() {
  return (
    <div className={"page"}>
      {data.panels.map((panel, index) => {
        return <Panel panel={panel} key={index} />;
      })}
    </div>
  );
}
