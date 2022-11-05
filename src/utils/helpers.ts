export const shuffleArray = (arr: any[]) => {
  return arr.sort(() => Math.random() - 0.5);
};

export const getuniqArrayObjects = (arr: any[]) => {
  return arr.map((item) => ({ ...item }));
};

export const isMobile = () => {
  return /Android|webOS|iPhone|iPad|iPod|BlackBerry|BB|PlayBook|IEMobile|Windows Phone|Kindle|Silk|Opera Mini/i.test(
    navigator.userAgent
  );
};

export const getRandomBoolean = (): boolean => {
  return Math.random() > 0.5;
};

export const getRandomFromArray = <T>(array: T[]): T => {
  return array[Math.floor(Math.random() * array.length)];
};

export const noop = () => {};
