import AEMHeadless from '@adobe/aem-headless-client-js'
import { useState } from 'react'

export default function loginFallback({ getData, setDesktopData, setMobileData }) {
  const [user, setUser] = useState('')
  const [password, setPassword] = useState('')


  const handleSubmit = async (variations) => {
    const aemHeadlessClient = new AEMHeadless({
      serviceURL: 'https://author-p54352-e657273.adobeaemcloud.com',
      endpoint: 'content/graphql/endpoint.gql',
      auth: [user, password],
      // fetch: fetch
    })

    const desktopResponse = await aemHeadlessClient.runPersistedQuery('sparkle-demo/homepage', {variation: 'desktop'}, {})
    setDesktopData(desktopResponse.data.pageByPath.item.panels)

    const mobileResponse = await aemHeadlessClient.runPersistedQuery('sparkle-demo/homepage', {variation: 'mobile'}, {})
    setMobileData(mobileResponse.data.pageByPath.item.panels)
  }


  return (
    <div className='fallbackWrapper' >
      <div className='fallbackMenu' >
        <p>
          <strong>Data retrieval failed.</strong> <br />
          Either login to the AEM environment in another tab, or input a username and password here.
        </p>

        <form action="" onSubmit={(e) => {
            e.preventDefault()
            handleSubmit()
          }} >
          <input type="text" value={user} onChange={(e) => setUser(e.target.value)} placeholder='User' />
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder='Password' />
          <button type='submit' className='submit' >submit</button>
        </form>


      </div>
    </div>
  )
}