import type { GlobalThemeOverrides } from "naive-ui";


const baseThemeOverride: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1A5CFF',
  },
  Input: {
    borderHover: '#1A5CFF',
    borderFocus: '#1A5CFF'
  },
  Dropdown: {
    color: '#2b2b2b'
  }
}

export const lightThemeOverrides: GlobalThemeOverrides = {
  ...baseThemeOverride,
  Popover: {
    color: '#FFFFFF',
  },
  Tooltip: {
    textColor: "#000000"
  }
}

export const darkThemeOverrides: GlobalThemeOverrides = {
  ...baseThemeOverride,
  Popover: {
    color: '#1D232A'
  },
}

