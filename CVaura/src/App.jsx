import {
  startTransition,
  useEffect,
  useEffectEvent,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import * as am5 from "@amcharts/amcharts5";
import * as am5percent from "@amcharts/amcharts5/percent";
import * as am5plugins_exporting from "@amcharts/amcharts5/plugins/exporting";
import am5themes_Animated from "@amcharts/amcharts5/themes/Animated";
import emailjs from "@emailjs/browser";
import Swal from "sweetalert2";
import "sweetalert2/dist/sweetalert2.min.css";
import "./App.css";

const SHEET_ID = "1ZnIgvXhhld9W1F6TgqpRCLt1mULRRxlPb5hntLYxJzU";
const EMAILJS_PUBLIC_KEY = "NagH5tRuSAjvWj56m";
const EMAILJS_SERVICE_ID = "service_0ek3p4d";
const EMAILJS_TEMPLATE_ID = "template_ikmroyv";
const RESUME_DOWNLOAD_FILENAME = "Pushparaj_Murugesan_Resume.pdf";

const NAV_ITEMS = [
  { id: "home", label: "Home" },
  { id: "profile", label: "Profile" },
  { id: "experience", label: "Experience" },
  { id: "projects", label: "Projects" },
  { id: "skills", label: "Skills" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

const DEFAULT_EXPERIENCE = [
  {
    period: "July 2023 - Present",
    title: "Full-Stack Developer",
    company: "Datacorp Traffic Private Limited",
    location: "Bangalore, Karnataka",
    points: [
      "Build and maintain data-driven web applications with Django, Python, JavaScript, HTML, CSS, and APIs.",
      "Develop full-stack tools for processing large datasets and transforming them into practical visual insights.",
      "Design responsive interfaces that improve usability, efficiency, and day-to-day operations.",
      "Collaborate across teams to troubleshoot production issues and deliver features on schedule.",
      "Continuously adopt better engineering practices, tools, and frameworks to improve delivery quality.",
    ],
  },
  {
    period: "February 2023 - June 2023",
    title: "Software Intern",
    company: "Datacorp Traffic Private Limited",
    location: "Bangalore, Karnataka",
    points: [
      "Supported financial statement preparation with a focus on accuracy and consistency.",
      "Helped conduct internal audits and resolve discrepancies in operational records.",
    ],
  },
];

const DEFAULT_PROJECTS = {
  main: [
    {
      project:
        "Built and maintain a tool to calculate employee performance using trackers and factor-based scoring.",
      description: [],
    },
    {
      project:
        "Designed a secure data migration tool to move information from a public server to a local server.",
      description: [],
    },
    {
      project:
        "Created a questionnaire generation platform and API flow to deliver survey questions to mobile apps.",
      description: [],
    },
    {
      project:
        "Developed a manpower monitoring tool that tracks footage status and estimates staffing needs.",
      description: [],
    },
    {
      project:
        "Migrated legacy visualizations to AMCharts to make business data easier to read and act on.",
      description: [],
    },
    {
      project:
        "Implemented a manpower and cost calculator to support delivery planning and forecasting.",
      description: [],
    },
  ],
};

const DEFAULT_SKILL_GROUPS = [
  {
    title: "Back-End",
    items: [
      "Python",
      "Django",
      "PostgreSQL",
      "REST APIs",
      "AWS",
      "Java",
      "Version Control",
    ],
  },
  {
    title: "Front-End",
    items: [
      "React",
      "JavaScript",
      "HTML",
      "CSS",
      "Bootstrap",
      "Materialize",
      "AMCharts",
    ],
  },
  {
    title: "Tools",
    items: [
      "VS Code",
      "PyCharm",
      "Eclipse",
      "Bitbucket",
      "Git",
      "Google Sheets",
    ],
  },
  {
    title: "Soft Skills",
    items: [
      "Team Player",
      "Action Planning",
      "Documentation",
      "Project Management",
      "Customer Experience",
    ],
  },
];

const LOGO_ITEMS = [
  {
    name: "Python",
    image: "/legacy-assets/images/python_img.png",
    href: "https://www.python.org/",
  },
  {
    name: "AWS",
    image: "/legacy-assets/images/aws.png",
    href: "https://aws.amazon.com/",
  },
  {
    name: "Django",
    image: "/legacy-assets/images/dj.png",
    href: "https://www.djangoproject.com/",
  },
  {
    name: "PostgreSQL",
    image: "/legacy-assets/images/p_sql.png",
    href: "https://www.postgresql.org/",
  },
  {
    name: "APIs",
    image: "/legacy-assets/images/API.png",
    href: "https://developer.mozilla.org/en-US/docs/Learn/JavaScript/Client-side_web_APIs/Introduction",
  },
  {
    name: "Bitbucket",
    image: "/legacy-assets/images/bit.png",
    href: "https://bitbucket.org/product/",
  },
  {
    name: "Java",
    image: "/legacy-assets/images/java.png",
    href: "https://www.java.com/",
  },
  {
    name: "JavaScript",
    image: "/legacy-assets/images/js.png",
    href: "https://developer.mozilla.org/en-US/docs/Web/JavaScript",
  },
  {
    name: "jQuery",
    image: "/legacy-assets/images/jq.png",
    href: "https://jquery.com/",
  },
  {
    name: "Materialize",
    image: "/legacy-assets/images/Materialize.png",
    href: "https://materializecss.com/",
  },
  {
    name: "Bootstrap",
    image: "/legacy-assets/images/Bootstrap.png",
    href: "https://getbootstrap.com/",
  },
  {
    name: "HTML",
    image: "/legacy-assets/images/html.png",
    href: "https://developer.mozilla.org/en-US/docs/Web/HTML",
  },
  {
    name: "CSS",
    image: "/legacy-assets/images/css.png",
    href: "https://developer.mozilla.org/en-US/docs/Web/CSS",
  },
  {
    name: "AMCharts",
    image: "/legacy-assets/images/am.png",
    href: "https://www.amcharts.com/",
  },
  {
    name: "VS Code",
    image: "/legacy-assets/images/vs.png",
    href: "https://code.visualstudio.com/",
  },
  {
    name: "Atom",
    image: "/legacy-assets/images/atoms.png",
    href: "https://atom-editor.cc/",
  },
  {
    name: "PyCharm",
    image: "/legacy-assets/images/pyc.png",
    href: "https://www.jetbrains.com/pycharm/",
  },
  {
    name: "Eclipse",
    image: "/legacy-assets/images/eclipse.png",
    href: "https://www.eclipse.org/",
  },
];

const EDUCATION = [
  {
    title: "B.E Computer Science and Engineering",
    school: "Sona College of Technology, Salem",
    period: "2020 - 2023",
    badge: "/legacy-assets/images/75_per.png",
    chartTitle: "Semester Performance",
    data: [
      { category: "Sem III", value: 7.96 },
      { category: "Sem IV", value: 8.14 },
      { category: "Sem V", value: 7.55 },
      { category: "Sem VI", value: 7.26 },
      { category: "Sem VII", value: 8.1 },
      { category: "Sem VIII", value: 8.0 },
    ],
  },
  {
    title: "Diploma in Computer Science and Engineering",
    school: "Thiagarajar Polytechnic College, Salem",
    period: "2017 - 2020",
    badge: "/legacy-assets/images/85_per.png",
    chartTitle: "Semester Scores",
    data: [
      { category: "Sem I", value: 80.33 },
      { category: "Sem II", value: 76.88 },
      { category: "Sem III", value: 87.57 },
      { category: "Sem IV", value: 83.28 },
      { category: "Sem V", value: 88.75 },
      { category: "Sem VI", value: 97.57 },
    ],
  },
  {
    title: "SSLC",
    school: "Government Higher Secondary School, Cettimangurichi, Salem",
    period: "2017",
    badge: "/legacy-assets/images/82_per.png",
    chartTitle: "Subject Breakdown",
    data: [
      { category: "Tamil", value: 93 },
      { category: "English", value: 68 },
      { category: "Mathematics", value: 76 },
      { category: "Science", value: 78 },
      { category: "Social Science", value: 95 },
    ],
  },
];

const DEFAULT_PROFILE =
  "Full-stack engineer with experience building business tools, data workflows, APIs, and responsive interfaces. I focus on turning operational needs into practical products that are clear, reliable, and easy to use.";

const DEFAULT_PROFILE_CONTENT = {
  lhs: [DEFAULT_PROFILE],
  rhs: [
    "Full-stack delivery across APIs, dashboards, forms, and internal tools.",
    "Experience translating business workflows into practical products.",
    "Comfort with data visualization, migration work, and responsive UI design.",
  ],
};

const DEFAULT_CONTACTS = {
  email_icon: "",
  linkedin_icon: "",
  number_icon: "",
  whatsapp_icon: "",
  github_icon: "",
  facebook_icon: "",
  instagram_icon: "",
  youtube_icon: "",
};

const CONTACT_META = {
  email_icon: {
    label: "Email",
    iconClass: "i-logos:google-gmail w-63.67px h-48px",
  },
  linkedin_icon: {
    label: "LinkedIn",
    iconClass: "i-skill-icons:linkedin w-48px h-48px",
  },
  number_icon: {
    label: "Phone",
    iconClass: "i-ic:baseline-phone-in-talk w-48px h-48px",
  },
  whatsapp_icon: {
    label: "WhatsApp",
    iconClass: "i-logos:whatsapp-icon w-47.63px h-48px",
  },
  github_icon: {
    label: "GitHub",
    iconClass: "i-skill-icons:github-light w-48px h-48px",
  },
  facebook_icon: {
    label: "Facebook",
    iconClass: "i-logos:facebook w-48px h-48px",
  },
  instagram_icon: {
    label: "Instagram",
    iconClass: "i-skill-icons:instagram w-48px h-48px",
  },
  youtube_icon: {
    label: "YouTube",
    iconClass: "i-logos:youtube-icon w-68.27px h-48px",
  },
};

const DEFAULT_LABELS = {
  email_icon: "Email",
  linkedin_icon: "LinkedIn",
  number_icon: "Phone Number",
  whatsapp_icon: "WhatsApp",
  github_icon: "GitHub",
  facebook_icon: "Facebook",
  instagram_icon: "Instagram",
  youtube_icon: "YouTube",
};

const DEFAULT_EMOJI_PRESETS = [
  {
    id: "thumbs_up",
    iconify_class: "i-noto-v1:thumbs-up",
    text: "Your portfolio looks impressive and professional.",
  },
  {
    id: "heart",
    iconify_class: "i-noto-v1:red-heart",
    text: "Loved the visual style and the way the projects are presented.",
  },
  {
    id: "squint_tears",
    iconify_class: "i-glyphs-poly:grin-squint-tears",
    text: "Clean work. I would be happy to discuss relevant opportunities.",
  },
  {
    id: "face_angry",
    iconify_class: "i-glyphs-poly:angry",
    text: "A few details felt unclear. Could you share more context about the projects?",
  },
  {
    id: "thumbs_down",
    iconify_class: "i-noto-v1:thumbs-down",
    text: "Please refresh the presentation and project details for stronger impact.",
  },
];

const PROFILE_COVER_IMAGES = {
  light: "/legacy-assets/images/light_cover_profile.png",
  dark: "/legacy-assets/images/dark_cover_profile.png",
};

function parseGvizJson(text) {
  return JSON.parse(text.substring(47).slice(0, -2));
}

async function fetchSheetColumns(sheetName) {
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&sheet=${sheetName}&headers=1`;
  const response = await fetch(url);
  const text = await response.text();
  const json = parseGvizJson(text);
  const headers = json.table.cols.map((col) => col.label);
  const rows = json.table.rows ?? [];
  const columns = Object.fromEntries(headers.map((header) => [header, []]));

  rows.forEach((row) => {
    headers.forEach((header, index) => {
      const rawValue = row.c?.[index]?.v;
      const value =
        rawValue instanceof Date
          ? rawValue.toISOString().split("T")[0]
          : (rawValue ?? "");
      columns[header].push(value);
    });
  });

  return columns;
}

function resolveContactHref(id, value) {
  if (!value) {
    return "#contact";
  }

  if (
    /^https?:\/\//i.test(value) ||
    /^mailto:/i.test(value) ||
    /^tel:/i.test(value)
  ) {
    return value;
  }

  if (id === "email_icon") {
    return `mailto:${value}`;
  }

  if (id === "number_icon") {
    return `tel:${value}`;
  }

  if (id === "whatsapp_icon") {
    const normalized = value.replace(/[^\d+]/g, "");
    return `https://wa.me/${normalized.replace("+", "")}`;
  }

  return `https://${value}`;
}

function resolveGoogleDocsPdfUrl(url) {
  const trimmedUrl = String(url || "").trim();

  if (!trimmedUrl) {
    return "";
  }

  try {
    const parsedUrl = new URL(trimmedUrl);
    const documentId = parsedUrl.pathname.match(/\/document\/d\/([^/]+)/)?.[1];

    if (parsedUrl.hostname === "docs.google.com" && documentId) {
      return `https://docs.google.com/document/d/${documentId}/export?format=pdf`;
    }
  } catch {
    return trimmedUrl;
  }

  return trimmedUrl;
}

function normalizeContacts(data) {
  const titles = data.title ?? [];
  const values = data.data ?? [];
  const subTitles = data.sub_title ?? [];
  const contacts = { ...DEFAULT_CONTACTS };
  const labels = { ...DEFAULT_LABELS };

  titles.forEach((id, index) => {
    contacts[id] = values[index] ?? "";
    labels[id] = subTitles[index] || labels[id] || "Contact";
  });

  return { contacts, labels };
}

function getPersonalDetailValue(data, key) {
  const valueIndex = data.title?.indexOf(key) ?? -1;

  return valueIndex >= 0 ? (data.data?.[valueIndex] ?? "") : "";
}

function isValidIconifyClass(iconClass) {
  return /^i-[a-z0-9-]+:[a-z0-9][a-z0-9-]*$/i.test(iconClass.trim());
}

function getIconifyUrl(iconClass) {
  if (!isValidIconifyClass(iconClass)) {
    return "";
  }

  const [collection, iconName] = iconClass.trim().slice(2).split(":");

  return `https://api.iconify.design/${collection}/${iconName}.svg`;
}

function normalizeEmojiPresets(data) {
  if (!data.id?.length) {
    return DEFAULT_EMOJI_PRESETS;
  }

  const presets = data.id
    .map((rawId, index) => {
      const id = String(rawId || `emoji_${index + 1}`).trim();
      const text = String(data.text?.[index] || "").trim();
      const iconifyClass = String(data.iconify_class?.[index] || "").trim();

      if (!text || !isValidIconifyClass(iconifyClass)) {
        return null;
      }

      return {
        id,
        text,
        iconify_class: iconifyClass,
      };
    })
    .filter(Boolean);

  return presets.length ? presets : DEFAULT_EMOJI_PRESETS;
}

function normalizeProfileContent(data) {
  const resolveColumn = (expectedName) => {
    const matchingColumn = Object.keys(data).find(
      (columnName) =>
        columnName.trim().toLowerCase() === expectedName.trim().toLowerCase(),
    );

    return matchingColumn ? (data[matchingColumn] ?? []) : [];
  };

  const lhs = resolveColumn("lhs_profile_content")
    .map((item) => String(item ?? "").trim())
    .filter(Boolean);
  const rhs = resolveColumn("rhs_profile_content")
    .map((item) => String(item ?? "").trim())
    .filter(Boolean);

  return {
    lhs: lhs.length ? lhs : DEFAULT_PROFILE_CONTENT.lhs,
    rhs: rhs.length ? rhs : DEFAULT_PROFILE_CONTENT.rhs,
  };
}

function normalizeExperience(data) {
  const resolveColumn = (expectedName) => {
    const matchingColumn = Object.keys(data).find(
      (columnName) =>
        columnName.trim().toLowerCase() === expectedName.trim().toLowerCase(),
    );

    return matchingColumn ? (data[matchingColumn] ?? []) : [];
  };

  const periodColumn = resolveColumn("period");
  const roleColumn = resolveColumn("role");
  const titleColumn = resolveColumn("title");
  const companyColumn = resolveColumn("company");
  const locationColumn = resolveColumn("location");
  const descriptionColumn = resolveColumn("description");

  const rowCount = Math.max(
    periodColumn.length,
    roleColumn.length,
    titleColumn.length,
    companyColumn.length,
    locationColumn.length,
    descriptionColumn.length,
  );

  const experiences = [];
  let currentExperience = null;

  for (let index = 0; index < rowCount; index += 1) {
    const period = String(periodColumn[index] ?? "").trim();
    const role = String(roleColumn[index] ?? "").trim();
    const title = role || String(titleColumn[index] ?? "").trim();
    const company = String(companyColumn[index] ?? "").trim();
    const location = String(locationColumn[index] ?? "").trim();
    const description = String(descriptionColumn[index] ?? "").trim();

    if (!period && !title && !company && !location && !description) {
      continue;
    }

    if (period) {
      if (currentExperience) {
        experiences.push(currentExperience);
      }

      currentExperience = {
        period,
        title,
        company,
        location,
        points: [],
      };
    }

    if (!currentExperience) {
      continue;
    }

    if (description) {
      currentExperience.points.push(description);
    }
  }

  if (currentExperience) {
    experiences.push(currentExperience);
  }

  return experiences;
}

function normalizeProjects(data) {
  const resolveColumn = (expectedName) => {
    const matchingColumn = Object.keys(data).find(
      (columnName) =>
        columnName.trim().toLowerCase() === expectedName.trim().toLowerCase(),
    );

    return matchingColumn ? (data[matchingColumn] ?? []) : [];
  };

  const typeColumn = resolveColumn("project_type");
  const projectColumn = resolveColumn("project");
  const descriptionColumn = resolveColumn("description");

  const rowCount = Math.max(
    typeColumn.length,
    projectColumn.length,
    descriptionColumn.length,
  );

  const groups = {};
  let currentType = null;
  let currentProject = null;

  for (let i = 0; i < rowCount; i += 1) {
    const rawType = String(typeColumn[i] ?? "").trim();
    const rawProject = String(projectColumn[i] ?? "").trim();
    const rawDescription = String(descriptionColumn[i] ?? "").trim();

    // ignore fully empty rows
    if (!rawType && !rawProject && !rawDescription) {
      continue;
    }

    if (rawType) {
      currentType = rawType;
    }

    // start a new project block when project or project_type is present
    if (rawProject) {
      const typeKey = currentType || rawType || "main";

      if (!groups[typeKey]) {
        groups[typeKey] = [];
      }

      currentProject = { project: rawProject, description: [] };
      groups[typeKey].push(currentProject);
    }

    // if project_type is present but project isn't (rare), ensure we have currentType
    if (rawType && !rawProject) {
      if (!currentType) currentType = rawType;
      if (!groups[currentType]) groups[currentType] = [];
    }

    // append description rows to current project
    if (rawDescription && currentProject) {
      currentProject.description.push(rawDescription);
    }
  }

  return Object.keys(groups).length ? groups : DEFAULT_PROJECTS;
}

async function fetchProjects() {
  const projectsData = await fetchSheetColumns("projects");
  return normalizeProjects(projectsData);
}

function normalizeKeyHighlights(data) {
  const resolveColumn = (expectedName) => {
    const matchingColumn = Object.keys(data).find(
      (columnName) =>
        columnName.trim().toLowerCase() === expectedName.trim().toLowerCase(),
    );

    return matchingColumn ? (data[matchingColumn] ?? []) : [];
  };

  const keys = resolveColumn("Highlight_key");
  const details = resolveColumn("Detail");

  return keys
    .map((highlightKey, index) => ({
      highlight_key: String(highlightKey ?? "").trim(),
      detail: String(details[index] ?? "").trim(),
    }))
    .filter((item) => item.highlight_key && item.detail);
}

async function fetchKeyHighlights() {
  const keyHighlightsData = await fetchSheetColumns("Key_highlights");
  return normalizeKeyHighlights(keyHighlightsData);
}

async function fetchExperience() {
  const experienceData = await fetchSheetColumns("Experience");
  return normalizeExperience(experienceData);
}

function normalizeSkills(data) {
  return Object.keys(data)
    .map((columnName) => {
      const title = columnName.trim();
      const items = (data[columnName] ?? [])
        .map((item) => String(item ?? "").trim())
        .filter(Boolean);

      return {
        title,
        items,
      };
    })
    .filter((group) => group.title && group.items.length);
}

async function fetchSkills() {
  const skillsData = await fetchSheetColumns("skills");
  const normalizedSkills = normalizeSkills(skillsData);

  return normalizedSkills.length ? normalizedSkills : DEFAULT_SKILL_GROUPS;
}

function usePortfolioData() {
  const [profileContent, setProfileContent] = useState(DEFAULT_PROFILE_CONTENT);
  const [contacts, setContacts] = useState(DEFAULT_CONTACTS);
  const [labels, setLabels] = useState(DEFAULT_LABELS);
  const [emojiPresets, setEmojiPresets] = useState(DEFAULT_EMOJI_PRESETS);
  const [resumeLink, setResumeLink] = useState("");
  const [experience, setExperience] = useState(DEFAULT_EXPERIENCE);
  const [isExperienceLoading, setIsExperienceLoading] = useState(true);
  const [experienceError, setExperienceError] = useState("");
  const [projectsData, setProjectsData] = useState(DEFAULT_PROJECTS);
  const [isProjectsLoading, setIsProjectsLoading] = useState(true);
  const [projectsError, setProjectsError] = useState("");
  const [skillsData, setSkillsData] = useState(DEFAULT_SKILL_GROUPS);
  const [isSkillsLoading, setIsSkillsLoading] = useState(true);
  const [skillsError, setSkillsError] = useState("");
  const [keyHighlights, setKeyHighlights] = useState([]);
  const [isKeyHighlightsLoading, setIsKeyHighlightsLoading] = useState(true);
  const [keyHighlightsError, setKeyHighlightsError] = useState("");

  useEffect(() => {
    let ignore = false;

    async function loadData() {
      try {
        const [
          profileData,
          emojiData,
          contactData,
          keyHighlightsData,
          experienceData,
          projectsApiData,
          skillsApiData,
        ] = await Promise.all([
          fetchSheetColumns("profile"),
          fetchSheetColumns("emoji"),
          fetchSheetColumns("personal_details"),
          fetchKeyHighlights(),
          fetchExperience(),
          fetchProjects(),
          fetchSkills(),
        ]);

        if (ignore) {
          return;
        }

        startTransition(() => {
          setProfileContent(normalizeProfileContent(profileData));
          setEmojiPresets(normalizeEmojiPresets(emojiData));

          const normalized = normalizeContacts(contactData);
          setContacts(normalized.contacts);
          setLabels(normalized.labels);
          setResumeLink(getPersonalDetailValue(contactData, "resume_link"));
          setKeyHighlights(keyHighlightsData);
          setExperience(experienceData);
          setProjectsData(projectsApiData);
          setSkillsData(skillsApiData);
          setExperienceError("");
          setIsExperienceLoading(false);
          setProjectsError("");
          setIsProjectsLoading(false);
          setSkillsError("");
          setIsSkillsLoading(false);
          setKeyHighlightsError("");
          setIsKeyHighlightsLoading(false);
        });
      } catch (error) {
        console.error("Unable to load Google Sheet data", error);

        if (ignore) {
          return;
        }

        startTransition(() => {
          setExperience(DEFAULT_EXPERIENCE);
          setExperienceError("Unable to load experience right now.");
          setIsExperienceLoading(false);
          setProjectsData(DEFAULT_PROJECTS);
          setProjectsError("Unable to load projects right now.");
          setIsProjectsLoading(false);
          setSkillsData(DEFAULT_SKILL_GROUPS);
          setSkillsError("Unable to load skills right now.");
          setIsSkillsLoading(false);
          setKeyHighlights([]);
          setKeyHighlightsError("Unable to load highlights right now.");
          setIsKeyHighlightsLoading(false);
        });
      }
    }

    loadData();

    return () => {
      ignore = true;
    };
  }, []);

  return {
    profileContent,
    contacts,
    labels,
    emojiPresets,
    resumeLink,
    experience,
    isExperienceLoading,
    experienceError,
    projectsData,
    isProjectsLoading,
    projectsError,
    skillsData,
    isSkillsLoading,
    skillsError,
    keyHighlights,
    isKeyHighlightsLoading,
    keyHighlightsError,
  };
}

function resolveInitialTheme() {
  if (typeof window === "undefined") {
    return "dark";
  }

  const storedTheme = window.localStorage.getItem("cvaura-theme");

  if (storedTheme === "light" || storedTheme === "dark") {
    return storedTheme;
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches
    ? "dark"
    : "light";
}

function useTheme() {
  const [theme, setTheme] = useState(resolveInitialTheme);

  useLayoutEffect(() => {
    document.documentElement.dataset.theme = theme;
    window.localStorage.setItem("cvaura-theme", theme);
  }, [theme]);

  return [theme, setTheme];
}

function useScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const animationFrameRef = useRef(null);

  const updateProgress = useEffectEvent(() => {
    if (animationFrameRef.current) {
      return;
    }

    animationFrameRef.current = requestAnimationFrame(() => {
      animationFrameRef.current = null;

      const maxScroll =
        document.documentElement.scrollHeight -
        document.documentElement.clientHeight;
      const currentScroll = window.scrollY;

      setScrollProgress(maxScroll > 0 ? (currentScroll / maxScroll) * 100 : 0);
    });
  });

  useEffect(() => {
    updateProgress();
    window.addEventListener("scroll", updateProgress, { passive: true });
    window.addEventListener("resize", updateProgress);

    return () => {
      window.removeEventListener("scroll", updateProgress);
      window.removeEventListener("resize", updateProgress);

      if (animationFrameRef.current) {
        cancelAnimationFrame(animationFrameRef.current);
      }
    };
  }, []);

  return scrollProgress;
}

function useActiveSection() {
  const [activeSection, setActiveSection] = useState("home");
  const sectionsRef = useRef([]);
  const observedSectionSignatureRef = useRef("");
  const mutationFrameRef = useRef(null);
  const scrollFrameRef = useRef(null);

  const syncActiveSection = useEffectEvent(() => {
    const sections = sectionsRef.current;

    if (!sections.length) {
      setActiveSection("home");
      return;
    }

    const activationOffset = Math.max(130, window.innerHeight * 0.35);
    const currentSection = sections.find((section) => {
      const rect = section.getBoundingClientRect();
      return rect.top <= activationOffset && rect.bottom > activationOffset;
    });

    if (currentSection) {
      setActiveSection(currentSection.id);
      return;
    }

    const passedSections = sections.filter(
      (section) => section.getBoundingClientRect().top <= activationOffset,
    );

    if (passedSections.length) {
      setActiveSection(passedSections[passedSections.length - 1].id);
      return;
    }

    setActiveSection(sections[0].id);
  });

  useEffect(() => {
    const refreshSections = () => {
      const sections = Array.from(document.querySelectorAll("section[id]"));
      const sectionSignature = sections.map((section) => section.id).join("|");

      if (sectionSignature === observedSectionSignatureRef.current) {
        syncActiveSection();
        return;
      }

      observedSectionSignatureRef.current = sectionSignature;
      sectionsRef.current = sections;
      syncActiveSection();
    };

    const scheduleRefreshSections = () => {
      if (mutationFrameRef.current) {
        return;
      }

      mutationFrameRef.current = requestAnimationFrame(() => {
        mutationFrameRef.current = null;
        refreshSections();
      });
    };

    const scheduleSyncActiveSection = () => {
      if (scrollFrameRef.current) {
        return;
      }

      scrollFrameRef.current = requestAnimationFrame(() => {
        scrollFrameRef.current = null;
        syncActiveSection();
      });
    };

    const mutationObserver = new MutationObserver(scheduleRefreshSections);

    refreshSections();
    window.addEventListener("scroll", scheduleSyncActiveSection, {
      passive: true,
    });
    window.addEventListener("resize", scheduleSyncActiveSection);
    mutationObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["id"],
    });

    return () => {
      window.removeEventListener("scroll", scheduleSyncActiveSection);
      window.removeEventListener("resize", scheduleSyncActiveSection);
      mutationObserver.disconnect();

      if (mutationFrameRef.current) {
        cancelAnimationFrame(mutationFrameRef.current);
      }

      if (scrollFrameRef.current) {
        cancelAnimationFrame(scrollFrameRef.current);
      }
    };
  }, []);

  return { activeSection, setActiveSection };
}

function useScrollSpy() {
  const scrollProgress = useScrollProgress();
  const { activeSection, setActiveSection } = useActiveSection();

  return { activeSection, scrollProgress, setActiveSection };
}

function showCopyNotification({ label, status }) {
  const isSuccess = status === "success";

  Swal.fire({
    toast: true,
    position: "top-end",
    title: isSuccess ? "Copied" : "Copy unavailable",
    text: isSuccess
      ? `${label} has been copied to your clipboard.`
      : `${label} could not be copied right now.`,
    icon: isSuccess ? "success" : "error",
    color: "var(--text-main)",
    background: "var(--surface)",
    iconColor: isSuccess ? "var(--accent)" : "var(--highlight)",
    timer: 5000,
    timerProgressBar: true,
    showCloseButton: true,
    showConfirmButton: false,
    customClass: {
      popup: "styled-popup themed-copy-popup themed-mail-popup",
      title: "themed-copy-popup-title",
      htmlContainer: "themed-copy-popup-text",
      closeButton: "themed-copy-popup-close",
      timerProgressBar: "themed-copy-popup-progress",
    },
    backdrop: false,
  });
}

function showMailNotification({ status, title, message }) {
  const isSuccess = status === "success";

  Swal.fire({
    toast: true,
    position: "top-end",
    title: title || (isSuccess ? "Message sent" : "Message not sent"),
    text:
      message ||
      (isSuccess
        ? "Your message was sent successfully."
        : "Please try again or use the direct contact links."),
    icon: isSuccess ? "success" : "error",
    color: "var(--text-main)",
    background: "var(--surface)",
    iconColor: isSuccess ? "var(--accent)" : "var(--highlight)",
    timer: 5000,
    timerProgressBar: true,
    showCloseButton: true,
    showConfirmButton: false,
    customClass: {
      popup: "styled-popup themed-copy-popup themed-mail-popup",
      title: "themed-copy-popup-title",
      htmlContainer: "themed-copy-popup-text",
      closeButton: "themed-copy-popup-close",
      timerProgressBar: "themed-copy-popup-progress",
    },
    backdrop: false,
  });
}

function getContrastColor(theme, tone = "main") {
  const palette =
    theme === "dark"
      ? {
          strong: "#FFFFFF",
          main: "#EAEAEA",
          muted: "#D7DDD7",
          tooltipBackground: "#102331",
        }
      : {
          strong: "#000000",
          main: "#1A1A1A",
          muted: "#333333",
          tooltipBackground: "#F3F4F6",
        };

  return palette[tone] ?? palette.main;
}

function updateProfileImage(theme) {
  return PROFILE_COVER_IMAGES[theme] ?? PROFILE_COVER_IMAGES.dark;
}

const CHART_BASE_COLORS = {
  dark: ["#89C184", "#A7C7E7", "#6B5E4A", "#D6CFC7", "#4A6FA5", "#6b4b8e"],
  light: ["#0DB0C0", "#F28D35", "#5B7C99", "#7FA36B", "#816B54", "#405e38"],
};

function generateUniqueColors(count, theme) {
  const palette = CHART_BASE_COLORS[theme] ?? CHART_BASE_COLORS.dark;
  const uniqueColors = [];
  const seen = new Set();

  const pushColor = (color) => {
    const normalized = color.toLowerCase();

    if (seen.has(normalized)) {
      return false;
    }

    seen.add(normalized);
    uniqueColors.push(color);
    return true;
  };

  palette.forEach(pushColor);

  let index = 0;

  while (uniqueColors.length < count) {
    const hue = Math.round((index * 137.5) % 360);
    const saturation = theme === "dark" ? 46 : 58;
    const lightness = theme === "dark" ? 62 : 44;
    pushColor(`hsl(${hue}, ${saturation}%, ${lightness}%)`);
    index += 1;
  }

  return uniqueColors.slice(0, count);
}

function applyChartTextTheme({ root, theme, series, legend, chartTitle }) {
  const strong = am5.Color.fromString(getContrastColor(theme, "strong"));
  const main = am5.Color.fromString(getContrastColor(theme, "main"));
  const muted = am5.Color.fromString(getContrastColor(theme, "muted"));
  const tooltipBackground = am5.Color.fromString(
    getContrastColor(theme, "tooltipBackground"),
  );

  root.interfaceColors.set("text", main);
  root.interfaceColors.set("alternativeText", strong);
  root.interfaceColors.set("grid", muted);

  if (chartTitle) {
    chartTitle.setAll({
      fill: strong,
    });
  }

  if (series) {
    series.labels.template.setAll({
      fill: strong,
      fontSize: 12,
    });

    series.ticks.template.setAll({
      stroke: muted,
    });

    const tooltip = series.get("tooltip");

    tooltip?.label.setAll({
      fill: strong,
      fontSize: 13,
    });

    tooltip?.get("background")?.setAll({
      fill: tooltipBackground,
      fillOpacity: 0.96,
      stroke: muted,
      strokeOpacity: 0.35,
    });
  }

  if (legend) {
    legend.labels.template.setAll({
      fill: strong,
      fontSize: 13,
    });

    legend.valueLabels.template.setAll({
      fill: main,
      fontSize: 12,
    });
  }
}

function applyExportMenuIcon(menu) {
  const replaceIcon = () => {
    const iconElement = menu.getPrivate?.("iconElement") || menu._iconElement;

    if (!iconElement) {
      return false;
    }

    const icon = document.createElement("iconify-icon");
    icon.setAttribute("icon", "line-md:downloading-loop");
    icon.setAttribute("aria-hidden", "true");
    icon.style.fontSize = "40px";
    icon.style.width = "40px";
    icon.style.height = "40px";
    iconElement.replaceChildren(icon);
    return true;
  };

  if (replaceIcon()) {
    requestAnimationFrame(() => {
      replaceIcon();
    });
  } else {
    requestAnimationFrame(() => {
      replaceIcon();
    });
  }
}

function EducationChart({ data, theme, title }) {
  const chartRef = useRef(null);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const borderStrong = styles.getPropertyValue("--border-strong").trim();
    const uniqueChartColors = generateUniqueColors(data.length, theme);

    const root = am5.Root.new(chartRef.current);
    root.setThemes([am5themes_Animated.new(root)]);
    root._logo?.dispose();

    const chart = root.container.children.push(
      am5percent.PieChart.new(root, {
        layout: root.verticalLayout,
        innerRadius: am5.percent(42),
      }),
    );

    const chartTitle = chart.children.unshift(
      am5.Label.new(root, {
        text: title,
        centerX: am5.percent(50),
        x: am5.percent(50),
        fontSize: 16,
        fontWeight: "600",
        marginBottom: 14,
      }),
    );

    const series = chart.series.push(
      am5percent.PieSeries.new(root, {
        valueField: "value",
        categoryField: "category",
        legendLabelText: "{category}",
        legendValueText: "{value}",
        tooltip: am5.Tooltip.new(root, {
          labelText: "{category}: {value}",
        }),
      }),
    );

    series.slices.template.setAll({
      cornerRadius: 8,
      strokeWidth: 2,
      stroke: am5.Color.fromString(borderStrong),
    });

    series.set(
      "colors",
      am5.ColorSet.new(root, {
        colors: uniqueChartColors.map((color) => am5.Color.fromString(color)),
        reuse: false,
      }),
    );

    series.data.setAll(data);

    const legend = chart.children.push(
      am5.Legend.new(root, {
        centerX: am5.percent(50),
        x: am5.percent(50),
        marginTop: 16,
        useDefaultMarker: true,
      }),
    );

    applyChartTextTheme({ root, theme, series, legend, chartTitle });
    legend.data.setAll(series.dataItems);

    const exportingMenu = am5plugins_exporting.ExportingMenu.new(root, {
      align: "right",
      valign: "top",
      useDefaultCSS: false,
    });

    applyExportMenuIcon(exportingMenu);

    const exporting = am5plugins_exporting.Exporting.new(root, {
      dataSource: data,
      menu: exportingMenu,
    });

    series.appear(1000, 100);

    const resizeObserver = new ResizeObserver(() => {
      root.resize();
    });

    if (chartRef.current) {
      resizeObserver.observe(chartRef.current);
    }

    return () => {
      resizeObserver.disconnect();
      exporting.dispose();
      root.dispose();
    };
  }, [data, theme, title]);

  return <div ref={chartRef} className="education-chart" />;
}

function App() {
  const [theme, setTheme] = useTheme();
  const {
    profileContent,
    contacts,
    labels,
    emojiPresets,
    resumeLink,
    experience,
    isExperienceLoading,
    experienceError,
    projectsData,
    isProjectsLoading,
    projectsError,
    skillsData,
    isSkillsLoading,
    skillsError,
    keyHighlights,
    isKeyHighlightsLoading,
    keyHighlightsError,
  } = usePortfolioData();
  const [projectsModalOpen, setProjectsModalOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState(null);
  const [activeEducationIndex, setActiveEducationIndex] = useState(null);

  const openProjectModal = (project) => {
    setSelectedProject(project);
    setProjectsModalOpen(true);
  };

  const closeProjectModal = () => {
    setProjectsModalOpen(false);
    setSelectedProject(null);
  };

  const handleEducationPointerMove = (event) => {
    if (event.pointerType === "touch") {
      return;
    }

    const card = event.target.closest("[data-education-card-index]");

    if (!card || !event.currentTarget.contains(card)) {
      return;
    }

    const nextIndex = Number(card.dataset.educationCardIndex);
    setActiveEducationIndex((currentIndex) =>
      currentIndex === nextIndex ? currentIndex : nextIndex,
    );
  };

  const handleEducationPointerLeave = () => {
    setActiveEducationIndex(null);
  };

  useEffect(() => {
    if (!projectsModalOpen) {
      return undefined;
    }

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleEscape = (event) => {
      if (event.key === "Escape") {
        closeProjectModal();
      }
    };

    window.addEventListener("keydown", handleEscape);

    return () => {
      window.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = previousOverflow;
    };
  }, [projectsModalOpen]);
  const [form, setForm] = useState({
    recipient_from_name: "",
    recipient_from_email: "",
    end_user_message: "",
  });
  const [mailState, setMailState] = useState({ status: "idle", message: "" });
  const { activeSection, scrollProgress, setActiveSection } = useScrollSpy();
  const profileCoverImage = updateProfileImage(theme);

  useEffect(() => {
    emailjs.init({ publicKey: EMAILJS_PUBLIC_KEY });
  }, []);

  useEffect(() => {
    Object.values(PROFILE_COVER_IMAGES).forEach((src) => {
      const image = new Image();
      image.src = src;
    });
  }, []);

  useEffect(() => {
    if (mailState.status !== "success") {
      return undefined;
    }

    const timeoutId = window.setTimeout(() => {
      setMailState((current) =>
        current.status === "success"
          ? { status: "idle", message: "" }
          : current,
      );
    }, 5000);

    return () => window.clearTimeout(timeoutId);
  }, [mailState.status]);

  const contactCards = useMemo(
    () =>
      Object.keys(CONTACT_META).map((id) => ({
        id,
        label: labels[id] || CONTACT_META[id].label,
        value: contacts[id] || "",
        href: resolveContactHref(id, contacts[id] || ""),
        iconClass: CONTACT_META[id].iconClass,
      })),
    [contacts, labels],
  );

  const handleNavClick = (id) => {
    setActiveSection(id);
    document
      .getElementById(id)
      ?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const handleResumeDownload = (event) => {
    const resumePdfUrl = resolveGoogleDocsPdfUrl(resumeLink);

    if (!resumePdfUrl) {
      event.preventDefault();
      showMailNotification({
        status: "error",
        title: "Resume not available",
        message: "Resume link is not available right now.",
      });
      return;
    }

    window.setTimeout(() => {
      showMailNotification({
        status: "success",
        title: "Resume downloaded",
        message: `${RESUME_DOWNLOAD_FILENAME} has been downloaded successfully.`,
      });
    }, 600);
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: value }));
  };

  const handlePresetClick = (text) => {
    setForm((current) => ({ ...current, end_user_message: text }));
  };

  const handleCopy = async (label, value) => {
    if (!value) {
      setMailState({
        status: "error",
        message: `${label} is not available right now.`,
      });
      showCopyNotification({ theme, label, status: "error" });
      return;
    }

    try {
      await navigator.clipboard.writeText(value);
      setMailState({
        status: "success",
        message: `${label} copied to clipboard.`,
      });
      showCopyNotification({ theme, label, status: "success" });
    } catch (error) {
      console.error("Copy failed", error);
      setMailState({
        status: "error",
        message: `Unable to copy ${label.toLowerCase()}.`,
      });
      showCopyNotification({ theme, label, status: "error" });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setMailState({ status: "loading", message: "Sending your message..." });

    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
        name: form.recipient_from_name,
        email: form.recipient_from_email,
        message: form.end_user_message,
      });

      setForm({
        recipient_from_name: "",
        recipient_from_email: "",
        end_user_message: "",
      });
      setMailState({
        status: "success",
        message: "Message sent successfully. Thank you for reaching out.",
      });
      showMailNotification({ status: "success" });
    } catch (error) {
      console.error("EmailJS send failed", error);
      setMailState({
        status: "error",
        message:
          "The message could not be sent right now. Please use the direct contact links below.",
      });
      showMailNotification({ status: "error" });
    }
  };

  return (
    <div className="app-shell">
      <div
        className="scroll-progress"
        style={{ transform: `scaleX(${scrollProgress / 100})` }}
      />

      <header className="site-header">
        <a
          className="brand"
          href="#home"
          onClick={(event) => {
            event.preventDefault();
            handleNavClick("home");
          }}
        >
          <span className="brand-mark">
            <img
              className="brand-logo"
              src="/legacy-assets/images/favicon.png"
              alt="CV Logo"
            />
          </span>
          <span>
            <strong>CVaura</strong>
            <small>Pushparaj Murugesan</small>
          </span>
        </a>

        <nav className="main-nav" aria-label="Primary">
          {NAV_ITEMS.map((item) => (
            <button
              key={item.id}
              id={`${item.id}_btn_li`}
              type="button"
              className={
                activeSection === item.id
                  ? "nav-pill active highlight_li_true"
                  : "nav-pill"
              }
              aria-current={activeSection === item.id ? "page" : undefined}
              onClick={() => handleNavClick(item.id)}
            >
              {item.label}
            </button>
          ))}
        </nav>

        <button
          type="button"
          className="theme-toggle"
          onClick={() =>
            setTheme((current) => (current === "dark" ? "light" : "dark"))
          }
          aria-label="Toggle theme"
        >
          <span className="theme-stars"></span>
          <div className="i-line-md:light-dark-loop theme-toggle-icon"></div>
        </button>
      </header>

      <main>
        <section id="home" className="hero-section section-block">
          <div className="hero-copy">
            <p className="eyebrow">FULL-STACK ENGINEER</p>
            <h1>
              Building scalable business tools and modern web applications with
              clean architecture and real-world impact.
            </h1>
            <p className="hero-text">
              I build scalable web applications, automation tools, and
              data-driven platforms focused on performance, usability, and
              operational efficiency.
            </p>
            <div className="hero-actions">
              <a
                className="primary-button"
                href={resolveGoogleDocsPdfUrl(resumeLink) || "#home"}
                download={RESUME_DOWNLOAD_FILENAME}
                onClick={handleResumeDownload}
                aria-label="Download resume as a PDF"
              >
                <div
                  className="resume-download-icon i-line-md:downloading-loop  w-48px h-48px"
                  aria-hidden="true"
                />
                <span>Download Resume</span>
              </a>
              <button
                type="button"
                className="secondary-button"
                onClick={() => handleNavClick("contact")}
              >
                Let's Connect
              </button>
            </div>
            <div className="metrics-grid">
              {isKeyHighlightsLoading ? (
                <article
                  className="metric-card metric-card-message"
                  role="status"
                >
                  <span>Loading highlights...</span>
                </article>
              ) : keyHighlightsError ? (
                <article
                  className="metric-card metric-card-message"
                  role="status"
                >
                  <span>{keyHighlightsError}</span>
                </article>
              ) : keyHighlights.length ? (
                keyHighlights.map((item) => (
                  <article
                    key={`${item.highlight_key}-${item.detail}`}
                    className="metric-card"
                  >
                    <strong>{item.highlight_key}</strong>
                    <span>{item.detail}</span>
                  </article>
                ))
              ) : (
                <article
                  className="metric-card metric-card-message"
                  role="status"
                >
                  <span>No highlights found.</span>
                </article>
              )}
            </div>
          </div>

          <div className="hero-visual">
            <div className="hero-orb hero-orb-one" />
            <div className="hero-orb hero-orb-two" />
            <div className="hero-image-frame">
              <img
                src={profileCoverImage}
                alt="Pushparaj portfolio cover artwork"
              />
            </div>
            <div className="status-card">
              <p className="home-card-name">Pushparaj Murugesan</p>
              <strong>
                Full-stack engineer focused on scalable architecture,
                performance, and product impact.
              </strong>
            </div>
          </div>
        </section>

        <section id="profile" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Profile</p>
            <h2>Professional summary</h2>
          </div>
          <div className="profile-grid">
            <article className="glass-card narrative-card">
              {profileContent.lhs.map((paragraph, index) => (
                <p key={`${paragraph}-${index}`}>{paragraph}</p>
              ))}
            </article>
            <article className="glass-card profile-highlights">
              <h3>Key Highlights</h3>
              <ul>
                {profileContent.rhs.map((item, index) => (
                  <li key={`${item}-${index}`}>{item}</li>
                ))}
              </ul>
            </article>
          </div>
        </section>

        <section id="experience" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Experience</p>
            <h2>Hands-on product and platform work</h2>
          </div>
          {isExperienceLoading ? (
            <article className="glass-card metric-card-message" role="status">
              <span>Loading experience...</span>
            </article>
          ) : experienceError ? (
            <article className="glass-card metric-card-message" role="status">
              <span>{experienceError}</span>
            </article>
          ) : null}
          <div className="timeline">
            {experience.length ? (
              experience.map((item, index) => (
                <article
                  key={`${item.company}-${item.period}-${item.title}-${index}`}
                  className="timeline-card glass-card"
                >
                  <div className="timeline-meta">
                    <span>{item.period}</span>
                    <span>{item.location}</span>
                  </div>
                  <h3>{item.title}</h3>
                  <p className="timeline-company">{item.company}</p>
                  <ul>
                    {item.points.map((point, pointIndex) => (
                      <li key={`${point}-${pointIndex}`}>{point}</li>
                    ))}
                  </ul>
                </article>
              ))
            ) : (
              <article className="glass-card metric-card-message" role="status">
                <span>No experience records found.</span>
              </article>
            )}
          </div>
        </section>

        <section id="projects" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Projects</p>
            <h2>Projects Built for Real-World Impact</h2>
          </div>
          {isProjectsLoading ? (
            <article className="glass-card metric-card-message" role="status">
              <span>Loading projects...</span>
            </article>
          ) : projectsError ? (
            <article className="glass-card metric-card-message" role="status">
              <span>{projectsError}</span>
            </article>
          ) : null}

          <div className="project-grid">
            {(projectsData?.main ?? []).map((proj, index) => (
              <article
                key={`${proj.project}-${index}`}
                className="project-card glass-card"
              >
                <span className="project-index">0{index + 1}</span>
                <h3 className="project-title">{proj.project}</h3>
                <p className="project-summary">
                  {proj.description?.length
                    ? `${proj.description.length} project detail${
                        proj.description.length > 1 ? "s" : ""
                      } available`
                    : "Project details will be updated soon."}
                </p>
                <div className="project-actions">
                  <button
                    type="button"
                    className="project-view-button"
                    onClick={() => openProjectModal(proj)}
                  >
                    <span>View Details</span>
                    <span className="project-view-icon" aria-hidden="true">
                      →
                    </span>
                  </button>
                </div>
              </article>
            ))}
          </div>

          {projectsModalOpen && selectedProject ? (
            <div
              className="modal-overlay"
              role="presentation"
              onClick={(event) => {
                if (event.target === event.currentTarget) {
                  closeProjectModal();
                }
              }}
            >
              <div
                className="glass-card project-modal"
                role="dialog"
                aria-modal="true"
                aria-labelledby="project-modal-title"
              >
                <div className="modal-header">
                  <div>
                    <span className="modal-eyebrow">Project Details</span>
                    <h3 id="project-modal-title">{selectedProject.project}</h3>
                  </div>
                  <button
                    type="button"
                    className="project-modal-close"
                    onClick={closeProjectModal}
                    aria-label="Close project details"
                  >
                    &times;
                  </button>
                </div>
                <div className="modal-body">
                  {selectedProject.description &&
                  selectedProject.description.length ? (
                    <ul>
                      {selectedProject.description.map((d, i) => (
                        <li key={`${d}-${i}`}>{d}</li>
                      ))}
                    </ul>
                  ) : (
                    <p>No additional details available.</p>
                  )}
                </div>
              </div>
            </div>
          ) : null}
        </section>

        <section id="skills" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Skills</p>
            <h2>
              Technology coverage from the original site, organized for quick
              scanning
            </h2>
          </div>
          {isSkillsLoading ? (
            <article className="glass-card metric-card-message" role="status">
              <span>Loading skills...</span>
            </article>
          ) : skillsError ? (
            <article className="glass-card metric-card-message" role="status">
              <span>{skillsError}</span>
            </article>
          ) : null}
          <div className="skills-layout">
            <div className="skills-groups">
              {skillsData.length ? (
                skillsData.map((group, groupIndex) => (
                  <article
                    key={`${group.title}-${groupIndex}`}
                    className="glass-card skill-group"
                    style={{ "--skill-delay": `${groupIndex * 70}ms` }}
                  >
                    <h3>{group.title}</h3>
                    <div className="chip-wrap">
                      {group.items.map((item, itemIndex) => (
                        <span
                          key={`${group.title}-${item}-${itemIndex}`}
                          className="skill-chip"
                          style={{
                            "--chip-delay": `${
                              groupIndex * 70 + itemIndex * 35
                            }ms`,
                          }}
                        >
                          {item}
                        </span>
                      ))}
                    </div>
                  </article>
                ))
              ) : (
                <article
                  className="glass-card metric-card-message"
                  role="status"
                >
                  <span>No skills found.</span>
                </article>
              )}
            </div>

            <div className="logo-grid">
              {LOGO_ITEMS.map((item) => (
                <a
                  key={item.name}
                  className="logo-card glass-card"
                  href={item.href}
                  target="_blank"
                  rel="noreferrer"
                >
                  <img src={item.image} alt={`${item.name} logo`} />
                  <span>{item.name}</span>
                </a>
              ))}
            </div>
          </div>
        </section>

        <section id="education" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Education</p>
            <h2>Academic Journey</h2>
          </div>
          <div
            className={`education-grid${
              activeEducationIndex !== null ? " has-active-card" : ""
            }`}
            onPointerMove={handleEducationPointerMove}
            onPointerLeave={handleEducationPointerLeave}
          >
            {EDUCATION.map((item, index) => (
              <article
                key={item.title}
                className={`glass-card education-card${
                  activeEducationIndex === index ? " is-active" : ""
                }`}
                data-education-card-index={index}
              >
                <div className="education-header">
                  <div>
                    <span className="education-period">{item.period}</span>
                    <h3>{item.title}</h3>
                    <p>{item.school}</p>
                  </div>
                  <img src={item.badge} alt={`${item.title} score badge`} />
                </div>
                <EducationChart
                  data={item.data}
                  theme={theme}
                  title={item.chartTitle}
                />
              </article>
            ))}
          </div>
        </section>

        <section id="contact" className="section-block">
          <div className="section-heading">
            <p className="eyebrow">Contact</p>
            <h2>Let's Connect</h2>
          </div>
          <p>
            Interested in collaborating, building impactful products, or
            discussing software engineering opportunities?
          </p>
          <p>
            Feel free to reach out through email or connect with me on
            professional platforms.
          </p>
          <div className="contact-layout">
            <form className="glass-card contact-form" onSubmit={handleSubmit}>
              <label htmlFor="recipient_from_name">Name</label>
              <input
                id="recipient_from_name"
                name="recipient_from_name"
                type="text"
                placeholder="Your name"
                value={form.recipient_from_name}
                onChange={handleInputChange}
                required
              />

              <label htmlFor="recipient_from_email">Email</label>
              <input
                id="recipient_from_email"
                name="recipient_from_email"
                type="email"
                placeholder="example@gmail.com"
                value={form.recipient_from_email}
                onChange={handleInputChange}
                required
              />

              <div className="preset-header">
                <label htmlFor="end_user_message">Message</label>
                <span>Quick feedback presets</span>
              </div>
              <div className="preset-row">
                {emojiPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    className="emoji-preset"
                    onClick={() => handlePresetClick(preset.text)}
                    aria-label={`Use ${preset.id.replaceAll("_", " ")} preset message`}
                  >
                    <div
                      className={`${preset.iconify_class} emoji-icon`}
                      style={{
                        "--emoji-icon-url": `url("${getIconifyUrl(
                          preset.iconify_class,
                        )}")`,
                      }}
                      aria-hidden="true"
                    />
                  </button>
                ))}
              </div>

              <textarea
                id="end_user_message"
                name="end_user_message"
                placeholder="Share your message"
                value={form.end_user_message}
                onChange={handleInputChange}
                required
              />

              <button
                type="submit"
                className="primary-button submit-button"
                disabled={mailState.status === "loading"}
              >
                {mailState.status === "loading" ? "Sending..." : "Send Message"}
              </button>
            </form>

            <div className="contact-cards">
              {contactCards.map((item) => (
                <article key={item.id} className="glass-card contact-card">
                  <div className="contact-icon" aria-hidden="true">
                    <div className={item.iconClass}></div>
                  </div>
                  <div className="contact-copy">
                    <p>{item.label}</p>
                    <strong>
                      {item.value || "Syncing from Google Sheets"}
                    </strong>
                  </div>
                  <div className="contact-actions">
                    <a
                      className="contact-link"
                      href={item.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={`Open ${item.label}`}
                    >
                      <iconify-icon
                        className="contact-action-icon"
                        icon="majesticons:open"
                        aria-hidden="true"
                      />
                    </a>
                    <button
                      type="button"
                      className="contact-copy-button"
                      onClick={() => handleCopy(item.label, item.value)}
                      aria-label={`Copy ${item.label}`}
                    >
                      <iconify-icon
                        className="contact-action-icon"
                        icon="fluent:document-copy-24-filled"
                        aria-hidden="true"
                      />
                    </button>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}

export default App;
