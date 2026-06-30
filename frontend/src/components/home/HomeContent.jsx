import React from 'react'
import { Link } from 'react-router-dom'
import { Gamepad2, BookOpen, BookText, ArrowRight, Star, Users, Globe, Zap } from 'lucide-react'

const categories = [
  {
    id: 'games',
    icon: <Gamepad2 size={32} />,
    label: 'Games',
    tagline: 'Next Level Gaming',
    description: 'Publish indie games, mods, and game demos. Let thousands of players discover and experience your creation.',
    gradient: 'from-orange-600/20 to-red-900/10',
    border: 'border-orange-500/20',
    hoverBorder: 'hover:border-orange-500/50',
    accent: 'text-orange-400',
    badge: 'bg-orange-500/15 text-orange-400 border-orange-500/30',
    glow: 'shadow-orange-900/30',
    link: '/games',
    stats: '5K+ Games',
  },
  {
    id: 'manga',
    icon: <BookOpen size={32} />,
    label: 'Manga',
    tagline: 'Manga Universe',
    description: 'Create and share manga panels, graphic novels, and visual stories with a passionate community of readers.',
    gradient: 'from-purple-600/20 to-pink-900/10',
    border: 'border-purple-500/20',
    hoverBorder: 'hover:border-purple-500/50',
    accent: 'text-purple-400',
    badge: 'bg-purple-500/15 text-purple-400 border-purple-500/30',
    glow: 'shadow-purple-900/30',
    link: '/manga',
    stats: '3.4K+ Manga',
  },
  {
    id: 'story',
    icon: <BookText size={32} />,
    label: 'Stories',
    tagline: 'Sacred Tales',
    description: 'Publish novels, short stories, and legendary chronicles. Build a loyal readership for your written worlds.',
    gradient: 'from-red-600/20 to-orange-900/10',
    border: 'border-red-500/20',
    hoverBorder: 'hover:border-red-500/50',
    accent: 'text-red-400',
    badge: 'bg-red-500/15 text-red-400 border-red-500/30',
    glow: 'shadow-red-900/30',
    link: '/story',
    stats: '2.1K+ Stories',
  },
]

const globalStats = [
  { icon: <Users size={22} />, value: '25K+', label: 'Active Creators', color: 'text-green-400' },
  { icon: <Globe size={22} />, value: '80+', label: 'Countries', color: 'text-blue-400' },
  { icon: <Star size={22} />, value: '4.9', label: 'Avg Rating', color: 'text-yellow-400' },
  { icon: <Zap size={22} />, value: '10K+', label: 'Published Works', color: 'text-purple-400' },
]

const HomeContent = () => {
  return (
    <>
      {/* ── Category Cards ── */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 left-1/4 w-96 h-96 bg-green-900/8 rounded-full blur-3xl" />
          <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-900/8 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 border border-green-500/40 bg-green-500/10 mb-5">
              ✨ What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Create, Publish & Share
            </h2>
            <p className="text-gray-400 max-w-xl mx-auto">
              Studio is your all-in-one creative publishing platform. Whatever your medium — we have a space for it.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {categories.map((cat) => (
              <Link
                key={cat.id}
                to={cat.link}
                className={`group relative rounded-2xl p-7 bg-gradient-to-br ${cat.gradient} border ${cat.border} ${cat.hoverBorder} transition-all duration-400 hover:-translate-y-2 hover:shadow-2xl ${cat.glow} cursor-pointer`}
              >
                {/* Icon */}
                <div className={`${cat.accent} mb-4`}>
                  {cat.icon}
                </div>

                {/* Badge */}
                <span className={`inline-block text-xs font-bold tracking-widest uppercase px-3 py-1 rounded-full border ${cat.badge} mb-3`}>
                  {cat.tagline}
                </span>

                <h3 className="text-2xl font-extrabold text-white mb-2">{cat.label}</h3>
                <p className="text-gray-400 text-sm leading-relaxed mb-5">{cat.description}</p>

                {/* Footer */}
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-semibold ${cat.accent}`}>{cat.stats}</span>
                  <span className={`flex items-center gap-1 text-xs font-bold ${cat.accent} group-hover:gap-2 transition-all duration-300`}>
                    Explore <ArrowRight size={14} />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── Global Stats Banner ── */}
      <section className="py-16 px-6 border-y border-white/5 bg-white/[0.02]">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-8">
          {globalStats.map((stat) => (
            <div key={stat.label} className="flex flex-col items-center gap-2 text-center">
              <div className={`${stat.color} opacity-70`}>{stat.icon}</div>
              <span className={`text-3xl font-extrabold ${stat.color}`}>{stat.value}</span>
              <span className="text-xs text-gray-500 tracking-wider font-medium">{stat.label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ── Why Studio Section ── */}
      <section className="py-24 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-14">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Why Choose Studio?
            </h2>
            <p className="text-gray-400 max-w-lg mx-auto">
              Built for creators, by creators. Everything you need to take your work from idea to audience.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                emoji: '🚀',
                title: 'Instant Publishing',
                desc: 'Go from upload to live in minutes. No review delays, no gatekeeping.'
              },
              {
                emoji: '🌍',
                title: 'Global Reach',
                desc: 'Your work reaches readers and players from over 80 countries around the world.'
              },
              {
                emoji: '💰',
                title: 'Monetize Your Work',
                desc: 'Set your price — offer free access or paid premium content, you decide.'
              },
              {
                emoji: '⭐',
                title: 'Community Reviews',
                desc: 'Grow with real feedback. Ratings and reviews help you improve and gain visibility.'
              },
              {
                emoji: '🎨',
                title: 'Beautiful Showcase',
                desc: 'Your work deserves a premium presentation. Custom cover art, descriptions, and tags.'
              },
              {
                emoji: '🔒',
                title: 'Secure & Reliable',
                desc: 'Your content is safe with us. Reliable hosting, daily backups, and zero downtime.'
              },
            ].map((item) => (
              <div
                key={item.title}
                className="group p-6 rounded-2xl border border-white/8 bg-white/[0.03] hover:bg-white/[0.06] hover:border-white/15 transition-all duration-300"
              >
                <div className="text-3xl mb-4">{item.emoji}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="py-20 px-6">
        <div className="max-w-4xl mx-auto text-center rounded-3xl border border-white/10 bg-gradient-to-br from-green-900/20 via-black to-purple-900/20 p-12 relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
            <div className="absolute bottom-0 right-1/3 w-64 h-64 bg-purple-500/10 rounded-full blur-3xl" />
          </div>

          <div className="relative z-10">
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-4">
              Ready to Share Your Creation?
            </h2>
            <p className="text-gray-400 mb-8 max-w-lg mx-auto">
              Join thousands of creators who are already publishing their games, manga, and stories on Studio.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <Link
                to="/games"
                className="px-7 py-3 bg-white text-black rounded-full font-bold text-sm hover:bg-gray-100 hover:-translate-y-1 transition-all duration-300"
              >
                Publish a Game
              </Link>
              <Link
                to="/manga"
                className="px-7 py-3 bg-purple-600 text-white rounded-full font-bold text-sm hover:bg-purple-500 hover:-translate-y-1 transition-all duration-300"
              >
                Publish Manga
              </Link>
              <Link
                to="/story"
                className="px-7 py-3 bg-orange-600 text-white rounded-full font-bold text-sm hover:bg-orange-500 hover:-translate-y-1 transition-all duration-300"
              >
                Publish a Story
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default HomeContent
