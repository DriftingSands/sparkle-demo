import Image from 'next/image'

export default function Header() {
  return (
    <header className="header">
      <div className="left">
        {/* <h1 className="logoText">WKND</h1> */}
        <Image src={'/wknd-logo-dk.svg'} alt='logo' height={36} width={'100%'} className='logo' />
      </div>

      <div className="middle">
        <a href="">
          <h4>adventures</h4>
        </a>
        <a href="">
          <h4>magazine</h4>
        </a>
        <a href="">
          <h4>settings</h4>
        </a>
      </div>

      <div className="right">
        {/* <button className="arrowButton">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            height="18"
            viewBox="0 0 18 18"
            width="18"
          >
            <title>S ChevronDown 18 N</title>
            <rect
              id="Canvas"
              fill="#ff13dc"
              opacity="0"
              width="18"
              height="18"
            />
            <path
              className="fill"
              d="M4,7.01a1,1,0,0,1,1.7055-.7055l3.289,3.286,3.289-3.286a1,1,0,0,1,1.437,1.3865l-.0245.0245L9.7,11.7075a1,1,0,0,1-1.4125,0L4.293,7.716A.9945.9945,0,0,1,4,7.01Z"
            />
          </svg>
        </button> */}

        <a className='accountLink' href=""><span>my account</span></a>

        <div className="accountIcon">
          <Image src={"/WKND SPA/stacey-roswells.webp"} width={40} height={40} alt="profile picture" />
        </div>
      </div>
    </header>
  );
}
