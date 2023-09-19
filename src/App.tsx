import { Routes, Route } from 'react-router-dom';

import { MainLayout } from './layout/MainLayout';
import { CategoriesList } from './components/hero/CategoriesList';
import { ProductsList } from './components/productsList/ProductsList';
import { ProductCard } from './components/productCard/ProductCard';
import { Toaster } from 'react-hot-toast';
import { CategoryForm } from './components/newCategory/CategoryForm';
import { Form } from './components/form/LoginAndRegisterForm';

function App() {
  return (
    <MainLayout>
      <Toaster/>
      <Routes>
        <Route path='/' element={<CategoriesList />} />
        <Route path='/:categoryName' element={<ProductsList />} />
        <Route path='/:categoryName/:productName' element={<ProductCard />} />
        <Route path='/addCategory' element={<CategoryForm />} />
        <Route path='/auth' element={<Form />} />
      </Routes>
    </MainLayout>
  );
}
export default App;
