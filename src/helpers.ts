import { colors } from './api/colors';

export const getColorById = (colorId: number) => colors.find(
  (color) => color.id === colorId,
);
