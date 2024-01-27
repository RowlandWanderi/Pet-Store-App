import React, { createContext, useEffect, useState } from 'react';

export const PetContext = createContext();

export default function PetProvider({ children }) {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);
    const [onChange , setOnChange] = useState(false)


    useEffect(() => {
        console.log('Fetching pets...');
        fetch('https://pet-haven-app.onrender.com/pets')
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched pets:', data);
                setPets(data);
            })
            .catch((error) => console.error('Error fetching pets:', error));
    }, [onChange]);

    const fetchPetById = (id) => {
        console.log(`Fetching pet with ID ${id}...`);
        fetch(`https://pet-haven-app.onrender.com/pets/${id}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`HTTP error! Status: ${response.status}`);
                }
                return response.json();
            })
            .then((data) => {
                console.log(`Fetched pet with ID ${id}:`, data);
                setSelectedPet(data);
            })
            .catch((error) => console.error(`Error fetching pet with ID ${id}:`, error));
    };
    const contextData = {
        pets,
        selectedPet,
        fetchPetById,
        onChange,
        setOnChange,
    }

    return (
        <PetContext.Provider value={contextData}>
            {children}
        </PetContext.Provider>
    );
}
