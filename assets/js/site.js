/* Khalid Mustapha portfolio: navigation, section highlighting, project detail page. */
(function () {
  "use strict";

  var doc = document;

  /* Footer year */
  doc.querySelectorAll("[data-year]").forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });

  /* Theme toggle: light is the default; the choice is remembered per browser */
  var root_el = doc.documentElement;
  var header = doc.querySelector(".header-inner");
  if (header) {
    var themeBtn = doc.createElement("button");
    themeBtn.type = "button";
    themeBtn.className = "theme-toggle";
    themeBtn.innerHTML =
      '<svg class="i-moon" viewBox="0 0 24 24" aria-hidden="true"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>' +
      '<svg class="i-sun" viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/></svg>';
    var themeMeta = doc.querySelector('meta[name="theme-color"]');
    var syncTheme = function () {
      var dark = root_el.getAttribute("data-theme") === "dark";
      themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
      themeBtn.title = dark ? "Switch to light theme" : "Switch to dark theme";
      if (themeMeta) themeMeta.setAttribute("content", dark ? "#0b1220" : "#ffffff");
    };
    themeBtn.addEventListener("click", function () {
      var dark = root_el.getAttribute("data-theme") !== "dark";
      if (dark) root_el.setAttribute("data-theme", "dark");
      else root_el.removeAttribute("data-theme");
      try {
        localStorage.setItem("theme", dark ? "dark" : "light");
      } catch (e) {}
      syncTheme();
    });
    header.appendChild(themeBtn);
    syncTheme();
  }

  /* Mobile menu */
  var toggle = doc.querySelector(".nav-toggle");
  var nav = doc.getElementById("site-nav");

  function setMenu(open) {
    if (!toggle || !nav) return;
    toggle.setAttribute("aria-expanded", String(open));
    nav.setAttribute("data-open", String(open));
  }

  if (toggle && nav) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });
    nav.addEventListener("click", function (event) {
      if (event.target.closest("a")) setMenu(false);
    });
    doc.addEventListener("keydown", function (event) {
      if (event.key === "Escape" && toggle.getAttribute("aria-expanded") === "true") {
        setMenu(false);
        toggle.focus();
      }
    });
  }

  /* Highlight the nav link for the section being read */
  var links = Array.prototype.slice.call(doc.querySelectorAll('.site-nav a[href^="#"]'));
  if (links.length && "IntersectionObserver" in window) {
    var targets = links
      .map(function (link) {
        return doc.querySelector(link.getAttribute("href"));
      })
      .filter(Boolean);

    var observer = new IntersectionObserver(
      function (entries) {
        entries.forEach(function (entry) {
          if (!entry.isIntersecting) return;
          links.forEach(function (link) {
            if (link.getAttribute("href") === "#" + entry.target.id) {
              link.setAttribute("aria-current", "true");
            } else {
              link.removeAttribute("aria-current");
            }
          });
        });
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    targets.forEach(function (target) {
      observer.observe(target);
    });
  }

  /* Project detail page */
  var root = doc.getElementById("project-root");
  if (!root || typeof projects === "undefined") return;

  function el(tag, className, text) {
    var node = doc.createElement(tag);
    if (className) node.className = className;
    if (text !== undefined) node.textContent = text;
    return node;
  }

  function externalIcon() {
    var svg = doc.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "icon");
    svg.setAttribute("aria-hidden", "true");
    var use = doc.createElementNS("http://www.w3.org/2000/svg", "use");
    use.setAttribute("href", "#i-ext");
    svg.appendChild(use);
    return svg;
  }

  function setMeta(selector, attribute, value) {
    var node = doc.querySelector(selector);
    if (node) node.setAttribute(attribute, value);
  }

  var id = new URLSearchParams(window.location.search).get("project");
  var project = Object.prototype.hasOwnProperty.call(projects, id) ? projects[id] : null;

  root.replaceChildren();

  var back = el("a", "back-link", "Back to all projects");
  back.href = "index.html#projects";
  root.appendChild(back);

  if (!project) {
    doc.title = "Project not found | Khalid Mustapha";
    var missing = el("div", "not-found");
    missing.appendChild(el("h1", "", "Project not found"));
    var message = el("p", "lede", "That project doesn't exist or the link is out of date. You can find every project on the home page.");
    missing.appendChild(message);
    root.appendChild(missing);
    return;
  }

  /* Titles and metadata */
  doc.title = project.title + " | Khalid Mustapha";
  setMeta('meta[name="description"]', "content", project.tagline + " " + project.description.split(". ")[0] + ".");
  setMeta('meta[property="og:title"]', "content", project.title + " | Khalid Mustapha");
  setMeta('meta[property="og:description"]', "content", project.tagline);
  setMeta('meta[property="og:image"]', "content", "https://khalid-mustapha.netlify.app/" + project.images[0].src);
  setMeta('meta[name="twitter:image"]', "content", "https://khalid-mustapha.netlify.app/" + project.images[0].src);
  setMeta('link[rel="canonical"]', "href", "https://khalid-mustapha.netlify.app/portfolio-details.html?project=" + id);

  var head = el("div", "detail-head");
  head.appendChild(el("h1", "", project.title));
  head.appendChild(el("p", "lede", project.tagline));
  root.appendChild(head);

  var grid = el("div", "detail-grid");

  /* Gallery */
  var stage = el("figure", "stage");
  var frame = el("div", "stage-frame");
  var image = doc.createElement("img");
  frame.appendChild(image);
  var caption = el("figcaption");
  stage.appendChild(frame);
  stage.appendChild(caption);

  var thumbButtons = [];
  function show(index) {
    var item = project.images[index];
    image.src = item.src;
    image.alt = item.alt;
    image.width = item.width;
    image.height = item.height;
    caption.textContent = item.caption || "";
    thumbButtons.forEach(function (button, i) {
      if (i === index) button.setAttribute("aria-current", "true");
      else button.removeAttribute("aria-current");
    });
  }

  if (project.images.length > 1) {
    var thumbs = el("ul", "thumbs");
    project.images.forEach(function (item, index) {
      var li = doc.createElement("li");
      var button = el("button", "thumb");
      button.type = "button";
      button.setAttribute("aria-label", "Show image " + (index + 1) + " of " + project.images.length + ": " + (item.caption || project.title));
      var thumb = doc.createElement("img");
      thumb.src = item.src;
      thumb.alt = "";
      thumb.loading = "lazy";
      button.appendChild(thumb);
      button.addEventListener("click", function () {
        show(index);
      });
      li.appendChild(button);
      thumbs.appendChild(li);
      thumbButtons.push(button);
    });
    stage.appendChild(thumbs);
  }
  show(0);

  /* Side panel */
  var side = el("aside", "detail-side");
  var facts = el("dl", "titleblock-v");
  [
    ["Type", project.type],
    ["Client", project.client],
    ["Year", project.year],
    ["Built with", project.stack],
  ].forEach(function (row) {
    var wrapper = doc.createElement("div");
    wrapper.appendChild(el("dt", "", row[0]));
    wrapper.appendChild(el("dd", "", row[1]));
    facts.appendChild(wrapper);
  });
  side.appendChild(facts);

  var visit = el("a", "btn btn-primary");
  visit.href = project.url;
  visit.target = "_blank";
  visit.rel = "noopener noreferrer";
  visit.appendChild(doc.createTextNode(project.urlLabel || "Visit live site"));
  visit.appendChild(externalIcon());
  side.appendChild(visit);

  grid.appendChild(stage);
  grid.appendChild(side);
  root.appendChild(grid);

  /* Write-up */
  var body = el("div", "detail-body");
  body.appendChild(el("h2", "", "About the project"));
  body.appendChild(el("p", "", project.description));
  body.appendChild(el("h2", "", "What I did"));
  var list = doc.createElement("ul");
  project.highlights.forEach(function (text) {
    list.appendChild(el("li", "", text));
  });
  body.appendChild(list);
  root.appendChild(body);

  /* Next project */
  var ids = Object.keys(projects);
  var nextId = ids[(ids.indexOf(id) + 1) % ids.length];
  var next = el("nav", "next-project");
  next.setAttribute("aria-label", "More projects");
  var nextLink = el("a", "text-link", projects[nextId].title);
  nextLink.href = "portfolio-details.html?project=" + encodeURIComponent(nextId);
  var label = el("span", "", "Next project");
  var nextWrap = doc.createElement("div");
  nextWrap.appendChild(label);
  nextWrap.appendChild(doc.createTextNode(": "));
  nextWrap.appendChild(nextLink);
  var all = el("a", "text-link", "All projects");
  all.href = "index.html#projects";
  next.appendChild(nextWrap);
  next.appendChild(all);
  root.appendChild(next);
})();
