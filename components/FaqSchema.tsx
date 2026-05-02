import Script from "next/script";

type FaqSchemaItem = {
  question: string;
  answer: string;
};

type FaqSchemaProps = {
  faqs: FaqSchemaItem[];
  id?: string;
};

export function FaqSchema({ faqs, id = "faq-schema" }: FaqSchemaProps) {
  if (!faqs.length) {
    return null;
  }

  const data = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };

  return (
    <Script
      id={id}
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}
