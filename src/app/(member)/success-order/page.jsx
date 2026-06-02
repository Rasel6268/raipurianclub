import SuccessOrderContent from "@/components/SuccessOrderContent";
import { Suspense } from "react";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <SuccessOrderContent />
    </Suspense>
  );
}