import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Register from './pages/Register/Register'
import Login from './pages/login/Login'
import { AuthProvider } from './contexts/AuthContext'
import ListTheme from './components/theme/listtheme/ListTheme'
import FormTheme from './components/theme/formtheme/FormTheme'
import DeleteTheme from './components/theme/deletetheme/DeleteTheme'
import ListPosts from './components/posts/listposts/ListPosts'
import FormPosts from './components/posts/formposts/FormPosts'
import DeletePosts from './components/posts/deleteposts/DeletePosts'


function App() {
  return (
    <>
      <AuthProvider>
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
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
