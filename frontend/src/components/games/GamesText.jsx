import React from 'react';

const GamesText = () => {
  return (
    <section className="py-20 px-6 text-center relative overflow-hidden">
      {/* Background glow – StoryText wali hi tarah */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-orange-900/10 blur-3xl" />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Badge */}
        <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-orange-400 border border-orange-500/40 bg-orange-500/10 mb-6">
          🎮 Game Studio
        </span>

        {/* Heading – Gradient */}
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-white via-orange-300 to-red-400 bg-clip-text text-transparent leading-tight">
          Turn Your Game Into A Global Adventure
        </h1>

        {/* Description */}
        <p className="max-w-2xl mx-auto text-lg text-gray-400 leading-relaxed">
          Your game deserves more than just sitting on your computer.
          Publish it on Studio and let thousands of players discover,
          play, and share your creation with the world.
        </p>

        {/* Stats Row – Game-specific */}
        <div className="flex flex-wrap justify-center gap-8 mt-12">
          {[
            { value: "1.2K+", label: "Games Published" },
            { value: "15K+", label: "Active Players" },
            { value: "40+", label: "Game Genres" },
          ].map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-1">
              <span className="text-3xl font-extrabold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                {stat.value}
              </span>
              <span className="text-sm text-gray-500 tracking-wider">{stat.label}</span>
            </div>
          ))}
        </div>

        {/* CTA Button – Gradient and lift effect */}
        <div className="mt-10">
          <button className="px-8 py-4 bg-gradient-to-r from-orange-600 to-red-600 text-white rounded-full font-bold text-sm tracking-wide hover:opacity-90 hover:-translate-y-1 transition-all duration-300 shadow-lg shadow-orange-900/40">
            Publish Your Game Now
          </button>
        </div>
      </div>
    </section>
  );
};

export default GamesText;