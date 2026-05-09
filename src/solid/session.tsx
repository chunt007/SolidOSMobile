import { createContext, ReactNode, useContext, useState } from "react";

export type SolidSession = {
  webId: string;
  cookies: string;
};

type SolidSessionContextType = {
  session: SolidSession | null;
  setSession: (s: SolidSession | null) => void;
};

const SolidSessionContext = createContext<SolidSessionContextType>({
  session: null,
  setSession: () => {},
});

export function SolidSessionProvider({ children }: { children: ReactNode }) {
  const [session, setSession] = useState<SolidSession | null>(null);

  return (
    <SolidSessionContext.Provider value={{ session, setSession }}>
      {children}
    </SolidSessionContext.Provider>
  );
}

export function useSolidSession() {
  return useContext(SolidSessionContext);
}
