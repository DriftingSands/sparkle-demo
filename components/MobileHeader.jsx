/* eslint-disable @next/next/no-img-element */
import { scrollToId } from './utils';
import { useEffect, useState } from 'react';
// import Image from 'next/image';

export default function MobileHeader({maxWidth}) {
  const [openMenu, setOpenMenu] = useState(false)
  const [openNav, setOpenNav] = useState(false)
  const [navLabel, setNavLabel] = useState('Intro')

  const navItems = [
    {
      title: 'Intro',
      link: '#intro',
    },
    {
      title: 'Outdoor Passion',
      link: '#outdoorPassion',
    },
    {
      title: 'Into The Nature',
      link: '#intoTheNature',
    },
    {
      title: 'Up To The Sky',
      link: '#upToTheSky',
    },
  ]

  function debounce(func, wait) {
    let timeout;
    return () => {
      if (timeout) {
          clearTimeout(timeout);
      }
      timeout = setTimeout(func, wait)
    }
  }


  const handleScroll = debounce(() => {
    let newLabel = null;
    for (let i = 0; i < navItems.length; i++) {
      const element = document.getElementById(navItems[i].link.substring(1))
      if (!element) {continue}
      const rect = element.getBoundingClientRect()
      if (rect.top < (window.innerHeight / 2)) {
        newLabel = navItems[i].title
      }
    }
    newLabel && setNavLabel(newLabel)
  }, 100)
  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [handleScroll])
  

  return (
    <header className="mobileHeaderWrapper" style={{maxWidth, }} >

      <div className="mainHeader">
        <button className={`menuButton ${openMenu ? 'menuOpen' : 'menuClosed'}`} onClick={() => setOpenMenu(true)}>
          <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18" > <defs></defs> <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /> <rect className="fill" height="2" rx="0.5" width="14" x="2" y="8" />  <rect className="fill" height="2" rx="0.5" width="14" x="2" y="3" /> <rect className="fill" height="2" rx="0.5" width="14" x="2" y="13" /> </svg> 
        </button>

        {/* <h1 className={`logo ${openMenu ? 'menuOpen' : 'menuClosed'}`}>WKND</h1> */}
        
        {/* eslint-expect-error-next-line @next/next/no-img-element */}
        <img src={'/wknd-logo-dk.svg'} alt='logo' height={22} className={`logo ${openMenu ? 'menuOpen' : 'menuClosed'}`} /> 

        <a className='profileIconWrapper' ><img className='menuProfileIcon' src={"/WKND SPA/stacey-roswells.webp"} width={42} height={42} alt="profile picture" /></a>
      </div> 

      <nav className="headerNavigation">
        <button className="navigationButton" onClick={() => setOpenNav(!openNav)} >
          <span>{navLabel}</span>
          <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18"  width="18" > <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /> <path className="fill" d="M4,7.01a1,1,0,0,1,1.7055-.7055l3.289,3.286,3.289-3.286a1,1,0,0,1,1.437,1.3865l-.0245.0245L9.7,11.7075a1,1,0,0,1-1.4125,0L4.293,7.716A.9945.9945,0,0,1,4,7.01Z" /> </svg>
        </button>

        <menu className={`navigationMenu ${openNav ? 'open' : 'closed'}`}>
          <ul>
            {navItems.map((item, index) => {
              return <a onClick={() => {scrollToId(item.link); setOpenNav(false)}} key={index}><li> {item.title} </li></a>
            })}
          </ul>
        </menu>
      </nav>


      <menu className={`headerMenu ${openMenu ? 'open' : 'closed'}`} style={{maxWidth: maxWidth ? (maxWidth * 0.6) : null, }} >
        <div className='top'>
          <button className='closeButton menuButton' onClick={() => setOpenMenu(false)}>
            <svg xmlns="http://www.w3.org/2000/svg" height="18" viewBox="0 0 18 18" width="18">
              <rect id="Canvas" fill="#ff13dc" opacity="0" width="18" height="18" /><path className="fill" d="M13.2425,3.343,9,7.586,4.7575,3.343a.5.5,0,0,0-.707,0L3.343,4.05a.5.5,0,0,0,0,.707L7.586,9,3.343,13.2425a.5.5,0,0,0,0,.707l.707.7075a.5.5,0,0,0,.707,0L9,10.414l4.2425,4.243a.5.5,0,0,0,.707,0l.7075-.707a.5.5,0,0,0,0-.707L10.414,9l4.243-4.2425a.5.5,0,0,0,0-.707L13.95,3.343a.5.5,0,0,0-.70711-.00039Z" />
            </svg>
          </button>
        </div>

        <div className="list">
          <ul>
            <li>adventures</li>
            <li>magazine</li>
            <li>settings</li>
          </ul>
        </div>

        <div className="bottom">
          <span>my account</span>
          
          <img src={"/WKND SPA/stacey-roswells.webp"} width={40} height={40} alt="profile picture" />
        </div>
      </menu>

    </header>
  );
}
