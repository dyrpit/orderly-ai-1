import { Routes, Route } from 'react-router-dom';

import { MainLayout } from './layout/MainLayout';
import { CategoriesList } from './components/hero/CategoriesList';
import { ProductsList } from './components/productsList/ProductsList';
import { ProductCard } from './components/productCard/ProductCard';
import { Toaster } from 'react-hot-toast';
import { CategoryForm } from './components/newCategory/CategoryForm';
import { Form } from './components/form/LoginAndRegisterForm';
import TestRedux from './components/test-Redux-functions/testRedux';
import { AddNewProduct } from './components/addNewProduct/AddNewProduct';
import PageNotFound from './components/no-page/PageNotFound';

function App() {
  return (
    <MainLayout>
      <Toaster
        toastOptions={{
          style: {
            fontSize: '22px',
            border: '1px solid #713200',
            padding: '30px',
            color: '#713200',
          },
        }}
      />
      <Routes>
        <Route path='/' element={<CategoriesList />} />
        <Route path='/category/:categoryName' element={<ProductsList />} />
        <Route path='/category/:categoryName/:productName' element={<ProductCard />} />
        <Route path='/addCategory' element={<CategoryForm />} />
        <Route path='/auth' element={<Form />} />
        <Route path='addProduct' element={<AddNewProduct />} />
        <Route path='/test-redux' element={<TestRedux />} />
        <Route path='*' element={<PageNotFound />} />
      </Routes>
    </MainLayout>
  );
}

export default App;
