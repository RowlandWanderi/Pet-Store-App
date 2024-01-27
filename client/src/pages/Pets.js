import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { PetStoreContext } from '../context/PetStoreContext';
import { ReviewContext } from '../context/ReviewContext';
import { UserContext } from '../context/UserContext';

export default function Pets() {
  const { id } = useParams();

  const [petstore, setPetStore] = useState([]);
  const [Rating, setRating] = useState('');
  const [Comments, setComments] = useState('');
  const [selectedPetstore, setSelectedPetstore] = useState('');

  

  const [newRating, setNewRating] = useState('');
  const [newComments, setNewComments] = useState('');
  const [reviewID, setReviewID] = useState('');
  


  const { petstores } = useContext(PetStoreContext);
  const { currentUser } = useContext(UserContext);
  const { addReview, deleteReview, updateReview} = useContext(ReviewContext);

  useEffect(() => {
    const store = petstores.find((petstore) => {
      return petstore.id === parseInt(id);
    });
    setPetStore(store);
  }, [id, petstores]);

  useEffect(() => {
    if (petstore.id) {
      fetch(`https://pet-haven-app.onrender.com/petstores/${petstore.id}`)
        .then((res) => res.json())
        .then((response) => {
          setSelectedPetstore(response);
        });
    }
  }, [petstore.id]);

  const handleSubmit = (e) => {
    e.preventDefault();

    addReview(Rating, Comments, selectedPetstore.id);

    // clear form
    setRating('');
    setComments('');
  };

  const handleUpdate = (e) => {
    e.preventDefault()

    updateReview(reviewID,newRating,newComments,)

    setNewRating('')
    setNewComments('')
    
  }

  return (
    <div className='container ms-2'>
      <div className="container">
        <h1 className='text-center mt-5'>{selectedPetstore.name} Pet Store</h1>
        <h2 className='text-center mt-5'>Pets Available</h2>
      </div>
      
      <div className='container row'>
        {selectedPetstore &&
          selectedPetstore.pets &&
          selectedPetstore.pets.map((pet) => (
            <div className=' ui card col-md-3 mb-3' key={pet.id}>
              <img src={pet && pet.image_url} alt='Loading' className='img-fluid' />
              <div className='card-body'>
                <h5 className='card-title'>Name: {pet.name}</h5>
                <p className='card-text'>Price: $ &nbsp;{pet.price}.00</p>
                <Link to={`/singlepet/${pet.id}`}>
                  <button type='button' className='btn btn-primary'>
                    View Pet
                  </button>
                </Link>
              </div>
            </div>
          ))}
      </div>

      {/* Leave a review form */}
      <div className='mt-4'>
        <h2 className='text-center mt-5'>Leave a Review</h2>
        <form onSubmit={handleSubmit} className="mx-auto">
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Rating</label>
            <div className='col-sm-10'>
              <input
                type='number'
                value={Rating}
                onChange={(e) => setRating(e.target.value)}
                className='form-control'
                required
                placeholder='Type here'
              />
            </div>
          </div>
          <div className='form-group row'>
            <label className='col-sm-2 col-form-label'>Comments</label>
            <div className='col-sm-10'>
              <textarea
                
                value={Comments}
                onChange={(e) => setComments(e.target.value)}
                className='form-control'
                rows={5}
                required
                placeholder='Type here'
              />
            </div>
          </div>
          <div className='form-group row'>
            <div className='col-sm-10 mt-3 text-cente'>
              {currentUser ? (
                <button type='submit' className='btn btn-success'>
                  Submit Review
                </button>
              ) : (
                <p className='text-secondary'>Login to submit a Review</p>
              )}
            </div>
          </div>
        </form>
      </div>

      {/* Reviews Section */}
      <div className='mt-5'>
        <h2 className='text-center'>Store Reviews</h2>
        <div className='container'>
          {selectedPetstore &&
            selectedPetstore.reviews &&
            selectedPetstore.reviews.map((review) => (
              <div key={review.id} className='card mb-3'>
                <div className='card-body'>
                  <h5 className='card-title'>Rating: {review.Rating}</h5>
                  <p className='card-text'>Comments: {review.Comments}</p>

                  {review && review.user && (
                    <div>
                      <span className='fw-bold'>
                        <p className='card-text'>Reviewed by: {review.user.username}</p>
                        <p className='card-text'>User email: {review.user.email}</p>
                      </span>
                      
                      {console.log("Review",review)}
                      {currentUser && currentUser.id === review.user.id && (
                        <div className='container'>
                          <p className='mt-2'>
                            <button className="btn btn-primary btn-sm" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
                              Edit
                            </button>
                          </p>
                          <button
                          onClick={() => deleteReview(review.id)}
                            type='button'
                            className='btn btn-danger btn-sm'
                          >
                            Delete Review
                          </button>
                          <div className="collapse " id="collapseExample">
                          <form onSubmit={handleUpdate} className="mx-auto">
                            <div className='form-group row'>
                              <label className='col-sm-2 col-form-label'>Rating</label>
                              <div className='col-sm-10'>
                                <input
                                  type='number'
                                  value={newRating}
                                  onChange={(e) => setNewRating(e.target.value)}
                                  className='form-control'
                                  required
                                  placeholder='Type here'
                                />
                              </div>
                            </div>
                            <div className='form-group row'>
                              <label className='col-sm-2 col-form-label'>Comments</label>
                              <div className='col-sm-10'>
                                <textarea
                                  
                                  value={newComments}
                                  onChange={(e) => setNewComments(e.target.value)}
                                  className='form-control'
                                  rows={5}
                                  required
                                  placeholder='Type here'
                                />
                              </div>
                            </div>
                            <div className='form-group row'>
                              <div className='col-sm-10 mt-3 text-cente'>
                                {currentUser ? (
                                  <button 
                                  onClick={() => setReviewID(review.id)}
                                  type='submit' className='btn btn-success'>
                                    Update Review
                                  </button>
                                ) : (
                                  <p className='text-secondary'>Login to submit a Review</p>
                                )}
                              </div>
                            </div>
                          </form>
                          </div>
                        </div>
                        
                        
                      )}
                    </div>
                  )}
                </div>
              </div>
            ))}
        </div>
      </div>

      {/* Pet store information */}
      <div className='d-flex flex-column '>
        <h3 className='text-center'>PetStore Information:</h3>
        <hr></hr>
        <h4 className='text-center'>
          See a fluffy friend you like? You can contact the store at:
        </h4>
        <p className='text-center'>
          <strong>Phone Number:</strong> {selectedPetstore.phone_number}
        </p>
        <p className='text-center'>
          <strong>Email:</strong> {selectedPetstore.email}
        </p>
      </div>
    </div>
  );
}