import { PDFDocument, rgb, StandardFonts } from "pdf-lib";
import fs from "fs";
import path from "path";

async function generateSpaciousTemplateResume() {
  const pdfDoc = await PDFDocument.create();
  // Standard Letter page: 612 x 792 pt (8.5 x 11 inches)
  const page = pdfDoc.addPage([612, 792]);
  const { width, height } = page.getSize();

  const fontBold = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
  const fontRegular = await pdfDoc.embedFont(StandardFonts.Helvetica);
  const fontOblique = await pdfDoc.embedFont(StandardFonts.HelveticaOblique);
  const fontTimesBold = await pdfDoc.embedFont(StandardFonts.TimesRomanBold);

  // Enhancv-inspired palette: crisp, high contrast, authoritative, with ample breathing room
  const cBlack = rgb(0.06, 0.06, 0.06); // #0f0f0f
  const cDark = rgb(0.12, 0.12, 0.12);
  const cSecondary = rgb(0.32, 0.32, 0.32); // #525252
  const cMuted = rgb(0.5, 0.5, 0.5); // #808080
  const cAccentBlue = rgb(0.0, 0.44, 0.94); // Enhancv vibrant blue #0070F0
  const cIconBg = rgb(0.91, 0.95, 1.0); // Soft circle tint for icons
  const cRule = rgb(0.08, 0.08, 0.08); // Full-width heavy black bar
  const cDotted = rgb(0.84, 0.84, 0.84); // Elegant dotted entry divider
  const cTagBorder = rgb(0.78, 0.8, 0.85); // Skill tag outline
  const cTagBg = rgb(0.97, 0.98, 0.99); // Crisp white-gray tag background

  const marginX = 46;
  const contentWidth = width - marginX * 2; // 520 pt
  let y = height - 44;

  // 1. NAME (Authoritative slab/serif headline)
  page.drawText("SANJEEVA KUMAR MD", {
    x: marginX,
    y,
    size: 25,
    font: fontTimesBold,
    color: cBlack,
  });
  y -= 19;

  // 2. PROFESSIONAL TITLE (Vibrant Blue, spacious)
  page.drawText("Full-Stack Developer & Video Editor", {
    x: marginX,
    y,
    size: 11.5,
    font: fontBold,
    color: cAccentBlue,
  });
  y -= 16;

  // 3. CONTACT ROW (Clean multi-column icons with generous spacing)
  const contactY1 = y;
  
  // Phone
  drawIcon("phone", marginX, contactY1);
  page.drawText("+91 8217572608", {
    x: marginX + 12,
    y: contactY1,
    size: 8.5,
    font: fontBold,
    color: cDark,
  });

  // Email
  drawIcon("email", marginX + 98, contactY1);
  page.drawText("sanjeevakumarmd119@gmail.com", {
    x: marginX + 110,
    y: contactY1,
    size: 8.5,
    font: fontRegular,
    color: cDark,
  });

  // LinkedIn
  drawIcon("link", marginX + 282, contactY1);
  page.drawText("linkedin.com/in/sanjeeva-kumar-m-d-4b9473294", {
    x: marginX + 294,
    y: contactY1,
    size: 8.5,
    font: fontRegular,
    color: cDark,
  });

  y -= 13;
  const contactY2 = y;

  // Location
  drawIcon("pin", marginX, contactY2);
  page.drawText("Bengaluru, Karnataka, India", {
    x: marginX + 12,
    y: contactY2,
    size: 8.5,
    font: fontRegular,
    color: cSecondary,
  });

  // GitHub
  drawIcon("github", marginX + 282, contactY2);
  page.drawText("github.com/sanjeevakumarmd119-blip", {
    x: marginX + 294,
    y: contactY2,
    size: 8.5,
    font: fontRegular,
    color: cDark,
  });

  y -= 22; // Generous space before first section

  // SECTION HEADING HELPER
  function drawSectionHeader(title) {
    page.drawText(title.toUpperCase(), {
      x: marginX,
      y,
      size: 11,
      font: fontBold,
      color: cBlack,
    });
    y -= 4.5;
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 1.8,
      color: cRule,
    });
    y -= 14; // Generous space below header line
  }

  // DOTTED ENTRY DIVIDER HELPER
  function drawDottedDivider() {
    y -= 4;
    page.drawLine({
      start: { x: marginX, y },
      end: { x: width - marginX, y },
      thickness: 0.6,
      color: cDotted,
      dashArray: [2, 3],
    });
    y -= 10;
  }

  // ICONS HELPER
  function drawIcon(type, ix, iy) {
    if (type === "phone") {
      page.drawCircle({ x: ix + 4, y: iy + 3.5, size: 3.5, color: cAccentBlue, opacity: 0.15 });
      page.drawCircle({ x: ix + 4, y: iy + 3.5, size: 2, color: cAccentBlue });
    } else if (type === "email") {
      page.drawRectangle({ x: ix, y: iy + 0.5, width: 8.5, height: 6.5, borderWidth: 1, borderColor: cAccentBlue });
    } else if (type === "pin") {
      page.drawCircle({ x: ix + 3.5, y: iy + 5, size: 2.3, color: cAccentBlue });
      page.drawLine({ start: { x: ix + 3.5, y: iy + 3 }, end: { x: ix + 3.5, y: iy }, thickness: 1, color: cAccentBlue });
    } else if (type === "link" || type === "github") {
      page.drawCircle({ x: ix + 3.5, y: iy + 3.5, size: 3, borderWidth: 1.1, borderColor: cAccentBlue, color: rgb(1,1,1) });
    } else if (type === "calendar") {
      page.drawRectangle({ x: ix, y: iy + 1, width: 7, height: 6, borderWidth: 0.9, borderColor: cSecondary });
      page.drawLine({ start: { x: ix + 2, y: iy + 6 }, end: { x: ix + 2, y: iy + 8 }, thickness: 0.8, color: cSecondary });
      page.drawLine({ start: { x: ix + 5, y: iy + 6 }, end: { x: ix + 5, y: iy + 8 }, thickness: 0.8, color: cSecondary });
    } else if (type === "badge1") {
      page.drawCircle({ x: ix + 9, y: iy + 6, size: 9, color: cIconBg });
      page.drawCircle({ x: ix + 9, y: iy + 6, size: 4, color: cAccentBlue });
    } else if (type === "badge2") {
      page.drawCircle({ x: ix + 9, y: iy + 6, size: 9, color: cIconBg });
      page.drawSquare({ x: ix + 6.5, y: iy + 3.5, size: 5, color: cAccentBlue, rotate: { type: "degrees", angle: 45 } });
    } else if (type === "badge3") {
      page.drawCircle({ x: ix + 9, y: iy + 6, size: 9, color: cIconBg });
      page.drawLine({ start: { x: ix + 10, y: iy + 10 }, end: { x: ix + 8, y: iy + 6 }, thickness: 1.5, color: cAccentBlue });
      page.drawLine({ start: { x: ix + 8, y: iy + 6 }, end: { x: ix + 10, y: iy + 2 }, thickness: 1.5, color: cAccentBlue });
    } else if (type === "badge4") {
      page.drawCircle({ x: ix + 9, y: iy + 6, size: 9, color: cIconBg });
      page.drawCircle({ x: ix + 9, y: iy + 6, size: 3.5, borderWidth: 1.4, borderColor: cAccentBlue, color: rgb(1,1,1) });
    }
  }

  // BULLET HELPER (with comfortable 13pt line-height)
  function drawBullet(text) {
    page.drawText("• ", { x: marginX + 3, y, size: 8.8, font: fontBold, color: cDark });
    page.drawText(text, { x: marginX + 11, y, size: 8.8, font: fontRegular, color: cSecondary });
    y -= 13;
  }

  // =============================================================
  // SECTION 1: EXPERIENCE & KEY PROJECTS
  // =============================================================
  drawSectionHeader("Experience & Key Projects");

  // Project 1: UCHN
  page.drawText("Full-Stack Developer & Architect — UCHN (Unified Care & Health Network)", {
    x: marginX,
    y,
    size: 10.5,
    font: fontBold,
    color: cDark,
  });
  y -= 12;

  page.drawText("Full-Stack Healthcare Coordination Platform & Progressive Web App (PWA)", {
    x: marginX,
    y,
    size: 9.2,
    font: fontBold,
    color: cAccentBlue,
  });
  y -= 11;

  drawIcon("calendar", marginX, y);
  page.drawText("Completed Prototype   |   Tech: Next.js 14, React 18, TypeScript, PostgreSQL, Prisma, Socket.IO, Tailwind CSS", {
    x: marginX + 11,
    y,
    size: 8.2,
    font: fontRegular,
    color: cMuted,
  });
  y -= 12;

  drawBullet("Architected clinic discovery, doctor specialty lookup, and appointment slot conflict prevention logic.");
  drawBullet("Designed a structured 5-stage emergency SOS pipeline (Pending -> Assigned -> Dispatched -> In-Progress -> Resolved).");
  drawBullet("Engineered live clinic waiting queues via Socket.IO and medicine inventory sync using Prisma ACID transactions.");

  drawDottedDivider();

  // Project 2: Hand Gesture Recognition AI
  page.drawText("AI & Computer Vision Developer — Hand Gesture Recognition AI", {
    x: marginX,
    y,
    size: 10,
    font: fontBold,
    color: cDark,
  });
  y -= 12;

  page.drawText("Computer Vision & Contactless Human-Computer Interaction", {
    x: marginX,
    y,
    size: 9,
    font: fontBold,
    color: cAccentBlue,
  });
  y -= 11;

  drawIcon("calendar", marginX, y);
  page.drawText("Working Prototype   |   Tech: Python, OpenCV, MediaPipe, NumPy", {
    x: marginX + 11,
    y,
    size: 8.2,
    font: fontRegular,
    color: cMuted,
  });
  y -= 12;

  drawBullet("Extracted 21 3D hand landmarks in real-time at 30+ FPS under varying ambient lighting conditions.");
  drawBullet("Classified finger articulation states to execute contactless digital commands with low CPU latency.");

  drawDottedDivider();

  // Project 3: IoT & Scheduling
  page.drawText("Embedded Systems & Software — IoT Prototyping & Scheduling Systems", {
    x: marginX,
    y,
    size: 10,
    font: fontBold,
    color: cDark,
  });
  y -= 12;

  page.drawText("Microcontroller Telemetry & Manufacturing Dispatch Optimization", {
    x: marginX,
    y,
    size: 9,
    font: fontBold,
    color: cAccentBlue,
  });
  y -= 11;

  drawIcon("calendar", marginX, y);
  page.drawText("Prototypes   |   Tech: ESP32, Arduino Uno, C/C++, Sensors (I2C/SPI), Python, React", {
    x: marginX + 11,
    y,
    size: 8.2,
    font: fontRegular,
    color: cMuted,
  });
  y -= 12;

  drawBullet("Engineered multi-sensor environmental stations with ESP32 & Arduino, streaming telemetry over Wi-Fi/WebSockets.");
  drawBullet("Developed dynamic production scheduling application utilizing FIFO & SPT rules to minimize machine idle time.");

  y -= 16; // Generous space before Education

  // =============================================================
  // SECTION 2: EDUCATION
  // =============================================================
  drawSectionHeader("Education");

  page.drawText("B.Tech in Information Technology (AR/VR)", {
    x: marginX,
    y,
    size: 10.5,
    font: fontBold,
    color: cDark,
  });
  y -= 12;

  page.drawText("Alliance University", {
    x: marginX,
    y,
    size: 9.2,
    font: fontBold,
    color: cAccentBlue,
  });
  y -= 11;

  drawIcon("calendar", marginX, y);
  page.drawText("Bengaluru, Karnataka, India   |   Coursework: Software Systems, Real-Time Graphics, Data Structures & IoT", {
    x: marginX + 11,
    y,
    size: 8.2,
    font: fontRegular,
    color: cMuted,
  });
  y -= 18; // Generous space before Highlights

  // =============================================================
  // SECTION 3: KEY HIGHLIGHTS & CAPABILITIES (2-Column Grid)
  // =============================================================
  drawSectionHeader("Key Highlights & Core Capabilities");

  const colWidth = (contentWidth - 20) / 2;
  const col1X = marginX;
  const col2X = marginX + colWidth + 20;

  // Row 1
  const gridRow1Y = y;
  drawIcon("badge1", col1X, gridRow1Y);
  page.drawText("Full-Stack Architecture", {
    x: col1X + 24,
    y: gridRow1Y + 5,
    size: 9.2,
    font: fontBold,
    color: cDark,
  });
  page.drawText("Built scalable web apps with Next.js, Prisma, and Socket.IO real-time event streaming.", {
    x: col1X + 24,
    y: gridRow1Y - 6,
    size: 8,
    font: fontRegular,
    color: cSecondary,
  });

  drawIcon("badge2", col2X, gridRow1Y);
  page.drawText("Hardware & IoT Telemetry", {
    x: col2X + 24,
    y: gridRow1Y + 5,
    size: 9.2,
    font: fontBold,
    color: cDark,
  });
  page.drawText("Interfaced Arduino & ESP32 with multi-sensor arrays, serial buses, and live dashboards.", {
    x: col2X + 24,
    y: gridRow1Y - 6,
    size: 8,
    font: fontRegular,
    color: cSecondary,
  });

  y -= 26; // Generous space between highlight rows

  // Row 2
  const gridRow2Y = y;
  drawIcon("badge3", col1X, gridRow2Y);
  page.drawText("Computer Vision & AI", {
    x: col1X + 24,
    y: gridRow2Y + 5,
    size: 9.2,
    font: fontBold,
    color: cDark,
  });
  page.drawText("Developed real-time hand tracking and dynamic algorithmic schedulers for manufacturing.", {
    x: col1X + 24,
    y: gridRow2Y - 6,
    size: 8,
    font: fontRegular,
    color: cSecondary,
  });

  drawIcon("badge4", col2X, gridRow2Y);
  page.drawText("DaVinci Resolve & Media", {
    x: col2X + 24,
    y: gridRow2Y + 5,
    size: 9.2,
    font: fontBold,
    color: cDark,
  });
  page.drawText("Intermediate video editor skilled in narrative pacing, cut rhythms, and audio-visual workflows.", {
    x: col2X + 24,
    y: gridRow2Y - 6,
    size: 8,
    font: fontRegular,
    color: cSecondary,
  });

  y -= 22; // Generous space before Skills

  // =============================================================
  // SECTION 4: SKILLS (Spacious, beautifully boxed tag badges)
  // =============================================================
  drawSectionHeader("Skills");

  // 2 clean rows of badges with generous margins and padding
  const row1Skills = ["Next.js", "React", "TypeScript", "Tailwind CSS", "PostgreSQL", "Prisma ORM", "Socket.IO", "REST APIs"];
  const row2Skills = ["Python", "Java", "C", "Arduino", "ESP32", "Sensors (I2C/SPI)", "DaVinci Resolve", "AI Workflows"];

  function drawSkillRow(skills, startY) {
    let curX = marginX;
    const badgeH = 17;

    for (const skill of skills) {
      const textW = fontBold.widthOfTextAtSize(skill, 8);
      const badgeW = textW + 16; // Comfortable padding

      // Boxed tag badge matching the template
      page.drawRectangle({
        x: curX,
        y: startY - 2.5,
        width: badgeW,
        height: badgeH,
        borderWidth: 0.8,
        borderColor: cTagBorder,
        color: cTagBg,
      });

      page.drawText(skill, {
        x: curX + 8,
        y: startY + 2.2,
        size: 8,
        font: fontBold,
        color: cDark,
      });

      curX += badgeW + 8; // Comfortable gap between badges
    }
  }

  drawSkillRow(row1Skills, y);
  y -= 23;
  drawSkillRow(row2Skills, y);

  y -= 22;

  // UNDERSTATED FOOTER
  page.drawLine({
    start: { x: marginX, y },
    end: { x: width - marginX, y },
    thickness: 0.5,
    color: cDotted,
  });
  y -= 10;

  page.drawText("Sanjeeva Kumar MD   |   Portfolio: sanjeeva-kumar.vercel.app   |   Verified Academic & Technical Credentials", {
    x: marginX,
    y,
    size: 7.5,
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

  console.log(`Successfully generated spacious, elegant resume PDF at ${primaryPath} (${pdfBytes.length} bytes)`);
}

generateSpaciousTemplateResume().catch(console.error);
