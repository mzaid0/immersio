"use client";

import { Scene } from "@/components/model-view";
import { Canvas } from "@react-three/fiber";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { useEffect, useRef, useState } from "react";

gsap.registerPlugin(ScrollTrigger);

const HomePage = () => {
  const mainRef = useRef(null);
  const sceneRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  // Refs for text animation
  const headingRef = useRef<HTMLHeadingElement>(null);
  const paragraphRef = useRef<HTMLParagraphElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Separate refs for section 2 elements
  const section2HeadingRef = useRef<HTMLHeadingElement>(null);
  const section2ParagraphRef = useRef<HTMLParagraphElement>(null);

  // Separate refs for section 3 elements
  const section3HeadingRef = useRef<HTMLHeadingElement>(null);
  const section3ParagraphRef = useRef<HTMLParagraphElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Scene animation
      gsap
        .timeline({
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top top",
            end: "bottom bottom",
            scrub: 1,
            onUpdate: (self) => {
              setProgress(self.progress)
            }
          },
        })
        .to(sceneRef.current, {
          xPercent: -70,
          y: "90vh",
          ease: "none",
        })
        .to(sceneRef.current, {
          xPercent: 10,
          y: "200vh",
          ease: "none",
        });

      // Text animations for first section
      gsap.fromTo([headingRef.current, paragraphRef.current, buttonRef.current],
        {
          y: 80,
          opacity: 0,
          skewY: 5
        },
        {
          y: 0,
          opacity: 1,
          skewY: 0,
          duration: 1.2,
          stagger: 0.3,
          ease: "power4.out",
          scrollTrigger: {
            trigger: mainRef.current,
            start: "top 50%",
          }
        }
      );

      // Section 2 animation
      gsap.fromTo([section2HeadingRef.current, section2ParagraphRef.current],
        {
          y: 100,
          opacity: 0,
          scale: 0.9
        },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 1.2,
          stagger: 0.2,
          ease: "back.out(1.2)",
          scrollTrigger: {
            trigger: section2HeadingRef.current,
            start: "top 85%",
          }
        }
      );

      // Section 3 animation
      gsap.fromTo([section3HeadingRef.current, section3ParagraphRef.current],
        {
          x: -100,
          opacity: 0,
          rotation: 2
        },
        {
          x: 0,
          opacity: 1,
          rotation: 0,
          duration: 1.2,
          stagger: 0.2,
          ease: "elastic.out(1, 0.8)",
          scrollTrigger: {
            trigger: section3HeadingRef.current,
            start: "top 85%",
          }
        }
      );

      // Text glow effect
      gsap.to([headingRef.current, section2HeadingRef.current, section3HeadingRef.current], {
        textShadow: "0 0 15px rgb(180, 133, 85)",
        scrollTrigger: {
          trigger: mainRef.current,
          start: "top top",
          end: "bottom bottom",
          scrub: true
        }
      });

    }, mainRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="overflow-hidden bg-grid px-9">
      <div className="h-[300vh] w-screen" ref={mainRef}>
        {/* First Section */}
        <div className="h-[100vh] w-screen flex items-center relative px-4 sm:px-10">
          <div className="w-full lg:w-1/2 flex items-center justify-center z-10">
            <div className="max-w-xl">
              <h1
                ref={headingRef}
                className="text-4xl sm:text-5xl font-bold mb-6 leading-tight text-light-gold"
              >
                <span className="block text-gold-accent">Redefine Your Space</span>
                <span className="block mt-3 font-light">With Timeless Elegance</span>
              </h1>
              <p
                ref={paragraphRef}
                className="text-light-maroon text-xl leading-relaxed mb-8 tracking-wide"
              >
                Discover bespoke furniture crafted in 3D perfection, where luxury meets innovation and design transforms reality.
              </p>
              <div className="mt-6">
                <button
                  ref={buttonRef}
                  className="px-8 py-4 bg-gold-gradient text-black font-medium rounded-full hover:bg-gold-gradient-hover transition-all duration-500 transform hover:-translate-y-1.5 shadow-xl hover:shadow-2xl"
                >
                  Explore Collection
                </button>
              </div>
            </div>
          </div>

          {/* 3D Section */}
          <div
            ref={sceneRef}
            className="w-full h-full absolute lg:relative z-0 lg:z-50"
          >
            <Canvas>
              <Scene progress={progress} />
            </Canvas>
          </div>
        </div>

        {/* Second Section */}
        <div className="h-[100vh] w-screen flex items-center justify-end px-4 sm:px-10">
          <div className="mr-10 max-w-xl text-justify">
            <h2
              ref={section2HeadingRef}
              className="text-3xl sm:text-4xl font-bold mb-6 text-gold-accent"
            >
              <span className="block">Crafted for Perfection</span>
              <span className="block mt-2 font-light">Designed for Life</span>
            </h2>
            <p
              ref={section2ParagraphRef}
              className="text-light-maroon text-xl leading-relaxed tracking-wide"
            >
              Our collections embody the pinnacle of craftsmanship, using premium materials to transform spaces into personal sanctuaries of style.
            </p>
          </div>
        </div>

        {/* Third Section */}
        <div className="h-[100vh] w-screen flex items-center justify-start px-4 sm:px-10">
          <div className="max-w-xl">
            <h2
              ref={section3HeadingRef}
              className="text-3xl sm:text-4xl font-bold mb-6 text-gold-accent"
            >
              <span className="block">Sustainable Luxury</span>
              <span className="block mt-2 font-light">Timeless Design</span>
            </h2>
            <p
              ref={section3ParagraphRef}
              className="text-light-maroon text-xl leading-relaxed tracking-wide"
            >
              Eco-conscious materials meet enduring aesthetics, creating furniture that stands as both art and legacy for generations.
            </p>
          </div>
        </div>
      </div>
      <div className="h-[200vh]"></div>
    </div>
  );
};

export default HomePage;