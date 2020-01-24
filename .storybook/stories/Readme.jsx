import React from 'react'
import Marked from 'marked'

import 'github-markdown-css'

const style = {
  maxWidth: "1024px",
  margin: '2em auto 1em',
  border: "2px solid #AAA",
  borderRadius: '4px'
}

export default function Readme ({ content }) {
  const readmeHtml = Marked(content.replace(/..\/..\/..\/static/g, ''))

  return (
    <div
      style={ style }>
      <h2 style={ { padding: "0 2em" } }>Readme Preview:</h2>
      <hr />

      <div
        style={ { width: '90%', margin: '1em auto' } }
        className="markdown-body"
        dangerouslySetInnerHTML={ { __html: readmeHtml } }
      />
    </div>
  )
}
