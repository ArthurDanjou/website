// Define a theme
export enum ColorsTheme {
  ORANGE = 'orange',
  YELLOW = 'yellow',
  GREEN = 'green',
  BLUE = 'blue',
  PURPLE = 'purple',
  ROSE = 'rose',
  RED = 'red',
  CYAN = 'cyan',
  BLACK = 'black',
  WHITE = 'white',
}

export interface Theme {
  name: String
  colors: ColorsTheme[]
  availability?: {
    start: String
    end: String
  }
}

// Create the themes
const RainbowTheme: Theme = {
  name: 'Rainbow',
  colors: [
    ColorsTheme.ORANGE,
    ColorsTheme.YELLOW,
    ColorsTheme.GREEN,
    ColorsTheme.BLUE,
    ColorsTheme.PURPLE,
    ColorsTheme.ROSE,
    ColorsTheme.RED,
  ],
}

const XMasTheme: Theme = {
  name: 'Xmas',
  colors: [ColorsTheme.RED, ColorsTheme.GREEN],
  availability: {
    start: '01/12',
    end: '31/12',
  },
}

const EasterTheme: Theme = {
  name: 'Easter',
  colors: [ColorsTheme.ROSE, ColorsTheme.YELLOW, ColorsTheme.CYAN],
  availability: {
    start: '01/04',
    end: '12/04',
  },
}

const BlackAndWhiteTheme: Theme = {
  name: 'B & W',
  colors: [ColorsTheme.BLACK, ColorsTheme.WHITE],
}

const HalloweenTheme: Theme = {
  name: 'Halloween',
  colors: [
    ColorsTheme.ORANGE,
    ColorsTheme.BLACK,
    ColorsTheme.GREEN,
    ColorsTheme.PURPLE,
  ],
  availability: {
    start: '28/10',
    end: '01/11',
  },
}

const ValentineTheme: Theme = {
  name: 'Valentine',
  colors: [
    ColorsTheme.RED,
    ColorsTheme.ROSE,
  ],
  availability: {
    start: '12/02',
    end: '16/02',
  },
}

// List the themes
export enum THEMES {
  RainbowTheme,
  EasterTheme,
  XMasTheme,
  BlackAndWhiteTheme,
  ValentineTheme,
  HalloweenTheme,
}

export const Themes = {
  [THEMES.RainbowTheme]: RainbowTheme,
  [THEMES.EasterTheme]: EasterTheme,
  [THEMES.XMasTheme]: XMasTheme,
  [THEMES.BlackAndWhiteTheme]: BlackAndWhiteTheme,
  [THEMES.ValentineTheme]: ValentineTheme,
  [THEMES.HalloweenTheme]: HalloweenTheme,
}
