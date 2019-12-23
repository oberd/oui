import React from 'react'
import Marked from 'marked'

import 'github-markdown-css'

export default function Readme ({content}) {
  const readmeHtml = Marked(content)

  return (
    <div
      style={{width: '90%', margin: '1em auto'}}
      className="markdown-body"
      dangerouslySetInnerHTML={ { __html: readmeHtml } }
    />
  )
}
