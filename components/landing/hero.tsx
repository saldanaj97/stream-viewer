import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { ChevronRightIcon, PlayIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="relative flex min-h-screen flex-col items-center justify-center text-center">
      {/* Top Banner */}
      <Link href="/">
        <div className="absolute left-1/2 top-6 z-20 -translate-x-1/2">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            className="inline-flex items-center rounded-lg bg-gray-800 px-1 py-1 text-sm text-foreground shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.5 }}
          >
            <span className="mr-2 rounded-md bg-secondary px-3 py-1 text-xs font-semibold">
              New
            </span>
            <span className="mr-1">
              Omniview 1.0 is out! See what&apos;s new
            </span>
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
          className="mb-4 text-6xl font-bold text-foreground"
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
            className="w-52 border-foreground font-bold"
            size="lg"
            startContent={<PlayIcon className="h-5 w-5" />}
            variant="bordered"
          >
            See demo
          </Button>
        </motion.div>

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
          <Image
            alt="YouTube"
            height={32}
            src="/youtube/yt_logo_dark.png"
            width={100}
          />
          <Image alt="Kick" height={32} src="/kick/kick-logo.svg" width={100} />
        </motion.div>
      </div>
    </section>
  );
}
