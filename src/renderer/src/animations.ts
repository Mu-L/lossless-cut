import mitt from 'mitt';


// eslint-disable-next-line import/prefer-default-export
export const mySpring = { type: 'spring', damping: 50, stiffness: 700 };

export const emitter = mitt<{
  reducedMotion: boolean
}>();
