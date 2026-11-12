"use client";

import React from "react";
import { MotionConfig } from "framer-motion";
import { ToastProvider } from "@/components/ToastProvider";
import { AuthProvider } from "@/context/AuthContext";
import { FavoritesProvider } from "@/context/FavoritesContext";
import { DemoStateProvider } from "@/context/DemoStateContext";
import { LoadingScreen } from "@/components/LoadingScreen";
import { VideoPlayerModal } from "@/components/VideoPlayerModal";
import { LoginRequiredModal } from "@/components/LoginRequiredModal";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";

export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ToastProvider>
        <AuthProvider>
          <FavoritesProvider>
            <DemoStateProvider>
              <LoadingScreen />
              <div className="flex min-h-screen flex-col bg-warm-ivory text-warm-charcoal">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
              </div>
              <VideoPlayerModal />
              <LoginRequiredModal />
            </DemoStateProvider>
          </FavoritesProvider>
        </AuthProvider>
      </ToastProvider>
    </MotionConfig>
  );
}

