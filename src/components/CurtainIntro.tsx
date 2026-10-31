import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { weddingConfig } from '../weddingConfig';
import { Sparkles } from 'lucide-react';
import { InvitationSection } from './InvitationSection';

interface CurtainIntroProps {
  onOpened?: () => void;
}

export const CurtainIntro: React.FC<CurtainIntroProps> = ({ onOpened }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const leftCurtainRef = useRef<HTMLDivElement>(null);
  const rightCurtainRef = useRef<HTMLDivElement>(null);
  const slitGlowRef = useRef<HTMLDivElement>(null);
  const peekGroomRef = useRef<HTMLDivElement>(null);
  const peekBrideRef = useRef<HTMLDivElement>(null);
  const revealedContentRef = useRef<HTMLDivElement>(null);
  const openPromptRef = useRef<HTMLButtonElement>(null);
  const rodRef = useRef<HTMLDivElement>(null);

  const [isOpen, setIsOpen] = useState(false);

  // Execute physics-based curtain opening timeline
  const runOpenCurtains = useCallback(() => {
    const left = leftCurtainRef.current;
    const right = rightCurtainRef.current;
    const slit = slitGlowRef.current;
    const revealed = revealedContentRef.current;
    const prompt = openPromptRef.current;

    if (!left || !right) return;

    setIsOpen(true);

    // Fade out interactive prompt immediately
    if (prompt) {
      gsap.to(prompt, { opacity: 0, scale: 0.9, duration: 0.4, pointerEvents: 'none' });
    }

    // Kill any active tweens on the curtains
    gsap.killTweensOf([left, right, slit]);

    const tl = gsap.timeline({
      onComplete: () => {
        if (left) left.style.pointerEvents = 'none';
        if (right) right.style.pointerEvents = 'none';
        if (onOpened) onOpened();
      },
    });

    // 1. Center slit gleam expands then fades
    tl.to(slit, {
      opacity: 1,
      scaleY: 1.2,
      duration: 0.4,
      ease: 'power1.in',
    }, 0)
    .to(slit, {
      opacity: 0,
      duration: 0.8,
      ease: 'power2.out',
    }, 0.3);

    // 2. Realistic cloth gathering physics:
    // The drapes gather towards left & right proscenium edges, compressing horizontal pleats (scaleX)
    // while moving outward (xPercent)
    tl.to(left, {
      xPercent: -88,
      scaleX: 0.18,
      transformOrigin: 'top left',
      duration: 3.4,
      ease: 'power3.inOut',
    }, 0.1)
    .to(right, {
      xPercent: 88,
      scaleX: 0.18,
      transformOrigin: 'top right',
      duration: 3.4,
      ease: 'power3.inOut',
    }, 0.1);

    // 3. Physical pendulum hem sway (inertia of the heavy velvet fabric):
    // As the top slides quickly, the bottom lags and swings, then oscillates with damped harmonic motion
    tl.fromTo(left, 
      { rotation: 0, skewY: 0 },
      {
        rotation: -2.8,
        skewY: -1.5,
        duration: 0.9,
        ease: 'power1.out',
      }, 0.6
    )
    .to(left, {
      rotation: 1.8,
      skewY: 0.8,
      duration: 0.8,
      ease: 'sine.inOut',
    }, 1.5)
    .to(left, {
      rotation: -0.8,
      skewY: -0.3,
      duration: 0.7,
      ease: 'sine.inOut',
    }, 2.3)
    .to(left, {
      rotation: 0,
      skewY: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, 3.0);

    // Right curtain symmetrical pendulum sway
    tl.fromTo(right, 
      { rotation: 0, skewY: 0 },
      {
        rotation: 2.8,
        skewY: 1.5,
        duration: 0.9,
        ease: 'power1.out',
      }, 0.6
    )
    .to(right, {
      rotation: -1.8,
      skewY: -0.8,
      duration: 0.8,
      ease: 'sine.inOut',
    }, 1.5)
    .to(right, {
      rotation: 0.8,
      skewY: 0.3,
      duration: 0.7,
      ease: 'sine.inOut',
    }, 2.3)
    .to(right, {
      rotation: 0,
      skewY: 0,
      duration: 0.6,
      ease: 'power2.out',
    }, 3.0);

    // 4. Reveal stage content with graceful focus and soft scale transition
    tl.fromTo(
      revealed,
      {
        opacity: 0,
        scale: 0.96,
        filter: 'blur(10px)',
        y: 20,
      },
      {
        opacity: 1,
        scale: 1,
        filter: 'blur(0px)',
        y: 0,
        duration: 2.2,
        ease: 'power2.out',
      },
      1.1
    );
  }, [onOpened]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Initial whisper of couple names behind curtains
      gsap.to([peekGroomRef.current, peekBrideRef.current], {
        opacity: 0.35,
        duration: 1.4,
        repeat: 1,
        yoyo: true,
        ease: 'sine.inOut',
      });

      // 2. Brass curtain rod shimmer
      if (rodRef.current) {
        gsap.fromTo(
          rodRef.current,
          { opacity: 0.4 },
          { opacity: 0.9, duration: 2, repeat: -1, yoyo: true, ease: 'sine.inOut' }
        );
      }

      // Automatically trigger opening after a subtle, majestic pause (1.2s)
      const timer = setTimeout(() => {
        runOpenCurtains();
      }, 1200);

      return () => clearTimeout(timer);
    }, containerRef);

    return () => ctx.revert();
  }, [runOpenCurtains]);

  return (
    <div
      ref={containerRef}
      id="curtain-intro"
      className="relative w-full min-h-screen flex items-center justify-center overflow-x-hidden bg-[#fcfaf7] text-[#1a1a1a] select-none"
    >
      {/* Brass Curtain Rail Rod at Top */}
      <div 
        ref={rodRef}
        className="absolute top-0 inset-x-0 h-[6px] bg-gradient-to-r from-[#8c6b32] via-[#e2c78f] to-[#8c6b32] z-50 shadow-[0_2px_10px_rgba(0,0,0,0.35)] pointer-events-none"
      >
        {/* Brass curtain rings along the top rod */}
        <div className="w-full h-full flex justify-around px-4 opacity-75">
          {Array.from({ length: 18 }).map((_, i) => (
            <div key={i} className="w-2.5 h-3.5 -mt-1 rounded-full border border-[#f5e6c8] bg-[#9a7638]/40 shadow-sm" />
          ))}
        </div>
      </div>

      {/* Background Stage - Full Unified Wedding Invitation (Merged Section 1 & 2) */}
      <div
        ref={revealedContentRef}
        id="opening-stage-invitation"
        className="relative z-10 w-full flex flex-col items-center opacity-0"
      >
        <InvitationSection id="invitation-main" />
      </div>

      {/* Subtle Glimpse of Names behind curtains prior to opening */}
      <div className="absolute inset-0 z-25 pointer-events-none flex items-center justify-between px-6 sm:px-16 md:px-32">
        <div
          ref={peekBrideRef}
          className="font-editorial text-xl sm:text-3xl md:text-4xl text-[#c5a059]/30 opacity-0 tracking-widest text-center"
        >
          {weddingConfig.bride}
        </div>
        <div
          ref={peekGroomRef}
          className="font-editorial text-xl sm:text-3xl md:text-4xl text-[#c5a059]/30 opacity-0 tracking-widest text-center"
        >
          {weddingConfig.groom}
        </div>
      </div>

      {/* Center Seam Golden Slit Glow */}
      <div
        ref={slitGlowRef}
        className="absolute inset-y-0 left-1/2 -translate-x-1/2 w-[2px] bg-gradient-to-b from-transparent via-[#c5a059] to-transparent z-40 pointer-events-none shadow-[0_0_28px_rgba(197,160,89,0.8)]"
      />

      {/* Interactive Button to Open Curtains if not opened */}
      {!isOpen && (
        <button
          ref={openPromptRef}
          type="button"
          onClick={runOpenCurtains}
          className="absolute z-45 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex items-center gap-2 px-6 py-3 rounded-full bg-[#1c1a18]/90 border border-[#c5a059]/50 text-[#fcfaf7] shadow-[0_0_30px_rgba(197,160,89,0.3)] hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer"
        >
          <Sparkles className="w-4 h-4 text-[#c5a059] animate-spin" style={{ animationDuration: '4s' }} />
          <span className="font-editorial text-lg text-[#fcfaf7]">انقر لفتح الستار</span>
        </button>
      )}

      {/* Left Fabric Curtain with Multi-Pleat Physics Simulation */}
      <div
        ref={leftCurtainRef}
        id="curtain-left"
        onClick={() => !isOpen && runOpenCurtains()}
        className="absolute top-0 bottom-0 left-0 w-1/2 z-30 fabric-curtain-left flex items-stretch justify-end overflow-hidden origin-top-left cursor-pointer"
        style={{ willChange: 'transform' }}
      >
        {/* Accordion drape pleats simulating physical cloth ribs */}
        <div className="w-full h-full flex opacity-90 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-full"
              style={{
                background: `linear-gradient(90deg, rgba(15,14,13,0.95) 0%, rgba(35,32,29,0.7) 50%, rgba(10,9,8,0.95) 100%)`,
                boxShadow: 'inset 2px 0 6px rgba(0,0,0,0.5), inset -2px 0 6px rgba(0,0,0,0.5)',
              }}
            />
          ))}
        </div>

        {/* Fine gold piping hem at the center seam */}
        <div className="absolute right-0 inset-y-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#c5a059]/70 to-transparent shadow-[0_0_12px_rgba(197,160,89,0.4)]" />
      </div>

      {/* Right Fabric Curtain with Multi-Pleat Physics Simulation */}
      <div
        ref={rightCurtainRef}
        id="curtain-right"
        onClick={() => !isOpen && runOpenCurtains()}
        className="absolute top-0 bottom-0 right-0 w-1/2 z-30 fabric-curtain-right flex items-stretch justify-start overflow-hidden origin-top-right cursor-pointer"
        style={{ willChange: 'transform' }}
      >
        {/* Accordion drape pleats simulating physical cloth ribs */}
        <div className="w-full h-full flex opacity-90 pointer-events-none">
          {Array.from({ length: 12 }).map((_, i) => (
            <div
              key={i}
              className="flex-1 h-full"
              style={{
                background: `linear-gradient(270deg, rgba(15,14,13,0.95) 0%, rgba(35,32,29,0.7) 50%, rgba(10,9,8,0.95) 100%)`,
                boxShadow: 'inset -2px 0 6px rgba(0,0,0,0.5), inset 2px 0 6px rgba(0,0,0,0.5)',
              }}
            />
          ))}
        </div>

        {/* Fine gold piping hem at the center seam */}
        <div className="absolute left-0 inset-y-0 w-[1.5px] bg-gradient-to-b from-transparent via-[#c5a059]/70 to-transparent shadow-[0_0_12px_rgba(197,160,89,0.4)]" />
      </div>
    </div>
  );
};
