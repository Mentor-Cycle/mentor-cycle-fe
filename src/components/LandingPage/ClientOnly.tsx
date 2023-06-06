import { useEffect, useState } from "react";

type OnlyClientProps = {
  children: React.ReactNode;
};

const ClientOnly: React.FC<OnlyClientProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  return <>{hasMounted && children}</>;
};

export default ClientOnly;
