import 'bootstrap/dist/css/bootstrap.min.css'
import NavBar from './components/NavBar'
import Authors from './components/Authors';
import { Navigate, Route, Routes } from 'react-router-dom';
import NewAuthor from './components/NewAuthor';
import AllAuthors from './components/AllAuthors';
import OneAuthor from './components/OneAuthor';
import EditAuthor from './components/EditAuthor';


function App() {
  return (
    <div>
      <NavBar />
      <div className="container">
        <Routes> 
          <Route path='/' element={<Navigate to='/authors' />} />
            <Route path = '/authors' element={<Authors />} > {/* these are nested routes // this is the parent route and we need an outlet in parent component to outlet */}
              <Route index element={<AllAuthors />} />
              <Route path='new' element={<NewAuthor />} />
              <Route path=':id' element={<OneAuthor />} />
              <Route path=':id/edit' element={<EditAuthor />} />
            </ Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
