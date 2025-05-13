import Image from "next/image";

export default function EngagementSection() {
  const sectionHeader = "Streaming Tools for Every Kind of Viewer";
  const description =
    "Search faster, watch smarter, and engage live. Whether you're exploring new streamers or keeping up with favorites, Omniview is designed for power users and casual viewers alike.";

  return (
    <section className="relative flex w-full flex-col items-center justify-center py-12 text-black dark:bg-foreground md:flex-row">
      <div className="flex flex-col items-start justify-center px-4 md:w-1/3">
        <h2 className="mb-4 text-2xl font-semibold">{sectionHeader}</h2>
        <p className="text-lg text-neutral-500">{description}</p>
      </div>
      <div className="flex justify-center md:w-1/2">
        <Image
          alt="Engagement Example"
          className="object-fit rounded-lg"
          height={400}
          src="https://dummyimage.com/600x400/fff/000&text=Engagement+Carousel+Example"
          width={600}
        />
      </div>
    </section>
  );
}
