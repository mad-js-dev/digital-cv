declare module 'flubber' {
  export interface FlubberOptions {
    maxSegmentLength?: number;
    string?: boolean;
  }

  export type FlubberInterpolator = (t: number) => string;

  export function interpolate(
    fromShape: string | string[],
    toShape: string | string[],
    options?: FlubberOptions,
  ): FlubberInterpolator;

  export function interpolateAll(
    fromShapes: string[],
    toShapes: string[],
    options?: FlubberOptions,
  ): FlubberInterpolator;

  export function toCircle(
    fromShape: string,
    x: number,
    y: number,
    r: number,
  ): FlubberInterpolator;

  export function fromCircle(
    x: number,
    y: number,
    r: number,
    toShape: string,
  ): FlubberInterpolator;

  export function toRect(
    fromShape: string,
    x: number,
    y: number,
    width: number,
    height: number,
  ): FlubberInterpolator;

  export function fromRect(
    x: number,
    y: number,
    width: number,
    height: number,
    toShape: string,
  ): FlubberInterpolator;

  export function separate(
    combinedShape: string,
    separateShapeList: string[],
  ): FlubberInterpolator;

  export function combine(
    separateShapeList: string[],
    combinedShape: string,
  ): FlubberInterpolator;

  export function splitPathString(pathString: string): string[];

  export function toPathString(
    ring: Array<[number, number]>,
    checkClosed?: boolean,
  ): string;
}
