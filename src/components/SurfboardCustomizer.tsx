"use client";

import { useState } from "react";
import type { SurfboardOrder, BoardShape, BoardMaterial, FinSetup } from "@/lib/surfboard";
import {
  BOARD_SHAPES,
  BOARD_MATERIALS,
  FIN_SETUPS,
  BOARD_COLORS,
} from "@/lib/surfboard";

interface Props {
  onClose?: () => void;
}

const STEPS = ["Shape", "Dimensions", "Material", "Fins", "Colour", "Details"];

const DEFAULT_ORDER: SurfboardOrder = {
  shape: "shortboard",
  lengthFt: 6,
  lengthIn: 0,
  material: "polyurethane",
  fins: "thruster",
  color: "#0ea5e9",
  customInstructions: "",
  customerName: "",
  customerEmail: "",
};

export default function SurfboardCustomizer({ onClose }: Props) {
  const [step, setStep] = useState(0);
  const [order, setOrder] = useState<SurfboardOrder>(DEFAULT_ORDER);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [orderNumber, setOrderNumber] = useState("");

  function updateOrder<K extends keyof SurfboardOrder>(key: K, value: SurfboardOrder[K]) {
    setOrder((prev) => ({ ...prev, [key]: value }));
  }

  async function handleSubmit() {
    setStatus("loading");
    try {
      const res = await fetch("/api/send-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(order),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error ?? "Unknown error");
      setOrderNumber(data.orderNumber);
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  if (status === "success") {
    return (
      <div className="flex flex-col items-center justify-center py-16 px-6 text-center gap-4">
        <div className="text-6xl">🏄</div>
        <h2 className="text-2xl font-bold text-sky-800">Order Sent!</h2>
        <p className="text-slate-600 max-w-sm">
          Your custom board spec sheet has been emailed to{" "}
          <strong>{order.customerEmail}</strong>. We&apos;ll be in touch soon —
          get ready to shred! 🌊
        </p>
        <p className="text-sm text-sky-600 font-mono">Order #{orderNumber}</p>
        <button
          onClick={() => {
            setStatus("idle");
            setStep(0);
            setOrder(DEFAULT_ORDER);
          }}
          className="mt-4 px-6 py-2 bg-sky-600 text-white rounded-full font-semibold hover:bg-sky-700 transition"
        >
          Design Another Board
        </button>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Progress bar */}
      <div className="mb-8">
        <div className="flex justify-between mb-2">
          {STEPS.map((s, i) => (
            <button
              key={s}
              onClick={() => i < step && setStep(i)}
              className={`text-xs font-semibold transition ${
                i === step
                  ? "text-sky-600"
                  : i < step
                  ? "text-sky-400 cursor-pointer"
                  : "text-slate-300"
              }`}
            >
              {s}
            </button>
          ))}
        </div>
        <div className="h-2 bg-slate-100 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-sky-400 to-sky-600 rounded-full transition-all duration-500"
            style={{ width: `${((step + 1) / STEPS.length) * 100}%` }}
          />
        </div>
      </div>

      {/* Step content */}
      <div className="min-h-[280px]">
        {step === 0 && (
          <StepShape value={order.shape} onChange={(v) => updateOrder("shape", v)} />
        )}
        {step === 1 && (
          <StepDimensions
            ft={order.lengthFt}
            inches={order.lengthIn}
            onFtChange={(v) => updateOrder("lengthFt", v)}
            onInchesChange={(v) => updateOrder("lengthIn", v)}
          />
        )}
        {step === 2 && (
          <StepMaterial value={order.material} onChange={(v) => updateOrder("material", v)} />
        )}
        {step === 3 && (
          <StepFins value={order.fins} onChange={(v) => updateOrder("fins", v)} />
        )}
        {step === 4 && (
          <StepColor value={order.color} onChange={(v) => updateOrder("color", v)} />
        )}
        {step === 5 && (
          <StepDetails
            order={order}
            onNameChange={(v) => updateOrder("customerName", v)}
            onEmailChange={(v) => updateOrder("customerEmail", v)}
            onInstructionsChange={(v) => updateOrder("customInstructions", v)}
          />
        )}
      </div>

      {/* Navigation */}
      <div className="flex justify-between mt-8 pt-4 border-t border-slate-100">
        <button
          onClick={() => step > 0 ? setStep((s) => s - 1) : onClose?.()}
          className="px-5 py-2 rounded-full border border-slate-200 text-slate-600 font-semibold hover:border-sky-300 hover:text-sky-600 transition"
        >
          {step === 0 ? "Cancel" : "← Back"}
        </button>

        {step < STEPS.length - 1 ? (
          <button
            onClick={() => setStep((s) => s + 1)}
            className="px-6 py-2 rounded-full bg-sky-600 text-white font-semibold hover:bg-sky-700 transition shadow-md shadow-sky-200"
          >
            Next →
          </button>
        ) : (
          <button
            onClick={handleSubmit}
            disabled={
              status === "loading" ||
              !order.customerName.trim() ||
              !order.customerEmail.trim()
            }
            className="px-6 py-2 rounded-full bg-sky-600 text-white font-semibold hover:bg-sky-700 transition shadow-md shadow-sky-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {status === "loading" ? "Sending…" : "📧 Send PDF to Email"}
          </button>
        )}
      </div>

      {status === "error" && (
        <p className="text-red-500 text-sm mt-3 text-center">
          Something went wrong. Please check your email and try again.
        </p>
      )}
    </div>
  );
}

/* ─── Sub-step components ─────────────────────────────────────── */

function OptionCard({
  selected,
  onClick,
  title,
  description,
  emoji,
}: {
  selected: boolean;
  onClick: () => void;
  title: string;
  description: string;
  emoji: string;
}) {
  return (
    <button
      onClick={onClick}
      className={`w-full text-left p-4 rounded-xl border-2 transition ${
        selected
          ? "border-sky-500 bg-sky-50 shadow-sm"
          : "border-slate-100 bg-white hover:border-sky-200"
      }`}
    >
      <div className="flex items-center gap-3">
        <span className="text-2xl">{emoji}</span>
        <div>
          <p className={`font-semibold text-sm ${selected ? "text-sky-700" : "text-slate-800"}`}>
            {title}
          </p>
          <p className="text-xs text-slate-500 mt-0.5">{description}</p>
        </div>
      </div>
    </button>
  );
}

const SHAPE_EMOJIS: Record<string, string> = {
  shortboard: "⚡",
  longboard: "🌊",
  fish: "🐟",
  funboard: "😊",
  gun: "🎯",
  hybrid: "🔀",
};

function StepShape({ value, onChange }: { value: BoardShape; onChange: (v: BoardShape) => void }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4">Choose your board shape</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BOARD_SHAPES.map((s) => (
          <OptionCard
            key={s.value}
            selected={value === s.value}
            onClick={() => onChange(s.value)}
            title={s.label}
            description={s.description}
            emoji={SHAPE_EMOJIS[s.value] ?? "🏄"}
          />
        ))}
      </div>
    </div>
  );
}

function StepDimensions({
  ft,
  inches,
  onFtChange,
  onInchesChange,
}: {
  ft: number;
  inches: number;
  onFtChange: (v: number) => void;
  onInchesChange: (v: number) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4">Set your board length</h3>
      <div className="bg-sky-50 rounded-2xl p-8 flex flex-col items-center gap-6">
        <div className="text-5xl font-bold text-sky-700">
          {ft}&apos;{inches}&quot;
        </div>
        <div className="grid grid-cols-2 gap-8 w-full max-w-xs">
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
              Feet
            </label>
            <input
              type="range"
              min={4}
              max={12}
              step={1}
              value={ft}
              onChange={(e) => onFtChange(Number(e.target.value))}
              className="w-full accent-sky-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>4</span>
              <span>12</span>
            </div>
          </div>
          <div>
            <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2 block">
              Inches
            </label>
            <input
              type="range"
              min={0}
              max={11}
              step={1}
              value={inches}
              onChange={(e) => onInchesChange(Number(e.target.value))}
              className="w-full accent-sky-500"
            />
            <div className="flex justify-between text-xs text-slate-400 mt-1">
              <span>0</span>
              <span>11</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const MATERIAL_EMOJIS: Record<string, string> = {
  polyurethane: "🧱",
  eps: "☁️",
  carbon_fiber: "🖤",
  wood: "🌿",
};

function StepMaterial({ value, onChange }: { value: BoardMaterial; onChange: (v: BoardMaterial) => void }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4">Select your material</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {BOARD_MATERIALS.map((m) => (
          <OptionCard
            key={m.value}
            selected={value === m.value}
            onClick={() => onChange(m.value)}
            title={m.label}
            description={m.description}
            emoji={MATERIAL_EMOJIS[m.value] ?? "🏄"}
          />
        ))}
      </div>
    </div>
  );
}

const FIN_EMOJIS: Record<string, string> = {
  single: "1️⃣",
  twin: "2️⃣",
  thruster: "3️⃣",
  quad: "4️⃣",
  five_fin: "5️⃣",
  no_fins: "🚫",
};

function StepFins({ value, onChange }: { value: FinSetup; onChange: (v: FinSetup) => void }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4">Pick your fin setup</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {FIN_SETUPS.map((f) => (
          <OptionCard
            key={f.value}
            selected={value === f.value}
            onClick={() => onChange(f.value)}
            title={f.label}
            description={f.description}
            emoji={FIN_EMOJIS[f.value] ?? "🏄"}
          />
        ))}
      </div>
    </div>
  );
}

function StepColor({ value, onChange }: { value: string; onChange: (v: string) => void }) {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4">Choose your board colour</h3>
      <div className="grid grid-cols-4 gap-4 mb-6">
        {BOARD_COLORS.map((c) => (
          <button
            key={c.value}
            onClick={() => onChange(c.value)}
            title={c.label}
            className={`relative h-14 w-full rounded-xl border-4 transition ${
              value === c.value
                ? "border-sky-500 scale-110 shadow-lg"
                : "border-transparent hover:border-slate-300 hover:scale-105"
            }`}
            style={{ backgroundColor: c.value }}
          >
            {value === c.value && (
              <span className="absolute inset-0 flex items-center justify-center text-lg drop-shadow-md">
                ✓
              </span>
            )}
          </button>
        ))}
      </div>
      <div className="flex items-center gap-3 bg-slate-50 rounded-xl p-3">
        <label className="text-sm font-semibold text-slate-600 shrink-0">Custom HEX:</label>
        <input
          type="color"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="h-10 w-10 rounded cursor-pointer border-0"
        />
        <input
          type="text"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder="#000000"
          className="flex-1 bg-white rounded-lg border border-slate-200 px-3 py-2 text-sm font-mono text-slate-700 focus:outline-none focus:ring-2 focus:ring-sky-300"
        />
        <div
          className="h-10 w-10 rounded-lg border border-slate-200 shrink-0"
          style={{ backgroundColor: value }}
        />
      </div>
    </div>
  );
}

function StepDetails({
  order,
  onNameChange,
  onEmailChange,
  onInstructionsChange,
}: {
  order: SurfboardOrder;
  onNameChange: (v: string) => void;
  onEmailChange: (v: string) => void;
  onInstructionsChange: (v: string) => void;
}) {
  return (
    <div>
      <h3 className="text-lg font-bold text-slate-800 mb-4">Your details & custom notes</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
            Your Name *
          </label>
          <input
            type="text"
            value={order.customerName}
            onChange={(e) => onNameChange(e.target.value)}
            placeholder="John Smith"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
            Email Address *
          </label>
          <input
            type="email"
            value={order.customerEmail}
            onChange={(e) => onEmailChange(e.target.value)}
            placeholder="you@example.com"
            className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300"
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1.5 block">
          Custom Instructions (optional)
        </label>
        <textarea
          value={order.customInstructions}
          onChange={(e) => onInstructionsChange(e.target.value)}
          placeholder="Tell us anything extra — unique artwork, specific rocker profile, special glass job, etc."
          rows={4}
          className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-300 resize-none"
        />
      </div>
      {/* Order summary */}
      <div className="mt-4 bg-sky-50 rounded-xl p-4 text-sm">
        <p className="font-semibold text-sky-700 mb-2">📋 Order Summary</p>
        <div className="grid grid-cols-2 gap-x-4 gap-y-1 text-slate-600">
          <span>Shape:</span><span className="font-medium text-slate-800 capitalize">{order.shape}</span>
          <span>Length:</span><span className="font-medium text-slate-800">{order.lengthFt}&apos;{order.lengthIn}&quot;</span>
          <span>Material:</span><span className="font-medium text-slate-800 capitalize">{order.material.replace("_", " ")}</span>
          <span>Fins:</span><span className="font-medium text-slate-800 capitalize">{order.fins.replace("_", " ")}</span>
          <span>Colour:</span>
          <span className="flex items-center gap-2">
            <span className="inline-block h-4 w-4 rounded-full border border-slate-200" style={{ backgroundColor: order.color }} />
            <span className="font-mono text-xs">{order.color}</span>
          </span>
        </div>
      </div>
    </div>
  );
}
