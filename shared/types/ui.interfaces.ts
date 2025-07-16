export interface CarouselRef {
  page: number;
  pages: number;
  select: (page: number) => void;
  next: () => void;
  prev: () => void;
}
