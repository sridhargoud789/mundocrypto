export const DashboardMenu = [
  {
    id: 1,
    title: "my_courses",
    link: "/privatearea/mylearnings",
    icon: "home",
  },
  {
    id: 2,
    title: "wallets",
    link: "/privatearea/billing-info",
    icon: "credit-card",
  },
  {
    id: 3,
    title: "certificates",
    link: "/privatearea/MyCertificates",
    icon: "star",
  },
  {
    id: 4,
    title: "invoices",
    link: "/privatearea/MyInvoices",
    icon: "dollar-sign",
  },
];

export const AccountSettingsMenu = [
  {
    id: 1,
    title: "edit_profile",
    link: "/privatearea/edit-profile",
    icon: "settings",
  },
  {
    id: 2,
    title: "security",
    link: "/privatearea/security",
    icon: "user",
  },
  // {
  //   id: 3,
  //   title: "Social Profiles",
  //   link: "/privatearea/social-profiles",
  //   icon: "refresh-cw",
  // },
  // {
  //   id: 4,
  //   title: "Notifications",
  //   link: "/privatearea/notifications",
  //   icon: "bell",
  // },
  // {
  //   id: 5,
  //   title: "Profile Privacy",
  //   link: "/privatearea/profile-privacy",
  //   icon: "lock",
  // },
  // {
  //   id: 6,
  //   title: "Linked Accounts",
  //   link: "/privatearea/linked-accounts",
  //   icon: "user",
  // },
];

export const InstructorDashboardMenu = [DashboardMenu, AccountSettingsMenu];

export default InstructorDashboardMenu;
