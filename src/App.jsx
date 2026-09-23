import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IntroPage from './pages/IntroPage'
import Home from './pages/Home'
import Main from './pages/Main'
import About from './pages/About'
import Shop from './pages/Shop'

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/main" element={<Main />} />
      <Route path="/about" element={<About />} />
      <Route path="/shop" element={<Shop />} />
    </Routes>
  </BrowserRouter>
}
