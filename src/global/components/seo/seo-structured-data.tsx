import { Helmet } from "react-helmet-async";

interface StructuredDataProps {
  type: "WebSite" | "Organization" | "SoftwareApplication" | "LocalBusiness";
  data: Record<string, any>;
}

const StructuredData = ({ type, data }: StructuredDataProps) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": type,
    ...data,
  };

  return (
    <Helmet>
      <script type="application/ld+json">
        {JSON.stringify(structuredData)}
      </script>
    </Helmet>
  );
};

// GymUdaan-specific structured data (Updated with correct branding)
export const GymSoftwareStructuredDataNepal = () => (
  <StructuredData
    type="SoftwareApplication"
    data={{
      name: "GymUdaan - Nepal's #1 Gym Management Software",
      alternateName: "GymUdaan",
      description:
        "Nepal's leading gym automation and management software for fitness businesses in Kathmandu, Pokhara, Biratnagar, and across Nepal",
      url: "https://gymudaan.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser",
      creator: {
        "@type": "Person",
        name: "Niraj Tamang",
      },
      publisher: {
        "@type": "Organization",
        name: "GymUdaan",
        url: "https://gymudaan.com",
      },
      areaServed: {
        "@type": "Country",
        name: "Nepal",
      },
      availableLanguage: ["English", "Nepali"],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NPR",
        availability: "https://schema.org/InStock",
        validFrom: "2025-07-07",
      },
      aggregateRating: {
        "@type": "AggregateRating",
        ratingValue: "4.9",
        ratingCount: "89",
        bestRating: "5",
      },
      serviceArea: {
        "@type": "AdministrativeArea",
        name: "Nepal",
        containsPlace: [
          {
            "@type": "City",
            name: "Kathmandu",
          },
          {
            "@type": "City",
            name: "Pokhara",
          },
          {
            "@type": "City",
            name: "Lalitpur",
          },
          {
            "@type": "City",
            name: "Bhaktapur",
          },
          {
            "@type": "City",
            name: "Biratnagar",
          },
          {
            "@type": "City",
            name: "Dharan",
          },
          {
            "@type": "City",
            name: "Jhapa",
          },
          {
            "@type": "City",
            name: "Itahari",
          },
          {
            "@type": "City",
            name: "Chitwan",
          },
          {
            "@type": "City",
            name: "Butwal",
          },
        ],
      },
      datePublished: "2025-07-07",
      dateModified: "2025-07-07T02:01:07Z",
    }}
  />
);

// Alternative: Generic component that you can call with props
export const GymUdaanStructuredData = () => (
  <StructuredData
    type="SoftwareApplication"
    data={{
      name: "GymUdaan - Nepal's #1 Gym Management Software",
      alternateName: "GymUdaan",
      description:
        "Nepal's leading gym automation and management software for fitness businesses",
      url: "https://gymudaan.com",
      applicationCategory: "BusinessApplication",
      operatingSystem: "Web Browser",
      creator: {
        "@type": "Person",
        name: "Niraj Tamang",
      },
      areaServed: {
        "@type": "Country",
        name: "Nepal",
      },
      availableLanguage: ["English", "Nepali"],
      offers: {
        "@type": "Offer",
        price: "0",
        priceCurrency: "NPR",
        availability: "https://schema.org/InStock",
        validFrom: "2025-07-07",
      },
      datePublished: "2025-07-07",
      dateModified: "2025-07-07T02:01:07Z",
    }}
  />
);

export default StructuredData;
