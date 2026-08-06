"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const shots = [
  { src: "/images/beliv-social.png", rotate: -8, x: -30, y: 10, z: 1, w: 150 },
  { src: "/images/csi-landing.png", rotate: 4, x: 60, y: -20, z: 3, w: 190 },
  { src: "/images/beliv-score.png", rotate: -3, x: 10, y: 60, z: 4, w: 170 },
  { src: "/images/viaje-landing-unificada.png", rotate: 10, x: 130, y: 40, z: 2, w: 150 },
];

export default function HeroCollage() {
  return (
    <div className="relative w-full h-[420px] md:h-[480px] flex items-center justify-center">
      {shots.map((s, i) => (
        <motion.div
          key={s.src}
          className="absolute rounded-xl overflow-hidden border-4 border-white"
          style={{
            width: s.w,
            zIndex: s.z,
            boxShadow: "0 20px 45px -12px rgba(11,14,20,0.35)",
          }}
          initial={{ opacity: 0, y: 30, rotate: 0 }}
          animate={{ opacity: 1, y: 0, rotate: s.rotate, x: s.x }}
          transition={{
            duration: 0.8,
            delay: 0.3 + i * 0.12,
            ease: [0.22, 1, 0.36, 1],
          }}
          whileHover={{ rotate: 0, scale: 1.06, zIndex: 10 }}
        >
          <div className="relative w-full aspect-[9/17]">
            <Image
              src={s.src}
              alt=""
              fill
              className="object-cover object-top"
              sizes="200px"
            />
          </div>
        </motion.div>
      ))}
    </div>
  );
}
