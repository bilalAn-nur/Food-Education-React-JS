import { Routes, Route } from "react-router-dom";
import PublicLayout from "./components/publics/PublicLayout";
import Home from "./content/_public/Home";
import Diet from "./content/_public/Diet";
import Lifestyle from "./content/_public/Lifestyle";
import Disease from "./content/_public/Disease";
import DashboardLayout from "./components/dashboard/DashboardLayout";

const App = () => {
  return (
    <main className="h-dvh">
      <Routes>
        {/* Public Route */}
        <Route element={<PublicLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/diet" element={<Diet />} />
          <Route path="/lifestyle" element={<Lifestyle />} />
          <Route path="/disease" element={<Disease />} />
        </Route>

        {/* Dashboard Route */}
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" />
        </Route>
      </Routes>
    </main>
  );
};

export default App;
