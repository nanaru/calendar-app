export const RmKind = {
  front: 1,
  back: 2,
} as const;

export type RmKind = (typeof RmKind)[keyof typeof RmKind];

export const RmPoint = (name: RmKind): number => {
  switch (name) {
    case 1:
      return 40;
    case 2:
      return 33.3;
  }
};
