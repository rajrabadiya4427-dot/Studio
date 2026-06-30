import React, { useRef, useState, useEffect } from 'react'
import Home from './pages/Home'
import Loader from './components/Loader'
import bgAudio from './assets/video/bg-video.mp4'
import { Navigate, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import Contact from './pages/Contact'
import Story from './pages/Story'
import Manga from './pages/Manga'
import Games from './pages/Games'
import Profile from './pages/Profile'
import MyProducts from './pages/MyProducts'
import ProductDetails from './pages/ProductDetails'
import { useAuthStore } from './store/useAuthstore.js'
import Login from './pages/Login'
import { Toaster } from 'react-hot-toast'


const App = () => {

  const [entered, setEntered] = useState(false)
  const [showEnter, setShowEnter] = useState(false);
  const [isAudioOn, setisAudioOn] = useState(false);
  const { authUser, isCheckingAuth, checkAuth } = useAuthStore();


  useEffect(() => {
    checkAuth();
  }, [checkAuth])

  const videoRef = useRef(null)
  const audioRef = useRef(new Audio(bgAudio))

  // If user logs out, reset the Loader splash screen so they see it again next time
  useEffect(() => {
    if (!authUser) {
      setEntered(false);
      setShowEnter(false);
      setisAudioOn(false);
      if (audioRef.current) {
        audioRef.current.pause();
      }
    }
  }, [authUser]);

  if (isCheckingAuth) {
    return (
      <div className="fixed inset-0 flex items-center justify-center bg-black text-white z-[99999]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-emerald-400"></div>
      </div>
    );
  }

  return (
    <>
      <Toaster position="top-center" reverseOrder={false} />

      {!authUser ? (
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      ) : (
        <>
          {!entered && (
            <Loader
              showEnter={showEnter}
              setShowEnter={setShowEnter}
              setEntered={setEntered}
              videoRef={videoRef}
              audioRef={audioRef}
              setisAudioOn={setisAudioOn}
            />
          )}

          {entered && (
            <>
              <Navbar
                audioRef={audioRef}
                isAudioOn={isAudioOn}
                setisAudioOn={setisAudioOn}
              />
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/games" element={<Games />} />
                <Route path="/manga" element={<Manga />} />
                <Route path="/story" element={<Story />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/my-products" element={<MyProducts />} />
                <Route path="/product/:id" element={<ProductDetails />} />
                <Route path="/login" element={<Navigate to="/" replace />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
            </>
          )}
        </>
      )}
    </>
  )
}

export default App