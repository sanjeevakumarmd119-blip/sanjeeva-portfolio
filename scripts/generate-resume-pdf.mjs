import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

async function generateTemplateResume() {
  const pdfDoc = await PDFDocument.create();
  // Standard Letter page: 612 x 792 pt
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontTimesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // Enhancv-style executive palette from the user template
  const cBlack = rgb(0.06, 0.06, 0.06); // #0f0f0f
  const cDark = rgb(0.12, 0.12, 0.12);
  const cSecondary = rgb(0.32, 0.32, 0.32); // #525252
  const cMuted = rgb(0.52, 0.52, 0.52); // #858585
  const cAccentBlue = rgb(0.02, 0.45, 0.94); // Vibrant blue #0573F0
  const cAccentBlueBg = rgb(0.92, 0.96, 1.0); // Light blue icon circle fill
  const cRule = rgb(0.08, 0.08, 0.08); // Heavy black header rule
  const cDotted = rgb(0.85, 0.85, 0.85); // Dotted entry divider
  const cTagBorder = rgb(0.8, 0.82, 0.86); // Skill tag outline
  const cTagBg = rgb(0.97, 0.98, 0.99);

  const marginX = 42;
  const contentWidth = width - marginX * 2;
  let y = height - 40;

  // 1. NAME (Heavy, authoritative slab/serif style matching template)
  page.drawText("SANJEEVA KUMAR MD", {
    x: marginX,
    y,
    size: 24,
    font: fontTimesBold,
    color: cBlack,
  });
  y -= 16;

  // 2. PROFESSIONAL TITLE (Vibrant Blue #0573F0)
  page.drawText("Full-Stack Developer & Video Editor", {
    x: marginX,
    y,
    size: 11.5,
    font: fontBold,
    color: cAccentBlue,
  });
  y -= 14;

  // 3. CONTACT ROW (with icons and clean columns matching template)
  const contactY = y;
  
  // Phone
  drawIcon("phone", marginX, contactY);
  page.drawText("+91 8217572608", {
    x: marginX + 11,
    y: contactY,
    size: 8.5,
    font: fontBold,
    color: cDark,
  });

  // Email
  drawIcon("email", marginX + 90, contactY);
  page.drawText("sanjeevakumarmd119@gmail.com", {
    x: marginX + 101,
    y: contactY,
    size: 8.5,
    font: fontRegular,
    color: cDark,
  });

  // LinkedIn
  drawIcon("link", marginX + 258, contactY);
  page.drawText("linkedin.com/in/sanjeeva-kumar-m-d-4b9473294", {
    x: marginX + 269,
    y: contactY,
    size: 8.5,
    font: fontRegular,
    color: cDark,
  });

  y -= 12;
  const contactY2 = y;

  // Location
  drawIcon("pin", marginX, contactY2);
  page.drawText("Bengaluru, Karnataka, India", {
    x: marginX + 11,
    y: contactY2,
    size: 8.5,
    font: fontRegular,
    color: cSecondary,
  });

  // GitHub
  drawIcon("github", marginX + 258, contactY2);
  page.drawText("github.com/sanjeevakumarmd119-blip", {
    x: marginX + 269,
    y: contactY2,
    size: 8.5,
    font: fontRegular,
    color: cDark,
  });

  y -= 15;

  // HELPER: Section Heading with Full-Width Thick Black Underline
  function drawSectionHeader(title) {
    page.drawText(title.toUpperCase(), {
      x: marginX,
      y,
      size: 11,
      font: fontBold,
      color: cBlack,
    });
    y -= 4;
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 1.6,
      color: cRule,
    });
    y -= 11;
  }

  // HELPER: Dotted Line Divider between items
  function drawDottedDivider() {
    y -= 2;
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 0.6,
      color: cDotted,
      dashArray: [2, 3],
    });
    y -= 7;
  }

  // HELPER: Vector Icons for header & highlights
  function drawIcon(type, ix, iy) {
    if (type === "phone") {
      page.drawCircle({ x: ix + 4, y: iy + 4, size: 3.5, color: cAccentBlue, opacity: 0.15 });
      page.drawCircle({ x: ix + 4, y: iy + 4, size: 2, color: cAccentBlue });
    } else if (type === "email") {
      page.drawRectangle({ x: ix, y: iy + 1, width: 8, height: 6, borderWidth: 1, borderColor: cAccentBlue });
    } else if (type === "pin") {
      page.drawCircle({ x: ix + 3.5, y: iy + 5, size: 2.2, color: cAccentBlue });
      page.drawLine({ start: { x: ix + 3.5, y: iy + 3 }, end: { x: ix + 3.5, y: iy }, thickness: 1, color: cAccentBlue });
    } else if (type === "link" || type === "github") {
      page.drawCircle({ x: ix + 3.5, y: iy + 3.5, size: 2.8, borderWidth: 1, borderColor: cAccentBlue, color: rgb(1,1,1) });
    } else if (type === "calendar") {
      page.drawRectangle({ x: ix, y: iy + 1, width: 7, height: 6, borderWidth: 0.9, borderColor: cSecondary });
      page.drawLine({ start: { x: ix + 2, y: iy + 6 }, end: { x: ix + 2, y: iy + 8 }, thickness: 0.8, color: cSecondary });
      page.drawLine({ start: { x: ix + 5, y: iy + 6 }, end: { x: ix + 5, y: iy + 8 }, thickness: 0.8, color: cSecondary });
    } else if (type === "rocket") {
      page.drawCircle({ x: ix + 8, y: iy + 4, size: 8, color: cAccentBlueBg });
      page.drawCircle({ x: ix + 8, y: iy + 4, size: 3.5, color: cAccentBlue });
    } else if (type === "diamond") {
      page.drawCircle({ x: ix + 8, y: iy + 4, size: 8, color: cAccentBlueBg });
      page.drawSquare({ x: ix + 5.5, y: iy + 1.5, size: 5, color: cAccentBlue, rotate: { type: 'degrees', angle: 45 } });
    } else if (type === "lightning") {
      page.drawCircle({ x: ix + 8, y: iy + 4, size: 8, color: cAccentBlueBg });
      page.drawLine({ start: { x: ix + 9, y: iy + 8 }, end: { x: ix + 7, y: iy + 4 }, thickness: 1.5, color: cAccentBlue });
      page.drawLine({ start: { x: ix + 7, y: iy + 4 }, end: { x: ix + 9, y: iy + 0 }, thickness: 1.5, color: cAccentBlue });
    } else if (type === "star") {
      page.drawCircle({ x: ix + 8, y: iy + 4, size: 8, color: cAccentBlueBg });
      page.drawCircle({ x: ix + 8, y: iy + 4, size: 3, borderWidth: 1.2, borderColor: cAccentBlue, color: rgb(1,1,1) });
    }
  }

  // HELPER: Bullet text
  function drawBullet(text) {
    const bullet = "- ";
    page.drawText(bullet, { x: marginX + 4, y, size: 8.5, font: fontBold, color: cDark });

    const words = text.split(" ");
    let line = "";
    let curX = marginX + 11;
    const maxW = contentWidth - 14;

    for (const w of words) {
      const test = line ? `${line} ${w}` : w;
      const testW = fontRegular.widthOfTextAtSize(test, 8.5);
      if (curX + testW > marginX + contentWidth && line) {
        page.drawText(line, { x: curX, y, size: 8.5, font: fontRegular, color: cSecondary });
        y -= 10.5;
        curX = marginX + 11;
        line = w;
      } else {
        line = test;
      }
    }
    if (line) {
      page.drawText(line, { x: curX, y, size: 8.5, font: fontRegular, color: cSecondary });
      y -= 10.5;
    }
  }

  // -------------------------------------------------------------
  // SECTION 1: EXPERIENCE & TECHNICAL PROJECTS
  // -------------------------------------------------------------
  drawSectionHeader("Experience & Key Projects");

  // Project 1: UCHN (Featured)
  page.drawText("Full-Stack Developer & Architect - UCHN (Unified Care & Health Network)", {
    x: marginX,
    y,
    size: 10,
    font: fontBold,
    color: cDark,
  });
  y -= 11;

  // Subtitle / Company line in Accent Blue
  page.drawText("Healthcare Coordination Platform & Progressive Web App (PWA)", {
    x: marginX,
    y,
    size: 9,
    font: fontBold,
    color: cAccentBlue,
  });
  y -= 10;

  // Metadata: Date & Tech Stack
  drawIcon("calendar", marginX, y);
  page.drawText("Completed Prototype   |   Tech: Next.js 14, React 18, TypeScript, PostgreSQL, Prisma, Socket.IO, Tailwind CSS", {
    x: marginX + 10,
    y,
    size: 8,
    font: fontRegular,
    color: cMuted,
  });
  y -= 10;

  // Lead description
  page.drawText("Engineered an end-to-end healthcare coordination system unifying clinics, doctors, pharmacies, and patients.", {
    x: marginX,
    y,
    size: 8.2,
    font: fontOblique,
    color: cSecondary,
  });
  y -= 9.5;

  // Bullets
  drawBullet("Architected clinic discovery and doctor specialty lookup with slot collision prevention algorithms.");
  drawBullet("Designed a 5-stage emergency SOS response pipeline (Pending -> Assigned -> Dispatched -> In-Progress -> Resolved).");
  drawBullet("Integrated real-time waiting queue telemetry using Socket.IO to decrease clinic lobby wait times.");
  drawBullet("Implemented pharmacy stock verification with transactional ACID boundaries in Prisma ORM.");
  drawBullet("Secured application with Role-Based Access Control (RBAC), JWT authentication, and PWA offline capability.");

  drawDottedDivider();

  // Project 2: Hand Gesture Recognition AI
  page.drawText("AI & Computer Vision Developer - Hand Gesture Recognition AI", {
    x: marginX,
    y,
    size: 9.5,
    font: fontBold,
    color: cDark,
  });
  y -= 11;

  page.drawText("Computer Vision & Contactless Human-Computer Interaction", {
    x: marginX,
    y,
    size: 8.8,
    font: fontBold,
    color: cAccentBlue,
  });
  y -= 10;

  drawIcon("calendar", marginX, y);
  page.drawText("Working Prototype   |   Tech: Python, OpenCV, MediaPipe, NumPy", {
    x: marginX + 10,
    y,
    size: 8,
    font: fontRegular,
    color: cMuted,
  });
  y -= 9.5;

  drawBullet("Engineered real-time 21-point hand landmark extraction at 30+ FPS under varying lighting conditions.");
  drawBullet("Classified finger articulation states to execute digital commands without physical contact.");

  drawDottedDivider();

  // Project 3: IoT & Interactive Projects + Manufacturing Scheduling
  page.drawText("Embedded Systems & Software - IoT Prototyping & Scheduling Systems", {
    x: marginX,
    y,
    size: 9.5,
    font: fontBold,
    color: cDark,
  });
  y -= 11;

  page.drawText("Microcontroller Telemetry & Manufacturing Dispatch Optimization", {
    x: marginX,
    y,
    size: 8.8,
    font: fontBold,
    color: cAccentBlue,
  });
  y -= 10;

  drawIcon("calendar", marginX, y);
  page.drawText("Prototypes   |   Tech: ESP32, Arduino Uno, C/C++, Sensors (I2C/SPI), Python, React", {
    x: marginX + 10,
    y,
    size: 8,
    font: fontRegular,
    color: cMuted,
  });
  y -= 9.5;

  drawBullet("Engineered IoT environmental stations using ESP32/Arduino, streaming sensor telemetry over Wi-Fi/WebSockets.");
  drawBullet("Developed dynamic production scheduling engine with FIFO/SPT rules minimizing workstation idle time.");

  y -= 5;

  // -------------------------------------------------------------
  // SECTION 2: EDUCATION
  // -------------------------------------------------------------
  drawSectionHeader("Education");

  page.drawText("B.Tech in Information Technology (AR/VR)", {
    x: marginX,
    y,
    size: 10,
    font: fontBold,
    color: cDark,
  });
  y -= 11;

  page.drawText("Alliance University", {
    x: marginX,
    y,
    size: 9,
    font: fontBold,
    color: cAccentBlue,
  });
  y -= 10;

  drawIcon("calendar", marginX, y);
  page.drawText("Bengaluru, Karnataka, India   |   Coursework: Software Systems, Real-Time Graphics, Data Structures & IoT", {
    x: marginX + 10,
    y,
    size: 8,
    font: fontRegular,
    color: cMuted,
  });
  y -= 14;

  // -------------------------------------------------------------
  // SECTION 3: KEY HIGHLIGHTS & CORE CAPABILITIES (2-Column Grid)
  // -------------------------------------------------------------
  drawSectionHeader("Key Highlights & Core Capabilities");

  const colWidth = (contentWidth - 16) / 2;
  const col1X = marginX;
  const col2X = marginX + colWidth + 16;
  const gridRow1Y = y;

  // Row 1 - Left: Full-Stack Systems
  drawIcon("rocket", col1X, gridRow1Y);
  page.drawText("Full-Stack Architecture", {
    x: col1X + 22,
    y: gridRow1Y + 3,
    size: 9,
    font: fontBold,
    color: cDark,
  });
  page.drawText("Built scalable web architectures with Next.js, Prisma, and real-time Socket.IO event coordination.", {
    x: col1X + 22,
    y: gridRow1Y - 7,
    size: 7.8,
    font: fontRegular,
    color: cSecondary,
  });

  // Row 1 - Right: IoT & Hardware
  drawIcon("diamond", col2X, gridRow1Y);
  page.drawText("Hardware & IoT Telemetry", {
    x: col2X + 22,
    y: gridRow1Y + 3,
    size: 9,
    font: fontBold,
    color: cDark,
  });
  page.drawText("Interfaced Arduino and ESP32 with multi-sensor arrays, serial protocols, and live web monitors.", {
    x: col2X + 22,
    y: gridRow1Y - 7,
    size: 7.8,
    font: fontRegular,
    color: cSecondary,
  });

  y -= 25;
  const gridRow2Y = y;

  // Row 2 - Left: Vision & Algorithms
  drawIcon("lightning", col1X, gridRow2Y);
  page.drawText("Computer Vision & AI", {
    x: col1X + 22,
    y: gridRow2Y + 3,
    size: 9,
    font: fontBold,
    color: cDark,
  });
  page.drawText("Developed real-time hand tracking and dynamic algorithmic schedulers for manufacturing.", {
    x: col1X + 22,
    y: gridRow2Y - 7,
    size: 7.8,
    font: fontRegular,
    color: cSecondary,
  });

  // Row 2 - Right: DaVinci Resolve & Creative Media
  drawIcon("star", col2X, gridRow2Y);
  page.drawText("DaVinci Resolve & Video Editing", {
    x: col2X + 22,
    y: gridRow2Y + 3,
    size: 9,
    font: fontBold,
    color: cDark,
  });
  page.drawText("Intermediate editor skilled in narrative pacing, match cutting, and visual storytelling workflows.", {
    x: col2X + 22,
    y: gridRow2Y - 7,
    size: 7.8,
    font: fontRegular,
    color: cSecondary,
  });

  y -= 21;

  // -------------------------------------------------------------
  // SECTION 4: SKILLS (Boxed Badges matching the template)
  // -------------------------------------------------------------
  drawSectionHeader("Skills");

  const skillBadges = [
    "Next.js",
    "React",
    "TypeScript",
    "Tailwind CSS",
    "PostgreSQL",
    "Prisma ORM",
    "Socket.IO",
    "REST APIs",
    "Python",
    "Java",
    "C",
    "Arduino",
    "ESP32",
    "Sensors (I2C/SPI)",
    "DaVinci Resolve",
    "Video Editing",
    "AI-Assisted Workflows",
  ];

  let curBadgeX = marginX;
  let curBadgeY = y;
  const badgeH = 14;

  for (const skill of skillBadges) {
    const textW = fontBold.widthOfTextAtSize(skill, 7.8);
    const badgeW = textW + 12;

    if (curBadgeX + badgeW > marginX + contentWidth) {
      curBadgeX = marginX;
      curBadgeY -= (badgeH + 5);
    }

    // Draw boxed rounded rectangle badge matching template
    page.drawRectangle({
      x: curBadgeX,
      y: curBadgeY - 2,
      width: badgeW,
      height: badgeH,
      borderWidth: 0.8,
      borderColor: cTagBorder,
      color: cTagBg,
    });

    page.drawText(skill, {
      x: curBadgeX + 6,
      y: curBadgeY + 1.8,
      size: 7.8,
      font: fontBold,
      color: cDark,
    });

    curBadgeX += badgeW + 6;
  }

  y = curBadgeY - 18;

  // Footer branding tag (small, understated like Enhancv footer)
  page.drawLine({
    start: { x: marginX, y },
    end: { x: width - marginX, y },
    thickness: 0.5,
    color: cDotted,
  });
  y -= 9;

  page.drawText("Sanjeeva Kumar MD   |   Portfolio: sanjeeva-kumar.vercel.app   |   Verified Academic & Technical Credentials", {
    x: marginX,
    y,
    size: 7.2,
    font: fontRegular,
    color: cMuted,
  });

  const pdfBytes = await pdfDoc.save();

  const publicDir = path.join(process.cwd(), "public");
  const resumeDir = path.join(publicDir, "assets", "resume");
  fs.mkdirSync(publicDir, { recursive: true });
  fs.mkdirSync(resumeDir, { recursive: true });

  const primaryPath = path.join(publicDir, "resume.pdf");
  const fallbackPath = path.join(resumeDir, "Sanjeeva_Kumar_MD_Resume.pdf");

  fs.writeFileSync(primaryPath, pdfBytes);
  fs.writeFileSync(fallbackPath, pdfBytes);

  console.log(`Successfully generated Enhancv-template resume PDF at ${primaryPath} (${pdfBytes.length} bytes)`);
}

generateTemplateResume().catch(console.error);
