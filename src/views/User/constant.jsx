import {
  IconHome,
  IconPackage,
  IconClipboardCheck,
  IconUser,
  IconBuilding,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS = [
  {
    title: "Dashboard",
    path: "/user/dashboard",
    icon: <IconHome width="24" height="24" />,
  },
  {
    title: "Browse Listings",
    path: "/user/listings",
    icon: <IconBuilding width="24" height="24" />,
  },
  {
    title: "My Rentals",
    path: "/user/my-rentals",
    icon: <IconPackage width="24" height="24" />,
  },
  {
    title: "My Orders",
    path: "/user/orders",
    icon: <IconClipboardCheck width="24" height="24" />,
  },
  {
    title: "Profile",
    path: "/user/profile",
    icon: <IconUser width="24" height="24" />,
  },
  {
    title: "Reports",
    path: "/user/reports",
    icon: <IconClipboardCheck width="24" height="24" />,
  },
];
