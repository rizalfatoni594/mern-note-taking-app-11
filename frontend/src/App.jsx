import { Route, Routes } from 'react-router';
import HomePage from './pages/HomePage.jsx';
import CreatePage from './pages/CreatePage.jsx';
import NoteDetailPage from './pages/NoteDetailPage.jsx';

export default function App() {
  return (
    <div
      data-theme='light'
      className='min-h-screen bg-primary/5 text-base-content'
    >
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        {/* hmmm */}
        <Route path='/note/:id' element={<NoteDetailPage />} />
      </Routes>
    </div>
  );
}
