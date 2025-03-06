import { useState, useEffect } from "react";
import Lenis from "@studio-freight/lenis";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Text from "./Text";
import AboutMe from "./AboutMe";
import Tech from "./Tech";
import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const lenis = new Lenis({
      duration: 4.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true,
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <main>
      <Navbar />
      <Banner />
      <Text />
      <AboutMe />
      <Tech />
    </main>
  );
}

export default App;
