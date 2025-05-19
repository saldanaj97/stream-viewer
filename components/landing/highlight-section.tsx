import { Heart, MessagesSquare, Wrench } from "lucide-react";
import Image from "next/image";

import { KickIcon, TwitchIcon, YouTubeIcon } from "../icons";

const PlatformBanner = ({}) => {
  const basePlatforms = [
    {
      name: "Twitch",
      logo: (
        <Image
          alt={""}
          height={48} // Reduced size to make it more like the screenshot
          src="/twitch/twitch_purple_wordmark.png"
          width={48}
        />
      ),
    },
    {
      name: "YouTube",
      logo: (
        <Image
          alt={""}
          height={48}
          src="/youtube/yt_logo_light.png"
          width={48}
        />
      ),
    },
    {
      name: "Kick",
      logo: <Image alt={""} height={48} src="/kick/kick_logo.svg" width={48} />,
    },
  ];

  const repetitionCount = 7;
  const displayedPlatforms = Array(repetitionCount)
    .fill(null)
    .flatMap(() => basePlatforms);

  return (
    <div className="w-full overflow-hidden">
      {/* Main container with overflow hidden */}
      <div className="relative flex w-full">
        {/* First scrolling container - moves left */}
        <div className="animate-marquee flex flex-nowrap">
          {displayedPlatforms.map((platform, index) => (
            <div
              key={`${platform.name}-${index}`}
              className="mx-8 flex shrink-0 items-center space-x-2"
            >
              <span>{platform.logo}</span>
            </div>
          ))}
        </div>

        {/* Duplicate container for seamless looping */}
        <div className="animate-marquee2 absolute top-0 left-0 flex flex-nowrap">
          {displayedPlatforms.map((platform, index) => (
            <div
              key={`${platform.name}-second-${index}`}
              className="mx-8 flex shrink-0 items-center space-x-2"
            >
              <span>{platform.logo}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const PlatformGrid = () => {
  const platforms = [
    {
      name: "Twitch",
      icon: <TwitchIcon className="text-platform-twitch" size={36} />,
    },
    {
      name: "YouTube",
      icon: <YouTubeIcon className="text-platform-youtube" size={36} />,
    },
    {
      name: "Kick",
      icon: <KickIcon className="text-platform-kick" size={36} />,
    },
    { name: "Chat", icon: <MessagesSquare color="black" size={36} /> },
    { name: "Subs", icon: <Heart color="black" size={36} /> },
    {
      name: "Customize",
      icon: <Wrench color="black" size={36} />,
    },
  ];

  // Base classes for the background cards in the stack
  const backgroundCardClasses =
    "h-full w-full rounded-lg bg-neutral-200 absolute top-0 left-0";

  return (
    <div className="grid grid-cols-3 gap-4">
      {platforms.map((platform) => (
        <div
          key={platform.name}
          className="flex flex-col items-center space-y-4"
        >
          <div className="relative h-24 w-24">
            {/* Card 3 (bottom-most, furthest back) - Background card */}
            <div
              className={`${backgroundCardClasses} translate-y-[10px] border border-neutral-400 shadow-md`}
              style={{ zIndex: 1 }} // zIndex for stacking order
            />
            {/* Card 2 (middle) - Background card */}
            <div
              className={`${backgroundCardClasses} translate-y-[5px] border border-neutral-400`}
              style={{ zIndex: 2 }} // zIndex for stacking order
            />
            {/* Card 1 (top-most, with icon and shadow) - Main card */}
            <div
              className="relative flex h-full w-full items-center justify-center rounded-lg border border-neutral-400 bg-neutral-200"
              style={{ zIndex: 3 }}
            >
              <span>{platform.icon}</span>
            </div>
          </div>
          <p className="text-center text-sm font-normal text-neutral-400 uppercase dark:text-neutral-400">
            {platform.name}
          </p>
        </div>
      ))}
    </div>
  );
};

const FeatureCards = () => {
  const features = [
    {
      title: "Instant Live Status",
      description:
        "No need to refresh or hop between platforms—your favorite streamers update in real time, all in one view.",
      screenshot:
        "https://dummyimage.com/200x400/fff/000&text=Instant+Live+Status",
    },
    {
      title: "Personalized Follow List",
      description: "Log in and get a curated list of your followed creators.",
      screenshot:
        "https://dummyimage.com/200x400/fff/000&text=Personalized+Follow+List",
    },
    {
      title: "Activity Snapshot",
      description:
        "See who has the most viewers, which games are spiking, and who just went live.",
      screenshot:
        "https://dummyimage.com/200x400/fff/000&text=Activity+Snapshot",
    },
  ];

  return (
    <div className="flex flex-col justify-center gap-12 md:flex-row">
      {features.map((feature) => (
        <div
          key={feature.title}
          className="flex w-1/4 flex-col items-center justify-center rounded-lg bg-white p-8 shadow-lg"
        >
          <img
            alt={feature.title}
            className="mb-2 rounded-lg"
            src={feature.screenshot}
          />
          <p className="text-lg font-semibold text-neutral-600">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default function HighlightSection() {
  const section_heading = "See who's live all in one place.";
  const description =
    "Omniview shows you which streamers are popular across Twitch, YouTube, and Kick with more platforms coming soon. Skip the platform-hopping and dive straight into the content.";

  return (
    <section className="dark:bg-foreground relative flex w-full flex-col items-center justify-center py-12 text-black">
      <PlatformBanner />
      <div className="mx-4 flex h-full w-full flex-col items-center justify-center 2xl:mx-64">
        <div className="m-24 flex flex-col items-center justify-center space-x-12 xl:flex-row">
          <div className="xl:w-1/3">
            <PlatformGrid />
          </div>
          <div className="text-left xl:w-1/3">
            <h2 className="mb-4 text-6xl font-semibold">{section_heading}</h2>
            <p className="mb-8 text-lg text-neutral-500">{description}</p>
          </div>
        </div>
        <div className="flex w-full">
          <FeatureCards />
        </div>
      </div>
    </section>
  );
}
