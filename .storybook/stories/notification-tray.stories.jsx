import React from 'react'

import Readme from './Readme'
import readme from '../../src/components/notification-tray/readme.md'

export default {
  title: 'NotificationTray'
}

export const NotificationTray = () => {
  // const [isOpen, setIsOpen] = React.useState(false)
  const dismissAll = React.useCallback((evt) => {
    evt.stopPropagation()
    console.log('dismiss all')
  })

  return (
    <>
      <div style={ { width: "50%", margin: "4em auto", textAlign: "center" } }>
        <oui-tm-switch />
        <oui-nav-bar>
          <div style={ { flex: "1" } } />
          <oui-notification-tray count="2" unread="2" onDismissall={dismissAll}>
            <oui-notification-drawer>
              <oui-notification-item
                title="Ubuntu Release"
                type="link"
                detail="Ubuntu 19.10 has been released"
                valence="success"
                  />
      
              <oui-notification-item
                title="Apple Release"
                type="info"
                detail="OSX Catalina has been released"
                valence="fail"
                read
                  />
            </oui-notification-drawer>
          </oui-notification-tray>
        </oui-nav-bar>
      </div>
      <Readme content={ readme } />
    </>
  )
}
