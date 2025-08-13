"use client";

import React from "react";

/**
 * Uiverse "typing" loader converted to a reusable React component.
 * - Theme aware: uses currentColor (so parent text color controls it)
 * - Size prop scales the whole loader (default 60px width)
 */
export default function TypingDots({
    size = 60,        // overall width in px (original design is 60)
    className = "",   // use text-* to set color (currentColor)
}: { size?: number; className?: string }) {
    const scale = size / 60; // original base width is 60

    return (
        <div
            className={`typing-indicator ${className}`}
            aria-hidden="true"
            style={{ transform: `scale(${scale})` }}
        >
            <div className="typing-circle" />
            <div className="typing-circle" />
            <div className="typing-circle" />

            <div className="typing-shadow" />
            <div className="typing-shadow" />
            <div className="typing-shadow" />

            <style jsx>{`
        .typing-indicator {
          width: 60px;
          height: 30px;
          position: relative;
          z-index: 4;
          color: currentColor;
        }
        .typing-circle {
          width: 8px;
          height: 8px;
          position: absolute;
          border-radius: 50%;
          background-color: currentColor;
          left: 15%;
          transform-origin: 50%;
          animation: typing-circle7124 0.5s alternate infinite ease;
        }
        @keyframes typing-circle7124 {
          0% {
            top: 20px;
            height: 5px;
            border-radius: 50px 50px 25px 25px;
            transform: scaleX(1.7);
          }
          40% {
            height: 8px;
            border-radius: 50%;
            transform: scaleX(1);
          }
          100% {
            top: 0%;
          }
        }
        .typing-circle:nth-child(2) {
          left: 45%;
          animation-delay: 0.2s;
        }
        .typing-circle:nth-child(3) {
          left: auto;
          right: 15%;
          animation-delay: 0.3s;
        }
        .typing-shadow {
          width: 5px;
          height: 4px;
          border-radius: 50%;
          background-color: currentColor;
          opacity: 0.25; /* theme-aware shadow via currentColor alpha */
          position: absolute;
          top: 30px;
          transform-origin: 50%;
          z-index: 3;
          left: 15%;
          filter: blur(1px);
          animation: typing-shadow046 0.5s alternate infinite ease;
        }
        @keyframes typing-shadow046 {
          0% {
            transform: scaleX(1.5);
          }
          40% {
            transform: scaleX(1);
            opacity: 0.7;
          }
          100% {
            transform: scaleX(0.2);
            opacity: 0.4;
          }
        }
        .typing-shadow:nth-child(4) {
          left: 45%;
          animation-delay: 0.2s;
        }
        .typing-shadow:nth-child(5) {
          left: auto;
          right: 15%;
          animation-delay: 0.3s;
        }
      `}</style>
        </div>
    );
}
