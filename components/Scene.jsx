import { useContext, useEffect } from 'react';
import Background from '../components/Background';
import LayerImage from '../components/LayerImage';
import TextLayer from '../components/TextLayer';
import Header from './Header';
import { TimelineProvider } from './TimelineWrapper';

export default function Scene({scene, settings}) {
  const createTimeline = useContext(TimelineProvider)

  useEffect(() => {
    if (!createTimeline || !scene.timelineAnimations) {return}
    createTimeline(scene.timelineAnimations, scene.timelineAnimationSettings)
  }, [])

  return (
    <div className={`scene ${scene?.sceneSettings?.dark ? 'darkScene' : ''}`} id={scene.id} >
      {settings?.header === 'mobile' ? null : <Header />}
      <Background backgroundProps={scene.background} />
        {scene?.images?.map((image, index) => {
          return <LayerImage
            imageData={image}
            key={index}
          />
          })}
      <TextLayer data={scene.textLayer} menu={scene.menu} />
    </div>
  )
}
