import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Footer from './components/footer/Footer'
import Navbar from './components/navbar/Navbar'
import Home from './pages/home/Home'
import Register from './pages/Register/Register'
import Login from './pages/login/Login'
import { AuthProvider } from './contexts/AuthContext'
import ListTheme from './components/theme/listTheme/ListTheme'
import FormTheme from './components/theme/formtheme/FormTheme'
import DeleteTheme from './components/theme/deletetheme/DeleteTheme'

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
            </Routes>
          </div>
          <Footer />
        </BrowserRouter>
      </AuthProvider>
    </>
  )
}

export default App
