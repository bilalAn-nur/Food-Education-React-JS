import { Route, Routes } from "react-router-dom";
import { Dashboard, Auth } from "./Dashboard/layouts";
import SignInForm from "./Auth/forms/SigninForm";
import AuthLayout from "./Auth/AuthLayout";
import SignupForm from "./Auth/forms/SignUpForm";
import PublicLayout from "./Public/components/PublicLayout";
import Home from "./Public/content/Home";
import Diet from "./Public/content/Diet";
import Lifestyle from "./Public/content/Lifestyle";
import Disease from "./Public/content/Disease";
import PrivateRoutes from "./Auth/utils/PrivateRoute";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/diet" element={<Diet />} />
        <Route path="/lifestyle" element={<Lifestyle />} />
        <Route path="/disease" element={<Disease />} />
      </Route>

      {/* Dashboard Route */}
      <Route element={<PrivateRoutes />}>
        <Route path="/dashboard/*" element={<Dashboard />} />
        <Route path="/auth/*" element={<Auth />} />
      </Route>

      {/* Auth Route */}
      <Route element={<AuthLayout />}>
        <Route path="/sign-in" element={<SignInForm />} />
        <Route path="/sign-up" element={<SignupForm />} />
      </Route>
    </Routes>
  );
}

export default App;
