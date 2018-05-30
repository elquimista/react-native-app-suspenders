import _ from 'lodash';

const spacingStyles = {};
(() => {
  const points = _.range(1, 101);
  const what = { m: 'margin', p: 'padding' };
  const where = {
    '': '',
    h: 'Horizontal',
    v: 'Vertical',
    t: 'Top',
    r: 'Right',
    b: 'Bottom',
    l: 'Left'
  };
  Reflect.ownKeys(what).forEach(whatShort => {
    Reflect.ownKeys(where).forEach(whereShort => {
      points.forEach(pt => {
        Reflect.set(spacingStyles, `${whatShort}${whereShort}-${pt}`, {
          [`${what[whatShort]}${where[whereShort]}`]: pt
        });
      });
    });
  });
})();

export default {
  ...spacingStyles,
  ..._.fromPairs(_.range(10, 20).map(sz => [`fs-${sz}`, { fontSize: sz }])),
  'h-100p': { height: '100%' },
  'w-100p': { width: '100%' },
  'bs-solid': { borderStyle: 'solid' },
  'bs-dotted': { borderStyle: 'dotted' },
  'bs-dashed': { borderStyle: 'dashed' }
};

export const palette = {
  transparent: 'rgba(0, 0, 0, 0)',
  overlay: 'rgba(255, 192, 203, 0.9)',
  white: 'rgba(255, 255, 255, 1.0)'
};
