onmessage = function (evt) {
  var initial

  setInterval(() => {
    fetch("/build/oui.esm.js")
      .then(r => r.text()).then((s) => {
        if (!initial) {
          initial = s
          return
        }

        if (initial !== s) { postMessage('reload') }
      })
  }, 1000)
}
