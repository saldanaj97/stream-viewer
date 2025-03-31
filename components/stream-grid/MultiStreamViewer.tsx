import { useEffect, useState } from "react";
import { Responsive, WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const ResponsiveGridLayout = WidthProvider(Responsive);

export interface StreamInfo {
  channel: string;
  platform: "Twitch" | "YouTube" | "Kick";
  liveStreamId?: string | null;
}

interface MultiStreamViewerProps {
  streams: StreamInfo[];
}

export const MultiStreamViewer = ({ streams }: MultiStreamViewerProps) => {
  // Ensure we have no more than 4 streams
  const activeStreams = streams.slice(0, 4);

  // Generate default layouts based on number of streams
  const [layouts, setLayouts] = useState({
    lg: generateLayouts(activeStreams.length),
    md: generateLayouts(activeStreams.length),
    sm: generateLayouts(activeStreams.length, true),
    xs: generateLayouts(activeStreams.length, true),
  });

  useEffect(() => {
    setLayouts({
      lg: generateLayouts(activeStreams.length),
      md: generateLayouts(activeStreams.length),
      sm: generateLayouts(activeStreams.length, true),
      xs: generateLayouts(activeStreams.length, true),
    });
  }, [activeStreams.length]);

  return (
    <div className="h-full w-full">
      <ResponsiveGridLayout
        breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480 }}
        className="layout"
        cols={{ lg: 4, md: 4, sm: 2, xs: 1 }}
        isDraggable={true}
        isResizable={true}
        layouts={layouts}
        margin={[8, 8]}
        rowHeight={200}
        onLayoutChange={(_, allLayouts) => {
          setLayouts(allLayouts);
        }}
      >
        {activeStreams.map((stream, index) => (
          <div key={`stream-${index}`} className="stream-container">
            {renderEmbed(stream)}
          </div>
        ))}
      </ResponsiveGridLayout>
    </div>
  );
};

// Function to generate default layouts based on number of streams
function generateLayouts(streamCount: number, isVertical = false) {
  switch (streamCount) {
    case 1:
      return [{ i: "stream-0", x: 0, y: 0, w: 4, h: 3, minW: 2, minH: 2 }];
    case 2:
      return isVertical
        ? [
            { i: "stream-0", x: 0, y: 0, w: 4, h: 3, minW: 2, minH: 2 },
            { i: "stream-1", x: 0, y: 3, w: 4, h: 3, minW: 2, minH: 2 },
          ]
        : [
            { i: "stream-0", x: 0, y: 0, w: 2, h: 3, minW: 2, minH: 2 },
            { i: "stream-1", x: 2, y: 0, w: 2, h: 3, minW: 2, minH: 2 },
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
          src={`https://kick.com/${channel}/embed`}
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
