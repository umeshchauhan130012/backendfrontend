import { useEffect } from "react";
import { useLocation } from "react-router-dom";
export default function ScrollToTop() {
  const routePath = useLocation();
  useEffect(() => {
    window.scroll(0, 0);
  }, [routePath]);
  return null;
}