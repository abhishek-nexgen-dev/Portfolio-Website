import {
  createContext,
  lazy,
  PropsWithChildren,
  Suspense,
  useContext,
  useEffect,
  useState,
} from "react";
// Code-split: Loading pulls in gsap + react-fast-marquee. Keeping it
// out of the main bundle lets the hero render without parsing that.
const Loading = lazy(() => import("../components/Loading"));

interface LoadingType {
  isLoading: boolean;
  setIsLoading: (state: boolean) => void;
  setLoading: (percent: number) => void;
}

export const LoadingContext = createContext<LoadingType | null>(null);

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

export const useLoading = () => {
  const context = useContext(LoadingContext);
  if (!context) {
    throw new Error("useLoading must be used within a LoadingProvider");
  }
  return context;
};
