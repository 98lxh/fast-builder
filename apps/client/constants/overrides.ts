import type { GlobalThemeOverrides } from "naive-ui";

const baseThemeOverride: GlobalThemeOverrides = {
  common: {
    primaryColor: '#1A5CFF',
    borderRadius: '0px'
  },
  Input: {
    borderHover: '#1A5CFF',
    borderFocus: '#1A5CFF'
  },

}

export const lightThemeOverrides: GlobalThemeOverrides = {
  ...baseThemeOverride,
  Popover: {
    color: '#FFFFFF',
  },
  Tooltip: {
    textColor: "#000000",
  },
  Dropdown: {
    color: '#F7F7F7'
  },
  Tabs: {
    tabColorSegment: '#F7F7F7',
    tabTextColorSegment: '#A2A2A2'
  }
}

export const darkThemeOverrides: GlobalThemeOverrides = {
  ...baseThemeOverride,
  Popover: {
    color: '#1D232A'
  },
  Dropdown: {
    color: '#2b2b2b'
  },
}

