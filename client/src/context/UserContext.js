import {createContext, useState, useEffect} from "react"
import Swal from "sweetalert2"
import {useNavigate} from "react-router-dom"

export const UserContext = createContext();

export default function UserProvider({children}) 
{
    const [onchange, setOnchange] = useState(false)
    const [authToken, setAuthToken] = useState(()=> sessionStorage.getItem("authToken")? sessionStorage.getItem("authToken"): null )
    const [currentUser, setCurrentUser] = useState(null)
   
    console.log(authToken)

    const navigate = useNavigate()

    // add user
    function addUser(username, email, phone_number, password)
    {
        fetch("https://pet-haven-app.onrender.com/register",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, email, phone_number, password })

        }
        )
        .then(res => res.json())
        .then(response => {
            
            if (response.success)
            {
                navigate("/login")

                Swal.fire({
                position: "center",
                icon: "success",
                title: "Account created successfully!",
                showConfirmButton: false,
                timer: 1500
                });
                setOnchange(!onchange)
            }
            else{
                Swal.fire({
                    position: "center",
                    icon: "error",
                    title: response.error,
                    showConfirmButton: false,
                    timer: 1500
                    });
                    setOnchange(!onchange)
            }


        })
    }

        // Update user
        function updateUser(username,email,phone_number,profile_image_url)
        {
            fetch("https://pet-haven-app.onrender.com/users",{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify({username,email,phone_number, profile_image_url})
    
            }
            )
            .then(res => res.json())
            .then(response => {
                
                if (response.success)
                {  
                    Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Update successful!",
                    showConfirmButton: false,
                    timer: 1500
                    });
                    setOnchange(!onchange)
                }
                else{
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: response.error,
                        showConfirmButton: false,
                        timer: 1500
                        });
                        setOnchange(!onchange)
                }
    
    
            })
        }
    
    // login user
    // login user
function login(username, password) {
    fetch("https://pet-haven-app.onrender.com/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.access_token) {
          sessionStorage.setItem("authToken", response.access_token);
          setAuthToken(response.access_token, () => {
            setOnchange(!onchange);
          });
  
          navigate("/");
  
          Swal.fire({
            position: "center",
            icon: "success",
            title: "Login successful!",
            showConfirmButton: false,
            timer: 1500,
          });
        } else {
          Swal.fire({
            position: "center",
            icon: "error",
            title: response.error,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      });
  }

        // DELETE  user account
        function deleteAccount()
        {
            fetch("https://pet-haven-app.onrender.com/users",{
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken && authToken}`
                },
            }
            )
            .then(res => res.json())
            .then(response => {
                if (response.success)
                {
        
                    navigate("/register")

                    Swal.fire({
                    position: "center",
                    icon: "success",
                    title: "Account deleted!",
                    showConfirmButton: false,
                    timer: 1500
                    });
    
                    setOnchange(!onchange)
                }
                else{
                    Swal.fire({
                        position: "center",
                        icon: "error",
                        title: response.error,
                        showConfirmButton: false,
                        timer: 1500
                        });
                }
    
    
    
            })
        }

    // Logout user
    function logout()
    {
        sessionStorage.removeItem("authToken");
        setCurrentUser(null)
        navigate("/login")

        Swal.fire({
            position: "center",
            icon: "success",
            title: "Logout successful!",
            showConfirmButton: false,
            timer: 1000
            });

    }
    
    // Get Authenticated user
    useEffect(() => {
        if (authToken) {
            fetch("https://pet-haven-app.onrender.com/authenticated_user", {
                method: "GET",
                headers: {
                    Accept: "application/json",
                    Authorization: `Bearer ${authToken}`
                }
            })
                .then(res => res.json())
                .then(response => {
                    if (response.error) {
                        // Handle the case when the response contains an "error" key
                        setCurrentUser(null);
                    } else {
                        setCurrentUser(response);
                    }
                })
                .catch(error => {
                    console.error("Error fetching authenticated user:", error);
                
                });
        }
    }, [authToken, onchange]);

    console.log("current user", currentUser)


    // Reset user password
function resetPassword(email, newPassword) {
    fetch('https://pet-haven-app.onrender.com/reset_password', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email, new_password: newPassword }),
    })
      .then((res) => res.json())
      .then((response) => {
        if (response.success) {
            navigate("/login")
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: 'Password reset successful!!',
            showConfirmButton: false,
            timer: 2000,
          });
          setOnchange(!onchange);
        } else if(response.error){
            navigate('/login')
          Swal.fire({
            position: 'center',
            icon: 'error',
            title: response.error,
            showConfirmButton: false,
            timer: 2000,
          });
          setOnchange(!onchange);
        }
      });
  }
  


      const contextData = {
        addUser,
        login,
        updateUser,
        logout,
        currentUser,
        deleteAccount,
        resetPassword,
      };

  return (
    <UserContext.Provider value={contextData} >
       {children}
    </UserContext.Provider>
    
  )
}
