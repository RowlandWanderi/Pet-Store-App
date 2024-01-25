import {createContext, useState, useEffect} from 'react'
import swal from "sweetalert2"
import {useNavigate} from "react-router-dom"

export const ReviewContext = createContext()

export default function ReviewProvider({children}) {

  const [reviews, setReview] = useState([])
  const [onChange, setOnchange] = useState(false)

  const authToken = sessionStorage.getItem("authToken")

  const navigate = useNavigate()

  // fetch reviews
  useEffect(() => {
    fetch("/reviews")
      .then((res) => res.json())
      .then((response) => {
        setReview(response);
      });
    }, []);



//Create a new review for a pet store
    function addReview(Rating,Comments,pet_store_id){
      fetch("/reviews", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken && authToken}`
        },
        body: JSON.stringify({
          Rating: parseInt(Rating),
          Comments,
          pet_store_id: parseInt(pet_store_id),
        }),

      })
        .then((res) => res.json())
        .then(() => {
          navigate("/")
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
        "Authorization": `Bearer ${authToken && authToken}`
      },
      body: JSON.stringify({ Rating: newRating, Comments: newComments }),
    })
      .then((res) => res.json())
      .then(() => {
        // Display success message

        navigate("/")
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

    }




 // Delete a review for a pet store
  function deleteReview(reviewId) {
  // Display a confirmation dialog using Swal.fire
  swal.fire({
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
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${authToken && authToken}`
        },
      })
        .then((res) => res.json())
        .then((response) => {
          if(response.success){ 

          navigate("/")
          // Display success message
          swal.fire({
            title: 'Deleted!',
            text: 'Your review has been deleted.',
            icon: 'success',
          });

          // After deleting a review, trigger a change to refresh the list
          setOnchange(!onChange);
        }
        else if(response.error){
          swal.fire({
            position: "top-end",
            icon: "error",
            title: response.error,
            showConfirmButton: false,
            timer: 1500
            });

            setOnchange(!onchange)
        }
        else{
          swal.fire({
              position: "top-end",
              icon: "success",
              title: "Something went wrong!",
              showConfirmButton: false,
              timer: 1500
              });
  
              setOnchange(!onchange)
      }
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
    

  }
  
return (
    <ReviewContext.Provider value={contextData}>
      {children}
    </ReviewContext.Provider>
  )
}