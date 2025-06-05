import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Lenis from "@studio-freight/lenis";
import Banner from "./Banner";
import Navbar from "./Navbar";
import Text from "./Text";
import AboutMe from "./AboutMe";
import Tech from "./Tech";
import Works from "./Works";
import WorksPage from "./WorksPage";
import BlogsPage from "./BlogsPage";
import BlogPost from "./BlogPost";
import Contact from "./Contact";
import Footer from "./Footer";
import LoadingPage from "./LoadingPage";
import FloatingIcons from "./FloatingIcons";
import Workdetail from "./Workdetail";
import "./App.scss";

const blogPosts = [
  {
    id: 1,
    title: 'Building Modern Web Applications with React',
    category: 'Development',
    date: 'June 4, 2023',
    readTime: '5 min read',
    excerpt: 'Exploring the latest features and best practices in React development...',
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800',
    tags: ['React', 'JavaScript', 'Web Development']
  },
  {
    id: 2,
    title: 'The Future of AI in Software Development',
    category: 'AI & ML',
    date: 'June 2, 2023',
    readTime: '7 min read',
    excerpt: 'How artificial intelligence is reshaping the way we write code...',
    image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=800',
    tags: ['AI', 'Technology', 'Future']
  },
  {
    id: 3,
    title: 'Optimizing Performance in Modern Web Apps',
    category: 'Performance',
    date: 'May 30, 2023',
    readTime: '6 min read',
    excerpt: 'Essential techniques for building lightning-fast web applications...',
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800',
    tags: ['Performance', 'Web Development', 'Optimization']
  }
];

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
    <Router>
      <Routes>
        <Route path="/works" element={
          <>
            <Navbar />
            <WorksPage />
            <Footer />
            <FloatingIcons />
          </>
        } />
        <Route path="/blogs" element={
          <>
            <Navbar />
            <BlogsPage />
            <Footer />
            <FloatingIcons />
          </>
        } />
        <Route path="/blogs/:id" element={
          <>
            <Navbar />
            <BlogPost posts={blogPosts} />
            <Footer />
            <FloatingIcons />
          </>
        } />
        <Route path="/works/:id" element={
          <>
          <Navbar />
          <Workdetail />
          <Footer />
          <FloatingIcons />
          </>
          } />
        <Route path="/" element={
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
        } />
      </Routes>
    </Router>
  );
}

export default App;
