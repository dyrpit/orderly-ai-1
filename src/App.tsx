import { Routes, Route } from 'react-router-dom';

import { MainLayout } from './layout/MainLayout';
import { CategoriesList } from './components/hero/CategoriesList';
import { ProductsList } from './components/productsList/ProductsList';
import { ProductCard } from './components/productCard/ProductCard';
import { Form } from './components/form/LoginAndRegisterForm';

function App() {
  return (
    <MainLayout>
      <Routes>
        <Route path='/' element={<CategoriesList />} />
        <Route path='/:categoryName' element={<ProductsList />} />
        <Route path='/:categoryName/:productName' element={<ProductCard />} />
        <Route path='/auth' element={<Form />} />
      </Routes>
    </MainLayout>
  );
}
export default App;
