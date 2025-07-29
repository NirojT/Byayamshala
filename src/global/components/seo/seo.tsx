import { Helmet } from "react-helmet-async";

interface SEOProps {
  title: string;
  description: string;
  keywords?: string;
  image?: string;
  url?: string;
  type?: string;
}

const SEO = ({
  title,
  description,
  keywords = "gym management Nepal, fitness software Nepal, gym automation Kathmandu, fitness technology Nepal, gym software Pokhara",
  image = "https://gymudaan.com/gym-hero-og.jpg",
  url = typeof window !== "undefined"
    ? window.location.href
    : "https://gymudaan.com",
  type = "website",
}: SEOProps) => {
  const siteTitle = "GymUdaan - Nepal's #1 Gym Management Software";
  const fullTitle = title ? `${title} | ${siteTitle}` : siteTitle;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content="index, follow" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta charSet="utf-8" />
      <link rel="canonical" href={url} />

      {/* Geographic targeting for Nepal */}
      <meta name="geo.region" content="NP" />
      <meta name="geo.country" content="Nepal" />
      <meta name="geo.placename" content="Kathmandu" />
      <meta name="ICBM" content="27.7172, 85.3240" />

      {/* Language and locale */}
      <meta property="og:locale" content="en_NP" />
      <meta property="og:locale:alternate" content="ne_NP" />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:width" content="1200" />
      <meta property="og:image:height" content="630" />
      <meta property="og:site_name" content={siteTitle} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO Tags */}
      <meta name="author" content="GymUdaan Nepal" />
      <meta name="language" content="English" />
      <meta name="distribution" content="Nepal" />
      <meta name="target" content="Nepal" />
      <meta name="copyright" content="© 2025 GymUdaan. All rights reserved." />
    </Helmet>
  );
};

export default SEO;
