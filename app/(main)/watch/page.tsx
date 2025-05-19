"use client";
import { useSearchParams } from "next/navigation";
import { useMemo, type ReactNode } from "react";

import { MultiStreamView } from "@/components/multistream-view/MultiStreamView";
import {
  getPageTitle,
  parseStreamParams,
} from "@/components/multistream-view/single-stream-utils";
import { SingleStreamView } from "@/components/multistream-view/SingleStreamView";

const PageContainer = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => {
  return (
    <div className="px-4 pb-8">
      <h1 className="mt-4 text-2xl font-bold md:text-3xl">{title}</h1>
      {children}
    </div>
  );
};

// Reusable error banner
const ErrorBanner = ({ message }: { message: string }) => {
  return (
    <div className="bg-danger-500 rounded-md p-4">
      <p className="text-xl text-white">{message}</p>
    </div>
  );
};

export default function WatchPage() {
  const searchParams = useSearchParams();
  const { streams, isMultiView, error } = useMemo(
    () => parseStreamParams(searchParams),
    [searchParams],
  );

  const page_title = getPageTitle({
    channel: streams[0]?.channel || "",
    platform: streams[0]?.platform || "",
    isMultiView,
  });

  // Early return for error case
  if (error) {
    return (
      <PageContainer title={page_title}>
        <ErrorBanner message={error} />
      </PageContainer>
    );
  }

  // Early return if no streams
  if (streams.length === 0) {
    return (
      <PageContainer title={page_title}>
        <ErrorBanner message={"No stream was provided."} />
      </PageContainer>
    );
  }

  // Main content
  return (
    <PageContainer title={page_title}>
      {isMultiView ? (
        <div className="h-auto">
          <MultiStreamView streams={streams} />
        </div>
      ) : (
        <SingleStreamView stream={streams[0]} />
      )}
    </PageContainer>
  );
}
