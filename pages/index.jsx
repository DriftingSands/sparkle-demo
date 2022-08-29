
import Scene from '../components/Scene';
import data from '../components/_testData'

export default function Home() {
  return (
    <div className={'test'}>
      {
        data.scenes.map((scene, index) => {
          return (
            <Scene scene={scene} key={index} />
          )
        })
      }
    </div>
  )
}
