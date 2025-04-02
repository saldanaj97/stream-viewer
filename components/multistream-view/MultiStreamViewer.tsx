import { useEffect, useRef, useState } from "react";
import { Layouts, Responsive, WidthProvider } from "react-grid-layout";

import {
  createSwappedLayouts,
  generateLayouts,
  getStreamsByPosition,
  isLayoutVertical,
} from "./multistream-utils";
import { StreamItem } from "./StreamItem";

import { SwapHorizontalIcon, SwapVerticalIcon } from "@/components/icons";
import { MultiStreamViewerProps } from "@/types/multistream-viewer.types";

// Import CSS for react-grid-layout and react-resizable per docs
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

export const BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480 };
export const COLS = { lg: 4, md: 4, sm: 2, xs: 1 };

const ResponsiveGridLayout = WidthProvider(Responsive);

export const MultiStreamViewer = ({ streams }: MultiStreamViewerProps) => {
  const containerRef = useRef<HTMLDivElement>(null);

  // Limit to max 4 streams
  const activeStreams = streams.slice(0, 4);

  // State
  const [layouts, setLayouts] = useState<Layouts>({
    lg: generateLayouts(activeStreams.length),
    md: generateLayouts(activeStreams.length),
    sm: generateLayouts(activeStreams.length, true),
    xs: generateLayouts(activeStreams.length, true),
  });
  const [hasVerticalLayout, setHasVerticalLayout] = useState(false);

  // Update layouts when stream count changes
  useEffect(() => {
    setLayouts({
      lg: generateLayouts(activeStreams.length),
      md: generateLayouts(activeStreams.length),
      sm: generateLayouts(activeStreams.length, true),
      xs: generateLayouts(activeStreams.length, true),
    });
  }, [activeStreams.length]);

  // Swap helpers
  const swapStreams = (index1: number, index2: number) => {
    const newLayouts = createSwappedLayouts(
      layouts,
      index1,
      index2,
      activeStreams.length,
    );

    if (newLayouts) setLayouts(newLayouts);
  };

  // Swap buttons handlers
  const swapHorizontally = () => {
    const streamPositions = getStreamsByPosition(layouts);

    switch (activeStreams.length) {
      case 2:
        // For 2 streams in horizontal layout, swap them
        if (!hasVerticalLayout) {
          swapStreams(streamPositions[0], streamPositions[1]);
        }
        break;
      case 3:
      case 4:
        // For 3 or 4 streams, swap streams in top row
        swapStreams(streamPositions[0], streamPositions[1]);
        break;
    }
  };

  const swapVertically = () => {
    const streamPositions = getStreamsByPosition(layouts);

    switch (activeStreams.length) {
      case 2:
        // For 2 streams in vertical layout, swap them
        if (hasVerticalLayout) {
          swapStreams(streamPositions[0], streamPositions[1]);
        }
        break;
      case 3:
        // For 3 streams, swap top-left with bottom
        swapStreams(streamPositions[0], streamPositions[2]);
        break;
      case 4:
        // For 4 streams, swap top-left with bottom-left
        swapStreams(streamPositions[0], streamPositions[2]);
        break;
    }
  };

  // UI visibility helpers
  const shouldShowVerticalSwap = () => {
    if (activeStreams.length >= 3) return true;

    return activeStreams.length === 2 && hasVerticalLayout;
  };

  const showSwapButtons = activeStreams.length >= 2;

  return (
    <div className="flex w-full">
      {/* Vertical Swap Button Column */}
      <div className="mr-2 flex items-center">
        {shouldShowVerticalSwap() && (
          <button
            aria-label="Swap streams vertically"
            className={
              "flex h-10 w-10 items-center justify-center text-foreground transition"
            }
            onClick={swapVertically}
          >
            <SwapVerticalIcon size={24} />
          </button>
        )}
      </div>

      {/* Grid Container */}
      <div ref={containerRef} className="flex flex-1 flex-col">
        {/* Horizontal Swap Button Row */}
        <div className="flex justify-center">
          {showSwapButtons && (
            <button
              aria-label="Swap streams horizontally"
              className={
                "flex h-10 w-10 items-center justify-center text-foreground transition"
              }
              onClick={swapHorizontally}
            >
              <SwapHorizontalIcon size={24} />
            </button>
          )}
        </div>

        {/* Grid Layout */}
        <div className="relative">
          <ResponsiveGridLayout
            breakpoints={BREAKPOINTS}
            cols={COLS}
            draggableHandle=".stream-drag-handle"
            isDraggable={true}
            isResizable={true}
            layouts={layouts}
            margin={[8, 8]}
            rowHeight={200}
            onDragStart={() => {
              document.body.classList.add("dragging");
            }}
            onDragStop={() => {
              document.body.classList.remove("dragging");
            }}
            onLayoutChange={(currentLayout, allLayouts) => {
              setLayouts(allLayouts);

              // Check if we have vertical layout for 2 streams
              if (activeStreams.length === 2) {
                setHasVerticalLayout(isLayoutVertical(currentLayout));
              }
            }}
          >
            {activeStreams.map((stream, index) => (
              <div key={`stream-${index}`}>
                <StreamItem index={index} stream={stream} />
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      </div>
    </div>
  );
};
