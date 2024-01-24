import React, { createContext, useEffect, useState } from 'react';

const PetContext = createContext();

export default function PetProvider({ children }) {
    const [pets, setPets] = useState([]);
    const [selectedPet, setSelectedPet] = useState(null);

    useEffect(() => {
        console.log('Fetching pets...');
        fetch('/pets')
            .then((response) => response.json())
            .then((data) => {
                console.log('Fetched pets:', data);
                setPets(data);
            })
            .catch((error) => console.error('Error fetching pets:', error));
    }, []);

    const fetchPetById = (id) => {
        console.log(`Fetching pet with ID ${id}...`);
        fetch(`/pets/${id}`)
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

    return (
        <PetContext.Provider value={{ pets, selectedPet, fetchPetById }}>
            {children}
        </PetContext.Provider>
    );
}
