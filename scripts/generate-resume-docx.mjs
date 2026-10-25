import fs from "fs";
import path from "path";
import zlib from "zlib";

function createZip(files) {
  const localHeaders = [];
  const centralDirHeaders = [];
  let offset = 0;

  for (const file of files) {
    const filenameBuf = Buffer.from(file.name, "utf8");
    const dataBuf = Buffer.from(file.data);
    const uncompressedSize = dataBuf.length;

    const compressedData = zlib.deflateRawSync(dataBuf);
    const compressedSize = compressedData.length;

    const crc = crc32(dataBuf);

    const localHeader = Buffer.alloc(30 + filenameBuf.length);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0, 6);
    localHeader.writeUInt16LE(8, 8);
    localHeader.writeUInt16LE(0, 10);
    localHeader.writeUInt16LE(0, 12);
    localHeader.writeUInt32LE(crc, 14);
    localHeader.writeUInt32LE(compressedSize, 18);
    localHeader.writeUInt32LE(uncompressedSize, 22);
    localHeader.writeUInt16LE(filenameBuf.length, 26);
    localHeader.writeUInt16LE(0, 28);
    filenameBuf.copy(localHeader, 30);

    localHeaders.push(localHeader, compressedData);

    const cdHeader = Buffer.alloc(46 + filenameBuf.length);
    cdHeader.writeUInt32LE(0x02014b50, 0);
    cdHeader.writeUInt16LE(20, 4);
    cdHeader.writeUInt16LE(20, 6);
    cdHeader.writeUInt16LE(0, 8);
    cdHeader.writeUInt16LE(8, 10);
    cdHeader.writeUInt16LE(0, 12);
    cdHeader.writeUInt16LE(0, 14);
    cdHeader.writeUInt32LE(crc, 16);
    cdHeader.writeUInt32LE(compressedSize, 20);
    cdHeader.writeUInt32LE(uncompressedSize, 24);
    cdHeader.writeUInt16LE(filenameBuf.length, 28);
    cdHeader.writeUInt16LE(0, 30);
    cdHeader.writeUInt16LE(0, 32);
    cdHeader.writeUInt16LE(0, 34);
    cdHeader.writeUInt16LE(0, 36);
    cdHeader.writeUInt32LE(0, 38);
    cdHeader.writeUInt32LE(offset, 42);
    filenameBuf.copy(cdHeader, 46);

    centralDirHeaders.push(cdHeader);
    offset += localHeader.length + compressedData.length;
  }

  const centralDirStart = offset;
  const centralDirBuf = Buffer.concat(centralDirHeaders);
  const centralDirSize = centralDirBuf.length;

  const eocd = Buffer.alloc(22);
  eocd.writeUInt32LE(0x06054b50, 0);
  eocd.writeUInt16LE(0, 4);
  eocd.writeUInt16LE(0, 6);
  eocd.writeUInt16LE(files.length, 8);
  eocd.writeUInt16LE(files.length, 10);
  eocd.writeUInt32LE(centralDirSize, 12);
  eocd.writeUInt32LE(centralDirStart, 16);
  eocd.writeUInt16LE(0, 20);

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
      <w:r><w:rPr><w:rFonts w:ascii="Times New Roman" w:hAnsi="Times New Roman"/><w:b/><w:sz w:val="48"/><w:color w:val="0F0F0F"/></w:rPr><w:t>SANJEEVA KUMAR MD</w:t></w:r>
    </w:p>
    <!-- Subhead in Accent Blue -->
    <w:p>
      <w:pPr><w:spacing w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="23"/><w:color w:val="0573F0"/></w:rPr><w:t>Full-Stack Developer &amp; Video Editor</w:t></w:r>
    </w:p>
    <!-- Contact Info -->
    <w:p>
      <w:pPr><w:spacing w:after="30"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="121212"/></w:rPr><w:t>+91 8217572608   |   </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="18"/><w:color w:val="121212"/></w:rPr><w:t>sanjeevakumarmd119@gmail.com   |   </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="18"/><w:color w:val="0573F0"/></w:rPr><w:t>linkedin.com/in/sanjeeva-kumar-m-d-4b9473294</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="160"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="18"/><w:color w:val="525252"/></w:rPr><w:t>Bengaluru, Karnataka, India   |   </w:t></w:r>
      <w:r><w:rPr><w:sz w:val="18"/><w:color w:val="0573F0"/></w:rPr><w:t>github.com/sanjeevakumarmd119-blip</w:t></w:r>
    </w:p>

    <!-- SECTION 1: EXPERIENCE & KEY PROJECTS -->
    <w:p>
      <w:pPr>
        <w:pBdr><w:bottom w:val="single" w:sz="16" w:space="4" w:color="0F0F0F"/></w:pBdr>
        <w:spacing w:before="140" w:after="80"/>
      </w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="0F0F0F"/></w:rPr><w:t>EXPERIENCE &amp; KEY PROJECTS</w:t></w:r>
    </w:p>

    <!-- Project 1: UCHN -->
    <w:p>
      <w:pPr><w:spacing w:after="20"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="121212"/></w:rPr><w:t>Full-Stack Developer &amp; Architect — UCHN (Unified Care &amp; Health Network)</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="30"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="0573F0"/></w:rPr><w:t>Healthcare Coordination Platform &amp; Progressive Web App (PWA)</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="40"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="16"/><w:color w:val="858585"/></w:rPr><w:t>Completed Prototype   |   Tech: Next.js 14, React 18, TypeScript, PostgreSQL, Prisma, Socket.IO, Tailwind CSS</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="40"/></w:pPr>
      <w:r><w:rPr><w:i/><w:sz w:val="17"/><w:color w:val="525252"/></w:rPr><w:t>Engineered an end-to-end healthcare coordination system unifying clinics, doctors, pharmacies, and patients.</w:t></w:r>
    </w:p>
    <w:p><w:pPr><w:spacing w:after="20"/></w:pPr><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="333333"/></w:rPr><w:t>• Architected clinic discovery and doctor specialty lookup with slot collision prevention algorithms.</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="20"/></w:pPr><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="333333"/></w:rPr><w:t>• Designed a 5-stage emergency SOS response pipeline (Pending -> Assigned -> Dispatched -> In-Progress -> Resolved).</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="20"/></w:pPr><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="333333"/></w:rPr><w:t>• Integrated real-time waiting queue telemetry using Socket.IO to decrease clinic lobby wait times.</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="20"/></w:pPr><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="333333"/></w:rPr><w:t>• Implemented pharmacy stock verification with transactional ACID boundaries in Prisma ORM.</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="100"/></w:pPr><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="333333"/></w:rPr><w:t>• Secured application with Role-Based Access Control (RBAC), JWT authentication, and PWA offline capability.</w:t></w:r></w:p>

    <!-- Project 2: Gesture AI -->
    <w:p>
      <w:pPr><w:spacing w:after="20"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="121212"/></w:rPr><w:t>AI &amp; Computer Vision Developer — Hand Gesture Recognition AI</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="30"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="0573F0"/></w:rPr><w:t>Computer Vision &amp; Contactless Human-Computer Interaction</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="40"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="16"/><w:color w:val="858585"/></w:rPr><w:t>Working Prototype   |   Tech: Python, OpenCV, MediaPipe, NumPy</w:t></w:r>
    </w:p>
    <w:p><w:pPr><w:spacing w:after="20"/></w:pPr><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="333333"/></w:rPr><w:t>• Engineered real-time 21-point hand landmark extraction at 30+ FPS under varying lighting conditions.</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="100"/></w:pPr><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="333333"/></w:rPr><w:t>• Classified finger articulation states to execute digital commands without physical contact.</w:t></w:r></w:p>

    <!-- Project 3: IoT & Scheduling -->
    <w:p>
      <w:pPr><w:spacing w:after="20"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="19"/><w:color w:val="121212"/></w:rPr><w:t>Embedded Systems &amp; Software — IoT Prototyping &amp; Scheduling Systems</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="30"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="0573F0"/></w:rPr><w:t>Microcontroller Telemetry &amp; Manufacturing Dispatch Optimization</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="40"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="16"/><w:color w:val="858585"/></w:rPr><w:t>Prototypes   |   Tech: ESP32, Arduino Uno, C/C++, Sensors (I2C/SPI), Python, React</w:t></w:r>
    </w:p>
    <w:p><w:pPr><w:spacing w:after="20"/></w:pPr><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="333333"/></w:rPr><w:t>• Engineered IoT environmental stations using ESP32/Arduino, streaming sensor telemetry over Wi-Fi/WebSockets.</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="120"/></w:pPr><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="333333"/></w:rPr><w:t>• Developed dynamic production scheduling engine with FIFO/SPT rules minimizing workstation idle time.</w:t></w:r></w:p>

    <!-- SECTION 2: EDUCATION -->
    <w:p>
      <w:pPr>
        <w:pBdr><w:bottom w:val="single" w:sz="16" w:space="4" w:color="0F0F0F"/></w:pBdr>
        <w:spacing w:before="120" w:after="80"/>
      </w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="0F0F0F"/></w:rPr><w:t>EDUCATION</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="20"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="20"/><w:color w:val="121212"/></w:rPr><w:t>B.Tech in Information Technology (AR/VR)</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="30"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="0573F0"/></w:rPr><w:t>Alliance University</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="120"/></w:pPr>
      <w:r><w:rPr><w:sz w:val="16"/><w:color w:val="858585"/></w:rPr><w:t>Bengaluru, Karnataka, India   |   Coursework: Software Systems, Real-Time Graphics, Data Structures &amp; IoT</w:t></w:r>
    </w:p>

    <!-- SECTION 3: KEY HIGHLIGHTS & CORE CAPABILITIES -->
    <w:p>
      <w:pPr>
        <w:pBdr><w:bottom w:val="single" w:sz="16" w:space="4" w:color="0F0F0F"/></w:pBdr>
        <w:spacing w:before="120" w:after="80"/>
      </w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="0F0F0F"/></w:rPr><w:t>KEY HIGHLIGHTS &amp; CORE CAPABILITIES</w:t></w:r>
    </w:p>
    <w:p><w:pPr><w:spacing w:after="20"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="121212"/></w:rPr><w:t>Full-Stack Architecture: </w:t></w:r><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="525252"/></w:rPr><w:t>Built scalable web architectures with Next.js, Prisma, and real-time Socket.IO event coordination.</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="20"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="121212"/></w:rPr><w:t>Hardware &amp; IoT Telemetry: </w:t></w:r><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="525252"/></w:rPr><w:t>Interfaced Arduino and ESP32 with multi-sensor arrays, serial protocols, and live web monitors.</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="20"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="121212"/></w:rPr><w:t>Computer Vision &amp; AI: </w:t></w:r><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="525252"/></w:rPr><w:t>Developed real-time hand tracking and dynamic algorithmic schedulers for manufacturing.</w:t></w:r></w:p>
    <w:p><w:pPr><w:spacing w:after="120"/></w:pPr><w:r><w:rPr><w:b/><w:sz w:val="18"/><w:color w:val="121212"/></w:rPr><w:t>DaVinci Resolve &amp; Video Editing: </w:t></w:r><w:r><w:rPr><w:sz w:val="17"/><w:color w:val="525252"/></w:rPr><w:t>Intermediate editor skilled in narrative pacing, match cutting, and visual storytelling workflows.</w:t></w:r></w:p>

    <!-- SECTION 4: SKILLS -->
    <w:p>
      <w:pPr>
        <w:pBdr><w:bottom w:val="single" w:sz="16" w:space="4" w:color="0F0F0F"/></w:pBdr>
        <w:spacing w:before="120" w:after="80"/>
      </w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="22"/><w:color w:val="0F0F0F"/></w:rPr><w:t>SKILLS</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="60"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="17"/><w:color w:val="0573F0"/></w:rPr><w:t>[Next.js]  [React]  [TypeScript]  [Tailwind CSS]  [PostgreSQL]  [Prisma ORM]  [Socket.IO]  [REST APIs]</w:t></w:r>
    </w:p>
    <w:p>
      <w:pPr><w:spacing w:after="140"/></w:pPr>
      <w:r><w:rPr><w:b/><w:sz w:val="17"/><w:color w:val="0573F0"/></w:rPr><w:t>[Python]  [Java]  [C]  [Arduino]  [ESP32]  [Sensors (I2C/SPI)]  [DaVinci Resolve]  [Video Editing]  [AI Workflows]</w:t></w:r>
    </w:p>
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
console.log(`Successfully generated template-aligned DOCX resume at ${targetPath1} and ${targetPath2}`);
