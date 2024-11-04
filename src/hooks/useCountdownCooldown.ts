import { useCallback, useEffect, useRef, useState } from "react";

interface UseCountdownCooldownProps {
  cooldownTime?: number; // cooldown time in milliseconds
  autoStart?: boolean; // if true, countdown starts immediately
}

export function useCountdownCooldown({
  cooldownTime = 3000,
  autoStart = false,
}: UseCountdownCooldownProps) {
  const [remainingTime, setRemainingTime] = useState(cooldownTime);
  const [isCooldown, setIsCooldown] = useState(autoStart);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Start the countdown timer
  const start = useCallback(() => {
    if (intervalRef.current) return; // Prevent multiple intervals from being set
    setIsCooldown(true);
    setRemainingTime(cooldownTime);
    intervalRef.current = setInterval(() => {
      setRemainingTime((prev) => {
        if (prev < 1000) {
          clearInterval(intervalRef.current!);
          intervalRef.current = null;
          setIsCooldown(false);
          return 0;
        }

        return prev - 1000;
      });
    }, 1000);
  }, [cooldownTime]);

  // Stop the countdown timer
  const reset = useCallback(() => {
    clearInterval(intervalRef.current!);
    intervalRef.current = null;
    setIsCooldown(false);
    setRemainingTime(cooldownTime);
  }, [cooldownTime]);

  // Clean up the interval on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  return {
    remainingTime,
    isCooldown,
    startCooldown: start,
    resetCooldown: reset,
  };
}
