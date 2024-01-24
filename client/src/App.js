import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login"
import Pets from "./pages/Pets"
import Profile from "./pages/Profile"
import Register from "./pages/Register"
import SinglePet from "./pages/SinglePet"
import Layout from "./layout/Layout"
import NoPage from "./pages/NoPage";
import UserProvider from "./context/UserContext"
import ReviewProvider from "./context/ReviewContext"
import PetStoreProvider from "./context/PetStoreContext";
import PetProvider from "./context/PetContext";

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
                <Route path="/login" element ={<Login />} />
                <Route path="/pets/:id" element ={<Pets />} />
                <Route path="/profile" element ={<Profile />} />
                <Route path="/register" element ={<Register />} />
                <Route path="/singlepet/:id" element ={<SinglePet />} />
                <Route path="*" element={<NoPage />} />
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
