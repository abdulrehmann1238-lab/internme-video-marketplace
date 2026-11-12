"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowRight, Building2, CheckCircle2, UserCheck } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { EditorialImage } from "@/components/EditorialImage";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ToastProvider";

const AUTH_EDITORIAL_IMAGE =
  "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=1200&q=80";

export default function LoginPage() {
  const router = useRouter();
  const { loginWithForm, loginAsCandidate, loginAsEmployer } = useAuth();
  const { showToast } = useToast();

  const [role, setRole] = useState<"candidate" | "employer">("candidate");
  const [email, setEmail] = useState("sarah.j@internme.example");
  const [password, setPassword] = useState("••••••••••••");
  const [rememberMe, setRememberMe] = useState(true);
  const [forgotNotice, setForgotNotice] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    loginWithForm({ email, role });
    showToast(
      `Welcome back! Signed in as ${
        role === "candidate" ? "Candidate" : "Employer"
      }.`,
      "success"
    );
    router.push(
      role === "candidate" ? "/dashboard/talent" : "/dashboard/employer"
    );
  };

  const handleOAuthMock = (provider: "Google" | "GitHub") => {
    if (role === "candidate") {
      loginAsCandidate();
    } else {
      loginAsEmployer();
    }
    showToast(`Signed in via ${provider} (${role} demo).`, "success");
    router.push(
      role === "candidate" ? "/dashboard/talent" : "/dashboard/employer"
    );
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid min-h-[680px] grid-cols-1 overflow-hidden rounded-panel border border-sand-border bg-pure-white shadow-editorial lg:grid-cols-12">
        {/* Left Editorial Panel */}
        <div className="relative flex flex-col justify-between bg-deep-forest p-8 text-warm-ivory sm:p-10 lg:col-span-5">
          <div className="relative z-10">
            <BrandLogo inverted size="md" />
            <h1 className="mt-8 font-heading text-3xl font-semibold leading-tight tracking-tight">
              Where authentic 30-second introductions open real startup doors.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-warm-ivory/80">
              Sign in to manage your video reel, review applications, or connect
              with emerging makers under the Mutual Growth Compact.
            </p>
          </div>

          <div className="relative z-10 mt-8 overflow-hidden rounded-2xl border border-warm-ivory/20">
            <EditorialImage
              src={AUTH_EDITORIAL_IMAGE}
              alt="Startup builders collaborating"
              className="aspect-[16/10] w-full object-cover opacity-85"
            />
            <div className="bg-warm-charcoal/85 px-4 py-3 text-xs text-warm-ivory/90">
              Frontend Demo · Instant switching between Candidate and Employer
              workspaces.
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-warm-charcoal">
              Log in to InternMe
            </h2>
            <p className="mt-1.5 text-sm text-secondary-text">
              Choose which demo experience to enter, or sign in with your
              credentials.
            </p>

            {/* Role Toggle for Demo Login */}
            <div className="mt-6 grid grid-cols-2 gap-2.5 rounded-2xl border border-sand-border bg-warm-ivory p-1.5">
              <button
                type="button"
                onClick={() => {
                  setRole("candidate");
                  setEmail("sarah.j@internme.example");
                }}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition ${
                  role === "candidate"
                    ? "bg-deep-forest text-warm-ivory shadow-sm"
                    : "text-secondary-text hover:text-warm-charcoal"
                }`}
              >
                <UserCheck className="h-3.5 w-3.5" />
                <span>Candidate</span>
              </button>
              <button
                type="button"
                onClick={() => {
                  setRole("employer");
                  setEmail("team@northstarlabs.example");
                }}
                className={`flex items-center justify-center gap-2 rounded-xl py-2.5 text-xs font-semibold transition ${
                  role === "employer"
                    ? "bg-deep-forest text-warm-ivory shadow-sm"
                    : "text-secondary-text hover:text-warm-charcoal"
                }`}
              >
                <Building2 className="h-3.5 w-3.5" />
                <span>Employer</span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="login-email"
                  className="block text-sm font-medium text-warm-charcoal"
                >
                  Email
                </label>
                <input
                  id="login-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="login-password"
                    className="block text-sm font-medium text-warm-charcoal"
                  >
                    Password
                  </label>
                  <button
                    type="button"
                    onClick={() => setForgotNotice(true)}
                    className="text-xs font-medium text-deep-forest hover:underline"
                  >
                    Forgot password?
                  </button>
                </div>
                <input
                  id="login-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>

              {forgotNotice && (
                <div className="flex items-center gap-2 rounded-xl border border-deep-forest/20 bg-soft-sage px-3.5 py-2.5 text-xs text-deep-forest">
                  <CheckCircle2 className="h-4 w-4 shrink-0" />
                  <span>
                    Demo mode: Use any password or one-click role sign-in below.
                  </span>
                </div>
              )}

              <label className="flex cursor-pointer items-center gap-2.5 text-xs text-secondary-text">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                  className="h-4 w-4 rounded border-sand-border accent-deep-forest"
                />
                <span>Remember me on this browser</span>
              </label>

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-deep-forest px-5 py-3 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
              >
                <span>Log In</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-sand-border" />
              <span className="text-xs text-secondary-text">
                or continue with
              </span>
              <div className="h-px flex-1 bg-sand-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleOAuthMock("Google")}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-sand-border bg-pure-white text-sm font-medium text-warm-charcoal transition hover:bg-muted-sand/60"
              >
                <span className="font-heading font-bold text-deep-forest">
                  G
                </span>
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleOAuthMock("GitHub")}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-sand-border bg-pure-white text-sm font-medium text-warm-charcoal transition hover:bg-muted-sand/60"
              >
                <span className="font-mono text-xs font-bold">GH</span>
                <span>GitHub</span>
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-secondary-text">
              New to InternMe?{" "}
              <Link
                href="/auth/signup"
                className="font-semibold text-deep-forest hover:underline"
              >
                Create an account
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

