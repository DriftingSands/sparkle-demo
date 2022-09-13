import MobileHeader from "../components/MobileHeader";
import Panel from "../components/Panel";
import data from "../components/_mobileData";

export default function Home() {
  return (
    <div className={"page"} style={{ maxWidth: data?.settings?.maxWidth }}>
      {data.settings.header === "mobile" && (
        <MobileHeader maxWidth={data?.settings?.maxWidth} />
      )}
      {data.panels.map((panel, index) => {
        return <Panel settings={data.settings} panel={panel} key={index} />;
      })}
    </div>
  );
}
