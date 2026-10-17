import React from 'react';
import { Header } from '../../components/Header/Header';
import { Hero } from '../../components/Hero/Hero';
import { Services } from '../../components/Services/Services';
import { About } from '../../components/About/About';
import { VideoGrid } from '../../components/VideoGrid/VideoGrid';
import { Results } from '../../components/Testimonial/Testimonials';
import { Methodology } from '../../components/Methodology/Methodology';
import { BMICalculator } from '../../components/BMICalculator/BMICalculator';
import { Plans } from '../../components/Plans/Plans';
import { FAQ } from '../../components/FAQ/FAQ';
import { Ebook } from '../../components/Ebook/Ebook';
import { Contact } from '../../components/Contact/Contact';
import { Footer } from '../../components/Footer/Footer';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-zinc-950 font-sans selection:bg-emerald-500 selection:text-zinc-950">
      <Header />

      <div id="inicio">
        <Hero />
      </div>

      <div id="servicos">
        <Services />
      </div>

      <div>
        <Methodology />
      </div>

      <div id="sobre">
        <About />
      </div>

      <div id="videos">
        <VideoGrid />
      </div>

      <div id="resultados">
        <Results />
      </div>

      <div>
        <BMICalculator />
      </div>

      <div id="planos">
        <Plans />
      </div>

      <div>
        <FAQ />
      </div>

      <div id="blog">
        <Ebook />
      </div>

      <div id="contato">
        <Contact />
      </div>


      <Footer />
    </div>
  );
};