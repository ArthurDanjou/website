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
}

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
}

const EasterTheme: Theme = {
  name: 'Easter',
  colors: [ColorsTheme.ROSE, ColorsTheme.YELLOW, ColorsTheme.CYAN],
}

const BlackAndWhiteTheme: Theme = {
  name: 'B & W',
  colors: [ColorsTheme.BLACK, ColorsTheme.WHITE],
}

export enum THEMES {
  RainbowTheme,
  EasterTheme,
  XMasTheme,
  BlackAndWhiteTheme,
}

export const Themes = {
  [THEMES.RainbowTheme]: RainbowTheme,
  [THEMES.EasterTheme]: EasterTheme,
  [THEMES.XMasTheme]: XMasTheme,
  [THEMES.BlackAndWhiteTheme]: BlackAndWhiteTheme,
}
