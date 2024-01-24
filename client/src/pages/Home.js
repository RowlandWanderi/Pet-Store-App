import React,  { useContext } from 'react'
import { Link } from 'react-router-dom';
import {PetStoreContext} from '../context/PetStoreContext'
import image from '../images/pet-shop-removebg-preview.png'

import images from '../images/Pet-ShopBanner.webp'

export default function Home() {

  const { petstores } = useContext(PetStoreContext)


  const calculateAverageRating = (reviews) => {
    if (reviews.length === 0) {
      return 0; // Return 0 if there are no reviews
    }
  
    const totalRating = reviews.reduce((sum, review) => sum + review.Rating, 0); // Update this line
    const averageRating = totalRating / reviews.length;
  
    // Round the averageRating to 2 decimal places
    const roundedAverageRating = Math.round(averageRating * 100) / 100;
  
    return roundedAverageRating;
  };


  return (
    <div>

      <div>
        <h1 className="text-center">WELCOME TO PET HAVEN!</h1>
        <h2 className="text-center">YOUR NUMBER ONE STORE FOR ALL YOUR FLUFFLY PALS!</h2>
    </div>

    <div className="card text-bg-dark" >
        <img src={images} className="card-img" alt="Loading Banner"/>
    </div>

    <div className='container bg-info me-3'>
      <h2 className=' text-center my-3'>Pet stores</h2>

      {petstores &&
        petstores.map((petstore) => (
          <div key={petstore.id} className='row border-bottom p-3 bg-white mt-3'>
            <div className='col-md-3 d-flex flex-column'>
              <img src={image} alt="loading"/>
            </div>
            <div className='col-md-3 d-flex flex-column mt-5 '>
              <h3>{petstore.name}</h3>
              <p>Location: {petstore.location}</p>
              <p>Store Average Review Ratings: {calculateAverageRating(petstore.reviews)}/5</p>
            </div>

            <div className='col-md-3 mt-5'>
              <button className='btn btn-light'>
              <Link to={`/pets/${petstore.id}`} className='fw-bold'>
                View Store
              </Link>
              </button>
              
            </div>

          </div>
        ))}
    </div>

    </div>
  )
}
