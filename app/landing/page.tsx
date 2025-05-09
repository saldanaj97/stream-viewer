"use client";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";
import Image from "next/image";

import HeroSection from "@/components/landing/hero";

export default function LandingPage({}) {
  return (
    <div className="container mx-auto bg-background p-4 text-foreground dark">
      <HeroSection />

      {/* 2. Feature Section: Multi-Platform Streaming */}
      <section className="feature-section py-12">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Watch 4 Streams at Once
        </motion.h2>
        <div className="grid gap-8 text-center md:grid-cols-3">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Image
              alt="Platforms"
              className="mx-auto mb-4"
              height={300}
              src="https://dummyimage.com/400x300/ddd/bbb&text=Twitch,YouTube,Kick"
              width={400}
            />
            <h3 className="mb-2 text-xl font-semibold">
              Stream from Twitch, YouTube, Kick (and more coming).
            </h3>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <Image
              alt="Combined View"
              className="mx-auto mb-4"
              height={300}
              src="https://dummyimage.com/400x300/ddd/bbb&text=Combined+View"
              width={400}
            />
            <h3 className="mb-2 text-xl font-semibold">
              Combine streams from different platforms in one view.
            </h3>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <Image
              alt="Followed Live"
              className="mx-auto mb-4"
              height={300}
              src="https://dummyimage.com/400x300/ddd/bbb&text=Followed+Live"
              width={400}
            />
            <h3 className="mb-2 text-xl font-semibold">
              View who’s live from your followed accounts.
            </h3>
          </motion.div>
        </div>
      </section>

      {/* 3. Feature Section: Layout Customization */}
      <section className="feature-section bg-gray-100 py-12">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Flexible Multiview Layout
        </motion.h2>
        <div className="grid gap-8 text-center md:grid-cols-3">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-2 text-xl font-semibold">
              Drag-and-drop stream tiles.
            </h3>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-2 text-xl font-semibold">
              Resize each stream window.
            </h3>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-2 text-xl font-semibold">
              Preset layout options: Grid, PiP, Stacked views.
            </h3>
          </motion.div>
        </div>
      </section>

      {/* 4. Feature Section: Engagement Tools */}
      <section className="feature-section py-12">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Stay Connected While Watching
        </motion.h2>
        <div className="grid gap-8 text-center md:grid-cols-3">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-2 text-xl font-semibold">
              Live chat view for each stream.
            </h3>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-2 text-xl font-semibold">
              Cross-platform streamer search.
            </h3>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-2 text-xl font-semibold">
              Save favorite stream combos and layouts.
            </h3>
          </motion.div>
        </div>
      </section>

      {/* 5. Feature Section: Personalization & Performance */}
      <section className="feature-section bg-gray-100 py-12">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Tailored for You
        </motion.h2>
        <div className="grid gap-8 text-center md:grid-cols-3">
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="mb-2 text-xl font-semibold">
              Light/Dark mode toggle.
            </h3>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="mb-2 text-xl font-semibold">
              Mute or solo audio per stream.
            </h3>
          </motion.div>
          <motion.div
            animate={{ opacity: 1, y: 0 }}
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5, delay: 0.4 }}
          >
            <h3 className="mb-2 text-xl font-semibold">
              Performance optimized for smooth playback.
            </h3>
          </motion.div>
        </div>
      </section>

      {/* 6. (Optional) Feature Section: Social & Extensions */}
      <section className="feature-section py-12">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 text-center text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Coming Soon
        </motion.h2>
        <motion.ul
          animate={{ opacity: 1, y: 0 }}
          className="mx-auto max-w-md list-inside list-disc text-center"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <li>Invite friends to co-watch in synced rooms.</li>
          <li>Chrome Extension for instant access.</li>
          <li>Mobile/tablet support.</li>
          <li>Omniview account system.</li>
        </motion.ul>
      </section>

      {/* 7. Demo / Preview Section */}
      <section className="demo-section bg-gray-200 py-12 text-center">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          See Omniview in Action
        </motion.h2>
        <motion.p
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          Interactive demo or embedded video showing how Omniview works in under
          60 seconds.
        </motion.p>
        <motion.div
          animate={{ opacity: 1, scale: 1 }}
          className="mx-auto flex h-96 w-full max-w-3xl items-center justify-center bg-black text-white"
          initial={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <Image
            alt="Omniview Demo Video"
            height={540} // Assuming 16:9 aspect ratio, adjust if needed
            src="https://dummyimage.com/16:9x540/000/fff&text=Omniview+Demo+Video"
            width={960} // Assuming 16:9 aspect ratio, adjust if needed
          />
        </motion.div>
      </section>

      {/* 8. Call to Action (CTA) Section */}
      <section className="cta-section py-16 text-center">
        <motion.h2
          animate={{ opacity: 1, y: 0 }}
          className="mb-4 text-3xl font-bold"
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          Ready to Stream Smarter?
        </motion.h2>
        <motion.div
          animate={{ opacity: 1, y: 0 }}
          initial={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Button className="font-bold" color="primary" size="lg">
            Launch Omniview Now
          </Button>
        </motion.div>
      </section>

      {/* 9. Footer */}
      {/* <footer className="footer-section text-center py-8 border-t">
        <div className="quick-links mb-4">
          <a href="#" className="mx-2">About</a> |
          <a href="#" className="mx-2">Blog</a> |
          <a href="#" className="mx-2">Contact</a> |
          <a href="#" className="mx-2">Privacy Policy</a> |
          <a href="#" className="mx-2">Terms</a>
        </div>
        <div className="social-links mb-4">
          <a href="#" className="mx-2">Twitter</a> |
          <a href="#" className="mx-2">GitHub</a>
        </div>
        <img src="https://dummyimage.com/100x40/ccc/aaa&text=Logo" alt="Omniview Logo" className="mx-auto mb-2"/>
        <p className="text-sm text-gray-600">&copy; {new Date().getFullYear()} Omniview. All rights reserved.</p>
      </footer> */}
    </div>
  );
}
