export const adminMenu = [
  {
    // account management
    name: "menu.system.admin.manage-account",
    menus: [
      {
        name: "menu.system.admin.manage-doctor",
        link: "/system/doctor-manager",
      },
      {
        name: "menu.system.admin.manage-user",
        link: "/system/user-redux",
      },
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },

  {
    // clinic management
    name: "menu.system.admin.clinic",
    link: "/system/clinic-managerment",
  },

  {
    // specialty management
    name: "menu.system.admin.specialty",
    link: "/system/clinic-managerment",
  },
];
