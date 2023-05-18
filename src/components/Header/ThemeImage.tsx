import Image from "next/image";
import { useTheme } from "next-themes";

function ThemedImage() {
  const { resolvedTheme } = useTheme();
  const src = resolvedTheme === "dark" ? "/logoDarkMode.png" : "/logoSvg.svg";

  return (
    <Image
      src={src}
      width={64}
      height={56}
      alt="MentorCycle logo"
      className="object-contain"
    />
  );
}

export default ThemedImage;
