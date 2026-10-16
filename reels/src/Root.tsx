import React from 'react';
import {Composition} from 'remotion';
import reels from '../data/reels.json';
import {Reel} from './Reel';
import {FPS, WIDTH, HEIGHT} from './brand';
import type {ReelData, ReelProps} from './types';

const defaultReel = (reels as ReelData[])[0];

export const RemotionRoot: React.FC = () => (
  <Composition
    id="Reel"
    component={Reel}
    width={WIDTH}
    height={HEIGHT}
    fps={FPS}
    durationInFrames={defaultReel.duree * FPS}
    defaultProps={
      {
        reel: defaultReel,
        present: defaultReel.plans.map(() => false),
        logo: 'brand/logo-ink.webp',
        music: null,
      } satisfies ReelProps
    }
    calculateMetadata={({props}) => ({
      durationInFrames: props.reel.plans.reduce((s, p) => s + p.duration, 0) * FPS,
    })}
  />
);
