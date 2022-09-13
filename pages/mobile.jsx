import MobileHeader from "../components/MobileHeader";
import Scene from "../components/Scene";
import data from "../components/_mobileData";

export default function Home() {
  return (
    <div className={"page"} style={{ maxWidth: data?.settings?.maxWidth }}>
      {data.settings.header === "mobile" && (
        <MobileHeader maxWidth={data?.settings?.maxWidth} />
      )}
      {data.scenes.map((scene, index) => {
        return <Scene settings={data.settings} scene={scene} key={index} />;
      })}
    </div>
  );
}
