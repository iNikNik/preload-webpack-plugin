const preloadChunks = chunks => {
  const DOMTokenListSupports = (tokenList, token) => {
    if (!tokenList || !tokenList.supports) {
      return
    }
    try {
      return tokenList.supports(token)
    } catch (e) {
      if (e instanceof TypeError) {
        console.log("The DOMTokenList doesn't have a supported tokens list")
      } else {
        console.error("That shouldn't have happened")
      }
    }
  }

  document.addEventListener("DOMContentLoaded", () => {
    const link = document.createElement("link")
    const linkSupportsPreload = DOMTokenListSupports(link.relList, "preload")

    if (linkSupportsPreload) {
      chunks.forEach(entry => {
        const node = link.cloneNode()

        node.rel = "preload"
        node.as = "script"
        node.href = entry

        return document.head.appendChild(node)
      })
    }
  })
}

module.exports = preloadChunks
