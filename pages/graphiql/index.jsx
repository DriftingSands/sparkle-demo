import Link from 'next/link'

export default function index() {

  const linkStyle = {
    padding: '6px',
    margin: '6px 20px',
    background: '#E1E1E1',
    cursor: 'pointer',
  }


  return (
    <div style={{display: 'flex', justifyContent: 'space-around'}} >
      <div style={linkStyle} >
        <Link href={'/graphiql/desktop'} >
          desktop version
        </Link>
      </div>
      <div style={linkStyle} >
        <Link href={'/graphiql/mobile'} >
          mobile version
        </Link>
      </div>
    </div>
  )
}