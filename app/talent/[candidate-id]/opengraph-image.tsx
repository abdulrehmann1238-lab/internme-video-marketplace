import { ImageResponse } from "next/og";
import { getCandidateById } from "@/data/candidates";
import { formatPublicName } from "@/lib/helpers";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ "candidate-id": string }>;
}) {
  const { "candidate-id": candidateId } = await params;
  const candidate = getCandidateById(candidateId);
  const publicName = candidate
    ? formatPublicName(candidate.firstName, candidate.lastInitial)
    : "Emerging Talent";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          backgroundColor: "#FAF9F5",
          color: "#252923",
          padding: "64px",
          border: "12px solid #264A3B",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <span
            style={{
              fontSize: 28,
              fontWeight: 700,
              color: "#264A3B",
            }}
          >
            InternMe · 30s Introduction
          </span>
          <span
            style={{
              fontSize: 20,
              backgroundColor: "#EAF0E9",
              color: "#264A3B",
              padding: "8px 18px",
              borderRadius: 999,
            }}
          >
            {candidate?.availability || "Available"}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          <div style={{ display: "flex", fontSize: 64, fontWeight: 700 }}>
            {publicName}
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#74786F" }}>
            {`${candidate?.title || "Startup Maker"} · ${candidate?.location || "Remote"}`}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {(candidate?.skills || ["UI/UX", "React"]).slice(0, 4).map((s) => (
            <span
              key={s}
              style={{
                fontSize: 22,
                backgroundColor: "#FFFFFF",
                border: "2px solid #E9E7DF",
                padding: "10px 20px",
                borderRadius: 12,
              }}
            >
              {s}
            </span>
          ))}
        </div>
      </div>
    ),
    { ...size }
  );
}

