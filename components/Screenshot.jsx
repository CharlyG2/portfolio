import Image from "next/image";

export default function Screenshot({ src, alt, caption, width = 1400, height = 900 }) {
  return (
    <figure className="not-prose my-6">
      <div className="rounded-xl overflow-hidden border border-line bg-paperSoft">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          className="w-full h-auto"
          sizes="(max-width: 768px) 100vw, 760px"
        />
      </div>
      {caption && (
        <figcaption className="mt-3 text-xs text-mutedLight font-mono">
          {caption}
        </figcaption>
      )}
    </figure>
  );
}
