import PermissionAbility from "helpers/PermissionAbility";
import { PrivateRoute } from "helpers/PrivateRoute";
import Login from "pages/auth/Login";
import Dashboard from "pages/dashboard/Dashboard";
import Forbidden from "pages/Forbidden";
import AppLayout from "pages/layouts/AppLayout";
import NotFound from "pages/NotFound";
import Categories from "pages/category/Index";
import Attributes from "pages/attribute/Index";
import AttributeValue from "pages/attribute-value/Index";
import Products from "pages/product/Index";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/panel/*" element={<AppLayout />}>
            <Route
              path="dashboard"
              element={
                <PrivateRoute>
                  <Dashboard />
                </PrivateRoute>
              }
            />

            {/* category */}
            <Route
              path="categories"
              element={
                <PrivateRoute>
                  <Categories />
                </PrivateRoute>
              }
            />

            <Route
              path="attributes"
              element={
                <PrivateRoute>
                  <Attributes />
                </PrivateRoute>
              }
            />

            <Route
              path="attribute-value"
              element={
                <PrivateRoute>
                  <AttributeValue />
                </PrivateRoute>
              }
            />

            <Route
              path="products"
              element={
                <PrivateRoute>
                  <Products />
                </PrivateRoute>
              }
            />

            {/* company user sales end */}

            <Route path="403" element={<Forbidden />} />
            <Route path="*" element={<NotFound />} />
          </Route>

          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="/login" element={<Login />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
