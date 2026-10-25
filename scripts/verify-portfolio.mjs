import fs from "fs";
import path from "path";
import http from "http";
import assert from "assert";

console.log("=== STARTING PORTFOLIO VERIFICATION SUITE ===\n");

let passed = 0;
let failed = 0;

function test(name, fn) {
  try {
    fn();
    console.log(`✓ PASS: ${name}`);
    passed++;
  } catch (err) {
    console.error(`✗ FAIL: ${name}`);
    console.error(`  Error: ${err.message}`);
    failed++;
  }
}

// 1. File existence checks
test("Critical asset files exist", () => {
  const files = [
    "package.json",
    "tsconfig.json",
    "tailwind.config.ts",
    "next.config.mjs",
    "public/resume.pdf",
    "Sanjeeva_Kumar_MD_Resume.docx",
    "public/assets/resume/Sanjeeva_Kumar_MD_Resume.docx",
    "public/robots.txt",
    "public/sitemap.xml",
    "src/app/layout.tsx",
    "src/app/page.tsx",
    "src/app/globals.css",
    "src/data/portfolioData.ts",
    "src/components/Navbar.tsx",
    "src/components/Hero.tsx",
    "src/components/FeaturedProject.tsx",
    "src/components/ProjectGrid.tsx",
    "src/components/About.tsx",
    "src/components/Skills.tsx",
    "src/components/Contact.tsx",
    "src/components/Footer.tsx",
  ];

  for (const f of files) {
    const full = path.join(process.cwd(), f);
    assert(fs.existsSync(full), `Missing file: ${f}`);
  }
});

// 2. Resume PDF verification
test("Resume PDF is non-empty and contains valid PDF header", () => {
  const pdfPath = path.join(process.cwd(), "public", "resume.pdf");
  const stats = fs.statSync(pdfPath);
  assert(stats.size > 1000, `PDF size too small: ${stats.size} bytes`);
  const buf = fs.readFileSync(pdfPath);
  assert(buf.subarray(0, 5).toString("utf8") === "%PDF-", "Invalid PDF magic header");
});

// 3. Resume DOCX verification
test("Resume DOCX is non-empty and contains valid ZIP header", () => {
  const docxPath = path.join(process.cwd(), "Sanjeeva_Kumar_MD_Resume.docx");
  const stats = fs.statSync(docxPath);
  assert(stats.size > 500, `DOCX size too small: ${stats.size} bytes`);
  const buf = fs.readFileSync(docxPath);
  assert(buf[0] === 0x50 && buf[1] === 0x4b, "Invalid ZIP/DOCX header");
});

// 4. Verification of Master Prompt requirements in portfolioData.ts
test("portfolioData.ts contains exact required strings and no exaggerations", () => {
  const dataContent = fs.readFileSync(path.join(process.cwd(), "src/data/portfolioData.ts"), "utf8");

  // Personal Information
  assert(dataContent.includes("Sanjeeva Kumar MD"), "Missing full name");
  assert(dataContent.includes("Full-Stack Developer · Video Editor"), "Missing professional title");
  assert(dataContent.includes("Bengaluru, India"), "Missing location");
  assert(dataContent.includes("sanjeevakumarmd119@gmail.com"), "Missing email");
  assert(dataContent.includes("+91 8217572608"), "Missing phone");
  assert(dataContent.includes("linkedin.com/in/sanjeeva-kumar-m-d-4b9473294"), "Missing LinkedIn URL");
  assert(dataContent.includes("github.com/sanjeevakumarmd119-blip"), "Missing GitHub URL");

  // Hero Headlines & Quotes
  assert(dataContent.includes("I build ideas into something real."), "Missing main hero headline");
  assert(dataContent.includes("I enjoy learning new technologies, building useful applications"), "Missing hero supporting text");

  // Featured Project: UCHN
  assert(dataContent.includes("UCHN — Unified Care & Health Network"), "Missing UCHN title");
  assert(dataContent.includes("Connected healthcare. Simplified for everyone."), "Missing UCHN tagline");
  assert(dataContent.includes("Next.js"), "Missing Next.js in UCHN tech");
  assert(dataContent.includes("PostgreSQL"), "Missing PostgreSQL in UCHN tech");
  assert(dataContent.includes("Prisma"), "Missing Prisma in UCHN tech");
  assert(dataContent.includes("Socket.IO"), "Missing Socket.IO in UCHN tech");

  // Additional Projects
  assert(dataContent.includes("Hand Gesture Recognition AI"), "Missing Hand Gesture Recognition AI project");
  assert(dataContent.includes("Production Scheduling System for Dynamic Manufacturing"), "Missing Production Scheduling System");
  assert(dataContent.includes("IoT and Interactive Projects"), "Missing IoT and Interactive Projects");
  assert(dataContent.includes("Arduino"), "Missing Arduino mention");
  assert(dataContent.includes("ESP32"), "Missing ESP32 mention");

  // About and Skills
  assert(dataContent.includes("A LITTLE ABOUT ME"), "Missing about label");
  assert(dataContent.includes("Curious by nature. A builder by habit."), "Missing about headline");
  assert(dataContent.includes("B.Tech in Information Technology (AR/VR)"), "Missing degree");
  assert(dataContent.includes("Alliance University"), "Missing university");
  assert(dataContent.includes("DaVinci Resolve"), "Missing DaVinci Resolve");

  // Skill categories
  assert(dataContent.includes("DEVELOPMENT"), "Missing DEVELOPMENT skill category");
  assert(dataContent.includes("BACKEND AND DATA"), "Missing BACKEND AND DATA skill category");
  assert(dataContent.includes("HARDWARE AND IOT"), "Missing HARDWARE AND IOT skill category");
  assert(dataContent.includes("CREATIVE"), "Missing CREATIVE skill category");
  assert(dataContent.includes("CURRENTLY EXPLORING"), "Missing CURRENTLY EXPLORING skill category");
});

// 5. Verification of Next.js static build output
test(".next production build artifacts exist and index page is prerendered", () => {
  const htmlPath = path.join(process.cwd(), ".next", "server", "app", "index.html");
  assert(fs.existsSync(htmlPath), "Missing .next/server/app/index.html production artifact");
  const html = fs.readFileSync(htmlPath, "utf8");

  // Verify critical elements in prerendered HTML
  assert(html.includes("Sanjeeva Kumar MD"), "Prerendered HTML missing name");
  assert(html.includes("I build ideas into"), "Prerendered HTML missing hero headline");
  assert(html.includes("UCHN"), "Prerendered HTML missing UCHN");
  assert(html.includes("Hand Gesture Recognition AI"), "Prerendered HTML missing Hand Gesture Recognition");
  assert(html.includes("Production Scheduling System"), "Prerendered HTML missing Production Scheduling");
  assert(html.includes("IoT and Interactive Projects"), "Prerendered HTML missing IoT Projects");
  assert(html.includes("Alliance University"), "Prerendered HTML missing Alliance University");
  assert(html.includes("DaVinci Resolve"), "Prerendered HTML missing DaVinci Resolve");
  assert(html.includes("sanjeevakumarmd119@gmail.com"), "Prerendered HTML missing email link");
  assert(html.includes("resume.pdf"), "Prerendered HTML missing resume link");
});

// 6. Check that forbidden patterns are NOT present
test("Forbidden AI-cliche patterns and Three.js bloat are NOT present", () => {
  const codeFiles = [
    "src/app/page.tsx",
    "src/app/layout.tsx",
    "src/components/Hero.tsx",
    "src/components/FeaturedProject.tsx",
    "src/components/ProjectGrid.tsx",
    "src/components/About.tsx",
    "src/components/Skills.tsx",
    "src/components/Contact.tsx",
    "src/components/Footer.tsx",
  ];

  const forbiddenStrings = [
    "Passionate about innovation",
    "Pushing the boundaries of technology",
    "Transforming the digital landscape",
    "World-class developer",
    "Industry-leading solutions",
    "Revolutionary applications",
    "@react-three/fiber",
    "three",
    "Canvas",
    "timeline.png",
  ];

  for (const f of codeFiles) {
    const full = path.join(process.cwd(), f);
    const content = fs.readFileSync(full, "utf8");
    for (const forbidden of forbiddenStrings) {
      assert(!content.includes(forbidden), `Found forbidden string "${forbidden}" in ${f}`);
    }
  }
});

console.log(`\nVerification Summary: ${passed} Passed, ${failed} Failed`);
if (failed > 0) {
  process.exit(1);
} else {
  console.log("All portfolio verification tests passed successfully!\n");
}
