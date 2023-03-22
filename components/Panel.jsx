import { useContext, useEffect } from "react";
import Background from "../components/Background";
import LayerImage from "../components/LayerImage";
import TextLayer from "../components/TextLayer";
import PointTextMap from "./PointTextMap";
import Header from "./Header";
import { TimelineProvider } from "./TimelineWrapper";
import { scrollToId } from "../components/utils";
import editable from "./Editable";
import { gsap } from "gsap/dist/gsap";

const lookupObject = {
  image: LayerImage,
  "Image Layer": LayerImage,
  text: TextLayer,
  "Text Layer": TextLayer,
  "Shoppable Moment Layer": PointTextMap,
};

function Panel({
  panel,
  panelNr,
  settings,
  runOnEnd,
  isAuthorVersion,
  host,
  hash,
  ignoreHash,
  setIgnoreHash,
  viewType,
  editableRef,
  "data-editable-path": dataEditablePath,
}) {
  const createTimeline = useContext(TimelineProvider);

  useEffect(() => {
    if (!createTimeline) {
      return;
    }
    const ctx = gsap.context(() => {
      createTimeline(panel?.animations?.timelineAnimations, panel?.animations?.timelineAnimationSettings, runOnEnd);
    });

    return () => {
      ctx.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createTimeline, panel?.animations?.timelineAnimationSettings, panel?.animations?.timelineAnimations]); // adding runOnEnd makes into animations re-run on end

  useEffect(() => {
    // if hash matches id, scroll this panel
    if (hash === "#" + panel.id && !ignoreHash) {
      scrollToId(hash);
      // stops page from scrolling to hash every time viewport is resized
      setIgnoreHash(true);
    }
  }, [hash, ignoreHash, panel.id, setIgnoreHash]);

  return (
    <div className={`panel ${panel?.dark ? "darkPanel" : ""} `} id={panel.id} path={panel?._path} ref={editableRef} data-editable-path={dataEditablePath} >
      {settings?.viewType === "mobile" ? null : <Header isAuthorVersion={isAuthorVersion} host={host} />}
      {panel?.background && (
        <Background
          backgroundProps={panel.background}
          lazy={panelNr > 0 ? true : false}
          host={host}
          viewType={viewType}
        />
      )}
      {Array.isArray(panel?.layers) &&
        panel?.layers?.length &&
        panel.layers.map((layer, index) => {
          const Component = lookupObject[layer.type || layer?._model?.title];
          if (!Component) {
            return null;
          }
          return (
            <Component
              host={host}
              activeMenuItem={panel.activeMenuItem}
              data={layer}
              panelNr={panelNr}
              key={index}
              viewType={viewType}
            />
          );
        })}
    </div>
  );
}

export default editable(Panel);
