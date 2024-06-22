import './App.css';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import Acceuil from './screens/Acceuil';
import Menu from './screens/Menu';
import AdminAjouterProduit from './screens/admin-ajout-produit';
import AdminDashboard from './screens/admin-dashboard';
import AdminModifierProduit from './screens/admin-modifier-produit';
import Adminlogin from './screens/adminlogin';

function App() {
  return (
    <Router>
      <Routes>
        
        <Route path="/" element={<Acceuil/>}/>
        <Route path="/menu" element={<Menu/>}/>
        
      </Routes>
      <Routes>
        <Route path="/login" element={<Adminlogin/>}/>
        <Route path="/admin" element={<AdminDashboard/>}/>
        <Route path="/admin/ajouter" element={<AdminAjouterProduit/>}/>
        <Route path="/admin/modifier/:id" element={<AdminModifierProduit/>}/>
      </Routes>
    </Router>
      
    
  );
}

export default App;
