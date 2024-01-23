import {createContext, useState, useEffect}  from 'react'

export const PetStoreContext = createContext()

export default function PetStoreProvider({children}) {

  const [petstores, setPetstores] = useState([])
  const[selectedPetstore, setSelectedPetstore] = useState(null)
  const [onChange , setOnChange] = useState(false)

  //fetch pet stores
  useEffect(()=>{
    fetch('/petstores')
    .then(res => res.json())
    .then(response =>{
        setPetstores(response)
      })
    },[onChange])

    //fetch pet store by ID
    const fetchPetStoreByID = (petstoreId) =>{
      fetch(`/petstores/${petstoreId}`)
      .then((res) => res.json())
      .then((response) => {
        setSelectedPetstore(response);
      });
    }

    //context data
    const contextData = {
      petstores,
      selectedPetstore,
      fetchPetStoreByID,
      onChange,
      setOnChange,
    }
  return (
    <PetStoreContext.Provider value={contextData}>
      {children}
    </PetStoreContext.Provider>
  )
}
