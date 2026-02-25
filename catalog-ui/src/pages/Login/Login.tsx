import { useState } from "react";
import AppHeader from "@/components/AppHeader";
import Navbar from "@/components/Navbar";

const Login = () => {
  const [isSideNavOpen, setIsSideNavOpen] = useState(false);
  return (
    <>
      <AppHeader
        isSideNavOpen={isSideNavOpen}
        setIsSideNavOpen={setIsSideNavOpen}
      />

      <Navbar
        isSideNavOpen={isSideNavOpen}
        setIsSideNavOpen={setIsSideNavOpen}
      />

      <main></main>
    </>
  );
};

export default Login;
