import { useContext, useEffect } from "react";
import Background from "../components/Background";
import LayerImage from "../components/LayerImage";
import TextLayer from "../components/TextLayer";
import PointTextMap from './PointTextMap';
import Header from "./Header";
import { TimelineProvider } from "./TimelineWrapper";

const lookupObject = {
  image: LayerImage,
  "Image Layer": LayerImage,
  text: TextLayer,
  "Text Layer": TextLayer,
  "Shoppable Moment Layer": PointTextMap,
};

export default function Panel({ panel, panelNr, settings, runOnEnd }) {
  const createTimeline = useContext(TimelineProvider);

  useEffect(() => {
    if (!createTimeline || !panel?.animations?.timelineAnimations) {return;}

    createTimeline(panel?.animations?.timelineAnimations, panel?.animations?.timelineAnimationSettings, runOnEnd);
  }, [createTimeline, panel?.animations?.timelineAnimationSettings, panel?.animations?.timelineAnimations]);

  return (
    <div
      className={`panel ${panel?.dark ? "darkPanel" : ""}`}
      id={panel.id}
    >
      {settings?.type === "mobile" ? null : <Header />}
      {panel?.background && <Background backgroundProps={panel.background} lazy={panelNr > 0 ? true : false} />}
      {panel?.layers?.length &&
        panel.layers.map((layer, index) => {
          const Component = lookupObject[layer.type || layer?._model?.title];
          if (!Component) {
            return null;
          }
          return (
            <Component
              activeMenuItem={panel.activeMenuItem}
              data={layer}
              panelNr={panelNr}
              key={index}
            />
          );
        })}
    </div>
  );
}
