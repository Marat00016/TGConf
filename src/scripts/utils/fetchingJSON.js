export default async function fetchingJson(path) {
  try {
    if(!path) return
    
    const response = await fetch(path)
    return response.json()
  } catch (error) {
    console.error("Error while fetching data", error)
  }
}
