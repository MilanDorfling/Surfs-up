"use client";

import { useState } from "react";
import dynamic from "next/dynamic";

const SurfboardCustomizer = dynamic(
  () => import("@/components/SurfboardCustomizer"),
  { ssr: false }
);

const FEATURES = [
  {
    icon: "🏄",
    title: "Custom Shaped Boards",
    description:
      "Every board is hand-shaped to your exact specifications — from shortboards to longboards, guns to fish.",
  },
  {
    icon: "🌿",
    title: "Sustainable Materials",
    description:
      "Choose from eco-friendly timber, EPS foam, classic PU, or high-performance carbon fibre.",
  },
  {
    icon: "🎨",
    title: "Unique Artwork",
    description:
      "Describe your dream design and our artists will bring it to life on your custom stick.",
  },
  {
    icon: "📦",
    title: "Ships Worldwide",
    description:
      "We carefully pack and ship your board to surfers in over 50 countries.",
  },
];

const TESTIMONIALS = [
  {
    name: "Mia R.",
    location: "Byron Bay, AU",
    quote:
      "My new 6'2 shortboard is an absolute weapon. The shape is perfect and it turns like a dream.",
    avatar: "🤙",
  },
  {
    name: "Jake T.",
    location: "Hossegor, FR",
    quote:
      "Ordered a custom 9'0 single fin and it arrived quicker than expected. Glides like butter.",
    avatar: "🌊",
  },
  {
    name: "Sana K.",
    location: "Bali, ID",
    quote:
      "The online customiser made it so easy to design exactly what I wanted. Stoked on the result!",
    avatar: "✨",
  },
];

export default function HomePage() {
  const [showCustomizer, setShowCustomizer] = useState(false);

  return (
    <main className="min-h-screen bg-[#f0f9ff] font-sans">
      {/* NAVBAR */}
      <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-sky-100 shadow-sm">
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-2xl">🏄</span>
            <span className="text-xl font-extrabold text-sky-800 tracking-tight">
              Surfs Up
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-600">
            <a href="#boards" className="hover:text-sky-600 transition">Boards</a>
            <a href="#how-it-works" className="hover:text-sky-600 transition">How It Works</a>
            <a href="#reviews" className="hover:text-sky-600 transition">Reviews</a>
          </div>
          <button
            onClick={() => setShowCustomizer(true)}
            className="px-5 py-2 rounded-full bg-sky-600 text-white text-sm font-semibold hover:bg-sky-700 transition shadow-md shadow-sky-200"
          >
            Design Your Board
          </button>
        </div>
      </nav>

      {/* HERO */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-sky-400 via-sky-300 to-sky-100 -z-10" />
        <div className="absolute top-12 right-24 w-28 h-28 rounded-full bg-amber-200 opacity-80 blur-2xl -z-10" />
        <div className="absolute top-12 right-24 w-20 h-20 rounded-full bg-amber-300 -z-10" />
        <div className="max-w-6xl mx-auto px-6 pt-24 pb-40 text-center">
          <p className="text-sky-700 font-semibold tracking-widest uppercase text-sm mb-4">
            Hand-Crafted Custom Surfboards
          </p>
          <h1 className="text-5xl sm:text-7xl font-black text-white leading-tight drop-shadow-md">
            Ride Your{" "}
            <span className="text-amber-300">Perfect</span>
            <br />
            Wave
          </h1>
          <p className="mt-6 text-sky-50 text-lg sm:text-xl max-w-xl mx-auto leading-relaxed">
            Design a custom surfboard built exactly for you — your shape, your
            dimensions, your style. We&apos;ll craft it and ship it to your door.
          </p>
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={() => setShowCustomizer(true)}
              className="px-8 py-4 rounded-full bg-white text-sky-700 font-bold text-lg shadow-xl hover:bg-sky-50 hover:scale-105 transition"
            >
              🏄 Design My Board
            </button>
            <a
              href="#boards"
              className="px-8 py-4 rounded-full border-2 border-white/60 text-white font-semibold hover:bg-white/10 transition"
            >
              See Our Shapes ↓
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1200 80" className="w-full" preserveAspectRatio="none">
            <path
              d="M0,40 C150,80 350,0 600,40 C850,80 1050,0 1200,40 L1200,80 L0,80 Z"
              fill="#f0f9ff"
            />
          </svg>
        </div>
      </section>

      {/* FEATURES */}
      <section id="boards" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
            Built Different. Built For You.
          </h2>
          <p className="mt-3 text-slate-500 text-lg max-w-lg mx-auto">
            From paddling your first wave to charging the heaviest barrels —
            we shape boards for every surfer.
          </p>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {FEATURES.map((f) => (
            <div
              key={f.title}
              className="bg-white rounded-2xl p-6 shadow-sm border border-sky-50 hover:shadow-md hover:-translate-y-1 transition"
            >
              <div className="text-4xl mb-4">{f.icon}</div>
              <h3 className="font-bold text-slate-800 mb-2">{f.title}</h3>
              <p className="text-sm text-slate-500 leading-relaxed">{f.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section
        id="how-it-works"
        className="bg-gradient-to-br from-sky-600 to-sky-800 py-20"
      >
        <div className="max-w-5xl mx-auto px-6 text-center">
          <h2 className="text-3xl sm:text-4xl font-black text-white mb-4">
            How It Works
          </h2>
          <p className="text-sky-200 mb-12 text-lg">Three simple steps to your dream board.</p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8">
            {[
              { step: "01", title: "Customise", desc: "Use our builder to pick your shape, length, material, fins & colour.", icon: "🎛️" },
              { step: "02", title: "Receive PDF", desc: "We email you a beautiful PDF spec sheet the moment you submit.", icon: "📄" },
              { step: "03", title: "We Build It", desc: "Our shapers craft your board and ship it straight to your door.", icon: "📦" },
            ].map((item) => (
              <div
                key={item.step}
                className="bg-white/10 backdrop-blur rounded-2xl p-8 text-left border border-white/20"
              >
                <div className="text-3xl mb-4">{item.icon}</div>
                <p className="text-sky-300 text-xs font-black tracking-widest uppercase mb-1">
                  Step {item.step}
                </p>
                <h3 className="text-xl font-bold text-white mb-2">{item.title}</h3>
                <p className="text-sky-200 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
          <button
            onClick={() => setShowCustomizer(true)}
            className="mt-12 px-8 py-4 rounded-full bg-white text-sky-700 font-bold text-lg hover:bg-sky-50 hover:scale-105 transition shadow-xl"
          >
            Start Designing
          </button>
        </div>
      </section>

      {/* REVIEWS */}
      <section id="reviews" className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-black text-slate-800">
            What Surfers Say
          </h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          {TESTIMONIALS.map((t) => (
            <div
              key={t.name}
              className="bg-white rounded-2xl p-6 shadow-sm border border-sky-50"
            >
              <p className="text-slate-600 text-sm leading-relaxed mb-4 italic">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-full bg-sky-100 flex items-center justify-center text-xl">
                  {t.avatar}
                </div>
                <div>
                  <p className="font-semibold text-slate-800 text-sm">{t.name}</p>
                  <p className="text-xs text-slate-400">{t.location}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* BOTTOM CTA */}
      <section className="bg-amber-50 border-t border-amber-100 py-20 text-center">
        <h2 className="text-3xl sm:text-4xl font-black text-slate-800 mb-4">
          Ready to Shape Your Legend?
        </h2>
        <p className="text-slate-500 mb-8 max-w-md mx-auto">
          Jump into the customiser and design the board you&apos;ve always dreamed of.
        </p>
        <button
          onClick={() => setShowCustomizer(true)}
          className="px-8 py-4 rounded-full bg-sky-600 text-white font-bold text-lg hover:bg-sky-700 transition shadow-lg shadow-sky-200"
        >
          🏄 Design My Board
        </button>
      </section>

      {/* FOOTER */}
      <footer className="bg-slate-900 text-slate-400 py-8 text-center text-sm">
        <p className="text-slate-300 font-semibold text-base mb-1">🏄 Surfs Up</p>
        <p>Crafted with love for the ocean · {new Date().getFullYear()}</p>
      </footer>

      {/* CUSTOMIZER MODAL */}
      {showCustomizer && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
          onClick={() => setShowCustomizer(false)}
        >
          <div className="absolute inset-0 bg-slate-900/60 backdrop-blur-sm" />
          <div
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto p-6 sm:p-8"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-black text-slate-800">
                  🏄 Board Builder
                </h2>
                <p className="text-sm text-slate-500 mt-1">
                  Design your perfect custom surfboard
                </p>
              </div>
              <button
                onClick={() => setShowCustomizer(false)}
                className="h-9 w-9 rounded-full bg-slate-100 text-slate-500 flex items-center justify-center hover:bg-slate-200 transition text-lg font-bold"
              >
                ×
              </button>
            </div>
            <SurfboardCustomizer onClose={() => setShowCustomizer(false)} />
          </div>
        </div>
      )}
    </main>
  );
}
