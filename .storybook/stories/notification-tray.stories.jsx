import React from 'react'

import Readme from './Readme'
import readme from '../../src/components/notification-tray/readme.md'

export default {
  title: 'NotificationTray'
}

const notifications = [
  { name: 'Ubuntu Release', type: 'link', detail: 'Ubuntu 19.10 has been released', valence: 'success', read: false },
  { name: 'Apple Release', type: 'info', detail: 'OSX Catalina has been released', valence: 'fail', read: false }
]

function notificationsReducer (state, action) {
  switch (action.type) {
    case 'dismiss':
      return state.reduce((acc, item) => {
        const itemCopy = { ...item }

        if (item.name === action.payload) {
          itemCopy.read = true
        }

        acc.push(itemCopy)
        return acc
      }, [])

    case 'dismissall':
      return state.reduce((acc, item) => {
        const itemCopy = { ...item }
        itemCopy.read = true
        acc.push(itemCopy)
        return acc
      }, [])

    default:
      return state
  }
}

export const NotificationTray = () => {
  const [state, dispatch] = React.useReducer(notificationsReducer, notifications)
  const trayRef = React.useRef(null)

  const dismiss = React.useCallback((evt) => {
    dispatch({ type: 'dismiss', payload: evt.detail })
    alert(`Notification '${evt.detail}' has been dismissed`)
  })

  const dismissAll = React.useCallback((evt) => {
    dispatch({ type: 'dismissall' })
    alert('All notifications have been dismissed')
  })

  React.useEffect(() => {
    trayRef.current.addEventListener('dismiss', dismiss)
    trayRef.current.addEventListener('dismissall', dismissAll)

    return () => {
      trayRef.current.removeEventListener('dismiss', dismiss)
      trayRef.current.removeEventListener('dismissall', dismissAll)
    }
  }, [])

  const iconState = React.useMemo(() => {
    return state.reduce((acc, item) => {
      acc.count++
      if (!item.read) { acc.unread++ }
      return acc
    }, { count: 0, unread: 0 })
  }, [state])

  return (
    <>
      <div style={ { width: "98%", margin: "4em auto", textAlign: "center" } }>
        <oui-tm-switch />
        <oui-nav-bar>
          <div style={ { flex: "1" } } />
          <oui-notification-tray count={ iconState.count } unread={ iconState.unread } ref={ trayRef }>
            <oui-notification-drawer disabled={ !iconState.unread }>
              {
                state.map((n) => {
                  return (
                    <oui-notification-item
                      key={ n.name }
                      name={ n.name }
                      type={ n.type }
                      detail={ n.detail }
                      valence={ n.valence }
                      read={ n.read }
                    />
                  )
                })
              }
            </oui-notification-drawer>
          </oui-notification-tray>
        </oui-nav-bar>
      </div>

      {/* <div style={ { width: "98%", margin: "4em auto", textAlign: "center" } }>
        <oui-nav-bar>
          <oui-notification-tray count={ iconState.count } unread={ iconState.unread } ref={ trayRef } direction="to-right">
            <oui-notification-drawer disabled={ !iconState.unread }>
              {
                state.map((n) => {
                  return (
                    <oui-notification-item
                      key={ n.name }
                      name={ n.name }
                      type={ n.type }
                      detail={ n.detail }
                      valence={ n.valence }
                      read={ n.read }
                    />
                  )
                })
              }
            </oui-notification-drawer>
          </oui-notification-tray>
          <div style={ { flex: "1" } } />
        </oui-nav-bar>
      </div> */}
      <Readme content={ readme } />
    </>
  )
}
