import { Route, BrowserRouter, Routes } from 'react-router-dom';
import Main from './pages/Main';
import NotFoundPage from './pages/NotFoundPage';
import PostInfo from './pages/PostInfo';
import ErrorMessage from './components/ErrorMessage';

function App() {
  return (<>
    <ErrorMessage />
    <BrowserRouter>
      <Routes>
        <Route path='*' element={<NotFoundPage />} />
        <Route path='/' element={<Main />} />
        <Route path='/post/:id' element={<PostInfo />} />
      </Routes>
    </BrowserRouter>
  </>
  );
}

export default App;
