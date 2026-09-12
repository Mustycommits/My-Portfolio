document.addEventListener("DOMContentLoaded", function () {
  // Get project name from URL
  const params = new URLSearchParams(window.location.search);
  const projectId = params.get("project");

  // Find project
  const project = projects[projectId];

  // If project doesn't exist
  if (!project) {
    document.getElementById("project-title").textContent = "Project Not Found";

    document.getElementById("project-description").textContent =
      "The project you are looking for could not be found.";

    return;
  }

  // Update page title
  document.title = `${project.title} | Khalid Mustapha`;

  // Project information
  document.getElementById("project-title").textContent = project.title;
  document.getElementById("project-category").textContent = project.category;
  document.getElementById("project-client").textContent = project.client;
  document.getElementById("project-date").textContent = project.date;
  document.getElementById("project-description").textContent =
    project.description;

  // Project URL
  const projectUrl = document.getElementById("project-url");

  projectUrl.href = project.url;
  projectUrl.textContent = project.url.replace(/^https?:\/\//, "");

  // Project images
  const imageContainer = document.getElementById("project-images");

  project.images.forEach(function (image) {
    const slide = document.createElement("div");
    slide.className = "swiper-slide";

    const img = document.createElement("img");
    img.src = image;
    img.alt = `${project.title} screenshot`;

    slide.appendChild(img);
    imageContainer.appendChild(slide);
  });

  // Initialize Swiper
  new Swiper(".portfolio-details-slider", {
    speed: 600,
    loop: true,
    autoplay: {
      delay: 5000,
      disableOnInteraction: false,
    },
    slidesPerView: "auto",
    pagination: {
      el: ".swiper-pagination",
      type: "bullets",
      clickable: true,
    },
  });
});
