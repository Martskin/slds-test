const base = {
  color: {
    black: "000000",
    white: "#FFFFFF",
    neutral: {
      10: "#F8F8F8",
      20: "#E8E8E8",
      30: "#DCDCDC",
      40: "#C8C8C8",
      50: "#BEBEBE",
      60: "#B0B0B0",
      70: "#909090",
      80: "#808080",
      90: "#303030",
    },
    red: "#c23934",
    green: "#027e46",
  },
  space: {
    default: 16
  },
}

module.exports = {
  font: {
    family: {
      'sansSerif': "Helvetica Neue, Helvetica, Arial, sans-serif",
      'serif': "Helvetica Neue, Helvetica, Arial, sans-serif",
    },
    size: {
      xxs: base.space.default * .25,
      xs: base.space.default * .75,
      sm: base.space.default * .875,
      md: base.space.default,
      lg: base.space.default * 1.5,
      xl: base.space.default * 2,
      xxl: base.space.default * 2.5,
    }
  },
  color: {
    text: {
      default: base.color.neutral[90],
      secondary: base.color.neutral[70],
      error: base.color.red,
      success: base.color.green,
    },
    background: {
      default: base.color.white,
      light: base.color.neutral[10],
      dark: base.color.black,
    }
  },
  space: {
    xxs: base.space.default * .25,
    xs: base.space.default * .5,
    sm: base.space.default * .75,
    md: base.space.default,
    lg: base.space.default * 2,
    xl: base.space.default * 3,
    xxl: base.space.default * 4,
  },
  layout: {
    maxWidth: {
      default: 1024,
      small: 320
    },
  },
  border: {
    color: {
      default: base.color.neutral[60],
    },
    width: {
      default: 1,
    },
    radius: {
      default: 3,
    },
    component: `1px ${base.color.neutral[60]} solid`,
  }
};
