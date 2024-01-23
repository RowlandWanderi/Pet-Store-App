import {createContext, useState, useEffect} from 'react'

export const ReviewContext = createContext()

export default function ReviewProvider({children}) {

  const [reviews, setReview] = useState([])
  const [onChange, setOnchange] = useState(false)

  // fetch reviews
  useEffect(() => {
    fetch("/reviews")
      .then((res) => res.json())
      .then((response) => {
        setRestaurantPizzas(response);
      });
    }, [onchange]);

    //Create a new review for a pet store
    function addReview(Rating,Comments,user_id,pet_store_id){
      fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({Rating,Comments,user_id,pet_store_id}),
      })
        .then((res) => res.json())
        .then(() => {

          swal.fire({
            position: "top-end",
            icon: "success",
            title: "Review added successfully",
            showConfirmButton: false,
            timer: 1500
            });

          // After adding a new review, trigger a change to refresh the list
          setOnchange(!onChange);
        });
    }

    // Update a review for a pet store
  function updateReview(reviewId, newRating, newComments) {
    fetch(`/reviews/${reviewId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ Rating: newRating, Comments: newComments }),
    })
      .then((res) => res.json())
      .then(() => {
        // Display success message
        swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Review updated successfully',
          showConfirmButton: false,
          timer: 1500,
        });

        // After updating a review, trigger a change to refresh the list
        setOnchange(!onChange);
      });



      // Delete a review for a pet store
  function deleteReview(reviewId) {
  // Display a confirmation dialog using Swal.fire
  Swal.fire({
    title: 'Are you sure?',
    text: "You won't be able to revert this!",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Yes, delete it!',
  }).then((result) => {
    if (result.isConfirmed) {
      // If user confirms, proceed to delete the review
      fetch(`/reviews/${reviewId}`, {
        method: 'DELETE',
      })
        .then((res) => res.json())
        .then(() => {
          // Display success message
          Swal.fire({
            title: 'Deleted!',
            text: 'Your review has been deleted.',
            icon: 'success',
          });

          // After deleting a review, trigger a change to refresh the list
          setOnchange(!onChange);
        });
    }
  });
}

  const contextData = {
    setOnchange,
    onChange,
    reviews,
    addReview,
    updateReview,
    deleteReview,
    updateReview

  }
  }
  return (
    <ReviewContext.Provider value={contextData}>
      {children}
    </ReviewContext.Provider>
  )
}
