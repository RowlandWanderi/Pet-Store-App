import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Pets from "./pages/Pets"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import Single_pet from "./pages/Single_pet"

import UserProvider from "./context/UserContext"

function App() {
  return (
    <BrowserRouter>
    <UserProvider>
      <ReviewProvider>
        <PetStoreProvider>
          <PetProvider>
            <Routes>
              <Route path="/" element={<Layout />}>
                <Route index element={<Home />} />
                <Route path="login" element ={<Login />} />
                <Route path="" element ={<Pets />} />
                <Route path="" element ={<Profile />} />
                <Route path="register" element ={<Register />} />
                <Route path="" element ={<Single_pet />} />
              </Route>
            </Routes>
          </PetProvider>
        </PetStoreProvider>
      </ReviewProvider>
    </UserProvider>
    </BrowserRouter>
  );
}

export default App;
