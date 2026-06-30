import React from 'react'

const MangaText = () => {
  return (
    <section className="py-20 px-6 text-center relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-purple-400 border border-purple-500/40 bg-purple-500/10 mb-6">
          🎨 Manga Universe
        </span>

        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-purple-300 to-pink-400 bg-clip-text text-transparent leading-tight">
          Bring Your Manga Vision To Life
        </h1>

        <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
          From epic battles to heartfelt romances — publish your manga panels, graphic novels,
          and visual stories. Reach thousands of readers who are hungry for your art.
        </p>

        {/* Stats Row */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {[
            { value: "12K+", label: "Active Readers" },
            { value: "3.4K+", label: "Manga Published" },
            { value: "99+", label: "Genres" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500 tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        <div className="mt-10">
          <button className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white rounded-full font-bold text-sm tracking-wide hover:opacity-90 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-purple-900/40">
            Start Publishing Manga
          </button>
        </div>
      </div>
    </section>
  )
}

export default MangaText
