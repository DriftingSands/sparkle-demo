import { useContext, useEffect } from "react";
import Background from "../components/Background";
import LayerImage from "../components/LayerImage";
import TextLayer from "../components/TextLayer";
import Header from "./Header";
import { TimelineProvider } from "./TimelineWrapper";

const lookupObject = {
  image: LayerImage,
  text: TextLayer,
};

export default function Scene({ scene, settings }) {
  const createTimeline = useContext(TimelineProvider);

  useEffect(() => {
    if (!createTimeline || !scene.timelineAnimations) {return;}

    createTimeline(scene.timelineAnimations, scene.timelineAnimationSettings);
  }, [createTimeline, scene.timelineAnimationSettings, scene.timelineAnimations]);

  return (
    <div
      className={`scene ${scene?.sceneSettings?.dark ? "darkScene" : ""}`}
      id={scene.id}
    >
      {settings?.type === "mobile" ? null : <Header />}
      {scene?.background && <Background backgroundProps={scene.background} />}
      {scene?.layers?.length &&
        scene.layers.map((layer, index) => {
          const Component = lookupObject[layer.type];
          if (!Component) {
            return null;
          }
          return (
            <Component
              data={layer.content}
              settings={layer.settings}
              key={index}
            />
          );
        })}
    </div>
  );
}
