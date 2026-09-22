import { BrowserRouter, Routes, Route } from 'react-router-dom'
import IntroPage from './pages/IntroPage'
import Home from './pages/Home'
import Main from './pages/Main'

export default function App() {
  return <BrowserRouter>
    <Routes>
      <Route path="/" element={<IntroPage />} />
      <Route path="/home" element={<Home />} />
      <Route path="/main" element={<Main />} />
    </Routes>
  </BrowserRouter>
}
