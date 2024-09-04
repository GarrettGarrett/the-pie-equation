import { useEffect } from "react";
import confetti from "canvas-confetti";

export function ConfettiSideCannons({ colors = ["#d4513f", "#50b8f2", "#e9b358", "#26309e"] }) {
  useEffect(() => {
    const fireConfetti = () => {
      confetti({
        particleCount: 50,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.5 },
        colors: colors,
      });
      confetti({
        particleCount: 50,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.5 },
        colors: colors,
      });
    };

    fireConfetti();
    setTimeout(fireConfetti, 200);
  }, [colors]);

  return null;
}