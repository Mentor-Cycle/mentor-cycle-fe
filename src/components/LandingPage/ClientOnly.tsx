import { useEffect, useState } from "react";

type OnlyClientProps = {
  children: React.ReactNode;
};

const ClientOnly: React.FC<OnlyClientProps> = ({ children }) => {
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  if (!hasMounted) {
    return null;
  }
  return <>{children}</>;
};

export default ClientOnly;
