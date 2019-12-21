import React from 'react'

export default {
  title: 'Modal'
}

export const Modal = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const toggleModalHandler = React.useCallback(() => { setIsOpen(!isOpen) })

  return (
    <div style={ { width: "50%", margin: "4em auto", textAlign: "center" } }>
      <button onClick={ toggleModalHandler }>Open Modal</button>

      <div>
        {
          isOpen &&
          <oui-modal onClose={ toggleModalHandler }>
            <span slot="title">Oui Modal</span>
            <h1>Lorem Ipsum</h1>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam similique, quibusdam aliquid
              officia eveniet, recusandae iste ab cupiditate pariatur accusamus alias ratione provident
              sequi vitae facilis, qui sint fugiat earum?
            </p>

            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam similique, quibusdam aliquid
              officia eveniet, recusandae iste ab cupiditate pariatur accusamus alias ratione provident
              sequi vitae facilis, qui sint fugiat earum?
            </p>
          </oui-modal>
        }
      </div>
    </div>
  )
}
