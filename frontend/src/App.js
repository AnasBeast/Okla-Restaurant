import "./App.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Context Providers
import { AuthProvider } from "./context/AuthContext";
import { ToastProvider } from "./components/Toast";
import { ConfirmProvider } from "./components/ConfirmDialog";

// Components
import ProtectedRoute from "./components/ProtectedRoute";
import ScrollToTop from "./components/ScrollToTop";

// Public Screens
import Acceuil from "./screens/Acceuil";
import Menu from "./screens/Menu";
import Localisation from "./screens/Localisation";
import Contact from "./screens/Contact";

// Admin Screens
import Adminlogin from "./screens/adminlogin";
import AdminDashboard from "./screens/admin-dashboard";
import AdminProducts from "./screens/admin-products";
import AdminBlogs from "./screens/admin-blogs";

// Unified Form Components
import ProductForm from "./screens/ProductForm";
import GalleryImageForm from "./screens/GalleryImageForm";

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <ConfirmProvider>
          <Router>
            <ScrollToTop />
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<Acceuil />} />
              <Route path="/menu" element={<Menu />} />
              <Route path="/localisation" element={<Localisation />} />
              <Route path="/contact" element={<Contact />} />
              <Route path="/login" element={<Adminlogin />} />

              {/* Protected Admin Routes */}
              <Route
                path="/admin"
                element={
                  <ProtectedRoute>
                    <AdminDashboard />
                  </ProtectedRoute>
                }
              />

              {/* Products - Unified form for add/edit */}
              <Route
                path="/admin/produits"
                element={
                  <ProtectedRoute>
                    <AdminProducts />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/produit/nouveau"
                element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/produit/:id"
                element={
                  <ProtectedRoute>
                    <ProductForm />
                  </ProtectedRoute>
                }
              />
              {/* Backward compatibility redirects */}
              <Route
                path="/admin/ajouter-produit"
                element={<Navigate to="/admin/produit/nouveau" replace />}
              />
              <Route
                path="/admin/modifier-product/:id"
                element={<Navigate to="/admin/produit/:id" replace />}
              />

              {/* Gallery/Blogs - Unified form for add/edit */}
              <Route
                path="/admin/blogs"
                element={
                  <ProtectedRoute>
                    <AdminBlogs />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/galerie/nouveau"
                element={
                  <ProtectedRoute>
                    <GalleryImageForm />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/admin/galerie/:id"
                element={
                  <ProtectedRoute>
                    <GalleryImageForm />
                  </ProtectedRoute>
                }
              />
              {/* Backward compatibility redirects */}
              <Route
                path="/admin/ajouter-blog"
                element={<Navigate to="/admin/galerie/nouveau" replace />}
              />
              <Route
                path="/admin/modifier-blog/:id"
                element={<Navigate to="/admin/galerie/:id" replace />}
              />

              {/* Catch-all for 404 */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Router>
        </ConfirmProvider>
      </ToastProvider>
    </AuthProvider>
  );
}

export default App;
