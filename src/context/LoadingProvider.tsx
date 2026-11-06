import {
  lazy,
  PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from "react";
import { LoadingContext } from "./LoadingContext";
import type { LoadingType } from "./LoadingContext";
// Code-split: Loading pulls in gsap + react-fast-marquee. Keeping it
// out of the main bundle lets the hero render without parsing that.
const Loading = lazy(() => import("../components/Loading"));

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };
  useEffect(() => {}, [loading]);

  return (
    <LoadingContext.Provider value={value as LoadingType}>
      {isLoading && (
        <Suspense fallback={null}>
          <Loading percent={loading} />
        </Suspense>
      )}
      <main className="main-body">{children}</main>
    </LoadingContext.Provider>
  );
};
