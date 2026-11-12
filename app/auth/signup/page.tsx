"use client";

import React, { Suspense, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { ArrowRight, Building2, UserCheck } from "lucide-react";
import { BrandLogo } from "@/components/BrandLogo";
import { EditorialImage } from "@/components/EditorialImage";
import { useAuth } from "@/context/AuthContext";
import { useToast } from "@/components/ToastProvider";

const SIGNUP_EDITORIAL_IMAGE =
  "https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=1200&q=80";

function SignupContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { loginWithForm } = useAuth();
  const { showToast } = useToast();

  const initialRole =
    searchParams.get("role") === "employer" ? "employer" : "candidate";

  const [role, setRole] = useState<"candidate" | "employer">(initialRole);
  const [fullName, setFullName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [termsAccepted, setTermsAccepted] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const param = searchParams.get("role");
    if (param === "employer" || param === "candidate") {
      setRole(param);
    }
  }, [searchParams]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    if (!termsAccepted) {
      setError("Please accept the Terms and Privacy Policy to continue.");
      return;
    }

    loginWithForm({
      email: email || "demo@internme.example",
      role,
      fullName:
        fullName.trim() ||
        (role === "candidate" ? "Sarah Javed" : "Nadia Hassan"),
      companyName: companyName.trim() || "Northstar Labs",
    });

    showToast(
      `Account ready! Welcome to your ${
        role === "candidate" ? "Candidate" : "Employer"
      } dashboard.`,
      "success"
    );
    router.push(
      role === "candidate" ? "/dashboard/talent" : "/dashboard/employer"
    );
  };

  const handleOAuthSignup = (provider: "Google" | "GitHub") => {
    loginWithForm({
      email:
        role === "candidate"
          ? "sarah.j@internme.example"
          : "team@northstarlabs.example",
      role,
      fullName: role === "candidate" ? "Sarah Javed" : "Nadia Hassan",
      companyName: companyName.trim() || "Northstar Labs",
    });
    showToast(`Signed up with ${provider} (${role} demo).`, "success");
    router.push(
      role === "candidate" ? "/dashboard/talent" : "/dashboard/employer"
    );
  };

  return (
    <div className="mx-auto max-w-[1280px] px-4 py-8 sm:px-6 lg:px-8 lg:py-12">
      <div className="grid min-h-[720px] grid-cols-1 overflow-hidden rounded-panel border border-sand-border bg-pure-white shadow-editorial lg:grid-cols-12">
        {/* Left Editorial Panel */}
        <div className="relative flex flex-col justify-between bg-deep-forest p-8 text-warm-ivory sm:p-10 lg:col-span-5">
          <div>
            <BrandLogo inverted size="md" />
            <h1 className="mt-8 font-heading text-3xl font-semibold leading-tight tracking-tight">
              Start with one real introduction.
            </h1>
            <p className="mt-3 text-sm leading-relaxed text-warm-ivory/80">
              Join emerging designers, engineers, and strategists meeting
              startup teams across 3–12 month Internships and 1–8 week SignMeUp
              Sprints.
            </p>
          </div>

          <div className="mt-8 overflow-hidden rounded-2xl border border-warm-ivory/20">
            <EditorialImage
              src={SIGNUP_EDITORIAL_IMAGE}
              alt="Minimalist startup workspace"
              className="aspect-[16/10] w-full object-cover opacity-85"
            />
            <div className="bg-warm-charcoal/85 px-4 py-3 text-xs text-warm-ivory/90">
              Public identities stay masked as First Name + Last Initial until
              mutual consent.
            </div>
          </div>
        </div>

        {/* Right Form Panel */}
        <div className="flex flex-col justify-center p-6 sm:p-10 lg:col-span-7 lg:px-14">
          <div className="mx-auto w-full max-w-md">
            <h2 className="font-heading text-2xl font-semibold tracking-tight text-warm-charcoal">
              Join InternMe
            </h2>
            <p className="mt-1.5 text-sm text-secondary-text">
              Select your path to create your demonstration account.
            </p>

            {/* Account Type Selection */}
            <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              <button
                type="button"
                onClick={() => setRole("candidate")}
                className={`flex flex-col items-start rounded-2xl border p-4 text-left transition ${
                  role === "candidate"
                    ? "border-deep-forest bg-soft-sage/60 ring-1 ring-deep-forest"
                    : "border-sand-border bg-warm-ivory/40 hover:border-muted-sage"
                }`}
              >
                <UserCheck className="h-5 w-5 text-deep-forest" />
                <span className="mt-2.5 text-sm font-semibold text-warm-charcoal">
                  I&apos;m looking for opportunities
                </span>
                <span className="mt-0.5 text-xs text-secondary-text">
                  Record a 30s reel &amp; apply
                </span>
              </button>

              <button
                type="button"
                onClick={() => setRole("employer")}
                className={`flex flex-col items-start rounded-2xl border p-4 text-left transition ${
                  role === "employer"
                    ? "border-deep-forest bg-soft-sage/60 ring-1 ring-deep-forest"
                    : "border-sand-border bg-warm-ivory/40 hover:border-muted-sage"
                }`}
              >
                <Building2 className="h-5 w-5 text-deep-forest" />
                <span className="mt-2.5 text-sm font-semibold text-warm-charcoal">
                  I&apos;m hiring talent
                </span>
                <span className="mt-0.5 text-xs text-secondary-text">
                  Discover reels &amp; post roles
                </span>
              </button>
            </div>

            <form onSubmit={handleSubmit} className="mt-6 space-y-4">
              <div>
                <label
                  htmlFor="signup-name"
                  className="block text-sm font-medium text-warm-charcoal"
                >
                  Full Name
                </label>
                <input
                  id="signup-name"
                  type="text"
                  required
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder={
                    role === "candidate" ? "Sarah Javed" : "Nadia Hassan"
                  }
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>

              {role === "employer" && (
                <div>
                  <label
                    htmlFor="signup-company"
                    className="block text-sm font-medium text-warm-charcoal"
                  >
                    Company / Studio Name
                  </label>
                  <input
                    id="signup-company"
                    type="text"
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                    placeholder="Northstar Labs"
                    className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                  />
                </div>
              )}

              <div>
                <label
                  htmlFor="signup-email"
                  className="block text-sm font-medium text-warm-charcoal"
                >
                  Email
                </label>
                <input
                  id="signup-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={
                    role === "candidate"
                      ? "sarah@example.com"
                      : "founder@startup.example"
                  }
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>

              <div>
                <label
                  htmlFor="signup-password"
                  className="block text-sm font-medium text-warm-charcoal"
                >
                  Password
                </label>
                <input
                  id="signup-password"
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Minimum 8 characters"
                  className="mt-1.5 h-11 w-full rounded-xl border border-sand-border bg-warm-ivory/60 px-4 text-sm text-warm-charcoal focus:border-deep-forest focus:bg-pure-white focus:outline-none"
                />
              </div>

              <label className="flex cursor-pointer items-start gap-2.5 text-xs text-secondary-text">
                <input
                  type="checkbox"
                  checked={termsAccepted}
                  onChange={(e) => setTermsAccepted(e.target.checked)}
                  className="mt-0.5 h-4 w-4 rounded border-sand-border accent-deep-forest"
                />
                <span>
                  I accept the{" "}
                  <Link href="/terms" className="text-deep-forest underline">
                    Terms
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-deep-forest underline">
                    Privacy Commitments
                  </Link>
                  .
                </span>
              </label>

              {error && (
                <p className="text-xs font-medium text-red-700">{error}</p>
              )}

              <button
                type="submit"
                className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-deep-forest px-5 py-3 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
              >
                <span>Create Demo Account</span>
                <ArrowRight className="h-4 w-4" />
              </button>
            </form>

            <div className="my-5 flex items-center gap-3">
              <div className="h-px flex-1 bg-sand-border" />
              <span className="text-xs text-secondary-text">or sign up with</span>
              <div className="h-px flex-1 bg-sand-border" />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <button
                type="button"
                onClick={() => handleOAuthSignup("Google")}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-sand-border bg-pure-white text-sm font-medium text-warm-charcoal transition hover:bg-muted-sand/60"
              >
                <span className="font-heading font-bold text-deep-forest">
                  G
                </span>
                <span>Google</span>
              </button>
              <button
                type="button"
                onClick={() => handleOAuthSignup("GitHub")}
                className="flex h-11 items-center justify-center gap-2 rounded-xl border border-sand-border bg-pure-white text-sm font-medium text-warm-charcoal transition hover:bg-muted-sand/60"
              >
                <span className="font-mono text-xs font-bold">GH</span>
                <span>GitHub</span>
              </button>
            </div>

            <p className="mt-6 text-center text-sm text-secondary-text">
              Already have an account?{" "}
              <Link
                href="/auth/login"
                className="font-semibold text-deep-forest hover:underline"
              >
                Log in
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function SignupPage() {
  return (
    <Suspense
      fallback={
        <div className="mx-auto max-w-[1280px] px-4 py-12 text-center text-sm text-secondary-text">
          Loading signup...
        </div>
      }
    >
      <SignupContent />
    </Suspense>
  );
}

