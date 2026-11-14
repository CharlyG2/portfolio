// Metadatos por página: título, descripción, URL canónica e imagen propia
// para que un link a un caso en LinkedIn muestre ese caso y no la portada.
export function pageMetadata({ title, description, path, image = "/og.jpg" }) {
  return {
    title,
    description,
    alternates: { canonical: path },
    openGraph: {
      title,
      description,
      url: path,
      siteName: "Charly Gourves",
      locale: "es_CL",
      type: "article",
      images: [{ url: image }],
    },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
