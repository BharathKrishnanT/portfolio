
import { useEffect, useRef } from 'react';
import { resumeData } from './data/resume';
import { SplineHero } from './components/SplineHero';
import FluidCursor from './components/FluidCursor';
import ChatBot from './components/ChatBot';
import ProjectCard from './components/ProjectCard';
import AchievementCard from './components/AchievementCard';
import { Download, Mail, Phone, Linkedin, Github, Instagram } from 'lucide-react';

export default function App() {
  const year = new Date().getFullYear();

  useEffect(() => {
    // Fade In Up Observer
    const fadeUpObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    document.querySelectorAll('.fade-in-up').forEach(el => {
      fadeUpObserver.observe(el);
    });

    // Blur Text Observer
    const blurTextTargets = document.querySelectorAll('.blur-text-target');
    blurTextTargets.forEach(target => {
      if (target.querySelector('.word')) return;
      const text = target.textContent || '';
      const words = text.split(' ').filter(w => w.length > 0);
      target.innerHTML = '';
      words.forEach((word, index) => {
        const span = document.createElement('span');
        span.className = 'word';
        span.textContent = word;
        span.style.transitionDelay = `${index * 50}ms`; // Stagger delay
        target.appendChild(span);
        if (index < words.length - 1) {
          target.appendChild(document.createTextNode(' '));
        }
      });
    });

    const blurTextObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const target = entry.target as HTMLElement;
        if (entry.isIntersecting) {
          target.classList.add('visible');
        } else {
          target.classList.remove('visible');
        }
      });
    }, { threshold: 0.2 });

    blurTextTargets.forEach(el => {
      blurTextObserver.observe(el);
    });

    return () => {
      fadeUpObserver.disconnect();
      blurTextObserver.disconnect();
    };
  }, []);

  const handleDownloadData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "resume_data.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="antialiased text-slate-200 bg-[#0A0A0A] min-h-screen font-sans selection:bg-blue-500/30">
      <FluidCursor />
      
      {/* Header */}
      <header className="sticky top-0 z-50 w-full backdrop-blur-md bg-black/50 border-b border-zinc-800 transition-all duration-300">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex-shrink-0">
              <a href="#" className="text-xl font-bold text-slate-100">BKT</a>
            </div>
            <nav className="hidden md:flex md:space-x-8">
              <a href="#about" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors">About</a>
              <a href="#experience" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors">Experience</a>
              <a href="#education" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors">Education</a>
              <a href="#projects" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors">Projects</a>
              <a href="#contact" className="text-sm font-medium text-slate-400 hover:text-slate-100 transition-colors">Contact</a>
            </nav>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Hero Section */}
        <section id="hero" className="relative flex items-center justify-center min-h-screen text-center overflow-hidden -mt-16">
          <SplineHero />
        </section>

        {/* About Section */}
        <section id="about" className="py-24 md:py-32 fade-in-up">
          <div className="grid md:grid-cols-3 gap-12 items-start">
            <div className="md:col-span-1 flex flex-col items-center text-center">
              <div className="relative mb-4 h-40 w-40">
                <img 
                  src={resumeData.personal.headshot} 
                  alt={resumeData.personal.name} 
                  className="rounded-full h-40 w-40 object-cover border-2 border-zinc-700 bg-zinc-800"
                  onError={(e) => {
                    e.currentTarget.style.display = 'none';
                    const parent = e.currentTarget.parentElement;
                    if (parent) {
                      const fallback = document.createElement('div');
                      fallback.className = 'absolute inset-0 flex items-center justify-center rounded-full bg-zinc-800 border-2 border-zinc-700 text-4xl font-bold text-zinc-500';
                      fallback.innerText = resumeData.personal.name.split(' ').map(n => n[0]).join('');
                      parent.appendChild(fallback);
                    }
                  }}
                />
              </div>
              <div className="flex flex-col space-y-2 w-48">
                <a href={resumeData.personal.resume} download className="btn btn-secondary text-xs w-full justify-center">
                  <Download size={14} className="mr-2"/> Download Resume
                </a>
                <button onClick={handleDownloadData} className="btn btn-secondary text-xs w-full justify-center">
                  <Download size={14} className="mr-2"/> Download Data
                </button>
              </div>
            </div>
            <div className="md:col-span-2">
              <h2 className="text-3xl font-bold mb-6 text-slate-100 blur-text-target">About Me</h2>
              <p className="text-slate-400 leading-relaxed mb-8 blur-text-target">
                {resumeData.about.mission}
              </p>
              
              <h3 className="text-xl font-semibold mb-4 text-slate-200">Key Skills</h3>
              <div className="flex flex-wrap gap-2 mb-8">
                {resumeData.about.skills.map((skill, idx) => (
                  <span key={idx} className="badge">{skill}</span>
                ))}
              </div>

              <h3 className="text-xl font-semibold mb-4 text-slate-200">Programming Languages</h3>
              <div className="flex flex-wrap gap-2">
                {resumeData.about.programmingLanguages.map((lang, idx) => (
                  <span key={idx} className="badge">{lang}</span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Experience Section */}
        <section id="experience" className="py-24 md:py-32 fade-in-up">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-100 blur-text-target">Experience</h2>
          <div className="relative max-w-3xl mx-auto timeline">
            {resumeData.experience.map((item, idx) => (
              <div key={idx} className="relative pl-12 pb-12 last:pb-0">
                <div className="timeline-dot"></div>
                <p className="text-sm text-slate-400 mb-1">{item.period}</p>
                <h3 className="text-lg font-semibold text-slate-100">{item.role}</h3>
                <p className="text-md text-slate-300 mb-2">{item.company}</p>
                <p className="text-sm text-slate-400 blur-text-target">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Education Section */}
        <section id="education" className="py-24 md:py-32 fade-in-up">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-100 blur-text-target">Education</h2>
          <div className="relative max-w-3xl mx-auto timeline">
            {resumeData.education.map((item, idx) => (
              <div key={idx} className="relative pl-12 pb-12 last:pb-0">
                <div className="timeline-dot"></div>
                <p className="text-sm text-slate-400 mb-1">{item.period}</p>
                <h3 className="text-lg font-semibold text-slate-100">{item.role}</h3>
                <p className="text-md text-slate-300 mb-2">{item.company}</p>
                <p className="text-sm text-slate-400 blur-text-target">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Achievements Section */}
        <section id="achievements" className="py-24 md:py-32 fade-in-up">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-100 blur-text-target">Achievements</h2>
          <div className="max-w-3xl mx-auto grid gap-6 md:grid-cols-2">
            {resumeData.achievements.map((achievement, idx) => (
              <AchievementCard key={idx} title={achievement} />
            ))}
          </div>
        </section>

        {/* Projects Section */}
        <section id="projects" className="py-24 md:py-32">
          <h2 className="text-3xl font-bold text-center mb-16 text-slate-100 blur-text-target">Projects</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {resumeData.projects.map((project, idx) => (
              <ProjectCard key={idx}>
                <a href={project.link} target="_blank" rel="noreferrer" className="block p-6 h-full">
                  <h3 className="text-lg font-semibold text-slate-100 mb-2">{project.title}</h3>
                  <p className="text-sm text-slate-400 mb-4 blur-text-target">{project.description}</p>
                  <div className="flex flex-wrap gap-2 mt-auto">
                    {project.tags.map((tag, tIdx) => (
                      <span key={tIdx} className="badge">{tag}</span>
                    ))}
                  </div>
                </a>
              </ProjectCard>
            ))}
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="py-24 md:py-32 text-center fade-in-up">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-slate-100 blur-text-target">Get In Touch</h2>
            <p className="mt-4 mb-8 text-slate-400 blur-text-target text-lg">
              I'm always open to discussing new projects, creative ideas, or opportunities to be part of an ambitious vision. Feel free to reach out.
            </p>
            <form 
              className="mt-10 text-left space-y-6"
              action={`mailto:${resumeData.personal.contact.email.replace('mailto:', '')}`}
              method="post"
              encType="text/plain"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="name" className="sr-only">Your Name</label>
                  <input type="text" id="name" name="name" placeholder="Your Name" required className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"/>
                </div>
                <div>
                  <label htmlFor="email" className="sr-only">Your Email</label>
                  <input type="email" id="email" name="email" placeholder="Your Email" required className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"/>
                </div>
              </div>
              <div>
                <label htmlFor="message" className="sr-only">Your Message</label>
                <textarea id="message" name="message" rows={5} placeholder="Your Message" required className="w-full bg-zinc-900 border border-zinc-700 rounded-md p-3 text-sm placeholder-zinc-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all text-white"></textarea>
              </div>
              <div className="text-center">
                <button type="submit" className="btn btn-primary text-base">Send Message</button>
              </div>
            </form>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-800 relative z-10 bg-[#0A0A0A]">
        <div className="container mx-auto py-6 px-4 sm:px-6 lg:px-8 text-center text-sm text-slate-500">
          <p>&copy; {year} {resumeData.personal.name}. All Rights Reserved.</p>
        </div>
      </footer>

      <ChatBot />
    </div>
  );
}
