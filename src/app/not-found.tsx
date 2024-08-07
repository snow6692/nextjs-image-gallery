import { AlertCircle } from "lucide-react";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";

export default function AlertDestructive() {
  return (
    <Alert variant="default" className="  mt-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Not Found 😵‍💫</AlertTitle>
      <AlertDescription className=" mt-1 text-font-semibold ">
        The page you are looking for does not exist.
      </AlertDescription>
    </Alert>
  );
}
