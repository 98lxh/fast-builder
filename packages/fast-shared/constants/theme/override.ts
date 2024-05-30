import type { GlobalThemeOverrides } from "naive-ui";

export const primaryColor = '#1A5CFF'
export const designerDarkColor = '#1C1C1C'
export const designerLightColor = '#F5F5F5'

const baseThemeOverride: GlobalThemeOverrides = {
  common: {
    primaryColor: primaryColor,
    borderRadius: '0px'
  },
  Input: {
    borderHover: primaryColor,
    borderFocus: primaryColor
  }
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
    colorSegment: "#ededed",
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
  }
}
