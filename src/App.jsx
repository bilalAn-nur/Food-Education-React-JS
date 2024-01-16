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
import Calculator from "./Public/content/Calculator";
import RecipeList from "./Public/content/RecepList";
import Article from "./Public/content/Article";

function App() {
  return (
    <Routes>
      {/* Public Route */}
      <Route element={<PublicLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/article" element={<Article />} />
        <Route path="/diet" element={<Diet />} />
        {/* <Route path="/lifestyle" element={<Lifestyle />} /> */}
        {/* <Route path="/disease" element={<Disease />} /> */}
        {/* <Route path="/nutricalculator" element={<Calculator />} /> */}
        <Route path="/receplist" element={<RecipeList />} />
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
