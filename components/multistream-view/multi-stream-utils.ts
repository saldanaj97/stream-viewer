import { Layout, Layouts } from "react-grid-layout";

import { PageTitleProps } from "@/types/stream-viewer.types";

// Function to get the current breakpoint based on window width
export function getCurrentBreakpoint(): string {
  const width = window.innerWidth;

  if (width < 480) return "xs";
  if (width < 768) return "sm";
  if (width < 1200) return "md";

  return "lg";
}

// Function to get the current positions of streams by their visual position
export function getStreamsByPosition(layouts: Layouts): number[] {
  const currentBreakpoint = getCurrentBreakpoint();

  if (!layouts[currentBreakpoint]) return [];

  // Get the current layout
  const currentLayout = [...layouts[currentBreakpoint]];

  // Sort by position (y first, then x)
  return currentLayout
    .sort((a, b) => {
      if (a.y !== b.y) return a.y - b.y;

      return a.x - b.x;
    })
    .map((item) => parseInt(item.i.split("-")[1]));
}

// Function to check if layout is vertical for 2 streams
export function isLayoutVertical(layout: Layout[]): boolean {
  if (layout.length !== 2) return false;

  const stream0 = layout.find((item) => item.i === "stream-0");
  const stream1 = layout.find((item) => item.i === "stream-1");

  if (stream0 && stream1) {
    // If x coordinates match, they're stacked vertically
    return stream0.x === stream1.x;
  }

  return false;
}

// Layout generation function
export function generateLayouts(
  streamCount: number,
  isVertical = false,
): Layout[] {
  switch (streamCount) {
    case 1:
      return [{ i: "stream-0", x: 0, y: 0, w: 4, h: 3, minW: 1, minH: 2 }];
    case 2:
      return isVertical
        ? [
            { i: "stream-0", x: 0, y: 0, w: 4, h: 3, minW: 1, minH: 2 },
            { i: "stream-1", x: 0, y: 3, w: 4, h: 3, minW: 1, minH: 2 },
          ]
        : [
            { i: "stream-0", x: 0, y: 0, w: 2, h: 3, minW: 1, minH: 2 },
            { i: "stream-1", x: 2, y: 0, w: 2, h: 3, minW: 1, minH: 2 },
          ];
    case 3:
      return [
        { i: "stream-0", x: 0, y: 0, w: 2, h: 3, minW: 1, minH: 2 },
        { i: "stream-1", x: 2, y: 0, w: 2, h: 3, minW: 1, minH: 2 },
        { i: "stream-2", x: 0, y: 3, w: 4, h: 3, minW: 1, minH: 2 },
      ];
    case 4:
      return [
        { i: "stream-0", x: 0, y: 0, w: 2, h: 3, minW: 1, minH: 2 },
        { i: "stream-1", x: 2, y: 0, w: 2, h: 3, minW: 1, minH: 2 },
        { i: "stream-2", x: 0, y: 3, w: 2, h: 3, minW: 1, minH: 2 },
        { i: "stream-3", x: 2, y: 3, w: 2, h: 3, minW: 1, minH: 2 },
      ];
    default:
      return [];
  }
}

export function getPageTitle({
  channel,
  platform,
  isMultiView,
}: PageTitleProps): string {
  if (isMultiView === true) {
    return "Multi-Stream Viewer";
  }

  if (!channel || !platform) {
    return "Stream Viewer";
  }

  return `${channel} on ${platform}`;
}
