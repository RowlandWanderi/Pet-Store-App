import {createContext, useState, useEffect} from "react"
import Swal from "sweetalert2"
import {useNavigate} from "react-router-dom"

export const UserContext = createContext();

export default function UserProvider({children}) 
{
    const [onchange, setOnchange] = useState(false)
    const [authToken, setAuthToken] = useState(()=> sessionStorage.getItem("authToken")? sessionStorage.getItem("authToken"): null )
    const [currentUser, setCurrentUser] = useState(null)

    const navigate = useNavigate()

    // add user
    function addUser(username, email, phone_number, password)
    {
        fetch("/register",{
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
        function updateUser(username,email,phone_number)
        {
            fetch("/users",{
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${authToken}`
                },
                body: JSON.stringify({username,email,phone_number })
    
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
    function login(username,password)
    {
        fetch("/login",{
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({username, password})

        }
        )
        .then(res => res.json())
        .then(response => {
            
            if (response.access_token)
            {
                sessionStorage.setItem("authToken", response.access_token);
                setAuthToken(response.access_token)

                navigate("/petstores")
                Swal.fire({
                position: "center",
                icon: "success",
                title: "Login successful!",
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

        // DELETE  user account
        function deleteAccount()
        {
            fetch("/users",{
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
    useEffect(()=>{
        if(authToken)
        {
            fetch("/authenticated_user",{
            method: "GET",
            headers: {
                Accept: "application/json",
                Authorization: `Bearer ${authToken}`
            }
            })
            .then(res => res.json())
            .then(response => {
                if(response.email || response.username){
                    setCurrentUser(response)
                }
                else{
                    setCurrentUser(null)
                }
            })
        }
    

    }, [authToken, onchange])

    console.log("current user", currentUser)


    const contextData = {
        addUser,
        login,
        updateUser,
        logout,
        currentUser,
        deleteAccount
    }

  return (
    <UserContext.Provider value={contextData} >
       {children}
    </UserContext.Provider>
    <UserContext.Provider value={contextData} >
       {children}
    </UserContext.Provider>
  )
}