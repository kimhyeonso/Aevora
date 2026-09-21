import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IntroPage from './pages/IntroPage'
import Home from './pages/Home'

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/home" element={<Home />} />
    </Routes>
  </BrowserRouter>
}
