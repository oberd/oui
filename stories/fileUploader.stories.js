import React from 'react'

export default {
  title: 'File Uploader'
}

export const fileUploader = () => {
  const ref = React.useRef()

  React.useEffect(() => {
    if (!ref.current) { return }

    const onFileDropped = async (evt) => {
      // Pass an upload callback to the component
      await evt.detail.uploadWith(async (formData) => {
        const url = "https://httpbin.org/status/" + (Math.random() > 0.3 ? "200" : "400")
        const response = await fetch(url, { method: "POST", body: formData })
        if (!response.ok) { throw new Error("problem uploading files.") }
      })
    }

    ref.current.addEventListener('dropped', onFileDropped)

    return () => ref.current.removeEventListener('dropped', onFileDropped)
  }, [])

  return (
    <div ref={ ref } style={{ width: "50%", margin: "4em auto", textAlign: "center" }}>
      <oui-file-upload
        title="Oui File Uploader"
        btn-label="Oui File Uploader"
        accept="text/plain"
      />
    </div>
  )
}
