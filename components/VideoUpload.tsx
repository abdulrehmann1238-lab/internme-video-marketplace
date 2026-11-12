"use client";

import React, { useRef, useState } from "react";
import { motion } from "framer-motion";
import {
  AlertCircle,
  CheckCircle2,
  Film,
  RefreshCw,
  ShieldCheck,
  Trash2,
  UploadCloud,
} from "lucide-react";
import {
  validateReelDuration,
  validateReelFileMeta,
} from "@/lib/validation";
import { formatBytes } from "@/lib/helpers";
import { useDemoState } from "@/context/DemoStateContext";
import { useToast } from "@/components/ToastProvider";
import { AgeVerificationModal } from "@/components/AgeVerificationModal";

const UPLOAD_STAGES = [
  "Validating your video.",
  "Preparing secure upload.",
  "Uploading reel.",
  "Processing video.",
  "Generating thumbnail.",
  "Ready to publish.",
];

export function VideoUpload() {
  const { candidates, updateCandidateProfile } = useDemoState();
  const { showToast } = useToast();
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const currentCandidate =
    candidates.find((c) => c.id === "sarah-j") || candidates[0];

  const [dragActive, setDragActive] = useState(false);
  const [selectedFile, setSelectedFile] = useState<{
    name: string;
    size: number;
    duration: number;
    previewUrl?: string;
  } | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [stageIndex, setStageIndex] = useState<number>(-1);
  const [progressPct, setProgressPct] = useState(0);
  const [ageModalOpen, setAgeModalOpen] = useState(false);
  const [published, setPublished] = useState(true);

  const runSimulatedPipeline = (fileData: {
    name: string;
    size: number;
    duration: number;
    previewUrl?: string;
  }) => {
    setErrorMsg(null);
    setPublished(false);
    setSelectedFile(fileData);
    setStageIndex(0);
    setProgressPct(12);

    UPLOAD_STAGES.forEach((_, idx) => {
      window.setTimeout(() => {
        setStageIndex(idx);
        setProgressPct(Math.round(((idx + 1) / UPLOAD_STAGES.length) * 100));
      }, idx * 450);
    });
  };

  const processLocalFile = (file: File) => {
    setErrorMsg(null);
    const metaCheck = validateReelFileMeta({
      name: file.name,
      size: file.size,
      type: file.type,
    });

    if (!metaCheck.isValid) {
      setErrorMsg(metaCheck.error || "Invalid video file.");
      return;
    }

    const objectUrl = URL.createObjectURL(file);
    const videoEl = document.createElement("video");
    videoEl.preload = "metadata";
    videoEl.src = objectUrl;

    videoEl.onloadedmetadata = () => {
      const duration = Math.round(videoEl.duration);
      const durationCheck = validateReelDuration(videoEl.duration);
      if (!durationCheck.isValid) {
        URL.revokeObjectURL(objectUrl);
        setErrorMsg(
          durationCheck.error || "Your reel needs to be 30 seconds or shorter."
        );
        return;
      }

      runSimulatedPipeline({
        name: file.name,
        size: file.size,
        duration: Math.max(1, duration),
        previewUrl: objectUrl,
      });
    };

    videoEl.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      setErrorMsg(
        "Unable to read video metadata in this browser. Please select a valid MP4, MOV, or WebM file."
      );
    };
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setDragActive(false);
    const file = e.dataTransfer.files?.[0];
    if (file) processLocalFile(file);
  };

  const handleSamplePreset = (preset: "valid" | "too-long" | "too-large") => {
    setErrorMsg(null);
    if (preset === "too-large") {
      const res = validateReelFileMeta({
        name: "intro-4k-export.mp4",
        size: 31 * 1024 * 1024,
        type: "video/mp4",
      });
      setErrorMsg(res.error || null);
      return;
    }
    if (preset === "too-long") {
      const res = validateReelDuration(42);
      setErrorMsg(res.error || null);
      return;
    }
    runSimulatedPipeline({
      name: "sarah-j-product-intro.mp4",
      size: 11.4 * 1024 * 1024,
      duration: 26,
    });
  };

  const handleConfirmPublish = () => {
    setAgeModalOpen(false);
    setPublished(true);
    if (selectedFile) {
      updateCandidateProfile(currentCandidate.id, {
        reelDuration: selectedFile.duration,
        ...(selectedFile.previewUrl
          ? { videoUrl: selectedFile.previewUrl }
          : {}),
      });
    }
    showToast("Your introduction is ready to be discovered.", "success");
  };

  const handleRemoveVideo = () => {
    if (selectedFile?.previewUrl) {
      URL.revokeObjectURL(selectedFile.previewUrl);
    }
    setSelectedFile(null);
    setStageIndex(-1);
    setProgressPct(0);
    setPublished(false);
    setErrorMsg(null);
    updateCandidateProfile(currentCandidate.id, { videoUrl: undefined });
    showToast("Draft video cleared.", "info");
  };

  const isReadyToPublish =
    selectedFile !== null && stageIndex === UPLOAD_STAGES.length - 1;

  return (
    <div className="space-y-6">
      {/* Dropzone */}
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setDragActive(true);
        }}
        onDragLeave={() => setDragActive(false)}
        onDrop={handleDrop}
        className={`rounded-panel border-2 border-dashed p-8 text-center transition ${
          dragActive
            ? "border-deep-forest bg-soft-sage/50"
            : "border-sand-border bg-pure-white hover:border-muted-sage"
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".mp4,.mov,.webm,video/mp4,video/quicktime,video/webm"
          onChange={(e) => {
            const file = e.target.files?.[0];
            if (file) processLocalFile(file);
            e.target.value = "";
          }}
          className="hidden"
        />

        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-2xl bg-soft-sage text-deep-forest">
          <UploadCloud className="h-6 w-6" />
        </div>

        <h2 className="mt-4 font-heading text-lg font-semibold text-warm-charcoal">
          Drag your video here or browse files.
        </h2>
        <p className="mt-1.5 text-sm text-secondary-text">
          Accepted formats: MP4, MOV, WebM · Max 25 MB · Max 30 seconds
        </p>

        <div className="mt-5 flex flex-wrap items-center justify-center gap-3">
          <button
            type="button"
            onClick={() => fileInputRef.current?.click()}
            className="rounded-xl bg-deep-forest px-5 py-2.5 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover"
          >
            Select Video File
          </button>
          <button
            type="button"
            onClick={() => handleSamplePreset("valid")}
            className="rounded-xl border border-sand-border bg-warm-ivory px-4 py-2.5 text-xs font-semibold text-warm-charcoal transition hover:border-deep-forest"
          >
            Simulate Valid 26s Upload
          </button>
          <button
            type="button"
            onClick={() => handleSamplePreset("too-long")}
            className="rounded-xl border border-sand-border bg-pure-white px-3 py-2.5 text-xs font-medium text-secondary-text transition hover:text-warm-charcoal"
          >
            Test &gt;30s Guard
          </button>
          <button
            type="button"
            onClick={() => handleSamplePreset("too-large")}
            className="rounded-xl border border-sand-border bg-pure-white px-3 py-2.5 text-xs font-medium text-secondary-text transition hover:text-warm-charcoal"
          >
            Test &gt;25MB Guard
          </button>
        </div>
      </div>

      {/* Validation Error Alert */}
      {errorMsg && (
        <div
          role="alert"
          className="flex items-start gap-3 rounded-2xl border border-red-200 bg-red-50 p-4 text-sm text-red-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <div>
            <p className="font-semibold">Video cannot be uploaded</p>
            <p className="mt-0.5 text-xs">{errorMsg}</p>
          </div>
        </div>
      )}

      {/* Active Upload Progress & Preview */}
      {selectedFile && (
        <div className="rounded-panel border border-sand-border bg-pure-white p-6">
          <div className="flex flex-col justify-between gap-4 border-b border-sand-border pb-4 sm:flex-row sm:items-center">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-soft-sage text-deep-forest">
                <Film className="h-5 w-5" />
              </div>
              <div>
                <p className="font-heading text-sm font-semibold text-warm-charcoal">
                  {selectedFile.name}
                </p>
                <p className="text-xs text-secondary-text">
                  {formatBytes(selectedFile.size)} · {selectedFile.duration}s
                  duration · Checks passed
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="inline-flex items-center gap-1.5 rounded-xl border border-sand-border bg-warm-ivory px-3 py-2 text-xs font-medium text-warm-charcoal hover:border-deep-forest"
              >
                <RefreshCw className="h-3.5 w-3.5" />
                <span>Replace video</span>
              </button>
              <button
                type="button"
                onClick={handleRemoveVideo}
                className="inline-flex items-center gap-1.5 rounded-xl border border-sand-border bg-pure-white px-3 py-2 text-xs font-medium text-secondary-text hover:text-red-700"
              >
                <Trash2 className="h-3.5 w-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>

          {/* Preview + Simulated Cloudflare Stream Steps */}
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-12">
            <div className="md:col-span-5">
              {selectedFile.previewUrl ? (
                <video
                  src={selectedFile.previewUrl}
                  controls
                  playsInline
                  className="aspect-[3/4] max-h-72 w-full rounded-2xl bg-warm-charcoal object-cover"
                />
              ) : (
                <div className="relative aspect-[3/4] max-h-72 w-full overflow-hidden rounded-2xl border border-sand-border bg-muted-sand">
                  <img
                    src={currentCandidate.thumbnailUrl}
                    alt="Generated reel thumbnail preview"
                    className="h-full w-full object-cover object-top"
                  />
                  <div className="absolute bottom-3 left-3 rounded-full bg-warm-charcoal/80 px-3 py-1 text-[11px] font-medium text-warm-ivory">
                    Generated Thumbnail · {selectedFile.duration}s
                  </div>
                </div>
              )}
            </div>

            <div className="flex flex-col justify-between md:col-span-7">
              <div>
                <div className="flex items-center justify-between text-xs font-semibold text-warm-charcoal">
                  <span>Simulated Cloudflare Stream Workflow</span>
                  <span>{progressPct}%</span>
                </div>
                <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-muted-sand">
                  <motion.div
                    initial={{ width: "0%" }}
                    animate={{ width: `${progressPct}%` }}
                    transition={{ duration: 0.35 }}
                    className="h-full rounded-full bg-deep-forest"
                  />
                </div>

                <ul className="mt-4 space-y-2">
                  {UPLOAD_STAGES.map((stage, idx) => {
                    const done = stageIndex >= idx;
                    return (
                      <li
                        key={stage}
                        className={`flex items-center gap-2.5 text-xs ${
                          done
                            ? "font-medium text-warm-charcoal"
                            : "text-secondary-text/60"
                        }`}
                      >
                        <CheckCircle2
                          className={`h-4 w-4 shrink-0 ${
                            done ? "text-deep-forest" : "text-sand-border"
                          }`}
                        />
                        <span>{stage}</span>
                      </li>
                    );
                  })}
                </ul>
              </div>

              <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-sand-border pt-4">
                <span className="text-[11px] text-secondary-text">
                  Demo note: simulates signed direct upload &amp; HLS edge
                  transcoding.
                </span>

                {published ? (
                  <span className="inline-flex items-center gap-1.5 rounded-xl bg-soft-sage px-4 py-2.5 text-xs font-semibold text-deep-forest">
                    <ShieldCheck className="h-4 w-4" />
                    Your introduction is ready to be discovered.
                  </span>
                ) : (
                  <button
                    type="button"
                    disabled={!isReadyToPublish}
                    onClick={() => setAgeModalOpen(true)}
                    className="rounded-xl bg-deep-forest px-5 py-2.5 text-sm font-semibold text-warm-ivory transition hover:bg-deep-forest-hover disabled:cursor-not-allowed disabled:opacity-45"
                  >
                    Publish Video Reel
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Existing Published Status Banner */}
      {!selectedFile && published && (
        <div className="flex flex-col justify-between gap-4 rounded-panel border border-sand-border bg-pure-white p-6 sm:flex-row sm:items-center">
          <div className="flex items-center gap-3.5">
            <span className="flex h-11 w-11 items-center justify-center rounded-full bg-soft-sage text-deep-forest">
              <CheckCircle2 className="h-5 w-5" />
            </span>
            <div>
              <p className="font-heading text-base font-semibold text-warm-charcoal">
                Current Active Reel ({currentCandidate.reelDuration}s)
              </p>
              <p className="text-xs text-secondary-text">
                Your introduction is ready to be discovered on InternMe.
              </p>
            </div>
          </div>
          <span className="rounded-full bg-soft-sage px-3.5 py-1 text-xs font-semibold text-deep-forest">
            Published · 18+ Confirmed
          </span>
        </div>
      )}

      <AgeVerificationModal
        isOpen={ageModalOpen}
        onClose={() => setAgeModalOpen(false)}
        onConfirm={handleConfirmPublish}
      />
    </div>
  );
}

