import TextLayer from '../components/TextLayer';
import data from '../components/_testData'

export default function Home() {
  return (
    <div className={'test'}>
      {
        data.pages.map((page) => {
          return (
            <>
              <TextLayer data={page.textLayer} menu={page.menu} />
            </>
          )
        })
      }
    </div>
  )
}
