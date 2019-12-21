import React from 'react'

export default {
  title: 'Modal'
}

export const Modal = () => {
  const [isOpen, setIsOpen] = React.useState(false)
  const openModal = React.useCallback(() => { setIsOpen(true) })

  return (
    <div style={ { width: "50%", margin: "4em auto", textAlign: "center" } }>
      <button onClick={ openModal }>Open Modal</button>

      {
        isOpen &&
        <oui-modal>
          <span slot="title">Oui Modal</span>
          <h1>Lorem Ipsum</h1>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nam similique, quibusdam aliquid
            officia eveniet, recusandae iste ab cupiditate pariatur accusamus alias ratione provident
            sequi vitae facilis, qui sint fugiat earum?
          </p>
        </oui-modal>
      }
    </div>
  )
}
