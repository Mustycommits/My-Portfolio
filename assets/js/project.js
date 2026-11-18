/*
 * Project data for the detail pages (portfolio-details.html?project=<id>).
 * Order here is the order projects appear in "Next project".
 * To add a project: add an entry here, then add a card to index.html
 * and a URL to sitemap.xml.
 */
const projects = {
  scanner: {
    title: "Trenching Signal",
    tagline: "Turns a news story into ranked Solana token candidates.",
    type: "Token discovery tool",
    client: "Personal project",
    year: "2026",
    stack: "TypeScript, Node.js, DexScreener API",
    url: "https://trenching-signal.onrender.com/",
    description:
      "A research tool for finding Solana tokens connected to a story that is spreading online. You enter a headline and the social posts that show how far it travelled. The tool checks the story against a virality rule (100,000 combined views within 72 hours), then searches DexScreener for matching tokens and ranks them by liquidity, 24-hour volume, price momentum, pair age and how closely each token matches the story. View counts are entered by the user and are not independently verified.",
    highlights: [
      "Built a narrative-based discovery and scoring workflow that surfaces relevant token opportunities.",
      "Ranks each candidate on liquidity, volume, momentum, pair age and textual match, and shows the reasons behind every score.",
      "Designed the wider project around gathering and analysing social, market and on-chain information.",
      "Redesigned the interface in November 2026: one-click scanning, live validation, card and table results, CSV export, and light and dark themes.",
    ],
    images: [
      {
        src: "assets/img/projects/scanner-1.webp",
        alt: "Trenching Signal in dark theme, with an example story entered and a combined views meter showing the virality threshold reached",
        caption: "The scan form with an example story loaded (dark theme).",
        width: 1360,
        height: 860,
      },
      {
        src: "assets/img/projects/scanner-2.webp",
        alt: "Trenching Signal in light theme with the same example story",
        caption: "The same screen in the light theme.",
        width: 1360,
        height: 860,
      },
    ],
  },

  tads: {
    title: "TADS Construction & Engineering",
    tagline: "A company website with an admin dashboard for managing projects.",
    type: "Company website and admin dashboard",
    client: "TADS Construction & Engineering",
    year: "2026",
    stack: "PHP, MySQL, HTML, CSS, JavaScript",
    url: "https://tadsengineering.com/",
    description:
      "A business website for a construction and engineering company, built to present its services, projects and expertise to potential clients. Behind the public pages sits a PHP and MySQL administrative dashboard, so the team can manage the projects shown on the site without touching code.",
    highlights: [
      "Developed the public company website for a construction and engineering firm.",
      "Built a PHP and MySQL administrative dashboard to create, edit and delete project records.",
      "Implemented project image management, including multiple image uploads and thumbnail selection.",
      "Developed dynamic project detail pages from database records and project slugs.",
    ],
    images: [
      {
        src: "assets/img/projects/tads-1.webp",
        alt: "TADS homepage with a construction crane over a building and the headline Think. Analyze. Design. Structures",
        caption: "The homepage.",
        width: 1291,
        height: 650,
      },
      {
        src: "assets/img/projects/tads-2.webp",
        alt: "TADS contact page headed Let's Talk, with the office address, phone number, email and social links",
        caption: "The contact page.",
        width: 1306,
        height: 653,
      },
      {
        src: "assets/img/projects/tads-3.webp",
        alt: "TADS projects page with a search box, a category filter and a sort control above a list of projects",
        caption: "The projects page, with search, category filter and sorting.",
        width: 1304,
        height: 642,
      },
    ],
  },

  kheems: {
    title: "Kheems Collections",
    tagline: "An e-commerce site for clothing, accessories and home decor.",
    type: "E-commerce website",
    client: "Kheems Collections",
    year: "2025",
    stack: "PHP, MySQL, JavaScript, HTML, CSS",
    url: "https://kheems-collection.netlify.app/",
    description:
      "An e-commerce website offering a variety of products including clothing, accessories and home decor. It features a user-friendly interface, easy navigation, product search and a secure checkout process.",
    highlights: [
      "Designed and developed the store with a focus on product presentation and user experience.",
      "Implemented the interface with frontend web technologies and responsive design principles.",
      "Added category browsing and a product search with keyword, price range and gender filters.",
    ],
    images: [
      {
        src: "assets/img/projects/kheems-1.webp",
        alt: "Kheems Collections homepage with a white sneaker beside the headline Quality & Comfort",
        caption: "The homepage.",
        width: 1339,
        height: 647,
      },
      {
        src: "assets/img/projects/kheems-2.webp",
        alt: "Kheems Collections shop page with a category sidebar and a grid of products showing sizes, ratings and prices",
        caption: "The shop, with categories and a product grid.",
        width: 1341,
        height: 630,
      },
      {
        src: "assets/img/projects/kheems-3.webp",
        alt: "Product search form with keyword, minimum price, maximum price and gender fields",
        caption: "Product search by keyword, price range and gender.",
        width: 494,
        height: 544,
      },
    ],
  },

  monad: {
    title: "MonadVerse",
    tagline: "A website built around the Monad ecosystem.",
    type: "Web3 website",
    client: "MonadVerse",
    year: "2025",
    stack: "HTML, CSS, JavaScript",
    url: "https://monadverrse.netlify.app/",
    description:
      "A Web3-focused website built around the Monad ecosystem. It combines modern web design with an engaging interface to present information and content within the Web3 space.",
    highlights: [
      "Designed and developed a dedicated online platform for the project.",
      "Applied frontend development and website design principles to present ecosystem content clearly.",
    ],
    images: [
      {
        src: "assets/img/projects/monad-1.webp",
        alt: "MonadVerse page showing the MonAnimals collection with an illustration and description",
        caption: "The MonAnimals section.",
        width: 1352,
        height: 648,
      },
      {
        src: "assets/img/projects/monad-2.webp",
        alt: "MonadVerse on a phone, showing the PurpleDAO X Monadverse heading and an About section",
        caption: "The mobile layout.",
        width: 540,
        height: 1063,
      },
    ],
  },
};
