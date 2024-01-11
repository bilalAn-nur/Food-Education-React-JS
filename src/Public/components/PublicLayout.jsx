import { Outlet } from "react-router-dom";
import Headers from "./Headers";
import Footer from "./Footer";

const PublicLayout = () => {
  return (
    <div className="flex flex-col w-full">
      <Headers />
      <section className="flex flex-col w-full">
        <div className="grid flex-grow card bg-base-300 rounded-box place-items-center h-auto">
          <Outlet />
        </div>
      </section>
      <div className="mt-10">
        <Footer />
      </div>
    </div>
  );
};

export default PublicLayout;
