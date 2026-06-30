import React, { useState } from 'react'
import { Mail, MessageSquare, Phone, MapPin, Send, Clock, Gamepad2, BookOpen, BookText, ChevronDown, ChevronUp, CheckCircle } from 'lucide-react'

const faqs = [
  {
    q: "How do I publish my game on Studio?",
    a: "Navigate to the Games section, click 'Publish Game', fill in your game details including title, description, screenshots, and pricing, then submit. Your game goes live instantly!"
  },
  {
    q: "Is publishing on Studio free?",
    a: "Yes! Creating an account and publishing your work is completely free. You can also set your content as paid if you'd like to monetize your creations."
  },
  {
    q: "What types of content can I publish?",
    a: "You can publish video games, manga/graphic novels, and written stories. We support a wide range of genres across all three content categories."
  },
  {
    q: "How do I delete or edit my published work?",
    a: "Go to 'My Products' from the navbar, find your content, and use the delete option on the card. Full editing capabilities are coming soon!"
  },
  {
    q: "Can I publish content for free AND as paid?",
    a: "When publishing, you choose whether your content is free or paid. You can publish different works with different pricing models."
  },
]

const ContactHero = () => {
  const [formState, setFormState] = useState({ name: '', email: '', subject: '', message: '' })
  const [submitted, setSubmitted] = useState(false)
  const [openFaq, setOpenFaq] = useState(null)

  const handleChange = (e) => {
    setFormState({ ...formState, [e.target.name]: e.target.value })
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    if (!formState.name || !formState.email || !formState.message) return
    setSubmitted(true)
    setTimeout(() => {
      setSubmitted(false)
      setFormState({ name: '', email: '', subject: '', message: '' })
    }, 4000)
  }

  return (
    <div className="min-h-screen w-full bg-black text-white">

      {/* ── Hero Banner ── */}
      <section className="relative pt-32 pb-20 px-6 text-center overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-green-900/15 rounded-full blur-3xl" />
        </div>
        <div className="relative z-10 max-w-3xl mx-auto">
          <span className="inline-block px-4 py-1.5 rounded-full text-xs font-bold tracking-widest uppercase text-green-400 border border-green-500/40 bg-green-500/10 mb-6">
            📬 Get In Touch
          </span>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-5 leading-tight">
            We'd Love To{' '}
            <span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent">
              Hear From You
            </span>
          </h1>
          <p className="text-gray-400 text-lg max-w-xl mx-auto leading-relaxed">
            Have a question, feedback, or just want to say hi? Our team is ready to help creators like you every step of the way.
          </p>
        </div>
      </section>

      {/* ── Contact Cards ── */}
      <section className="px-6 pb-16 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-3 gap-5">
          {[
            {
              icon: <Mail size={22} />,
              title: 'Email Us',
              detail: 'support@studio.gg',
              sub: 'We reply within 24 hours',
              color: 'text-blue-400',
              bg: 'bg-blue-500/8 border-blue-500/20 hover:border-blue-500/50',
            },
            {
              icon: <Phone size={22} />,
              title: 'Call Us',
              detail: '+1 (800) STUDIO-1',
              sub: 'Mon–Fri, 9am – 6pm IST',
              color: 'text-green-400',
              bg: 'bg-green-500/8 border-green-500/20 hover:border-green-500/50',
            },
            {
              icon: <Clock size={22} />,
              title: 'Response Time',
              detail: '< 24 Hours',
              sub: 'We\'re quick to respond',
              color: 'text-purple-400',
              bg: 'bg-purple-500/8 border-purple-500/20 hover:border-purple-500/50',
            },
          ].map((card) => (
            <div
              key={card.title}
              className={`rounded-2xl border p-6 transition-all duration-300 ${card.bg}`}
            >
              <div className={`${card.color} mb-3`}>{card.icon}</div>
              <h3 className="font-bold text-white mb-1">{card.title}</h3>
              <p className={`font-semibold ${card.color} text-sm mb-1`}>{card.detail}</p>
              <p className="text-xs text-gray-500">{card.sub}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Contact Form + Info ── */}
      <section className="px-6 pb-20 max-w-5xl mx-auto">
        <div className="grid md:grid-cols-5 gap-10">

          {/* Form — 3 cols */}
          <div className="md:col-span-3">
            <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-8">
              <h2 className="text-2xl font-extrabold text-white mb-1">Send Us a Message</h2>
              <p className="text-gray-500 text-sm mb-7">Fill in the form below and we'll get back to you ASAP.</p>

              {submitted ? (
                <div className="flex flex-col items-center justify-center gap-4 py-16 text-center">
                  <CheckCircle size={56} className="text-green-400" />
                  <h3 className="text-xl font-bold text-white">Message Sent!</h3>
                  <p className="text-gray-400 text-sm">Thanks for reaching out. We'll reply within 24 hours.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div className="grid md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Your Name *
                      </label>
                      <input
                        type="text"
                        name="name"
                        value={formState.name}
                        onChange={handleChange}
                        placeholder="John Doe"
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-green-500/60 focus:shadow-[0_0_0_2px_#00ff8715] transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        name="email"
                        value={formState.email}
                        onChange={handleChange}
                        placeholder="you@email.com"
                        required
                        className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-green-500/60 focus:shadow-[0_0_0_2px_#00ff8715] transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Subject
                    </label>
                    <select
                      name="subject"
                      value={formState.subject}
                      onChange={handleChange}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-sm outline-none focus:border-green-500/60 transition-all text-gray-300"
                    >
                      <option value="" className="bg-black">Select a topic…</option>
                      <option value="publishing" className="bg-black">Publishing Help</option>
                      <option value="account" className="bg-black">Account Issue</option>
                      <option value="bug" className="bg-black">Report a Bug</option>
                      <option value="partnership" className="bg-black">Partnership / Collab</option>
                      <option value="other" className="bg-black">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                      Message *
                    </label>
                    <textarea
                      name="message"
                      value={formState.message}
                      onChange={handleChange}
                      placeholder="Tell us what's on your mind…"
                      required
                      rows={6}
                      className="w-full bg-black/50 border border-white/10 rounded-xl px-4 py-3 text-white text-sm placeholder-gray-600 outline-none focus:border-green-500/60 focus:shadow-[0_0_0_2px_#00ff8715] transition-all resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-gradient-to-r from-green-600 to-emerald-500 text-black font-bold rounded-xl hover:opacity-90 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-green-900/40"
                  >
                    <Send size={17} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Info panel — 2 cols */}
          <div className="md:col-span-2 flex flex-col gap-6">
            {/* Creator support */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6">
              <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                <MessageSquare size={18} className="text-green-400" />
                Creator Support
              </h3>
              <div className="flex flex-col gap-4">
                {[
                  { icon: <Gamepad2 size={16} />, label: 'Games Help', color: 'text-orange-400' },
                  { icon: <BookOpen size={16} />, label: 'Manga Support', color: 'text-purple-400' },
                  { icon: <BookText size={16} />, label: 'Story Support', color: 'text-red-400' },
                ].map((item) => (
                  <div key={item.label} className="flex items-center gap-3">
                    <div className={`${item.color}`}>{item.icon}</div>
                    <span className="text-gray-400 text-sm">{item.label}</span>
                    <span className="ml-auto text-xs text-green-400 font-semibold bg-green-500/10 border border-green-500/20 px-2 py-0.5 rounded-full">Available</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Location */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <MapPin size={18} className="text-green-400" />
                Our Location
              </h3>
              <p className="text-gray-400 text-sm leading-relaxed">
                Studio HQ<br />
                42 Creator's Lane, Innovation District<br />
                Mumbai, Maharashtra 400001<br />
                India 🇮🇳
              </p>
            </div>

            {/* Office Hours */}
            <div className="rounded-2xl border border-white/8 bg-white/[0.025] p-6">
              <h3 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Clock size={18} className="text-green-400" />
                Office Hours
              </h3>
              <div className="flex flex-col gap-2 text-sm">
                {[
                  { day: 'Monday – Friday', time: '9:00 AM – 6:00 PM' },
                  { day: 'Saturday', time: '10:00 AM – 2:00 PM' },
                  { day: 'Sunday', time: 'Closed' },
                ].map((row) => (
                  <div key={row.day} className="flex justify-between">
                    <span className="text-gray-400">{row.day}</span>
                    <span className={`font-semibold ${row.time === 'Closed' ? 'text-red-400' : 'text-green-400'}`}>{row.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── FAQ Section ── */}
      <section className="px-6 pb-24 max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-extrabold text-white mb-3">Frequently Asked Questions</h2>
          <p className="text-gray-500 text-sm">Quick answers to questions creators ask us most.</p>
        </div>

        <div className="flex flex-col gap-3">
          {faqs.map((faq, i) => (
            <div
              key={i}
              className="rounded-2xl border border-white/8 overflow-hidden transition-all duration-300"
            >
              <button
                onClick={() => setOpenFaq(openFaq === i ? null : i)}
                className="w-full flex items-center justify-between px-6 py-5 text-left hover:bg-white/[0.03] transition-colors"
              >
                <span className="font-semibold text-white text-sm pr-4">{faq.q}</span>
                {openFaq === i
                  ? <ChevronUp size={18} className="text-green-400 flex-shrink-0" />
                  : <ChevronDown size={18} className="text-gray-500 flex-shrink-0" />}
              </button>
              {openFaq === i && (
                <div className="px-6 pb-5 text-gray-400 text-sm leading-relaxed border-t border-white/5 pt-4">
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Bottom CTA ── */}
      <section className="px-6 pb-20">
        <div className="max-w-4xl mx-auto rounded-3xl border border-white/10 bg-gradient-to-br from-green-900/20 via-black to-emerald-900/20 p-12 text-center relative overflow-hidden">
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-0 left-1/3 w-64 h-64 bg-green-500/10 rounded-full blur-3xl" />
          </div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mb-3">
              Still Have Questions?
            </h2>
            <p className="text-gray-400 mb-7 max-w-md mx-auto text-sm">
              Our creator support team is always happy to help. Don't hesitate to reach out — we're here for you.
            </p>
            <a
              href="mailto:support@studio.gg"
              className="inline-flex items-center gap-2 px-8 py-3.5 bg-green-500 text-black font-bold rounded-full hover:bg-green-400 hover:-translate-y-0.5 transition-all duration-300 shadow-lg shadow-green-900/40"
            >
              <Mail size={17} />
              Email Support
            </a>
          </div>
        </div>
      </section>
    </div>
  )
}

export default ContactHero