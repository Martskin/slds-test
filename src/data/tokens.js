const base = {
  color: {
    black: "#000000",
    white: "#FFFFFF",
    neutral: {
      3: "#080707",
      24: "#3E3E3C",
      33: "#565655",
      76: "#C3C3C3",
      97: "#f8f8f8",
    },
    red: "#C23934",
    green: "#027e46",
    orange: "#844800",
    blue: {
      40: "#006dCC",
      44: "#4f6b93",
      86: "#CFD8E7",
    }
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
      xxs: base.space.default * .625,
      xs: base.space.default * .75,
      sm: base.space.default * .875,
      md: base.space.default,
      lg: base.space.default * 1.25,
      xl: base.space.default * 2,
      xxl: base.space.default * 2.5,
    }
  },
  color: {
    text: {
      default: base.color.neutral[3],
      secondary: base.color.neutral[24],
      tertiary: base.color.neutral[33],
      onInteractive: base.color.white,
      error: base.color.red,
      warning: base.color.orange,
      success: base.color.green,
      interactive: {
        default: base.color.blue[40],
      }
    },
    background: {
      default: base.color.white,
      light: base.color.neutral[97],
      medium: base.color.neutral[76],
      dark: base.color.black,
      interactive: {
        default: base.color.blue[44],
        hover: base.color.blue[40],
        disabled: base.color.blue[86],
      },
    }
  },
  shadow: {
    default: `0 4px 4px ${base.color.neutral[76]}`,
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
      default: base.color.blue[86],
    },
    width: {
      default: 1,
    },
    radius: {
      default: 3,
    },
    component: `1px ${base.color.blue[86]} solid`,
  }
};
