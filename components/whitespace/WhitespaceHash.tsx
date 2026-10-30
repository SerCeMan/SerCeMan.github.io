import React, {useCallback, useEffect, useRef, useState} from 'react';
import styles from './WhitespaceHash.module.css';

const MULTIPLIER = 1682554634;
const CHARACTERS: readonly (readonly [number, string])[] = [
  [0x0009, 'Tab'], [0x000A, 'Line feed'],
  [0x000B, 'Vertical tab'], [0x000C, 'Form feed'],
  [0x000D, 'Carriage return'], [0x0020, 'Space'],
  [0x0085, 'Next line'], [0x00A0, 'No-break space'],
  [0x1680, 'Ogham space mark'], [0x2000, 'En quad'],
  [0x2001, 'Em quad'], [0x2002, 'En space'],
  [0x2003, 'Em space'], [0x2004, 'Three-per-em space'],
  [0x2005, 'Four-per-em space'], [0x2006, 'Six-per-em space'],
  [0x2007, 'Figure space'], [0x2008, 'Punctuation space'],
  [0x2009, 'Thin space'], [0x200A, 'Hair space'],
  [0x2028, 'Line separator'], [0x2029, 'Paragraph separator'],
  [0x202F, 'Narrow no-break space'],
  [0x205F, 'Medium mathematical space'], [0x3000, 'Ideographic space'],
];
const hash = (cp: number) => Math.imul(MULTIPLIER, cp) >>> 27;
const hex = (cp: number) => cp.toString(16).toUpperCase().padStart(4, '0');
type Phase = 'multiply' | 'isolate' | 'land' | 'done';

export default function WhitespaceHash() {
  const [selection, setSelection] = useState<{cp: number; phase: Phase}>({cp: 32, phase: 'done'});
  const [placed, setPlaced] = useState(() => new Set([32]));
  const [announcement, setAnnouncement] = useState('');
  const root = useRef<HTMLElement>(null);
  const flightLayer = useRef<HTMLDivElement>(null);
  const productElement = useRef<HTMLSpanElement>(null);
  const characterElements = useRef(new Map<number, HTMLSpanElement>());
  const slotElements = useRef<(HTMLDivElement | null)[]>([]);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);
  const animations = useRef<Animation[]>([]);
  const activeCp = useRef<number | null>(null);

  const cancel = useCallback(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    animations.current.forEach(animation => animation.cancel());
    animations.current = [];
    flightLayer.current?.replaceChildren();
  }, []);

  const complete = useCallback((cp: number) => {
    cancel();
    activeCp.current = null;
    setPlaced(previous => new Set([...previous, cp]));
    setSelection({cp, phase: 'done'});
    const prefix = (Math.imul(MULTIPLIER, cp) >>> 0).toString(2).padStart(32, '0').slice(0, 5);
    const name = CHARACTERS.find(([value]) => value === cp)[1];
    setAnnouncement(`U+${hex(cp)} ${name}. The top five bits are ${prefix}, giving table slot ${hash(cp)}.`);
  }, [cancel]);

  useEffect(() => {
    const motion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const finish = () => {
      if (activeCp.current !== null && (document.hidden || motion.matches)) {
        complete(activeCp.current);
      }
    };
    motion.addEventListener('change', finish);
    document.addEventListener('visibilitychange', finish);
    return () => {
      cancel();
      motion.removeEventListener('change', finish);
      document.removeEventListener('visibilitychange', finish);
    };
  }, [cancel, complete]);

  function fly(cp: number) {
    const source = characterElements.current.get(cp);
    const target = slotElements.current[hash(cp)];
    if (!root.current || !flightLayer.current || !source || !target) return;
    const origin = root.current.getBoundingClientRect();
    const start = source.getBoundingClientRect();
    const end = target.getBoundingClientRect();
    const chip = document.createElement('span');
    chip.className = styles.flying;
    chip.textContent = hex(cp);
    flightLayer.current.append(chip);
    const rect = chip.getBoundingClientRect();
    chip.style.left = `${start.x - origin.x + (start.width - rect.width) / 2}px`;
    chip.style.top = `${start.y - origin.y + (start.height - rect.height) / 2}px`;
    const dx = end.x - start.x + (end.width - start.width) / 2;
    const dy = end.y - start.y + (end.height - start.height) / 2;
    const animation = chip.animate([
      {transform: 'translate(0, 0)'},
      {transform: `translate(${dx * .8 + 24}px, ${dy * .45}px)`, offset: .5},
      {transform: `translate(${dx}px, ${dy}px)`},
    ], {duration: 700, easing: 'cubic-bezier(.4,0,.2,1)', fill: 'forwards'});
    animations.current.push(animation);
    animation.finished.then(() => chip.remove()).catch(() => {});
  }

  function select(cp: number) {
    cancel();
    activeCp.current = cp;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      complete(cp);
      return;
    }
    setSelection({cp, phase: 'multiply'});
    if (productElement.current) {
      animations.current.push(productElement.current.animate([
        {opacity: .3, transform: 'translateY(3px)'},
        {opacity: 1, transform: 'translateY(0)'},
      ], {duration: 300}));
    }
    timers.current.push(setTimeout(() => setSelection({cp, phase: 'isolate'}), 380));
    timers.current.push(setTimeout(() => {
      setSelection({cp, phase: 'land'});
      fly(cp);
    }, 1190));
    timers.current.push(setTimeout(() => complete(cp), 1890));
  }

  const {cp, phase} = selection;
  const product = Math.imul(MULTIPLIER, cp);
  const bits = (product >>> 0).toString(2).padStart(32, '0');
  const prefix = bits.slice(0, 5);
  const slot = hash(cp);
  const placements = new Map([...placed].map(value => [hash(value), value]));
  const renderBits = (value: string) => [...value].map((bit, index) => (
    <span className={styles.bit} key={index}>{bit}</span>
  ));

  return (
    <section className={styles.visualization} ref={root} aria-label="Unicode whitespace perfect hash">
      <div className={styles.math} data-phase={phase} aria-label="Hash calculation">
        <div className={styles.multiplication}>
          int value = {cp} * {MULTIPLIER} = <span className={styles.product} ref={productElement}>{product}</span>
        </div>
        <div className={styles.bits} role="img" aria-label={`${bits}. Keep the first five bits, ${prefix}; discard the remaining 27.`}>
          <div className={styles.kept}>{renderBits(prefix)}</div>
          <div className={styles.discarded}>{renderBits(bits.slice(5))}</div>
        </div>
        <div className={styles.bitResult}>
          <span className={styles.slotNumber} aria-label="Table slot">{slot}</span>
          <span aria-hidden="true"/>
        </div>
      </div>
      <div className={styles.columns}>
        <div className={styles.panel}>
          <div className={styles.characters} role="group" aria-label="Unicode whitespace characters">
            {CHARACTERS.map(([value, name]) => (
              <button
                type="button"
                key={value}
                className={styles.character}
                aria-label={`U+${hex(value)} ${name}`}
                aria-pressed={value === cp}
                onClick={() => select(value)}
              >
                <span className={styles.code} ref={element => {
                  if (element) characterElements.current.set(value, element);
                  else characterElements.current.delete(value);
                }}>U+{hex(value)}</span>
                <span className={styles.name}>{name}</span>
                <span className={styles.placed} aria-hidden="true">{placed.has(value) ? '✓' : ''}</span>
              </button>
            ))}
          </div>
        </div>
        <div className={styles.panel}>
          <div className={styles.table} role="img" aria-label="Hash table, filled as characters are selected">
            {Array.from({length: 32}, (_, index) => {
              const value = placements.get(index);
              const filled = value !== undefined;
              return (
                <div
                  key={index}
                  ref={element => { slotElements.current[index] = element; }}
                  className={[
                    styles.slot,
                    filled ? styles.filled : '',
                    index === slot && phase === 'done' ? styles.active : '',
                    index === slot && phase === 'land' ? styles.landing : '',
                  ].filter(Boolean).join(' ')}
                  aria-label={`Slot ${index}${filled ? `: U+${hex(value)}` : ': empty'}`}
                >
                  <span className={styles.index}>{index}</span>
                  <span className={`${styles.value} ${filled ? '' : styles.empty}`}>{filled ? hex(value) : '·'}</span>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <div className={styles.flightLayer} ref={flightLayer} aria-hidden="true"/>
      <p className={styles.sr} aria-live="polite" aria-atomic="true">{announcement}</p>
    </section>
  );
}
