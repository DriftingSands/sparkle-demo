import { useContext, useEffect } from 'react';
import Background from '../components/Background';
import LayerImage from '../components/LayerImage';
import TextLayer from '../components/TextLayer';
import { TimelineProvider } from './TimelineWrapper';

export default function Scene({scene}) {
  const createTimeline = useContext(TimelineProvider)

  useEffect(() => {
    if (!createTimeline) {return}
    createTimeline(scene.timelineAnimations, scene.timelineAnimationSettings)
  }, [])

  return (
    <div className="scene" id={scene.id}>
      <Background path={scene.background.path} altText={scene.background.altText} />
        {scene.images.map((image, index) => {
          return <LayerImage
          imageData={image}
            key={index}
            />
          })}
      <TextLayer data={scene.textLayer} menu={scene.menu} />
    </div>
  )
}