export function cetaneryCurve(x: number, a: number, x0: number, y0: number): number {
  return a * Math.cosh((x - x0) / a) + y0;
}

export function findLowestPoint(
  a: number,
  x1: number,
  y1: number,
  x2: number,
  y2: number,
): { x: number; y: number } {
  const testedFunction = (x: number) => {
    return a * Math.cosh((x1 - x) / a) - y1 + y2 - a * Math.cosh((x2 - x) / a);
  };

  const x0 = findZero(testedFunction, (x1 + x2) / 2, Math.abs(x1 - x2));
  const y0 = y1 - a * Math.cosh((x1 - x0) / a);

  return { x: x0, y: y0 };
}

function findZero(equasion: (x: number) => number, startValue: number, stepCheck: number): number {
  let xmin = undefined;
  let xmax = undefined;
  let currentValue: number = 0;
  let testedX = startValue;
  let repetitions = 1;
  while (xmin == undefined || xmax == undefined) {
    currentValue = equasion(testedX);
    if (currentValue > 0) {
      xmax = testedX;
      testedX += -stepCheck * repetitions;
    } else if (currentValue < 0) {
      xmin = testedX;
      testedX += stepCheck * repetitions;
    } else {
      return testedX;
    }
    repetitions++;
  }

  for (let i = 0; i < 100; i++) {
    testedX = (xmax + xmin) / 2;
    currentValue = equasion(testedX);

    if (Math.round(currentValue * 100) / 100 == 0) {
      console.log('znaleziony');
      return testedX;
    } else if (currentValue > 0) {
      xmax = testedX;
    } else {
      xmin = testedX;
    }
  }
  return testedX;
}
