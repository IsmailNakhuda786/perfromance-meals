import { useState } from "react";
import { Page } from "@/data";

interface Props {
  navigate: (page: Page) => void;
}

const AMOUNTS = [25, 50, 100, 150];

export default function GiftCardPage({ navigate }: Props) {
  const [amount, setAmount] = useState(50);
  const [recipientEmail, setRecipientEmail] = useState("");
  const [senderName, setSenderName] = useState("");
  const [message, setMessage] = useState("");
  const [delivery, setDelivery] = useState<"email" | "physical">("email");

  const finalAmount = amount + (delivery === "physical" ? 5 : 0);

  return (
    <div className="min-h-screen bg-[#F7F5F0]">
      {/* Hero */}
      <div className="max-w-[640px] mx-auto px-6 pt-20 pb-12 text-center">
        <div className="inline-block font-mono text-[10px] tracking-[0.35em] uppercase text-[#888] border border-[#D0CCC4] px-4 py-1.5 mb-6">
          Gift Cards
        </div>
        <h1 className="font-display text-[48px] font-bold leading-tight mb-4">
          Give the gift of<br />performance.
        </h1>
        <p className="text-[#666] text-[16px] leading-relaxed max-w-[480px] mx-auto">
          Fresher gift cards can be used across Ready-to-Go meals, Build-A-Box, and Meal Plan subscriptions.
        </p>
      </div>

      <div className="max-w-[560px] mx-auto px-6 pb-24">

        {/* Amount selection */}
        <div className="mb-8">
          <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#888] mb-3">Select Amount</p>
          <div className="grid grid-cols-4 gap-3">
            {AMOUNTS.map((a) => (
              <button
                key={a}
                onClick={() => setAmount(a)}
                className={`py-4 text-center border-2 transition-all font-bold text-[16px] ${amount === a ? "border-[#F2C94C] bg-white text-[#111]" : "border-[#D0CCC4] bg-white text-[#555] hover:border-[#111]"}`}
              >
                ${a}
              </button>
            ))}
          </div>
        </div>

        {/* Recipient form */}
        <div className="mb-8 space-y-3">
          <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#888] mb-3">Recipient Details</p>
          <input
            type="email"
            placeholder="Recipient email"
            value={recipientEmail}
            onChange={(e) => setRecipientEmail(e.target.value)}
            className="w-full border border-[#D0CCC4] bg-white px-4 py-3.5 text-[14px] outline-none focus:border-[#111] transition-colors"
          />
          <input
            type="text"
            placeholder="Your name"
            value={senderName}
            onChange={(e) => setSenderName(e.target.value)}
            className="w-full border border-[#D0CCC4] bg-white px-4 py-3.5 text-[14px] outline-none focus:border-[#111] transition-colors"
          />
          <textarea
            placeholder="Personal message (optional)"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={3}
            className="w-full border border-[#D0CCC4] bg-white px-4 py-3.5 text-[14px] outline-none focus:border-[#111] transition-colors resize-none"
          />
        </div>

        {/* Delivery options */}
        <div className="mb-8">
          <p className="text-[11px] font-mono tracking-[0.2em] uppercase text-[#888] mb-3">Delivery Method</p>
          <div className="grid grid-cols-2 gap-3">
            {(["email", "physical"] as const).map((opt) => (
              <button
                key={opt}
                onClick={() => setDelivery(opt)}
                className={`py-3.5 px-4 border text-[13px] transition-all text-left ${delivery === opt ? "bg-[#111] text-white border-[#111]" : "bg-white border-[#D0CCC4] text-[#333] hover:border-[#111]"}`}
              >
                <div className="font-medium">{opt === "email" ? "Email delivery" : "Physical card"}</div>
                <div className={`text-[11px] mt-0.5 ${delivery === opt ? "text-white/50" : "text-[#aaa]"}`}>
                  {opt === "email" ? "Instant" : "+$5 delivery"}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Buy button */}
        <button className="w-full bg-[#F2C94C] text-[#111] py-4 text-[14px] font-bold tracking-[0.15em] uppercase hover:bg-[#e6b93a] transition-colors mb-3">
          Send ${finalAmount} Gift Card →
        </button>
        <p className="text-[#aaa] text-[12px] text-center">
          Gift cards never expire. Recipient receives an email with a unique code.
        </p>
      </div>
    </div>
  );
}
