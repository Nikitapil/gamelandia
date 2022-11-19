export enum ENumbersDirections {
  TOP = 'TOP',
  BOTTOM = 'BOTTOM',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT'
}

type TNumberColors = {
  [key: number]: { background: string; color: string };
};

export const numberColors: TNumberColors = {
  2: {
    background: '#eee3da',
    color: '#766e65'
  },
  4: {
    background: '#eddfc8',
    color: '#766e65'
  },
  8: {
    background: '#f2b178',
    color: '#fff'
  },
  16: {
    background: '#f59562',
    color: '#fff'
  },
  32: {
    background: '#f57c5f',
    color: '#fff'
  },
  64: {
    background: '#f5603b',
    color: '#fff'
  },
  128: {
    background: '#edcf72',
    color: '#fff'
  },
  256: {
    background: '#edcc61',
    color: '#fff'
  },
  512: {
    background: '#edc750',
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
};
