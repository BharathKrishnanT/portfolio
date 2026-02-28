'use client'

import { SplineScene } from "@/components/ui/spline-scene";
import { Spotlight } from "@/components/ui/spotlight"
import { resumeData } from "@/data/resume";
import { Mail, Phone, Linkedin, Github, Instagram } from 'lucide-react';
 
export function SplineHero() {
  return (
    <div className="w-full h-screen bg-black/[0.96] relative overflow-hidden flex items-center justify-center">
      <Spotlight
        className="-top-40 left-0 md:left-60 md:-top-20"
        fill="white"
      />
      
      <div className="flex h-full w-full container mx-auto px-4 sm:px-6 lg:px-8 relative z-10 flex-col-reverse md:flex-row">
        {/* Left content */}
        <div className="flex-1 p-8 relative z-10 flex flex-col justify-center pointer-events-none">
            <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-zinc-400 pb-2 pointer-events-auto">
              {resumeData.personal.name}
            </h1>
            <p className="mt-4 text-lg md:text-xl text-slate-300 max-w-2xl blur-text-target pointer-events-auto">
              {resumeData.personal.role}
            </p>
            <div className="mt-8 flex flex-wrap gap-4 pointer-events-auto">
              <a href={resumeData.personal.contact.email} className="btn btn-secondary gap-2"><Mail size={16}/> Email</a>
              <a href={resumeData.personal.contact.phone} className="btn btn-secondary gap-2"><Phone size={16}/> Phone</a>
              <a href={resumeData.personal.contact.linkedin} target="_blank" rel="noreferrer" className="btn btn-secondary gap-2"><Linkedin size={16}/> LinkedIn</a>
              <a href={resumeData.personal.contact.github} target="_blank" rel="noreferrer" className="btn btn-secondary gap-2"><Github size={16}/> GitHub</a>
              <a href={resumeData.personal.contact.instagram} target="_blank" rel="noreferrer" className="btn btn-secondary gap-2"><Instagram size={16}/> Instagram</a>
            </div>
        </div>

        {/* Right content */}
        <div className="flex-1 relative h-1/2 md:h-full w-full">
          <SplineScene 
            scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
            className="w-full h-full"
          />
        </div>
      </div>
    </div>
  )
}
