import {
  EmblaCarouselType,
  EmblaEventType,
  EmblaOptionsType,
} from "embla-carousel";
import useEmblaCarousel from "embla-carousel-react";
import Link from "next/link";
import React, { useCallback, useEffect, useRef } from "react";

import "@/styles/carousel.css";
import {
  NextButton,
  PrevButton,
  usePrevNextButtons,
} from "./buttons/arrow-buttons";
import { DotButton, useDotButton } from "./buttons/dot-button";

import { KickIcon, TwitchIcon, YouTubeIcon } from "@/components/icons";
import { PLATFORM_ICONS } from "@/components/sidebar/platforms";
import {
  getStreamDuration,
  getThumbnailUrl,
} from "@/components/stream-grid/utils";
import { Stream, StreamPlatform } from "@/types/stream.types";

const TWEEN_FACTOR_BASE = 0.2;

type PropType = {
  streams: Stream[];
  options?: EmblaOptionsType;
};

const PlatformIcon = ({ platform }: { platform: StreamPlatform }) => {
  const commonProps = { className: "text-white", size: 18 };

  switch (platform) {
    case "twitch":
      return <TwitchIcon {...commonProps} />;
    case "youtube":
      return <YouTubeIcon {...commonProps} />;
    case "kick":
      return <KickIcon {...commonProps} />;
    default:
      return null;
  }
};

const TopStreamCarousel: React.FC<PropType> = (props) => {
  const { streams, options } = props;
  const [emblaRef, emblaApi] = useEmblaCarousel({
    ...options,
    loop: true,
  });
  const tweenFactor = useRef(0);
  const tweenNodes = useRef<HTMLElement[]>([]);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  const setTweenNodes = useCallback((emblaApi: EmblaCarouselType): void => {
    tweenNodes.current = emblaApi.slideNodes().map((slideNode) => {
      return slideNode.querySelector(".embla__parallax__layer") as HTMLElement;
    });
  }, []);

  const setTweenFactor = useCallback((emblaApi: EmblaCarouselType) => {
    tweenFactor.current = TWEEN_FACTOR_BASE * emblaApi.scrollSnapList().length;
  }, []);

  const tweenParallax = useCallback(
    (emblaApi: EmblaCarouselType, eventName?: EmblaEventType) => {
      const engine = emblaApi.internalEngine();
      const scrollProgress = emblaApi.scrollProgress();
      const slidesInView = emblaApi.slidesInView();
      const isScrollEvent = eventName === "scroll";

      emblaApi.scrollSnapList().forEach((scrollSnap, snapIndex) => {
        let diffToTarget = scrollSnap - scrollProgress;
        const slidesInSnap = engine.slideRegistry[snapIndex];

        slidesInSnap.forEach((slideIndex) => {
          if (isScrollEvent && !slidesInView.includes(slideIndex)) return;

          if (engine.options.loop) {
            engine.slideLooper.loopPoints.forEach((loopItem) => {
              const target = loopItem.target();

              if (slideIndex === loopItem.index && target !== 0) {
                const sign = Math.sign(target);

                if (sign === -1) {
                  diffToTarget = scrollSnap - (1 + scrollProgress);
                }
                if (sign === 1) {
                  diffToTarget = scrollSnap + (1 - scrollProgress);
                }
              }
            });
          }

          const translate = diffToTarget * (-1 * tweenFactor.current) * 100;
          const tweenNode = tweenNodes.current[slideIndex];

          if (tweenNode) {
            tweenNode.style.transform = `translateX(${translate}%)`;
          }
        });
      });
    },
    [],
  );

  useEffect(() => {
    if (!emblaApi) return;

    setTweenNodes(emblaApi);
    setTweenFactor(emblaApi);
    tweenParallax(emblaApi);

    emblaApi
      .on("reInit", setTweenNodes)
      .on("reInit", setTweenFactor)
      .on("reInit", tweenParallax)
      .on("scroll", tweenParallax)
      .on("slideFocus", tweenParallax);
  }, [emblaApi, setTweenNodes, setTweenFactor, tweenParallax]);

  return (
    <div className="embla">
      <div ref={emblaRef} className="embla__viewport">
        <div className="embla__container">
          {streams.map((stream, index) => {
            const { color } =
              PLATFORM_ICONS[stream.platform] ?? PLATFORM_ICONS.default;

            return (
              <div
                key={`${stream.platform}-${stream.id}-${index}`}
                className="embla__slide"
              >
                <Link
                  href={`/watch?platform=${stream.platform}&channel=${stream.user_name}&id=${stream.id}`}
                >
                  <div className="embla__parallax">
                    <div className="embla__parallax__layer">
                      <img
                        alt={`${stream.user_name} streaming ${stream.game_name || "content"}`}
                        className="embla__slide__img embla__parallax__img"
                        src={getThumbnailUrl(
                          stream.thumbnail_url,
                          stream.platform,
                        )}
                      />

                      {/* Platform badge and overlay information */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-70" />

                      {/* Top badges */}
                      <div className="absolute inset-x-2 top-2 flex justify-between">
                        <div className="flex items-center space-x-2">
                          <div className={`rounded p-1 ${color}`}>
                            <PlatformIcon platform={stream.platform} />
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          {stream.is_mature && (
                            <span className="rounded bg-red-600 px-2 py-0.5 text-xs text-white">
                              18+
                            </span>
                          )}
                          <span className="rounded bg-black bg-opacity-70 px-2 py-0.5 text-xs text-white">
                            {getStreamDuration(stream.started_at)}
                          </span>
                        </div>
                      </div>

                      {/* Stream info overlay at bottom */}
                      <div className="absolute inset-x-0 bottom-0 p-4">
                        <h3 className="line-clamp-1 text-lg font-bold text-white">
                          {stream.title}
                        </h3>
                        <p className="text-sm text-white opacity-90">
                          {stream.user_name}
                        </p>
                        <div className="mt-2 flex items-center justify-between">
                          <span className="text-sm text-white opacity-80">
                            {stream.game_name ||
                              `${stream.platform.charAt(0).toUpperCase() + stream.platform.slice(1)} Content`}
                          </span>
                          <span className="rounded bg-black bg-opacity-70 px-2 py-0.5 text-xs text-white">
                            {new Intl.NumberFormat().format(
                              stream.viewer_count,
                            )}{" "}
                            viewers
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            );
          })}
        </div>
      </div>

      <div className="embla__controls">
        <div className="embla__buttons">
          <PrevButton disabled={prevBtnDisabled} onClick={onPrevButtonClick} />
          <NextButton disabled={nextBtnDisabled} onClick={onNextButtonClick} />
        </div>

        <div className="embla__dots">
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              className={"embla__dot".concat(
                index === selectedIndex ? "embla__dot--selected" : "",
              )}
              onClick={() => onDotButtonClick(index)}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default TopStreamCarousel;
