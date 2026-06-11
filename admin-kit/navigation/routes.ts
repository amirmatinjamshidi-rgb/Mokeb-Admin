export const ROUTES = {
  home: "/",
  services: "/services",
  about: "/about",
  generalReservation: "/general-reservation",
  login: "/",
  userPanel: "/D/Dashboard",
  dashboard: "/D/Dashboard",
  onsiteRegistration: "/D/Onsite-Registration",
  karvanReservations: "/D/Karvan-reservations",
  manageRequests: "/D/Manage-Requests",
  manageKarvan: "/E/Manage-Karvan",
  manageUsers: "/E/Manage-Users",
  contentManagement: "/E/Content-Management",
  reports: "/E/Reports",
  settings: "/E/Settings",
} as const;

export const mainNavItems = [
  { href: ROUTES.home, label: "خانه" },
  { href: ROUTES.services, label: "خدمات" },
  { href: ROUTES.about, label: "درباره ما" },
  { href: ROUTES.generalReservation, label: "رزرو عمومی" },
] as const;
