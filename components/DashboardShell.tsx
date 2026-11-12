"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { DashboardSidebar } from "@/components/DashboardSidebar";
import { DashboardHeader } from "@/components/DashboardHeader";
import { useAuth } from "@/context/AuthContext";

interface DashboardShellProps {
  mode: "candidate" | "employer";
  children: React.ReactNode;
}

export function DashboardShell({ mode, children }: DashboardShellProps) {
  const { user, isHydrated, loginAsCandidate, loginAsEmployer } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Seamless demo session hydration when navigating directly to a dashboard route
  useEffect(() => {
    if (!isHydrated) return;
    if (!user || user.role !== mode) {
      if (mode === "candidate") {
        loginAsCandidate();
      } else {
        loginAsEmployer();
      }
    }
  }, [isHydrated, user, mode, loginAsCandidate, loginAsEmployer]);

  return (
    <div className="flex min-h-screen bg-warm-ivory">
      {/* Desktop Sidebar */}
      <aside className="hidden w-64 shrink-0 border-r border-sand-border bg-pure-white lg:block">
        <div className="sticky top-0 h-screen overflow-y-auto">
          <DashboardSidebar mode={mode} />
        </div>
      </aside>

      {/* Mobile Collapsible Sidebar Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setMobileMenuOpen(false)}
            className="fixed inset-0 z-50 bg-warm-charcoal/60 backdrop-blur-sm lg:hidden"
          >
            <motion.div
              initial={{ x: "-100%" }}
              animate={{ x: 0 }}
              exit={{ x: "-100%" }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              className="relative h-full w-72 border-r border-sand-border bg-pure-white shadow-modal"
            >
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                aria-label="Close sidebar"
                className="absolute right-3 top-4 flex h-8 w-8 items-center justify-center rounded-full border border-sand-border text-warm-charcoal"
              >
                <X className="h-4 w-4" />
              </button>
              <DashboardSidebar
                mode={mode}
                onNavigate={() => setMobileMenuOpen(false)}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content Column */}
      <div className="flex min-w-0 flex-1 flex-col">
        <DashboardHeader
          mode={mode}
          onOpenMobileMenu={() => setMobileMenuOpen(true)}
        />
        <main className="mx-auto w-full max-w-[1200px] flex-1 px-4 py-8 sm:px-6 lg:px-8">
          {children}
        </main>
      </div>
    </div>
  );
}

