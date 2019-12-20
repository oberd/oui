import React from 'react'

export default {
  title: 'File Uploader'
}

export const fileUploader = () => {
  const [postResponse, setPostResponse] = React.useState('')

  const droppedHandler = async (evt) => {
    const res = await evt.detail.uploadWith(async (formData) => {
      const url = "https://httpbin.org/status/" + (Math.random() > 0.3 ? "200" : "400")
      const response = await fetch(url, {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("problem uploading files.")
      }

      return response.status + " " + response.statusText
    })

    setPostResponse(res)

    console.log("Uploaded files: " + res)
  }

  return (
    <oui-file-upload
      id="files"
      accept="text/xml"
      btn-label="Click Here To Upload A File"
      modal-title="Oui File Upload"
      onDropped={ droppedHandler }
    />
  )
}
