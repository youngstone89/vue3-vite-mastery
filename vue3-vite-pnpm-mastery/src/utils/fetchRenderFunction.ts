export async function fetchRenderFunction(url) {
  const response = await fetch(url)
  const code = await response.text()

  // Evaluate the code and get the function
  const renderFunc = eval(`(${code})`)

  // Return the function directly
  return renderFunc
}
