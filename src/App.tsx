import { About } from './components/About'
import { Contact } from './components/Contact'
import { Education } from './components/Education'
import { Experience } from './components/Experience'
import { Footer } from './components/Footer'
import { Hero } from './components/Hero'
import { Nav } from './components/Nav'
import { Projects } from './components/Projects'
import { Services } from './components/Services'
import { Skills } from './components/Skills'
import { Stack } from './components/Stack'
import { LangProvider } from './i18n/LangProvider'
import { Cursor } from './components/Cursor'

function App() {
  return (
    <LangProvider>
      <Cursor />
      <Nav />
      <main className="flex flex-col gap-24 pb-4 md:gap-32">
        <div>
          <Hero />
          <Stack />
        </div>
        <About />
        <Services />
        <Experience />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </LangProvider>
  )
}

export default App
