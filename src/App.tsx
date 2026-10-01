import { About } from './components/sections/about/About';
import { AISection } from './components/sections/ai/AISection';
import { Contact } from './components/sections/contact/Contact';
import { Education } from './components/sections/education/Education';
import { Experience } from './components/sections/experience/Experience';
import { Hero } from './components/sections/hero/Hero';
import { Projects } from './components/sections/projects/Projects';
import { Skills } from './components/sections/skills/Skills';
import { Footer } from './components/layout/Footer';
import { Navbar } from './components/layout/Navbar';
import { Background } from './components/system/Background';
import { Cursor } from './components/system/Cursor';
import { ScrollProgress } from './components/system/ScrollProgress';
import { useMouseLight } from './hooks/useMouseLight';

export default function App() {
  useMouseLight();

  return (
    <>
      <a className="skip" href="#sobre">
        Pular para o conteúdo
      </a>

      <Background />
      <ScrollProgress />
      <Cursor />
      <Navbar />

      <main>
        <Hero />
        <About />
        <Skills />
        <AISection />
        <Experience />
        <Projects />
        <Education />
        <Contact />
      </main>

      <Footer />

    </>
  );
}
