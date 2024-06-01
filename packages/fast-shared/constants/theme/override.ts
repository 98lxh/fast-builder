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
  },
  Tree: {
    nodeWrapperPadding: '0px',
    nodeColorHover: 'transparent'
  },
}

export const lightThemeOverrides: GlobalThemeOverrides = {
  ...baseThemeOverride,
  Popover: {
    color: '#FFFFFF',
  },
  Tooltip: {
    textColor: "#000000",
    padding: '5px',
    borderRadius: 0
  },
  Dropdown: {
    color: '#F7F7F7'
  },
  Tabs: {
    tabColorSegment: '#F7F7F7',
    colorSegment: "#EDEDED",
    tabTextColorSegment: '#A2A2A2',
    tabTextColorLine: '#9D9D9D',
    tabTextColorActiveLine: '#4D4D4D',
    tabTextColorHoverLine: '#4D4D4D',
    tabFontSizeSmall: "12px",
    barColor: '#4D4D4D',
    tabGapSmallLine: '20px'
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
  Tooltip: {
    padding: '5px',
    borderRadius: 0,
  },
  Tabs: {
    tabTextColorLine: '#929295',
    tabTextColorActiveLine: '#D5D5D6',
    tabTextColorHoverLine: '#D5D5D6',
    barColor: '#D5D5D6',
    tabGapSmallLine: '20px',
    tabFontSizeSmall: "12px",
  }
}
