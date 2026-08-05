import Image from "next/image";

export default function MobileGallery({ images }) {
  return (
    <div className="not-prose grid grid-cols-2 sm:grid-cols-4 gap-3 my-6">
      {images.map((img) => (
        <figure key={img.src} className="rounded-xl overflow-hidden border border-line bg-ink2">
          <div className="relative w-full aspect-[9/19.5]">
            <Image
              src={img.src}
              alt={img.alt}
              fill
              className="object-cover object-top"
              sizes="(max-width: 640px) 45vw, 220px"
            />
          </div>
          {img.caption && (
            <figcaption className="text-[10px] font-mono text-mutedLight text-center py-2 px-1">
              {img.caption}
            </figcaption>
          )}
        </figure>
      ))}
    </div>
  );
}
