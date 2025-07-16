document.addEventListener("DOMContentLoaded", () => {
  // Cursor glow setup
  const glow = document.getElementById("cursor-glow");
  const aboutSection = document.getElementById("about");
  const aboutPicWrapper = document.querySelector(".about-pic-wrapper");
  const bwImg = document.querySelector(".bw-img"); // grayscale image on top

  let mouseX = 0;
  let mouseY = 0;
  let isInAbout = false;

  // Initialize aboutPicWrapper state (opacity & scale)
  gsap.set(aboutPicWrapper, {
    opacity: 0,
    y: 40,
    scale: 0.8,
    pointerEvents: "none",
    x: 0,
  });

  // Initially hide grayscale reveal circle
  bwImg.style.maskImage = `radial-gradient(circle 0px at 0 0, transparent 0%, black 100%)`;
  bwImg.style.webkitMaskImage = `radial-gradient(circle 0px at 0 0, transparent 0%, black 100%)`;

  aboutSection.addEventListener("mouseenter", () => {
    isInAbout = true;
    glow.style.display = "block"; // show glow when entering About

    // Show floating picture wrapper
    gsap.to(aboutPicWrapper, {
      duration: 0.6,
      opacity: 1,
      y: 0,
      scale: 1,
      ease: "power3.out",
      pointerEvents: "auto"
    });
  });

  aboutSection.addEventListener("mouseleave", () => {
    isInAbout = false;
    glow.style.display = "none"; // hide glow when leaving About

    // Hide floating picture wrapper and reset position
    gsap.to(aboutPicWrapper, {
      duration: 0.6,
      opacity: 0,
      y: 40,
      scale: 0.8,
      ease: "power3.in",
      pointerEvents: "none",
      x: 0,
    });

    // Hide color reveal spotlight on grayscale image
    bwImg.style.maskImage = `radial-gradient(circle 0px at 0 0, transparent 0%, black 100%)`;
    bwImg.style.webkitMaskImage = `radial-gradient(circle 0px at 0 0, transparent 0%, black 100%)`;
  });

  document.addEventListener("mousemove", (e) => {
    if (isInAbout) {
      mouseX = e.clientX - 50;
      mouseY = e.clientY - 50;
    }
  });

  gsap.ticker.add(() => {
    if (isInAbout) {
      gsap.to(glow, {
        x: mouseX,
        y: mouseY,
        duration: 0.5,
        ease: "power4.out"
      });
    }
  });

  // Parallax effect + color reveal spotlight on mousemove inside About section
  aboutSection.addEventListener("mousemove", (e) => {
    const sectionRect = aboutSection.getBoundingClientRect();
    const wrapperRect = aboutPicWrapper.getBoundingClientRect();

    // Calculate mouse position relative to the image wrapper (for spotlight)
    const relX = e.clientX - wrapperRect.left;
    const relY = e.clientY - wrapperRect.top;

    // Parallax offsets for floating picture wrapper (relative to About section)
    const offsetX = ((e.clientX - sectionRect.left) / sectionRect.width - 0.5) * 20;  // ±10px horizontal
    const offsetY = ((e.clientY - sectionRect.top) / sectionRect.height - 0.5) * 20;  // ±10px vertical

    gsap.to(aboutPicWrapper, {
      x: offsetX,
      y: offsetY,
      duration: 0.3,
      ease: "power2.out"
    });

    // Color reveal spotlight on bwImg relative to bwImg wrapper
    const radius = 300; // radius of reveal circle in px
    const maskValue = `radial-gradient(circle ${radius}px at ${relX}px ${relY}px, transparent 0%, black 100%)`;

    bwImg.style.maskImage = maskValue;
    bwImg.style.webkitMaskImage = maskValue;
  });
});
