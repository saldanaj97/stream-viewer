import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import { ChevronRightIcon, PlayIcon } from "lucide-react";
import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="text-cente flex min-h-screen flex-col items-center justify-center overflow-hidden py-16">
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-6 inline-flex items-center rounded-lg bg-gray-800 px-1 py-1 text-sm text-white"
        initial={{ opacity: 0, y: -20 }}
        transition={{ duration: 0.5 }}
      >
        <span className="mr-2 rounded-md bg-blue-500 px-3 py-1 text-xs font-semibold">
          New
        </span>
        <span className="mr-1">Omniview 1.0 is out! See what&apos;s new</span>
        <ChevronRightIcon className="h-4 w-4" />
      </motion.div>
      <motion.h1
        animate={{ opacity: 1, y: 0 }}
        className="mb-4 text-5xl font-bold text-white"
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
        With{" "}
        <motion.span
          animate={{
            backgroundPosition: ["0% center", "100% center", "0% center"],
          }}
          className="bg-gradient-to-r from-blue-500 to-purple-600 bg-clip-text text-transparent"
          style={{ backgroundSize: "300% auto" }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
          }}
        >
          Omniview
        </motion.span>
        , watch up to 4 livestreams from your favorite platforms at once, with
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
          color="primary"
          endContent={<ChevronRightIcon className="h-5 w-5" />}
          size="lg"
        >
          Start Watching
        </Button>
        <Button
          className="w-52 font-bold"
          size="lg"
          startContent={<PlayIcon className="h-5 w-5" />}
          variant="bordered"
        >
          See demo
        </Button>
      </motion.div>

      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-sm uppercase text-gray-400"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <p>Supported platforms:</p>
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
    </section>
  );
}
