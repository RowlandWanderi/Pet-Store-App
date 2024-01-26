import React, {useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { PetContext } from '../context/PetContext'

export default function SinglePet() {

  const {id} = useParams()
  const [singlePet, setSinglePet] = useState([])
  const {pets} = useContext(PetContext)

  useEffect(() => {
    const animal = pets.find((singlePet) =>{
      return singlePet.id === parseInt(id)
    })
    setSinglePet(animal)
  }, [id,pets])

  return (
    <div className='container'>
      {singlePet && (
        <div key={singlePet.id}>
          <h2 className="mb-3">{singlePet.name}</h2>
          <div className="row border-bottom p-3 bg-white mt-3">
            <div className="d-flex">
              <div className="col-md-4">
                <img
                  src={singlePet.image_url}
                  alt={singlePet.name}
                  className="img-fluid"
                  style={{ maxWidth: '100%', height: 'auto' }}
                />
              </div>
              <div className="col-md-8 card p-3 d-flex flex-column justify-content-between">
                <div className="mt-4">
                  <h3>Details:</h3>
                  <p>
                    <strong>Name:</strong> {singlePet.name}
                  </p>
                  <p>
                    <strong>Price:</strong> $ {singlePet.price}.00
                    {console.log(singlePet.price)}
                  </p>
                  <p>
                    <strong>Age:</strong> {singlePet.age} years
                  </p>
                  <p>
                    <strong>Gender:</strong> {singlePet.gender}
                  </p>
                  
                </div>
                <div>
                  <h2>Did You Know?</h2>
                  <p>
                  Having a pet can bring more than just joy and companionship into your life. The benefits of having a
                  furry friend extend to your overall well-being. Studies have revealed that interacting with pets, such
                  as cats or dogs, can lead to a reduction in stress levels by lowering cortisol, the stress hormone.
                  Additionally, the companionship of pets has been linked to lower blood pressure, contributing to
                  better cardiovascular health. Spending quality time with pets releases endorphins, those "feel-good"
                  hormones, which can significantly improve mood and combat feelings of loneliness. Moreover, owning a
                  pet, especially a dog, encourages physical activity through activities like walking or playing,
                  promoting a more active lifestyle. Beyond the physical advantages, having a pet provides companionship
                  and social interaction, fostering a sense of community, while also offering emotional support that
                  can help alleviate symptoms of depression and anxiety. So, the next time you enjoy moments with your
                  pet, remember that you're not just gaining a friend – you're investing in your health and happiness.
                </p>

                </div>
               
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
