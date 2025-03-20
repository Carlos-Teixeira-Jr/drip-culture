export const parseLinkHeader = (linkHeader: string) => {
  const links: Record<string, string> = {};

  linkHeader.split(", ").forEach((part) => {
    const match = part.match(/<(.*?)>; rel="(.*?)"/);
    if (match) {
      const url = match[1];
      const rel = match[2];
      links[rel] = url;
    }
  });

  return links;
};