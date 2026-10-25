import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

async function generateResume() {
  const pdfDoc = await PDFDocument.create();
  // Standard Letter page: 612 x 792 pt
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);

  // Palette: Clean editorial styling with coral-red accent
  const cDark = rgb(0.09, 0.09, 0.09); // #171717
  const cSecondary = rgb(0.39, 0.39, 0.39); // #646464
  const cMuted = rgb(0.54, 0.54, 0.54);
  const cAccent = rgb(0.94, 0.27, 0.27); // #F04444 (Coral-red)
  const cRule = rgb(0.9, 0.9, 0.9); // #E5E5E5

  let y = height - 42;
  const marginX = 44;
  const contentWidth = width - marginX * 2;

  // Header: Name
  page.drawText("SANJEEVA KUMAR MD", {
    x: marginX,
    y,
    size: 20,
    font: fontBold,
    color: cDark,
  });
  y -= 16;

  // Title / Subhead
  page.drawText("Full-Stack Developer  ·  Video Editor  ·  Creative Technologist", {
    x: marginX,
    y,
    size: 10,
    font: fontBold,
    color: cAccent,
  });
  y -= 13;

  // Contact Info row
  const contactText = "Bengaluru, Karnataka, India   |   +91 8217572608   |   sanjeevakumarmd119@gmail.com";
  page.drawText(contactText, {
    x: marginX,
    y,
    size: 8.8,
    font: fontRegular,
    color: cSecondary,
  });
  y -= 12;

  // Links row
  const linksText = "LinkedIn: linkedin.com/in/sanjeeva-kumar-m-d-4b9473294   |   GitHub: github.com/sanjeevakumarmd119-blip";
  page.drawText(linksText, {
    x: marginX,
    y,
    size: 8.5,
    font: fontRegular,
    color: cSecondary,
  });
  y -= 10;

  // Divider line
  page.drawLine({
    start: { x: marginX, y },
    end: { x: width - marginX, y },
    thickness: 1,
    color: cRule,
  });
  y -= 14;

  function drawSectionHeader(title) {
    page.drawText(title.toUpperCase(), {
      x: marginX,
      y,
      size: 9.5,
      font: fontBold,
      color: cDark,
    });
    y -= 4;
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 0.8,
      color: cAccent,
    });
    y -= 10;
  }

  function wrapAndDrawText(text, fontSize, font, color, lineGap = 11) {
    const words = text.split(" ");
    let line = "";
    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const textW = font.widthOfTextAtSize(testLine, fontSize);
      if (textW > contentWidth && line) {
        page.drawText(line, { x: marginX, y, size: fontSize, font, color });
        y -= lineGap;
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, { x: marginX, y, size: fontSize, font, color });
      y -= lineGap;
    }
  }

  function drawBullet(title, desc) {
    const bullet = "• ";
    const bulletW = fontBold.widthOfTextAtSize(bullet, 8.5);
    page.drawText(bullet, { x: marginX + 2, y, size: 8.5, font: fontBold, color: cAccent });

    const prefix = title ? `${title}: ` : "";
    const fullText = prefix + desc;
    const words = fullText.split(" ");
    let line = "";
    const indent = marginX + 2 + bulletW;
    const maxW = contentWidth - 12;

    for (const word of words) {
      const testLine = line ? `${line} ${word}` : word;
      const testW = fontRegular.widthOfTextAtSize(testLine, 8.5);
      if (testW > maxW && line) {
        page.drawText(line, { x: indent, y, size: 8.5, font: fontRegular, color: cSecondary });
        y -= 10.5;
        line = word;
      } else {
        line = testLine;
      }
    }
    if (line) {
      page.drawText(line, { x: indent, y, size: 8.5, font: fontRegular, color: cSecondary });
      y -= 11;
    }
  }

  // 1. EDUCATION
  drawSectionHeader("Education");
  page.drawText("Alliance University, Bengaluru", {
    x: marginX,
    y,
    size: 9.5,
    font: fontBold,
    color: cDark,
  });
  const degreeText = "B.Tech in Information Technology (AR/VR)";
  page.drawText(degreeText, {
    x: width - marginX - fontRegular.widthOfTextAtSize(degreeText, 8.8),
    y,
    size: 8.8,
    font: fontRegular,
    color: cSecondary,
  });
  y -= 14;

  // 2. PROFESSIONAL SUMMARY
  drawSectionHeader("Professional Summary");
  const summaryText =
    "Full-stack developer and video editor focused on building practical web applications, interactive systems, and hardware-software prototypes. Experienced in React, Next.js, TypeScript, PostgreSQL, and microcontroller systems (Arduino & ESP32). Intermediate video editor proficient in DaVinci Resolve with a strong grasp of narrative pacing and workflows. Passionate about applying new technologies to real-world problems with engineering clarity.";
  wrapAndDrawText(summaryText, 8.6, fontRegular, cSecondary, 11);
  y -= 4;

  // 3. FEATURED PROJECT
  drawSectionHeader("Featured Project Experience");
  page.drawText("UCHN — Unified Care & Health Network", {
    x: marginX,
    y,
    size: 9.5,
    font: fontBold,
    color: cDark,
  });
  const uchnRole = "Full-Stack Healthcare Coordination Platform & PWA";
  page.drawText(uchnRole, {
    x: width - marginX - fontOblique.widthOfTextAtSize(uchnRole, 8),
    y,
    size: 8,
    font: fontOblique,
    color: cMuted,
  });
  y -= 11;

  page.drawText("Tech Stack: Next.js 14, React 18, TypeScript, Tailwind CSS, PostgreSQL, Prisma ORM, Socket.IO, JWT, Zod", {
    x: marginX,
    y,
    size: 8,
    font: fontBold,
    color: cSecondary,
  });
  y -= 10;

  drawBullet("Doctor Discovery & Booking", "Engineered clinic and doctor search with specialty filtering, transparent consultation fees, and slot conflict prevention.");
  drawBullet("Pharmacy & Inventory Lookup", "Implemented real-time medicine inventory tracking with pickup/delivery selection and transactional integrity.");
  drawBullet("Live Clinic Queue & Emergency SOS", "Created live waiting queue updates via Socket.IO and a structured 5-stage emergency dispatch workflow.");
  drawBullet("PWA & Security Architecture", "Built installable Progressive Web App with service-worker caching, Role-Based Access Control (RBAC), and JWT authentication.");
  y -= 4;

  // 4. SELECTED PROJECTS
  drawSectionHeader("Selected Projects");
  drawBullet("Hand Gesture Recognition AI", "Computer vision model utilizing Python, OpenCV, and MediaPipe for real-time hand gesture tracking and contactless input recognition.");
  drawBullet("Production Scheduling System", "Manufacturing dispatch application optimizing machine sequence allocation, job scheduling, and bottleneck minimization.");
  drawBullet("IoT & Connected Device Prototypes", "Engineered embedded telemetry systems using ESP32 & Arduino microcontrollers, environmental sensor arrays (I2C/SPI), and live data streaming.");
  y -= 4;

  // 5. TECHNICAL SKILLS & TOOLS
  drawSectionHeader("Technical Skills");
  const skillLines = [
    { cat: "Development", items: "Python, Java, C, HTML, CSS, React, Next.js, TypeScript, Tailwind CSS" },
    { cat: "Backend & Data", items: "PostgreSQL, Prisma, REST APIs, Socket.IO, Node.js" },
    { cat: "Hardware & IoT", items: "Arduino, ESP32, Sensor-based projects, I2C/SPI Interfacing" },
    { cat: "Creative", items: "DaVinci Resolve, Video editing, Editing workflows, Narrative pacing" },
    { cat: "Currently Exploring", items: "AI-assisted workflows, Developer productivity, Practical automation" },
  ];

  for (const s of skillLines) {
    page.drawText(`${s.cat}: `, {
      x: marginX,
      y,
      size: 8.5,
      font: fontBold,
      color: cDark,
    });
    const prefixW = fontBold.widthOfTextAtSize(`${s.cat}: `, 8.5);
    page.drawText(s.items, {
      x: marginX + prefixW,
      y,
      size: 8.5,
      font: fontRegular,
      color: cSecondary,
    });
    y -= 10.5;
  }

  const pdfBytes = await pdfDoc.save();

  // Save to both public/resume.pdf (primary recommended path) and public/assets/resume/...
  const publicDir = path.join(process.cwd(), "public");
  const resumeDir = path.join(publicDir, "assets", "resume");
  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(resumeDir, { recursive: true });

  const primaryPath = path.join(publicDir, "resume.pdf");
  const fallbackPath = path.join(resumeDir, "Sanjeeva_Kumar_MD_Resume.pdf");

  fs.writeFileSync(primaryPath, pdfBytes);
  fs.writeFileSync(fallbackPath, pdfBytes);

  console.log(`Generated resume PDF at ${primaryPath} (${pdfBytes.length} bytes)`);
}

generateResume().catch(console.error);
