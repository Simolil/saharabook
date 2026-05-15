import React from 'react';
import { Helmet } from 'react-helmet-async';

interface LodgingBusinessProps {
  name: string;
  description: string;
  address: string;
  latitude: number;
  longitude: number;
  priceRange: string;
  amenities: string[];
  rating?: number;
  reviewCount?: number;
}

export const LodgingBusinessSchema = ({
  name,
  description,
  address,
  latitude,
  longitude,
  priceRange,
  amenities,
  rating,
  reviewCount,
}: LodgingBusinessProps) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name,
    description,
    address,
    geo: {
      '@type': 'GeoCoordinates',
      latitude,
      longitude,
    },
    priceRange,
    amenityFeature: amenities.map((a) => ({ '@type': 'LocationFeatureSpecification', name: a, value: true })),
    ...(rating && reviewCount && {
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: rating,
        reviewCount: reviewCount,
      },
    }),
    checkinTime: '15:00',
    checkoutTime: '11:00',
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const FAQSchema = ({ faqs }: { faqs: { q: string; a: string }[] }) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: {
        '@type': 'Answer',
        text: f.a,
      },
    })),
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};

export const ProductSchema = ({
  name,
  description,
  price,
  currency,
  images,
}: {
  name: string;
  description: string;
  price: number;
  currency: string;
  images: string[];
}) => {
  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name,
    description,
    image: images,
    offers: {
      '@type': 'Offer',
      price,
      priceCurrency: currency,
      availability: 'https://schema.org/InStock',
    },
  };

  return (
    <Helmet>
      <script type="application/ld+json">{JSON.stringify(schema)}</script>
    </Helmet>
  );
};
