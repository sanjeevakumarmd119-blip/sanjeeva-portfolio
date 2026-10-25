import fs from "fs";
import path from "path";
import zlib from "zlib";

// Minimal, reliable DOCX creator using standard OpenXML and ZIP structure
function createZip(files) {
  const localHeaders = [];
  const centralDirHeaders = [];
  let offset = 0;

  for (const file of files) {
    const filenameBuf = Buffer.from(file.name, "utf8");
    const dataBuf = Buffer.from(file.data);
    const uncompressedSize = dataBuf.length;

    // Deflate
    const compressedData = zlib.deflateRawSync(dataBuf);
    const compressedSize = compressedData.length;

    // CRC32 calculation
    const crc = crc32(dataBuf);

    // Local file header (30 bytes + name)
    const localHeader = Buffer.alloc(30 + filenameBuf.length);
    localHeader.writeUInt32LE(0x04034b50, 0); // Signature
    localHeader.writeUInt16LE(20, 4); // Min version
    localHeader.writeUInt16LE(0, 6); // Flags
    localHeader.writeUInt16LE(8, 8); // Compression method (Deflate)
    localHeader.writeUInt16LE(0, 10); // Mod time
    localHeader.writeUInt16LE(0, 12); // Mod date
    localHeader.writeUInt32LE(crc, 14); // CRC32
    localHeader.writeUInt32LE(compressedSize, 18); // Comp size
    localHeader.writeUInt32LE(uncompressedSize, 22); // Uncomp size
    localHeader.writeUInt16LE(filenameBuf.length, 26); // Name length
    localHeader.writeUInt16LE(0, 28); // Extra length
    filenameBuf.copy(localHeader, 30);

    localHeaders.push(localHeader, compressedData);

    // Central directory header (46 bytes + name)
    const cdHeader = Buffer.alloc(46 + filenameBuf.length);
    cdHeader.writeUInt32LE(0x02014b50, 0); // Signature
    cdHeader.writeUInt16LE(20, 4); // Made by
    cdHeader.writeUInt16LE(20, 6); // Min version
    cdHeader.writeUInt16LE(0, 8); // Flags
    cdHeader.writeUInt16LE(8, 10); // Compression method
    cdHeader.writeUInt16LE(0, 12); // Mod time
    cdHeader.writeUInt16LE(0, 14); // Mod date
    cdHeader.writeUInt32LE(crc, 16); // CRC32
    cdHeader.writeUInt32LE(compressedSize, 20); // Comp size
    cdHeader.writeUInt32LE(uncompressedSize, 24); // Uncomp size
    cdHeader.writeUInt16LE(filenameBuf.length, 28); // Name length
    cdHeader.writeUInt16LE(0, 30); // Extra length
    cdHeader.writeUInt16LE(0, 32); // Comment length
    cdHeader.writeUInt16LE(0, 34); // Disk number start
    cdHeader.writeUInt16LE(0, 36); // Internal file attributes
    cdHeader.writeUInt32LE(0, 38); // External file attributes
    cdHeader.writeUInt32LE(offset, 42); // Relative offset
    filenameBuf.copy(cdHeader, 46);

    centralDirHeaders.push(cdHeader);
    offset += localHeader.length + compressedData.length;
  }

  const centralDirStart = offset;
  const centralDirBuf = Buffer.concat(centralDirHeaders);
  const centralDirSize = centralDirBuf.length;

  // End of Central Directory Record (22 bytes)
  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0); // Signature
  eocd.writeUInt16LE(0, 4); // Disk number
  eocd.writeUInt16LE(0, 6); // Disk with CD
  eocd.writeUInt16LE(files.length, 8); // CD entries on this disk
  eocd.writeUInt16LE(files.length, 10); // Total CD entries
  eocd.writeUInt32LE(centralDirSize, 12); // CD size
  eocd.writeUInt32LE(centralDirStart, 16); // CD offset
  eocd.writeUInt16LE(0, 20); // Comment length

  return Buffer.concat([...localHeaders, centralDirBuf, eocd]);
}

function crc32(buf) {
  let crc = 0xffffffff;
  for (let i = 0; i < buf.length; i++) {
    const byte = buf[i];
    crc ^= byte;
    for (let j = 0; j < 8; j++) {
      crc = (crc >>> 1) ^ (-(crc & 1) & 0xedb88320);
    }
  }
  return (crc ^ 0xffffffff) >>> 0;
}

const contentTypesXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types">
  <Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/>
  <Default Extension="xml" ContentType="application/xml"/>
  <Override PartName="/word/document.xml" ContentType="application/vnd.openxmlformats-officedocument.wordprocessingml.document.main+xml"/>
</Types>`;

const relsXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships">
  <Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="word/document.xml"/>
</Relationships>`;

const documentXml = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
<w:document xmlns:w="http://schemas.openxmlformats.org/wordprocessingml/2006/main">
  <w:body>
    <!-- Header: Name -->
    <w:p>
      <w:pPr><w:jc w:val="left"/><w:spacing w:after="40"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="44"/><w:color w:val="171717"/></w:rPr><w:t>SANJEEVA KUMAR MD</w:t></w:r>
    </w:p>
    <!-- Subhead -->
    <w:p>
      <w:pPr><w:spacing w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="F04444"/></w:rPr><w:t>Full-Stack Developer · Video Editor · Creative Technologist</w:t></w:r>
    </w:p>
    <!-- Contact Details -->
    <w:p>
      <w:pPr><w:spacing w:after="40"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="19"/><w:color w:val="646464"/></w:rPr><w:t>Bengaluru, Karnataka, India  |  +91 8217572608  |  sanjeevakumarmd119@gmail.com</w:t></w:r>
    </w:p>
    <!-- Links -->
    <w:p>
      <w:pPr><w:spacing w:after="160"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="19"/><w:color w:val="646464"/></w:rPr><w:t>LinkedIn: https://www.linkedin.com/in/sanjeeva-kumar-m-d-4b9473294  |  GitHub: https://github.com/sanjeevakumarmd119-blip</w:t></w:r>
    </w:p>

    <!-- SECTION: EDUCATION -->
    <w:p>
      <w:pPr><w:spacing w:before="140" w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="171717"/></w:rPr><w:t>EDUCATION</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="120"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="171717"/></w:rPr><w:t>Alliance University, Bengaluru</w:t></w:r>
      <w:r><w:rPr><w:sz w:val="19"/><w:color w:val="646464"/></w:rPr><w:t> — B.Tech in Information Technology (AR/VR)</w:t></w:r>
    </w:p>

    <!-- SECTION: PROFESSIONAL SUMMARY -->
    <w:p>
      <w:pPr><w:spacing w:before="140" w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="171717"/></w:rPr><w:t>PROFESSIONAL SUMMARY</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="120"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="19"/><w:color w:val="333333"/></w:rPr><w:t>Full-stack developer and video editor focused on building practical web applications, interactive systems, and hardware-software prototypes. Experienced in React, Next.js, TypeScript, PostgreSQL, and microcontroller systems (Arduino &amp; ESP32). Intermediate video editor proficient in DaVinci Resolve with a strong grasp of narrative pacing and editing workflows. Passionate about applying new technologies to real-world problems with engineering clarity.</w:t></w:r>
    </w:p>

    <!-- SECTION: FEATURED PROJECT -->
    <w:p>
      <w:pPr><w:spacing w:before="140" w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="171717"/></w:rPr><w:t>FEATURED PROJECT: UCHN — UNIFIED CARE &amp; HEALTH NETWORK</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="40"/></w:pPr>
      <w:r><w:rPr><w:i/><w:sz w:val="19"/><w:color w:val="646464"/></w:rPr><w:t>Healthcare coordination platform designed to connect patients, doctors, and clinics through appointment discovery, pharmacy inventory lookup, live waiting queues, and emergency coordination.</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="171717"/></w:rPr><w:t>Tech Stack: </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="18"/><w:color w:val="646464"/></w:rPr><w:t>Next.js, React, TypeScript, PostgreSQL, Prisma, Socket.IO, Tailwind CSS</w:t></w:r>
    </w:p>
    <w:p><w:pPr><w:spacing w:after="30"/></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="333333"/></w:rPr><w:t>• Doctor discovery and slot conflict prevention logic across clinics</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="30"/></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="333333"/></w:rPr><w:t>• Pharmacy medicine inventory lookup with pickup/delivery selection</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="30"/></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="333333"/></w:rPr><w:t>• Live clinic waiting queues powered by real-time WebSockets</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="30"/></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="333333"/></w:rPr><w:t>• 5-Stage emergency SOS workflow and proximity-aware clinic routing</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="30"/></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="333333"/></w:rPr><w:t>• Role-based access control (RBAC) and clinical management dashboards</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="120"/></w:pPr><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="333333"/></w:rPr><w:t>• Progressive Web App (PWA) with service-worker caching for high resilience</w:t></w:r></w:p>

    <!-- SECTION: ADDITIONAL PROJECTS -->
    <w:p>
      <w:pPr><w:spacing w:before="140" w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="171717"/></w:rPr><w:t>SELECTED ADDITIONAL PROJECTS</w:t></w:r>
    </w:p>
    <w:p><w:pPr><w:spacing w:after="30"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="171717"/></w:rPr><w:t>Hand Gesture Recognition AI: </w:t></w:r><w:r><w:rPr><w:sz w:val="19"/><w:color w:val="333333"/></w:rPr><w:t>Computer vision model leveraging Python, OpenCV, and MediaPipe for landmark tracking and contactless human-computer interaction.</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="30"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="171717"/></w:rPr><w:t>Production Scheduling System for Dynamic Manufacturing: </w:t></w:r><w:r><w:rPr><w:sz w:val="19"/><w:color w:val="333333"/></w:rPr><w:t>Algorithmic scheduling engine optimizing machine allocation, job sequencing, and bottleneck reduction for dynamic manufacturing environments.</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="120"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="171717"/></w:rPr><w:t>IoT and Interactive Projects: </w:t></w:r><w:r><w:rPr><w:sz w:val="19"/><w:color w:val="333333"/></w:rPr><w:t>Connected device experiments interfacing Arduino and ESP32 with sensors (I2C/SPI), telemetry streams, and interactive hardware dashboards.</w:t></w:r></w:p>

    <!-- SECTION: SKILLS -->
    <w:p>
      <w:pPr><w:spacing w:before="140" w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="24"/><w:color w:val="171717"/></w:rPr><w:t>TECHNICAL SKILLS &amp; TOOLS</w:t></w:r>
    </w:p>
    <w:p><w:pPr><w:spacing w:after="30"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="171717"/></w:rPr><w:t>Development: </w:t></w:r><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="333333"/></w:rPr><w:t>Python, Java, C, HTML, CSS, React, Next.js, TypeScript, Tailwind CSS</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="30"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="171717"/></w:rPr><w:t>Backend &amp; Data: </w:t></w:r><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="333333"/></w:rPr><w:t>PostgreSQL, Prisma, REST APIs, Socket.IO</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="30"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="171717"/></w:rPr><w:t>Hardware &amp; IoT: </w:t></w:r><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="333333"/></w:rPr><w:t>Arduino, ESP32, Sensor-based projects</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="30"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="171717"/></w:rPr><w:t>Creative: </w:t></w:r><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="333333"/></w:rPr><w:t>DaVinci Resolve, Video editing, Editing workflows</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="60"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="171717"/></w:rPr><w:t>Currently Exploring: </w:t></w:r><w:r><w:rPr><w:sz w:val="18"/><w:color w:val="333333"/></w:rPr><w:t>AI-assisted workflows, Developer productivity, Practical automation</w:t></w:r></w:p>
  </w:body>
</w:document>`;

const files = [
  { name: "[Content_Types].xml", data: contentTypesXml },
  { name: "_rels/.rels", data: relsXml },
  { name: "word/document.xml", data: documentXml },
];

const docxBuf = createZip(files);
const targetPath1 = path.join(process.cwd(), "Sanjeeva_Kumar_MD_Resume.docx");
const targetPath2 = path.join(process.cwd(), "public", "assets", "resume", "Sanjeeva_Kumar_MD_Resume.docx");

fs.writeFileSync(targetPath1, docxBuf);
fs.writeFileSync(targetPath2, docxBuf);
console.log(`Successfully generated DOCX resume at ${targetPath1} and ${targetPath2}`);
