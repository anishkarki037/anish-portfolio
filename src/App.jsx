import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Text from "./Text";
import AboutMe from "./AboutMe";
import Tech from "./Tech";
import Works from "./Works";
import Contact from "./Contact";
import Footer from "./Footer";
import LoadingPage from "./LoadingPage"; // Import the new LoadingPage component
import FloatingIcons from "./FloatingIcons"; // Import the new FloatingIcons component
import "./App.css";

function App() {
  const [count, setCount] = useState(0);
  const [loading, setLoading] = useState(true); // State to manage loading

  useEffect(() => {
    const lenis = new Lenis({
      duration: 2.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Simulate loading time
    setTimeout(() => {
      setLoading(false);
    }, 3000);

    return () => {
      lenis.destroy();
    };
  }, []);

  if (loading) {
    return <LoadingPage />; // Render the loading page while loading
  }

  return (
    <main>
      <Navbar />
      <Banner />
      <Text />
      <AboutMe />
      <Tech />
      <Works />
      <Contact />
      <Footer />
      <FloatingIcons />
    </main>
  );
}

export default App;
