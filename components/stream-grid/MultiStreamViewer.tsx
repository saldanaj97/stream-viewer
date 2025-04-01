import { useEffect, useRef, useState } from "react";
import { Layouts, Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { SwapHorizontalIcon, SwapVerticalIcon } from "@/components/icons";

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface StreamInfo {
  channel: string;
  platform: "Twitch" | "YouTube" | "Kick";
  liveStreamId?: string | null;
}

interface MultiStreamViewerProps {
  streams: StreamInfo[];
}

// Custom CSS to ensure dragging and resizing works
const gridItemStyle = {
  position: "relative" as const,
  overflow: "hidden",
  borderRadius: "8px",
  boxShadow:
    "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)",
};

const streamOverlayStyle = {
  position: "absolute" as const,
  top: 0,
  left: 0,
  right: 0,
  height: "26px",
  backgroundColor: "rgba(0, 0, 0, 0.5)",
  zIndex: 10,
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "0 8px",
  cursor: "move",
};

export const MultiStreamViewer = ({ streams }: MultiStreamViewerProps) => {
  // Container ref to help position the buttons
  const containerRef = useRef<HTMLDivElement>(null);

  // Ensure we have no more than 4 streams
  const activeStreams = streams.slice(0, 4);

  // Generate default layouts based on number of streams
  const [layouts, setLayouts] = useState<Layouts>({
    lg: generateLayouts(activeStreams.length),
    md: generateLayouts(activeStreams.length),
    sm: generateLayouts(activeStreams.length, true),
    xs: generateLayouts(activeStreams.length, true),
  });

  // Track if the layout has streams stacked vertically
  const [hasVerticalLayout, setHasVerticalLayout] = useState(false);

  useEffect(() => {
    setLayouts({
      lg: generateLayouts(activeStreams.length),
      md: generateLayouts(activeStreams.length),
      sm: generateLayouts(activeStreams.length, true),
      xs: generateLayouts(activeStreams.length, true),
    });
  }, [activeStreams.length]);

  // Function to swap two streams in the layout
  const swapStreams = (index1: number, index2: number) => {
    if (
      index1 < 0 ||
      index2 < 0 ||
      index1 >= activeStreams.length ||
      index2 >= activeStreams.length
    ) {
      return; // Invalid indices
    }

    // Create new layouts with swapped positions
    const newLayouts: Layouts = { ...layouts };

    // Swap in all breakpoints
    Object.keys(layouts).forEach((breakpoint) => {
      if (!layouts[breakpoint]) return;

      const layout = [...layouts[breakpoint]];
      const item1Index = layout.findIndex(
        (item) => item.i === `stream-${index1}`,
      );
      const item2Index = layout.findIndex(
        (item) => item.i === `stream-${index2}`,
      );

      if (item1Index !== -1 && item2Index !== -1) {
        // Swap x, y values while keeping w, h the same
        const temp = {
          x: layout[item1Index].x,
          y: layout[item1Index].y,
        };

        layout[item1Index] = {
          ...layout[item1Index],
          x: layout[item2Index].x,
          y: layout[item2Index].y,
        };

        layout[item2Index] = {
          ...layout[item2Index],
          x: temp.x,
          y: temp.y,
        };

        newLayouts[breakpoint] = layout;
      }
    });

    setLayouts(newLayouts);
  };

  // Function to swap streams horizontally (left-right in the same row)
  const swapHorizontally = () => {
    switch (activeStreams.length) {
      case 2:
        // For 2 streams in horizontal layout, swap them
        swapStreams(0, 1);
        break;
      case 3:
        // For 3 streams, swap the top-left and top-right
        swapStreams(0, 1);
        break;
      case 4:
        // For 4 streams, swap both top and bottom rows
        swapStreams(0, 1); // Swap top row
        swapStreams(2, 3); // Swap bottom row
        break;
    }
  };

  // Function to swap streams vertically (between rows)
  const swapVertically = () => {
    switch (activeStreams.length) {
      case 2:
        // For 2 streams in vertical layout, swap them
        swapStreams(0, 1);
        break;
      case 3:
        // For 3 streams, swap the top row with the bottom
        swapStreams(0, 2);
        swapStreams(1, 2);
        break;
      case 4:
        // For 4 streams, swap top and bottom rows
        swapStreams(0, 2); // Swap left column
        swapStreams(1, 3); // Swap right column
        break;
    }
  };

  // Determine if vertical swap button should be shown
  const shouldShowVerticalSwap = () => {
    // Show if there are 3+ streams
    if (activeStreams.length >= 3) return true;

    // For 2 streams, check if they're stacked vertically
    if (activeStreams.length === 2) {
      return hasVerticalLayout;
    }

    return false;
  };

  // Check if we need to show any swap buttons
  const showSwapButtons = activeStreams.length >= 2;

  return (
    <div ref={containerRef} className="h-full w-full">
      <div className="relative h-full">
        {/* Horizontal Swap Button */}
        {showSwapButtons && (
          <div
            className="pointer-events-auto absolute z-20"
            style={{
              top: "10px",
              left: "50%",
              transform: "translateX(-50%)",
            }}
          >
            <button
              aria-label="Swap streams horizontally"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-foreground shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={swapHorizontally}
            >
              <SwapHorizontalIcon size={24} />
            </button>
          </div>
        )}

        {/* Vertical Swap Button */}
        {shouldShowVerticalSwap() && (
          <div
            className="pointer-events-auto absolute z-20"
            style={{
              left: "10px",
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <button
              aria-label="Swap streams vertically"
              className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-600 text-foreground shadow-lg transition hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              onClick={swapVertically}
            >
              <SwapVerticalIcon size={24} />
            </button>
          </div>
        )}

        <ResponsiveGridLayout
          breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
          className="layout"
          cols={{ lg: 4, md: 4, sm: 2, xs: 1 }}
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
            if (activeStreams.length === 2 && currentLayout.length === 2) {
              const stream0 = currentLayout.find(
                (item) => item.i === "stream-0",
              );
              const stream1 = currentLayout.find(
                (item) => item.i === "stream-1",
              );

              if (stream0 && stream1) {
                // If x coordinates match, they're stacked vertically
                setHasVerticalLayout(stream0.x === stream1.x);
              }
            }
          }}
        >
          {activeStreams.map((stream, index) => (
            <div
              key={`stream-${index}`}
              className="stream-container"
              style={gridItemStyle}
            >
              <div className="stream-overlay" style={streamOverlayStyle}>
                <div
                  className="stream-drag-handle"
                  style={{ width: "100%", height: "100%", cursor: "move" }}
                >
                  <span className="text-sm text-white">
                    {stream.channel} ({stream.platform})
                  </span>
                </div>
              </div>
              <div
                style={{
                  width: "100%",
                  height: "100%",
                  paddingTop: "26px",
                }}
              >
                {renderEmbed(stream)}
              </div>
            </div>
          ))}
        </ResponsiveGridLayout>
      </div>
    </div>
  );
};

// Function to generate default layouts based on number of streams
function generateLayouts(streamCount: number, isVertical = false) {
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

// Function to render embeds for different platforms
function renderEmbed(stream: StreamInfo) {
  const { channel, platform, liveStreamId } = stream;

  switch (platform) {
    case "YouTube":
      return (
        <iframe
          allowFullScreen={true}
          className="h-full w-full"
          src={`https://www.youtube.com/embed/${liveStreamId}?enablejsapi=1`}
          title={`${channel} stream`}
        />
      );
    case "Kick":
      return (
        <iframe
          allowFullScreen={true}
          className="h-full w-full"
          src={`https://player.kick.com/${channel}?muted=true&autoplay=true`}
          title={`${channel} stream`}
        />
      );
    case "Twitch":
    default:
      return (
        <iframe
          allowFullScreen={true}
          className="h-full w-full"
          src={`https://player.twitch.tv/?channel=${channel}&parent=${window.location.hostname}`}
          title={`${channel} stream`}
        />
      );
  }
}
