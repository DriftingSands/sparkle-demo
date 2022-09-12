
import Scene from '../components/Scene';
import desktopData from '../components/_testData'
import mobileData from '../components/_mobileData'
import MobileHeader from '../components/MobileHeader';
import { ScrollTrigger } from "gsap/dist/ScrollTrigger";
import { useEffect, useState } from 'react';

export default function Home() {
  const [data, setData] = useState(desktopData)

  function debounce(func, wait) {
    let timeout;
    return () => {
      if (timeout) {
          clearTimeout(timeout);
      }
      timeout = setTimeout(func, wait)
    }
  }

  const handleResize = debounce(() => {
    ScrollTrigger.refresh()
    if (window.innerWidth > 800) {
      return setData(desktopData)
    }
    return setData(mobileData)
  }, 100)
  
  useEffect(() => {
    if (window.innerWidth > 800) {
      setData(desktopData)
    } else {
      setData(mobileData)
    }
    window.addEventListener('resize', handleResize)
    return () => {window.removeEventListener('resize', handleResize)}
  }, [])
  

  return (
    <div className={'page'} style={{maxWidth: data?.settings?.maxWidth}} >
      {data?.settings?.header === 'mobile' && <MobileHeader maxWidth={data?.settings?.maxWidth} />}
      {
        data?.scenes?.map((scene, index) => {
          return data === desktopData ? (
            <Scene settings={data.settings} scene={scene} key={index} />
          ) : (
            <Scene settings={data.settings} scene={scene} key={index} />
          )
        })
      }
    </div>
  )
}
