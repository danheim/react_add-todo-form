/// <reference types="react-scripts" />
interface Color {
  id: number;
  name: string;
}

interface Good {
  id: number;
  colorId: number;
  name: string;
}

interface GoodWithColor extends Good {
  color: Color | null;
}
