import {
  lazy,
  PropsWithChildren,
  Suspense,
  useEffect,
  useState,
} from "react";
import { LoadingContext } from "./LoadingContext";
import type { LoadingType } from "./LoadingContext";
import { setProgress } from "../components/utils/setProgress";
// Code-split: Loading pulls in gsap + react-fast-marquee. Keeping it
// out of the main bundle lets the hero render without parsing that.
const Loading = lazy(() => import("../components/Loading"));

export const LoadingProvider = ({ children }: PropsWithChildren) => {
  const [isLoading, setIsLoading] = useState(true);
  const [loading, setLoading] = useState(0);

  useEffect(() => {
    const progress = setProgress((value) => setLoading(value));
    let cancelled = false;

    const complete = () => {
      if (!cancelled) {
        void progress.loaded();
      }
    };

    if (document.fonts?.ready) {
      document.fonts.ready.then(complete).catch(complete);
    } else {
      complete();
    }

    return () => {
      cancelled = true;
      progress.clear();
    };
  }, []);

  const value = {
    isLoading,
    setIsLoading,
    setLoading,
  };

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
