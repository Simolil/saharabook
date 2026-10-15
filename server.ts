import express from "express";
import path from "path";
import fs from "fs";
import { createServer as createViteServer, ViteDevServer } from "vite";
import dotenv from "dotenv";
import { STRUCTURED_PROGRAMS, getProgramBySlug } from "./src/data/bivouacNomadesPrograms";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json({ limit: "50mb" }));
app.use(express.urlencoded({ limit: "50mb", extended: true }));
// Serve static images with explicit no-cache headers so replaced images show immediately on refresh
app.use("/images", (req, res, next) => {
  res.setHeader("Cache-Control", "no-cache, no-store, must-revalidate");
  res.setHeader("Pragma", "no-cache");
  res.setHeader("Expires", "0");
  next();
}, express.static(path.join(process.cwd(), "public", "images")));

app.use(express.static(path.join(process.cwd(), "public")));

// API Routes
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", time: new Date().toISOString() });
});

// Image Upload Endpoint for Destination & Lodge Portfolio
app.post("/api/upload-lodge-image", (req, res) => {
  try {
    const { destination, lodge, filename, base64Data } = req.body;
    if (!destination || !lodge || !filename || !base64Data) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const safeDest = destination.replace(/[^a-zA-Z0-9_-]/g, "");
    const safeLodge = lodge.replace(/[^a-zA-Z0-9_-]/g, "");
    const safeFilename = path.basename(filename).replace(/[^a-zA-Z0-9._-]/g, "");

    const cleanBase64 = base64Data.replace(/^data:image\/\w+;base64,/, "");
    const buffer = Buffer.from(cleanBase64, "base64");

    // 1. Write to public/
    const publicTargetDir = path.join(process.cwd(), "public", "images", "destinations", safeDest, safeLodge);
    if (!fs.existsSync(publicTargetDir)) {
      fs.mkdirSync(publicTargetDir, { recursive: true });
    }
    const publicFilePath = path.join(publicTargetDir, safeFilename);
    fs.writeFileSync(publicFilePath, buffer);

    // 2. Also write to dist/ (so production build serves it instantly without rebuilding)
    const distTargetDir = path.join(process.cwd(), "dist", "images", "destinations", safeDest, safeLodge);
    if (fs.existsSync(path.join(process.cwd(), "dist"))) {
      if (!fs.existsSync(distTargetDir)) {
        fs.mkdirSync(distTargetDir, { recursive: true });
      }
      fs.writeFileSync(path.join(distTargetDir, safeFilename), buffer);
    }

    // 3. Also write to src/assets/images/ (permanent code backup)
    const assetsDir = path.join(process.cwd(), "src", "assets", "images");
    if (fs.existsSync(assetsDir)) {
      fs.writeFileSync(path.join(assetsDir, `${safeLodge}_${safeFilename}`), buffer);
    }

    const publicUrl = `/images/destinations/${safeDest}/${safeLodge}/${safeFilename}`;
    console.log(`[Upload] Synchronized image to public, dist, and assets (${buffer.length} bytes)`);

    return res.json({ success: true, url: publicUrl, size: buffer.length, version: Date.now() });
  } catch (err: any) {
    console.error("[Upload] Error:", err);
    return res.status(500).json({ error: err.message });
  }
});

// Pre-render & SEO Injector for Crawlers and Search Engines
function renderPreRenderedHtml(urlPath: string, rawHtml: string): string {
  const cleanPath = urlPath.split("?")[0].toLowerCase();
  let modifiedHtml = rawHtml;

  // 1. Program Pages: /foum-zguid/:slug or /programs/:slug
  const isProgramRoute = (cleanPath.startsWith('/foum-zguid/') && cleanPath.length > '/foum-zguid/'.length) ||
                         (cleanPath.startsWith('/programs/') && cleanPath.length > '/programs/'.length);
  const programSlug = isProgramRoute ? cleanPath.replace(/^\/(foum-zguid|programs)\//, "").replace(/\/$/, "") : "";
  const program = programSlug ? getProgramBySlug(programSlug) : undefined;
  
  if (program) {
    const seoTitle = `${program.seoTitle} | Dunecamps`;
    const metaDesc = program.metaDescription;
    const pageUrl = `https://www.dunecamps.com${program.path}`;

    // Replace Title
    modifiedHtml = modifiedHtml.replace(
      /<title>.*?<\/title>/i,
      `<title>${seoTitle}</title>`
    );

    // Replace Meta Description
    modifiedHtml = modifiedHtml.replace(
      /<meta\s+name="description"\s+content=".*?"\s*\/?>/i,
      `<meta name="description" content="${metaDesc}" />`
    );

    // Replace Canonical
    modifiedHtml = modifiedHtml.replace(
      /<link\s+rel="canonical"\s+href=".*?"\s*\/?>/i,
      `<link rel="canonical" href="${pageUrl}" />`
    );

    // Inject Pre-rendered Semantic HTML inside #root so crawlers receive complete content
    const semanticBody = `
      <div id="root">
        <article class="ssr-pre-rendered" style="max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem; font-family: system-ui, -apple-system, sans-serif; color: #0B132B;">
          <header style="margin-bottom: 2rem; border-bottom: 1px solid #BA7517/20; padding-bottom: 1.5rem;">
            <p style="color: #BA7517; font-weight: bold; text-transform: uppercase; font-size: 0.85rem; letter-spacing: 0.05em; margin: 0 0 0.5rem 0;">
              ${program.campName} · ${program.destination}
            </p>
            <h1 style="font-size: 2.25rem; line-height: 1.2; margin: 0 0 1rem 0; font-family: Georgia, serif;">
              ${program.title}
            </h1>
            <p style="font-size: 1.1rem; color: #4b5563; margin: 0 0 1rem 0;">
              <strong>Duration:</strong> ${program.durationLabel} | 
              <strong>Official Direct Price:</strong> ${program.pricePerPerson} € / person | 
              <strong>Rating:</strong> ${program.rating} / 5.0 (${program.reviewCount} verified reviews)
            </p>
            <p style="font-size: 1rem; line-height: 1.6; color: #374151;">
              ${program.editorialSummary}
            </p>
          </header>

          <section style="margin-bottom: 2rem;">
            <h2 style="font-size: 1.5rem; font-family: Georgia, serif; color: #0B132B; margin-bottom: 1rem;">
              Key Experience Highlights
            </h2>
            <ul style="line-height: 1.8; color: #374151;">
              ${program.highlights.map(h => `<li>${h}</li>`).join("")}
            </ul>
          </section>

          <section style="margin-bottom: 2rem;">
            <h2 style="font-size: 1.5rem; font-family: Georgia, serif; color: #0B132B; margin-bottom: 1rem;">
              Day-by-Day Expedition Itinerary
            </h2>
            ${program.itinerary.map(day => `
              <div style="background: #faf7f2; border: 1px solid #e5e7eb; border-radius: 12px; padding: 1.25rem; margin-bottom: 1rem;">
                <h3 style="margin: 0 0 0.5rem 0; font-size: 1.15rem; color: #0B132B;">
                  Day ${day.day}: ${day.title}
                </h3>
                <p style="color: #6b7280; font-size: 0.85rem; margin: 0 0 0.75rem 0;">
                  <strong>Sector:</strong> ${day.location} | <strong>Meals:</strong> ${day.mealsIncluded.join(", ")}
                </p>
                <p style="margin: 0 0 0.75rem 0; line-height: 1.6; color: #374151;">
                  ${day.description}
                </p>
                ${day.activities && day.activities.length ? `
                  <p style="font-size: 0.85rem; color: #4b5563; margin: 0;">
                    <strong>Activities:</strong> ${day.activities.join(" • ")}
                  </p>
                ` : ""}
              </div>
            `).join("")}
          </section>

          <section style="margin-bottom: 2rem; display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem;">
            <div style="background: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 12px; padding: 1.25rem;">
              <h3 style="color: #166534; margin: 0 0 0.75rem 0; font-size: 1rem; text-transform: uppercase;">
                Included in the ${program.pricePerPerson} € Price
              </h3>
              <ul style="line-height: 1.6; font-size: 0.9rem; color: #1f2937; padding-left: 1.25rem;">
                ${program.inclusions.map(inc => `<li>${inc}</li>`).join("")}
              </ul>
            </div>
            <div style="background: #f9fafb; border: 1px solid #e5e7eb; border-radius: 12px; padding: 1.25rem;">
              <h3 style="color: #4b5563; margin: 0 0 0.75rem 0; font-size: 1rem; text-transform: uppercase;">
                Excluded / Not Included
              </h3>
              <ul style="line-height: 1.6; font-size: 0.9rem; color: #4b5563; padding-left: 1.25rem;">
                ${program.exclusions.map(exc => `<li>${exc}</li>`).join("")}
              </ul>
            </div>
          </section>

          ${program.operatorQuestions && program.operatorQuestions.length ? `
            <section style="background: #fffbeb; border: 1px solid #fde68a; border-radius: 12px; padding: 1.25rem; margin-bottom: 2rem;">
              <h3 style="color: #92400e; margin: 0 0 0.5rem 0; font-size: 1.05rem;">
                Dunecamps Direct Operator Verification
              </h3>
              ${program.operatorQuestions.map(q => `
                <div style="margin-top: 0.5rem;">
                  <strong style="color: #78350f;">${q.issue}:</strong>
                  <p style="margin: 0.25rem 0 0 0; color: #92400e; font-size: 0.9rem;">${q.clarification}</p>
                </div>
              `).join("")}
            </section>
          ` : ""}

          <section style="margin-bottom: 2rem;">
            <h2 style="font-size: 1.35rem; font-family: Georgia, serif; color: #0B132B; margin-bottom: 0.75rem;">
              Good to Know Before You Go
            </h2>
            <p style="font-size: 0.9rem; color: #374151;"><strong>Meeting:</strong> ${program.goodToKnow.meetingLocation} (${program.goodToKnow.meetingTime})</p>
            <p style="font-size: 0.9rem; color: #374151;"><strong>Luggage:</strong> ${program.goodToKnow.luggagePolicy}</p>
            <p style="font-size: 0.9rem; color: #374151;"><strong>Connectivity:</strong> ${program.goodToKnow.connectivity}</p>
          </section>

          <footer style="margin-top: 3rem; padding-top: 1.5rem; border-top: 1px solid #e5e7eb; font-size: 0.85rem; color: #9ca3af;">
            <p>© 2026 Dunecamps · Morocco's physically inspected desert network.</p>
          </footer>
        </article>
      </div>
    `;

    modifiedHtml = modifiedHtml.replace('<div id="root"></div>', semanticBody);
    return modifiedHtml;
  }

  // 2. Foum Zguid Destination Hub (/destinations/foum-zguid or /foum-zguid)
  if (cleanPath.includes("foum-zguid") || cleanPath.includes("foumzguid")) {
    const fzTitle = "Foum Zguid & Erg Chegaga Desert Camps | Dunecamps Verified";
    const fzDesc = "Discover verified desert camps in Foum Zguid, the authentic gateway to Lake Iriki and the towering dunes of Erg Chegaga. Physically inspected, direct rates.";

    modifiedHtml = modifiedHtml.replace(/<title>.*?<\/title>/i, `<title>${fzTitle}</title>`);
    modifiedHtml = modifiedHtml.replace(/<meta\s+name="description"\s+content=".*?"\s*\/?>/i, `<meta name="description" content="${fzDesc}" />`);

    const fzSemantic = `
      <div id="root">
        <main class="ssr-pre-rendered" style="max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem; font-family: system-ui, -apple-system, sans-serif; color: #0B132B;">
          <header style="margin-bottom: 2rem;">
            <h1 style="font-size: 2.5rem; font-family: Georgia, serif; margin: 0 0 1rem 0;">Foum Zguid: The Wild Gateway to Erg Chegaga & Lake Iriki</h1>
            <p style="font-size: 1.1rem; line-height: 1.6; color: #4b5563;">
              Unlike overcrowded desert hubs, Foum Zguid provides pristine off-road access to Morocco's most expansive sand dunes. Explore Lake Iriki dry salt flats, Devonian fossil beds, and authentic Berber camps.
            </p>
          </header>
          <section style="margin-bottom: 2rem;">
            <h2 style="font-size: 1.5rem; font-family: Georgia, serif;">Verified Erg Chegaga Programs from Foum Zguid</h2>
            <ul style="line-height: 1.8;">
              ${STRUCTURED_PROGRAMS.map(p => `
                <li>
                  <a href="${p.path}" style="color: #BA7517; font-weight: bold;">${p.title}</a> — ${p.durationLabel} (${p.pricePerPerson} €/pers)
                  <p style="margin: 0.25rem 0 0.75rem 0; font-size: 0.9rem; color: #4b5563;">${p.editorialSummary}</p>
                </li>
              `).join("")}
            </ul>
          </section>
        </main>
      </div>
    `;

    modifiedHtml = modifiedHtml.replace('<div id="root"></div>', fzSemantic);
    return modifiedHtml;
  }

  // 3. Default Homepage Pre-rendering
  const homeSemantic = `
    <div id="root">
      <main class="ssr-pre-rendered" style="max-width: 1100px; margin: 0 auto; padding: 2rem 1.5rem; font-family: system-ui, -apple-system, sans-serif; color: #0B132B;">
        <header style="margin-bottom: 2rem; text-align: center;">
          <h1 style="font-size: 2.5rem; font-family: Georgia, serif; margin: 0 0 1rem 0;">Dunecamps — Morocco's Verified Desert Network</h1>
          <p style="font-size: 1.15rem; line-height: 1.6; color: #4b5563; max-width: 800px; margin: 0 auto;">
            Physically inspected luxury and authentic desert camps across Foum Zguid (Erg Chegaga), Merzouga (Erg Chebbi), Zagora (Draa Valley), and Agafay (Stone Desert).
          </p>
        </header>
        <section style="margin-top: 2rem;">
          <h2 style="font-size: 1.5rem; font-family: Georgia, serif;">Curated Erg Chegaga Expeditions from Foum Zguid</h2>
          <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 1.5rem; margin-top: 1rem;">
            ${STRUCTURED_PROGRAMS.map(p => `
              <div style="background: #faf7f2; border: 1px solid #e5e7eb; border-radius: 12px; padding: 1.25rem;">
                <h3 style="margin: 0 0 0.5rem 0;"><a href="${p.path}" style="color: #0B132B; text-decoration: none;">${p.title}</a></h3>
                <p style="color: #BA7517; font-weight: bold; margin: 0 0 0.5rem 0;">${p.durationLabel} · From ${p.pricePerPerson} €</p>
                <p style="font-size: 0.85rem; color: #6b7280; margin: 0;">${p.cardHighlights.join(" • ")}</p>
              </div>
            `).join("")}
          </div>
        </section>
      </main>
    </div>
  `;

  modifiedHtml = modifiedHtml.replace('<div id="root"></div>', homeSemantic);
  return modifiedHtml;
}

// Conditionally start dev/production serving block if not on Vercel serverless
async function startServer() {
  let vite: ViteDevServer | null = null;

  if (process.env.NODE_ENV !== "production") {
    vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "custom",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath, { index: false }));
  }

  // Unified HTML Route Handler with dynamic SEO and pre-rendered semantic HTML
  app.get("*", async (req, res, next) => {
    // If it's an API route or file with an extension, pass through
    if (req.path.startsWith("/api") || path.extname(req.path)) {
      return next();
    }

    try {
      let rawTemplate = "";
      if (process.env.NODE_ENV !== "production" && vite) {
        const indexPath = path.join(process.cwd(), "index.html");
        rawTemplate = await fs.promises.readFile(indexPath, "utf-8");
        rawTemplate = await vite.transformIndexHtml(req.originalUrl, rawTemplate);
      } else {
        const distIndexPath = path.join(process.cwd(), "dist", "index.html");
        rawTemplate = await fs.promises.readFile(distIndexPath, "utf-8");
      }

      const preRenderedHtml = renderPreRenderedHtml(req.path, rawTemplate);
      res.status(200).set({ "Content-Type": "text/html" }).end(preRenderedHtml);
    } catch (e) {
      if (vite) vite.ssrFixStacktrace(e as Error);
      next(e);
    }
  });

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Dunecamps Server running on http://localhost:${PORT}`);
  });
}

if (!process.env.VERCEL) {
  startServer();
}

export default app;
