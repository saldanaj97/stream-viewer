import { useEffect, useRef, useState } from "react";
import { Layouts, Responsive, WidthProvider } from "react-grid-layout";

import { generateLayouts } from "./multi-stream-utils";
import { StreamEmbed } from "./StreamItem";

import { StreamInfo } from "@/types/stream-viewer.types";

// Import CSS for react-grid-layout and react-resizable per docs
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

interface MultiStreamViewerProps {
  streams: StreamInfo[];
}

export const BREAKPOINTS = { lg: 1200, md: 996, sm: 768, xs: 480 };
export const COLS = { lg: 4, md: 2, sm: 2, xs: 1 };

const ResponsiveGridLayout = WidthProvider(Responsive);

export const MultiStreamView = ({ streams }: MultiStreamViewerProps) => {
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

  // Update layouts when stream count changes
  useEffect(() => {
    setLayouts({
      lg: generateLayouts(activeStreams.length),
      md: generateLayouts(activeStreams.length),
      sm: generateLayouts(activeStreams.length, true),
      xs: generateLayouts(activeStreams.length, true),
    });
  }, [activeStreams.length]);

  return (
    <div className="w-full">
      {/* Grid Container */}
      <div ref={containerRef} className="flex flex-1 flex-col">
        {/* Grid Layout */}
        <div className="relative">
          <ResponsiveGridLayout
            breakpoints={BREAKPOINTS}
            cols={COLS}
            compactType="vertical"
            draggableHandle=".stream-drag-handle"
            isDraggable={true}
            isResizable={true}
            layouts={layouts}
            margin={[4, 4]}
            preventCollision={false}
            resizeHandles={["se", "sw", "ne", "nw"]}
            rowHeight={200}
            useCSSTransforms={true}
            verticalCompact={true}
            onDragStart={() => {
              document.body.classList.add("dragging");
            }}
            onDragStop={() => {
              document.body.classList.remove("dragging");
            }}
            onLayoutChange={(currentLayout, allLayouts) => {
              setLayouts(allLayouts);
            }}
          >
            {activeStreams.map((stream, index) => (
              <div key={`stream-${index}`}>
                <StreamEmbed index={index} stream={stream} />
              </div>
            ))}
          </ResponsiveGridLayout>
        </div>
      </div>
    </div>
  );
};
