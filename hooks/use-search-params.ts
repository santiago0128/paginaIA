import { useSearchParams } from "next/navigation";

export function useCurrentSearchParams() {
  return useSearchParams();
}