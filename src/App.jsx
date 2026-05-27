import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Nav from './components/Nav'
import Registry from './pages/Registry'
import CarRecord from './pages/CarRecord'
import Design from './pages/Design'
import Specs from './pages/Specs'
import Racing from './pages/Racing'
import Concours from './pages/Concours'
import ForSale from './pages/ForSale'
import Contact from './pages/Contact'

function App() {
  return (
    <BrowserRouter>
      <Nav />
      <Routes>
        <Route path="/" element={<Registry />} />
        <Route path="/registry/:slug" element={<CarRecord />} />
        <Route path="/design" element={<Design />} />
        <Route path="/specs" element={<Specs />} />
        <Route path="/racing" element={<Racing />} />
        <Route path="/concours" element={<Concours />} />
        <Route path="/for-sale" element={<ForSale />} />
        <Route path="/contact" element={<Contact />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
