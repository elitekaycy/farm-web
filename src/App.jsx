import { Route, Routes } from 'react-router-dom'
import { FarmerPage, TypePage, ProductPage, HomePage, Categories, CategoriesType, ProductDetails } from './pages'
import FarmerProfile from './pages/FarmerProfile'
import ProtectedRoute from './components/ProtectedRoute'
import Signup from './pages/auth/Signup'
import Login from './pages/auth/Login'
import Admin from './pages/admin/Admin'
import Cart from './pages/Cart'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/signup" element={<ProtectedRoute><Signup /></ProtectedRoute>} />
        <Route path="/login" element={<ProtectedRoute><Login /></ProtectedRoute>} />
        <Route path="/product/:typeId/:farmerId/:id" element={<ProductDetails />} />
        <Route path='/categories/:type/:id' element={<CategoriesType />} />
        <Route path="/categories" element={<ProtectedRoute><Categories /></ProtectedRoute>} exact/>
        <Route path='/user/cart' element={<ProtectedRoute><Cart /></ProtectedRoute>} />
        <Route path='/admin/*' element={<Admin />} exact/>
        {/* <Route path='/admin/farmer' element={<FarmerPage />} />
        <Route path='/admin/type' element={<TypePage />} />
        <Route path='/admin/product' element={<ProductPage />} /> */}
        <Route path='/farmers' element={<FarmerProfile />} />

      </Routes>
    </>
  )
}

export default App
