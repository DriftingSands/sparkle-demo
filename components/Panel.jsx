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

export default function Panel({ panel, settings }) {
  const createTimeline = useContext(TimelineProvider);

  useEffect(() => {
    if (!createTimeline || !panel.timelineAnimations) {return;}

    createTimeline(panel.timelineAnimations, panel.timelineAnimationSettings);
  }, [createTimeline, panel.timelineAnimationSettings, panel.timelineAnimations]);

  return (
    <div
      className={`panel ${panel?.panelSettings?.dark ? "darkPanel" : ""}`}
      id={panel.id}
    >
      {settings?.type === "mobile" ? null : <Header />}
      {panel?.background && <Background backgroundProps={panel.background} />}
      {panel?.layers?.length &&
        panel.layers.map((layer, index) => {
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
