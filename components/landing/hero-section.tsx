import { Button } from "@heroui/react";
import { ChevronRightIcon, PlayIcon } from "lucide-react";
import { motion } from "motion/react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex flex-col items-center justify-center text-center">
      {/* Top Banner */}
      <Link href="/">
        <div className="z-20 mt-8 mb-4">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="text-foreground inline-flex items-center rounded-full bg-neutral-300 px-1 py-1 text-sm shadow-lg dark:bg-neutral-800"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="bg-secondary mr-2 rounded-full px-3 py-1 text-xs font-semibold text-white">
              New
            </span>
            <span className="mr-1">Omniview 1.0 is out!</span>
            <ChevronRightIcon className="h-4 w-4" />
          </motion.div>
        </div>
      </Link>

      {/* Main Hero Content */}
      <div
        className="absolute inset-0 z-0 opacity-80"
        style={{
          backgroundImage: `
            linear-gradient(to right, rgba(255, 255, 255, 0.05) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.05) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px", // Grid cell size
          WebkitMaskImage:
            // Center the gradient and make the fade sharper
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 70%)",
          maskImage:
            "radial-gradient(circle at 50% 50%, rgba(0,0,0,1) 30%, rgba(0,0,0,0.7) 50%, rgba(0,0,0,0) 70%)",
        }}
      />
      <div className="relative z-10 flex flex-col items-center justify-center">
        <motion.h1
          animate={{ opacity: 1, y: 0 }}
          className="text-foreground mb-4 text-6xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Your favorite streams, all in one place
        </motion.h1>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 max-w-2xl text-center text-xl"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          With <motion.span className="text-foreground">Omniview</motion.span>,
          watch up to 4 livestreams from your favorite platforms at once, with
          live chat and full control over layout.
        </motion.p>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          className="cta-buttons mb-12 flex items-center space-x-4"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Button
            className="w-52 font-bold"
            color="secondary"
            endContent={<ChevronRightIcon className="h-5 w-5" />}
            size="lg"
          >
            <Link href="/">Start Watching</Link>
          </Button>
          <Button
            className="border-foreground w-52 font-bold"
            size="lg"
            startContent={<PlayIcon className="h-5 w-5" />}
            variant="bordered"
          >
            See demo
          </Button>
        </motion.div>

        <div className="flex items-center justify-center space-x-4">
          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-neutral-500 uppercase dark:text-neutral-400"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            WATCH FROM
          </motion.p>

          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center space-x-8"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <Image
              alt="Twitch"
              height={32}
              src="/twitch/twitch_purple_wordmark.png"
              width={100}
            />

            {/* YouTube Logo: light for light mode, dark for dark mode */}
            <span className="relative">
              <Image
                alt="YouTube"
                className="block dark:hidden"
                height={32}
                src="/youtube/yt_logo_light.png"
                width={100}
              />
              <Image
                alt="YouTube"
                className="hidden dark:block"
                height={32}
                src="/youtube/yt_logo_dark.png"
                width={100}
              />
            </span>

            <Image
              alt="Kick"
              height={32}
              src="/kick/kick_logo.svg"
              width={100}
            />
          </motion.div>

          <motion.p
            animate={{ opacity: 1, y: 0 }}
            className="text-sm font-semibold text-neutral-500 uppercase dark:text-neutral-400"
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            AND MORE SOON
          </motion.p>
        </div>
      </div>
    </section>
  );
}
