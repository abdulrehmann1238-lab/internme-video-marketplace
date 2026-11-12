import { ImageResponse } from "next/og";
import { getOpportunityBySlug } from "@/data/opportunities";
import { getTrackBadgeLabel } from "@/lib/helpers";

export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function OpenGraphImage({
  params,
}: {
  params: Promise<{ "job-slug": string }>;
}) {
  const { "job-slug": jobSlug } = await params;
  const opp = getOpportunityBySlug(jobSlug);

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
            InternMe · Opportunity
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
            {opp ? getTrackBadgeLabel(opp.track) : "Startup Role"}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
          <div
            style={{
              display: "flex",
              fontSize: 30,
              color: "#264A3B",
              fontWeight: 600,
            }}
          >
            {opp?.companyName || "Startup Team"}
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 58,
              fontWeight: 700,
              lineHeight: 1.1,
            }}
          >
            {opp?.title || "Startup Opportunity"}
          </div>
          <div style={{ display: "flex", fontSize: 26, color: "#74786F" }}>
            {opp
              ? `${opp.duration} · ${opp.location} (${opp.workArrangement})`
              : "Apply directly on InternMe"}
          </div>
        </div>

        <div style={{ display: "flex", gap: 12 }}>
          {(opp?.skills || ["React", "Design"]).slice(0, 4).map((s) => (
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

