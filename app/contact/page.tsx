"use client";

import React, { useState } from "react";
import { CheckCircle2, Mail, MapPin, Send } from "lucide-react";
import { useToast } from "@/components/ToastProvider";

export default function ContactPage() {
  const { showToast } = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [topic, setTopic] = useState("General inquiry");
  const [message, setMessage] = useState("");
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;
    setSent(true);
    showToast("Message received (demo simulation).", "success");
  };

  return (
    <div className="mx-auto max-w-[1000px] px-4 py-12 sm:px-6 lg:px-8 lg:py-20">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <span className="inline-flex rounded-full bg-soft-sage px-3.5 py-1 text-xs font-semibold text-deep-forest">
            Contact InternMe
          </span>
          <h1 className="mt-4 font-heading text-3xl font-semibold tracking-tight text-warm-charcoal sm:text-4xl">
            Let&apos;s start a conversation.
          </h1>
          <p className="mt-3 text-sm leading-relaxed text-secondary-text">
            Questions about SignMeUp Sprints, university partnerships, or how
            candidate privacy works? Reach our team anytime.
          </p>

          <div className="mt-8 space-y-4 text-sm text-warm-charcoal">
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pure-white border border-sand-border text-deep-forest">
                <Mail className="h-4 w-4" />
              </span>
              <span>hello@internme.example</span>
            </div>
            <div className="flex items-center gap-3">
              <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-pure-white border border-sand-border text-deep-forest">
                <MapPin className="h-4 w-4" />
              </span>
              <span>Distributed across Lahore, Islamabad &amp; Remote</span>
            </div>
          </div>
        </div>

        <div className="rounded-panel border border-sand-border bg-pure-white p-6 sm:p-8 lg:col-span-7">
          {sent ? (
            <div className="py-10 text-center">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-soft-sage text-deep-forest">
                <CheckCircle2 className="h-6 w-6" />
              </div>
              <h2 className="mt-4 font-heading text-xl font-semibold text-warm-charcoal">
                Thanks for reaching out, {name}.
              </h2>
              <p className="mt-2 text-sm text-secondary-text">
                Your note has been logged in this frontend demonstration.
              </p>
              <button
                type="button"
                onClick={() => {
                  setSent(false);
                  setMessage("");
                }}
                className="mt-6 rounded-xl border border-sand-border px-4 py-2 text-sm font-medium text-warm-charcoal hover:bg-muted-sand"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-warm-charcoal">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Alex Rivera"
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-charcoal">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="alex@example.com"
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-charcoal">
                  Topic
                </label>
                <select
                  value={topic}
                  onChange={(e) => setTopic(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-3.5 text-sm focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                >
                  <option>General inquiry</option>
                  <option>Employer onboarding</option>
                  <option>Candidate privacy &amp; safety</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-warm-charcoal">
                  Message
                </label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us how we can help..."
                  className="mt-1.5 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 py-3 text-sm focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>
              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-deep-forest px-5 py-3 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
              >
                <Send className="h-4 w-4" />
                <span>Send Message</span>
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}

