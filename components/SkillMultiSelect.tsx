"use client";

import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown } from "lucide-react";
import { SKILL_OPTIONS } from "@/lib/helpers";

interface SkillMultiSelectProps {
  selectedSkills: string[];
  onChange: (skills: string[]) => void;
  label?: string;
}

export function SkillMultiSelect({
  selectedSkills,
  onChange,
  label = "Skills",
}: SkillMultiSelectProps) {
  const [open, setOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const onClickOutside = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", onClickOutside);
    return () => document.removeEventListener("mousedown", onClickOutside);
  }, []);

  const toggleSkill = (skill: string) => {
    if (selectedSkills.includes(skill)) {
      onChange(selectedSkills.filter((s) => s !== skill));
    } else {
      onChange([...selectedSkills, skill]);
    }
  };

  return (
    <div ref={containerRef} className="relative">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        aria-expanded={open}
        className="flex h-11 w-full items-center justify-between gap-2 rounded-xl border border-sand-border bg-pure-white px-3.5 text-sm text-warm-charcoal transition hover:border-muted-sage"
      >
        <span className="truncate">
          {selectedSkills.length === 0
            ? `${label}: All`
            : `${label} (${selectedSkills.length})`}
        </span>
        <ChevronDown
          className={`h-4 w-4 shrink-0 text-secondary-text transition-transform duration-200 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 6 }}
            transition={{ duration: 0.16 }}
            className="absolute left-0 top-full z-30 mt-2 w-60 rounded-2xl border border-sand-border bg-pure-white p-2 shadow-editorial"
          >
            <div className="max-h-60 space-y-0.5 overflow-y-auto">
              {SKILL_OPTIONS.map((skill) => {
                const selected = selectedSkills.includes(skill);
                return (
                  <button
                    key={skill}
                    type="button"
                    onClick={() => toggleSkill(skill)}
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm transition ${
                      selected
                        ? "bg-soft-sage font-medium text-deep-forest"
                        : "text-warm-charcoal hover:bg-muted-sand/60"
                    }`}
                  >
                    <span>{skill}</span>
                    {selected && <Check className="h-4 w-4 text-deep-forest" />}
                  </button>
                );
              })}
            </div>
            {selectedSkills.length > 0 && (
              <button
                type="button"
                onClick={() => onChange([])}
                className="mt-1.5 w-full rounded-xl border-t border-sand-border pt-2 pb-1 text-center text-xs font-medium text-secondary-text hover:text-deep-forest"
              >
                Clear selected skills
              </button>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

