import { Outlet } from "react-router-dom";
import Headers from "./Headers";
import Footer from "./Footer";

const PublicLayout = () => {
  return (
    <div className="w-full min-h-screen">
      <Headers />
      <section className=" w-full">
        <div className="grid card bg-base-300 rounded-box place-items-center h-full">
          <Outlet />
        </div>
      </section>
      <Footer />
    </div>
  );
};

export default PublicLayout;
