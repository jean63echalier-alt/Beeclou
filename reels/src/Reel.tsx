import React from 'react';
import {
  AbsoluteFill,
  Audio,
  Img,
  Sequence,
  interpolate,
  spring,
  staticFile,
  useCurrentFrame,
  useVideoConfig,
} from 'remotion';
import '@fontsource/playfair-display/800.css';
import '@fontsource/playfair-display/900.css';
import '@fontsource/dm-sans/500.css';
import '@fontsource/dm-sans/700.css';
import {COLORS, FADE_FRAMES, SAFE_BOTTOM, SAFE_TOP} from './brand';
import type {Plan, ReelProps} from './types';

const DISPLAY = "'Playfair Display', Georgia, serif";
const TEXT = "'DM Sans', system-ui, sans-serif";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9àâçéèêëîïôùûüÿœ ]/gi, '').trim();
/** Typographie française : espaces insécables avant € : ; et dans les nombres. */
const typo = (s: string) =>
  s
    .replace(/(\d) (?=\d{3}(?!\d))/g, '$1\u00A0')
    .replace(/ (€|:|;|!|\?|·)/g, '\u00A0$1')
    .replace(/(·) /g, '$1\u00A0');
const assetPath = (p: string) => p.replace(/^assets\//, '');

/** Ken Burns : un mouvement différent selon l'index du plan, jamais d'image statique. */
const kenBurns = (k: number, t: number) => {
  switch (k % 4) {
    case 0:
      return {scale: 1.02 + 0.14 * t, x: 0, y: 0};
    case 1:
      return {scale: 1.16 - 0.1 * t, x: -30 + 60 * t, y: 0};
    case 2:
      return {scale: 1.04 + 0.12 * t, x: 40 - 80 * t, y: 30 - 60 * t};
    default:
      return {scale: 1.1, x: 0, y: 50 - 100 * t};
  }
};

const Background: React.FC<{plan: Plan; index: number; n: number; present: boolean; total: number}> = ({
  plan,
  index,
  n,
  present,
  total,
}) => {
  const frame = useCurrentFrame();
  const {scale, x, y} = kenBurns(index, Math.min(1, frame / total));
  if (!present) {
    return (
      <AbsoluteFill
        style={{
          background: `linear-gradient(160deg, ${COLORS.cream} 0%, ${COLORS.sage} 100%)`,
          justifyContent: 'center',
          alignItems: 'center',
          color: COLORS.ink,
          fontFamily: TEXT,
          fontWeight: 700,
          fontSize: 36,
          textAlign: 'center',
          opacity: 1,
        }}
      >
        <div style={{transform: `scale(${scale})`, opacity: 0.35}}>
          IMAGE MANQUANTE
          <br />
          {assetPath(plan.image)}
          <br />
          (reel {String(n).padStart(2, '0')})
        </div>
      </AbsoluteFill>
    );
  }
  return (
    <AbsoluteFill style={{overflow: 'hidden', background: COLORS.ink}}>
      <Img
        src={staticFile(assetPath(plan.image))}
        style={{
          width: '100%',
          height: '100%',
          objectFit: 'cover',
          transform: `translate(${x}px, ${y}px) scale(${scale})`,
        }}
      />
    </AbsoluteFill>
  );
};

const FadeText: React.FC<{
  from: number;
  to: number;
  children: React.ReactNode;
  style: React.CSSProperties;
  pop?: boolean;
  hold?: boolean;
}> = ({from, to, children, style, pop, hold}) => {
  const frame = useCurrentFrame();
  const {fps} = useVideoConfig();
  if (frame < from || frame > to) return null;
  const local = frame - from;
  const inOpacity = interpolate(local, [0, 8], [0, 1], {extrapolateRight: 'clamp'});
  const outOpacity = hold ? 1 : interpolate(frame, [to - 6, to], [1, 0], {
    extrapolateLeft: 'clamp',
    extrapolateRight: 'clamp',
  });
  const rise = interpolate(local, [0, 10], [24, 0], {extrapolateRight: 'clamp'});
  const s = pop ? 0.92 + 0.08 * spring({frame: local, fps, config: {damping: 14}}) : 1;
  return (
    <div style={{...style, opacity: inOpacity * outOpacity, transform: `translateY(${rise}px) scale(${s})`}}>
      {children}
    </div>
  );
};

const PlanLayer: React.FC<{
  plan: Plan;
  index: number;
  count: number;
  props: ReelProps;
  durationFrames: number;
  fps: number;
}> = ({plan, index, count, props, durationFrames, fps}) => {
  const frame = useCurrentFrame();
  const {reel, present, logo} = props;
  const isFirst = index === 0;
  const isLast = index === count - 1;
  const ownFrames = plan.duration * fps;
  const fade = index > 0 ? interpolate(frame, [0, FADE_FRAMES], [0, 1], {extrapolateRight: 'clamp'}) : 1;

  const missing = !present[index];
  const cardStart = ownFrames - Math.round(1.5 * fps);
  const cardOn = isLast && !!logo;
  const cardOpacity = cardOn
    ? interpolate(frame, [cardStart, cardStart + 8], [0, 1], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'})
    : 0;

  // Hook (plan 1) puis texte du plan ; si identiques, un seul affichage.
  const sameAsHook = isFirst && norm(plan.overlay) === norm(reel.hook);
  const hookEnd = isFirst && !sameAsHook ? Math.min(Math.round(2.4 * fps), ownFrames - Math.round(0.8 * fps)) : 0;
  const textFrom = isFirst && !sameAsHook ? hookEnd + 4 : 6;
  const textTo = ownFrames + (index < count - 1 ? FADE_FRAMES : 0) - 2;
  const tone = missing ? 'ink' : plan.tone;
  const ink = tone === 'ink';
  const textColor = ink ? COLORS.ink : COLORS.cream;
  const showHookAsMain = isFirst && sameAsHook;

  const block: React.CSSProperties = {
    position: 'absolute',
    left: 90,
    right: 90,
    textAlign: 'center',
    color: textColor,
    textShadow: ink ? 'none' : '0 3px 18px rgba(23,19,15,.55)',
  };

  return (
    <AbsoluteFill style={{opacity: fade}}>
      <Background plan={plan} index={index} n={reel.n} present={!missing} total={durationFrames} />

      {/* voile de lisibilité */}
      <AbsoluteFill
        style={{
          background: ink
            ? 'linear-gradient(to top, rgba(247,243,234,.62) 0%, rgba(247,243,234,0) 55%)'
            : 'linear-gradient(to top, rgba(23,19,15,.62) 0%, rgba(23,19,15,0) 58%)',
        }}
      />
      {isFirst && !ink && hookEnd > 0 && (
        <AbsoluteFill
          style={{
            background: 'rgba(23,19,15,.28)',
            opacity: interpolate(frame, [hookEnd - 6, hookEnd], [1, 0], {extrapolateLeft: 'clamp', extrapolateRight: 'clamp'}),
          }}
        />
      )}

      {/* hook : grand, dès la première image */}
      {isFirst && (
        <FadeText
          from={0}
          to={showHookAsMain ? textTo : hookEnd}
          pop
          style={{
            ...block,
            top: SAFE_TOP + 60,
            bottom: SAFE_BOTTOM + 380,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontFamily: DISPLAY,
            fontWeight: 900,
            fontSize: 112,
            lineHeight: 1.04,
            letterSpacing: '-0.02em',
            textWrap: 'balance',
          }}
        >
          <div>
            <div style={{width: 140, height: 8, background: COLORS.gold, margin: '0 auto 36px'}} />
            {typo(reel.hook)}
          </div>
        </FadeText>
      )}

      {/* texte du plan */}
      {!showHookAsMain && (
        <FadeText
          from={textFrom}
          to={textTo}
          hold={isLast}
          style={{
            ...block,
            bottom: SAFE_BOTTOM + 90 + (reel.disclaimer ? 50 : 0),
            fontFamily: TEXT,
            fontWeight: 700,
            fontSize: 70,
            lineHeight: 1.18,
            textWrap: 'balance',
          }}
        >
          <div style={{width: 96, height: 6, background: COLORS.gold, margin: '0 auto 26px'}} />
          {typo(plan.overlay)}
        </FadeText>
      )}

      {reel.disclaimer && (
        <div
          style={{
            position: 'absolute',
            left: 90,
            right: 90,
            bottom: SAFE_BOTTOM + 14,
            textAlign: 'center',
            fontFamily: TEXT,
            fontWeight: 500,
            fontSize: 34,
            color: textColor,
            opacity: 0.92,
            textShadow: ink ? 'none' : '0 2px 10px rgba(23,19,15,.6)',
          }}
        >
          {reel.disclaimer}
        </div>
      )}

      {/* carte finale : logo + beeclou.fr */}
      {cardOn && (
        <AbsoluteFill style={{opacity: cardOpacity, justifyContent: 'flex-start', alignItems: 'center'}}>
          <div
            style={{
              marginTop: 360,
              padding: '60px 90px 54px',
              borderRadius: 90,
              background: 'radial-gradient(ellipse at center, rgba(247,243,234,.92) 55%, rgba(247,243,234,0) 100%)',
              textAlign: 'center',
            }}
          >
            <Img src={staticFile(logo!)} style={{width: 640, height: 'auto', display: 'block', margin: '0 auto'}} />
            {!/beeclou\.fr/.test(plan.overlay) && (
              <div style={{fontFamily: DISPLAY, fontWeight: 800, fontSize: 64, color: COLORS.ink, marginTop: 10}}>
                beeclou.fr
              </div>
            )}
          </div>
        </AbsoluteFill>
      )}
    </AbsoluteFill>
  );
};

export const Reel: React.FC<ReelProps> = (props) => {
  const {fps, durationInFrames} = useVideoConfig();
  const {reel, music} = props;
  let start = 0;
  return (
    <AbsoluteFill style={{background: COLORS.ink}}>
      {reel.plans.map((plan, i) => {
        const from = start;
        const own = plan.duration * fps;
        const len = own + (i < reel.plans.length - 1 ? FADE_FRAMES : 0);
        start += own;
        return (
          <Sequence key={i} from={from} durationInFrames={len}>
            <PlanLayer
              plan={plan}
              index={i}
              count={reel.plans.length}
              props={props}
              durationFrames={len}
              fps={fps}
            />
          </Sequence>
        );
      })}
      {music && (
        <Audio
          src={staticFile(music)}
          volume={(f) =>
            interpolate(f, [0, 20, durationInFrames - 45, durationInFrames], [0, 0.22, 0.22, 0], {
              extrapolateLeft: 'clamp',
              extrapolateRight: 'clamp',
            })
          }
        />
      )}
    </AbsoluteFill>
  );
};
