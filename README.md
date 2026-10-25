# Sanjeeva Kumar MD — Personal Portfolio Website

A compact, polished, responsive personal portfolio for **Sanjeeva Kumar MD** (Full-Stack Developer & Video Editor). Built with modern Next.js 14 App Router, TypeScript, and Tailwind CSS, featuring an editorial design inspired by minimalist Swiss layout principles with a coral-red accent.

---

## 🚀 Live Demo & Deployment

This project is built and optimized for one-click deployment on **Vercel**.

### Vercel Deployment Instructions

1. **Push to GitHub**:
   ```bash
   git init
   git add .
   git commit -m "feat: complete personal portfolio website"
   git branch -M main
   git remote add origin https://github.com/sanjeevakumarmd119-blip/<your-repo-name>.git
   git push -u origin main
   ```

2. **Deploy on Vercel**:
   - Go to [Vercel](https://vercel.com/) and click **Add New... -> Project**.
   - Import your GitHub repository.
   - Vercel automatically detects Next.js.
   - Click **Deploy**.

Alternatively, deploy directly via the Vercel CLI:
```bash
npm i -g vercel
vercel
```

---

## 🎨 Visual Language & Design Tokens

- **Primary Background**: `#FAFAFA`
- **Secondary Background**: `#FFF0EE` (Blush tint)
- **Primary Accent**: `#F04444` (Coral-red)
- **Main Text**: `#171717` (Dark charcoal)
- **Secondary Text**: `#646464`
- **Borders**: `#E5E5E5` (Thin 1px crisp borders)
- **White Surface**: `#FFFFFF`

---

## 📁 Website Structure

1. **Navigation & Hero**:
   - Slim navigation with brand mark `SANJEEVA.`, quick section anchors, and mobile menu.
   - Two-column hero with authentic headline *"I build ideas into something real."*, location badge `Bengaluru, India`, and dual CTAs (*Explore My Work* & *Download Resume*).
   - Architectural right-column identity card with initials monogram, current building focus, and verified tech tags.
2. **Selected Work**:
   - **Featured Project: UCHN (Unified Care & Health Network)**: Interactive CSS-based coordination console previewing the 5-Stage Emergency SOS pipeline, real-time clinic waiting queues, and pharmacy inventory sync.
   - **Additional Projects**:
     - *Hand Gesture Recognition AI* (Python, OpenCV, MediaPipe).
     - *Production Scheduling System for Dynamic Manufacturing* (Job allocation & sequencing).
     - *IoT and Interactive Projects* (ESP32, Arduino, multi-sensor telemetry).
3. **About & Skills**:
   - Authentic narrative highlighting continuous learning, real-world application, and academic background (*B.Tech in IT (AR/VR), Alliance University, Bengaluru*).
   - Compact skills grid categorized into *Development*, *Backend and Data*, *Hardware and IoT*, *Creative*, and *Currently Exploring*.
4. **Creative Work & Video Editing**:
   - Naturally integrated into the About narrative and creative skills, highlighting *DaVinci Resolve* and editing workflow fundamentals without distracting from software projects.
5. **Resume & Contact**:
   - Final contact invitation with clickable email (`sanjeevakumarmd119@gmail.com`), phone (`+91 8217572608`), LinkedIn, and GitHub links.
   - Direct download links for both `public/resume.pdf` and editable `Sanjeeva_Kumar_MD_Resume.docx`.
6. **Footer**:
   - Minimal understated footer with location, channels, and dynamic copyright year.

---

## 🛠️ Development & Build Commands

- **Start Development Server**:
  ```bash
  npm run dev
  ```
- **Run Verification Suite**:
  ```bash
  npm test
  ```
- **Generate Resume (PDF + DOCX)**:
  ```bash
  npm run generate-resume
  ```
- **Production Build**:
  ```bash
  npm run build
  ```
- **Start Production Server**:
  ```bash
  npm start
  ```

