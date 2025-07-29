import { Helmet } from "react-helmet-async";

const NepalLocalSEO = () => {
  return (
    <Helmet>
      {/* Nepal-specific meta tags */}
      <meta name="geo.region" content="NP" />
      <meta name="geo.country" content="Nepal" />
      <meta name="geo.placename" content="Kathmandu, Nepal" />
      <meta name="ICBM" content="27.7172, 85.3240" />

      {/* Currency and timezone */}
      <meta name="currency" content="NPR" />
      <meta name="timezone" content="Asia/Kathmandu" />

      {/* Local business information */}
      <meta name="locality" content="Kathmandu" />
      <meta name="region" content="Bagmati Province" />
      <meta name="country-name" content="Nepal" />

      {/* Date information */}
      <meta name="date" content="2025-07-07" />
      <meta name="last-modified" content="2025-07-07T01:57:39Z" />

      {/* Hreflang for Nepal */}
      <link rel="alternate" hrefLang="en-np" href="https://gymudaan.com/" />
      <link rel="alternate" hrefLang="ne-np" href="https://gymudaan.com/ne" />

      {/* Additional Nepal-specific tags */}
      <meta name="target-audience" content="Nepal fitness industry" />
      <meta name="coverage" content="Nepal" />
      <meta name="distribution" content="Nepal" />
    </Helmet>
  );
};

export default NepalLocalSEO;
