import Scene from "../components/Scene";
import data from "../components/_testData";

export default function Home() {
  return (
    <div className={"page"}>
      {data.scenes.map((scene, index) => {
        return <Scene scene={scene} key={index} />;
      })}
    </div>
  );
}
