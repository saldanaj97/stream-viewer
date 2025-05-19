import Image from "next/image";

function FeatureCards() {
  const features = [
    {
      description: "Light and Dark Mode",
      screenshot: "https://dummyimage.com/300x500/fff/000&text=Feature+1",
    },
    {
      description: "Individual Audio Controls",
      screenshot: "https://dummyimage.com/300x500/fff/000&text=Feature+2",
    },
    {
      description: "Optimized Performance",
      screenshot: "https://dummyimage.com/300x500/fff/000&text=Feature+3",
    },
    {
      description: "Flexible Layout System",
      screenshot: "https://dummyimage.com/300x500/fff/000&text=Feature+4",
    },
  ];

  return (
    <div className="grid w-full grid-cols-1 grid-rows-2 gap-4 md:grid-cols-2">
      {features.map((feature, index) => (
        <div
          key={index}
          className="flex flex-col items-center justify-center rounded-lg bg-white p-4 shadow-md"
        >
          <Image
            alt={`Screenshot of Feature ${index + 1}`}
            className="mt-2 rounded-lg"
            height={500}
            src={feature.screenshot}
            width={300}
          />
          <p className="w-full text-left text-lg font-semibold text-neutral-600">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
}

export default function EngagementSection() {
  const sectionHeader = "Features for Every Kind of Viewer";
  const description =
    "Search faster, watch smarter, and engage live. Whether you're exploring new streamers or keeping up with favorites, Omniview is designed for power users and casual viewers alike.";

  return (
    <section className="dark:bg-foreground relative flex w-full flex-col items-center justify-center py-12 text-black md:flex-row">
      <div className="flex flex-col items-start justify-center px-4 md:w-1/2">
        <h2 className="mb-4 text-6xl font-semibold">{sectionHeader}</h2>
        <p className="text-lg text-neutral-500">{description}</p>
      </div>
      <div className="flex justify-center md:w-1/3">
        <FeatureCards />
      </div>
    </section>
  );
}
