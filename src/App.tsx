import "./App.css";
import "react-toastify/dist/ReactToastify.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Footer from "./components/footer/Footer";
import Navbar from "./components/navbar/Navbar";
import DeletePosts from "./components/posts/deleteposts/DeletePosts";
import FormPosts from "./components/posts/formposts/FormPosts";
import ListPosts from "./components/posts/listposts/ListPosts";
import DeleteTheme from "./components/theme/deletetheme/DeleteTheme";
import FormTheme from "./components/theme/formtheme/FormTheme";
import ListTheme from "./components/theme/listtheme/ListTheme";
import { AuthProvider } from "./contexts/AuthContext";
import Home from "./pages/home/Home";
import Login from "./pages/login/Login";
import Profile from "./pages/profile/Profile";
import Register from "./pages/Register/Register";

function App() {
  return (
    <>
      <AuthProvider>
        <ToastContainer />
        <BrowserRouter>
          <Navbar />
          <div className="min-h-[80vh]">
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/home" element={<Home />} />
              <Route path="/cadastro" element={<Register />} />
              <Route path="/temas" element={<ListTheme />} />
              <Route path="/cadastrartema" element={<FormTheme />} />
              <Route path="/editartema/:id" element={<FormTheme />} />
              <Route path="/deletartema/:id" element={<DeleteTheme />} />
              <Route path="/posts" element={<ListPosts />} />
              <Route path="/cadastarposts" element={<FormPosts />} />
              <Route path="/editarpost/:id" element={<FormPosts />} />
              <Route path="/deletarpost/:id" element={<DeletePosts />} />
              <Route path="/perfil" element={<Profile />} />
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  );
}

export default App;
