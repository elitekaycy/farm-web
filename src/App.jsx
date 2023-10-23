import { Route, Routes } from 'react-router-dom'
import { FarmerPage, TypePage, ProductPage, HomePage, Categories, CategoriesType, ProductDetails } from './pages'
import FarmerProfile from './pages/FarmerProfile'


function App() {

  return (
    <>
      <Routes>
        <Route path="/" element={<HomePage />} exact />
        <Route path="/product/:typeId/:farmerId/:id" element={<ProductDetails />} />
        <Route path='/categories/:type/:id' element={<CategoriesType />} />
        <Route path="/categories" element={<Categories />} exact/>
        <Route path='/admin/farmer' element={<FarmerPage />} />
        <Route path='/admin/type' element={<TypePage />} />
        <Route path='/admin/product' element={<ProductPage />} />
        <Route path='/farmers' element={<FarmerProfile />} />

      </Routes>
    </>
  )
}

export default App
