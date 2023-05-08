export enum ENumbersDirections {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

export const NUMBERS_CELL_SIZE = 70;
export const NUMBERS_CELLS_GAP = 10;

type TNumberColors = {
  [key: number]: { background: string; color: string };
};

export const numberColors: TNumberColors = {
  2: {
    background:
      'radial-gradient(circle at 18.7% 37.8%, rgb(250, 250, 250) 0%, rgb(225, 234, 238) 90%)',
    color: '#766e65'
  },
  4: {
    background: 'linear-gradient(to top, #e6b980 0%, #eacda3 100%)',
    color: '#766e65'
  },
  8: {
    background: 'linear-gradient(to top, #c79081 0%, #dfa579 100%)',
    color: '#fff'
  },
  16: {
    background: 'linear-gradient(-60deg, #ff5858 0%, #f09819 100%)',
    color: '#fff'
  },
  32: {
    background:
      'linear-gradient(110.1deg, rgb(241, 115, 30) 18.9%, rgb(231, 29, 54) 90.7%)',
    color: '#fff'
  },
  64: {
    background:
      'linear-gradient(25deg, rgb(214, 76, 127), rgb(238, 71, 88) 50%)',
    color: '#fff'
  },
  128: {
    background:
      'linear-gradient(109.6deg, rgb(255, 219, 47) 11.2%, rgb(244, 253, 0) 100.2%)',
    color: '#766e65'
  },
  256: {
    background:
      'radial-gradient(circle at 10% 20%, rgb(255, 200, 124) 0.1%, rgb(252, 251, 121) 90%)',
    color: '#766e65'
  },
  512: {
    background:
      'linear-gradient(179deg, rgb(255, 129, 27) -27.5%, rgb(245, 255, 56) 94.7%)',
    color: '#fff'
  },
  1024: {
    background: '#edc43f',
    color: '#fff'
  },
  2048: {
    background: '#ffc100',
    color: '#fff'
  }
} as const;
