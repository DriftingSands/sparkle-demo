import Background from '../components/Background';
import LayerImage from '../components/LayerImage';
import TextLayer from '../components/TextLayer';
import data from '../components/_testData'

export default function Home() {
  return (
    <div className={'test'}>
      {
        data.scenes.map((page, index) => {
          return (
            <div className="page" key={index}>
              <Background path={page.background.path} altText={page.background.altText} />
                {page.images.map((image, index) => {
                  return <LayerImage
                  imageData={image}
                    key={index}
                    />
                  })}
              <TextLayer data={page.textLayer} menu={page.menu} />
            </div>
          )
        })
      }
    </div>
  )
}
