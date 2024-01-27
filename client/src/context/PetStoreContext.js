import {createContext, useState, useEffect}  from 'react'

export const PetStoreContext = createContext()

export default function PetStoreProvider({children}) {

  const [petstores, setPetstores] = useState([])
  
  const [onChange , setOnChange] = useState(false)

  //fetch pet stores
  useEffect(()=>{
    fetch('https://pet-haven-app.onrender.com/petstores')
    .then(res => res.json())
    .then(response =>{
        setPetstores(response)
      })
    },[onChange])

    

    //context data
    const contextData = {
      petstores,
      onChange,
      setOnChange,
    }
  return (
    <PetStoreContext.Provider value={contextData}>
      {children}
    </PetStoreContext.Provider>
  )
}
