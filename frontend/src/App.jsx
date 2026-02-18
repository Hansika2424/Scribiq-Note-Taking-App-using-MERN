import { Route, Routes, Navigate } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import NoteDetailPage from './pages/NoteDetailPage'
import NamePage from './pages/NamePage'

const ProtectedRoute = ({ children }) => {
  const name = localStorage.getItem("username");
  return name ? children : <Navigate to="/name" />;
};

const App = () => {
  return (
    <div className="min-h-screen" data-theme="dracula">
      <Routes>
        <Route path='/name' element={<NamePage />} />
        <Route path='/' element={<ProtectedRoute><HomePage /></ProtectedRoute>} />
        <Route path='/create' element={<ProtectedRoute><CreatePage /></ProtectedRoute>} />
        <Route path='/note/:id' element={<ProtectedRoute><NoteDetailPage /></ProtectedRoute>} />
      </Routes>
    </div>
  )
}

export default App