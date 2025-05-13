"use client";

import { Button } from "@heroui/button";
import { motion } from "framer-motion";

import EngagementSection from "@/components/landing/engagement-section";
import HeroSection from "@/components/landing/hero-section";
import HighlightSection from "@/components/landing/highlight-section";
import ProductPreview from "@/components/landing/product-preview-section";

export default function LandingPage({}) {
  return (
    <div className="min-h-screen w-full text-foreground">
      <HeroSection />
      <ProductPreview />
      <HighlightSection />
      <EngagementSection />

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
