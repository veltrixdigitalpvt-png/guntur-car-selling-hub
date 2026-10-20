import { useEffect, useState } from "react";
import { Car } from "lucide-react";

export function Loader() {
  const [show, setShow] = useState(true);
  useEffect(() => {
    const t = setTimeout(() => setShow(false), 1100);
    return () => clearTimeout(t);
  }, []);
  if (!show) return null;
  return (
    <div className="fixed inset-0 z-[100] grid place-items-center bg-background animate-out fade-out duration-500 fill-mode-forwards [animation-delay:800ms]">
      <div className="text-center">
        <p className="font-display text-2xl font-extrabold tracking-widest text-gold-gradient">SMART CARZ</p>
        <div className="relative mx-auto mt-5 h-8 w-56 overflow-hidden">
          <Car className="absolute top-0 h-8 w-8 text-gold animate-drive" />
          <div className="absolute bottom-0 h-px w-full bg-gold-gradient" />
        </div>
      </div>
    </div>
  );
}
