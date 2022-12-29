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
              link: "/system/customer-manage",
      },
      {
        name: "menu.system.doctor.schedule-menu",
        link: "/system/user-manager",
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

export const doctorMenu = [
  {
    // account management
    name: "menu.system.doctor.schedule-plan",
    menus: [
      {
        name: "menu.system.doctor.schedule-menu",
        link: "/system/schedule-plan-manager",
      },

      {name: "menu.system.doctor.update-info",
      link: "/system/update-info"}
      // { name: 'menu.system.system-parameter.header', link: '/system/system-parameter' },
    ],
  },

 
];
