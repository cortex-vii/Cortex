import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { InfoIcon } from "lucide-react";
import { Button } from "@/components/ui/button";

interface FieldInfoDialogProps {
  fieldName: string;
  fieldDescription: string;
}

const FieldInfoDialog: React.FC<FieldInfoDialogProps> = ({
  fieldName,
  fieldDescription,
}) => {
  return (
    <AlertDialog>
      <AlertDialogTrigger className="ml-2 bg-white" asChild>
        <div className="flex items-center cursor-pointer">
          <InfoIcon className="h-4 w-4" />
        </div>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white rounded-lg shadow-lg p-4 w-80">
        <AlertDialogHeader>
          <AlertDialogTitle className="text-lg font-semibold">
            {fieldName}
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm text-gray-600">
            {fieldDescription}
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel className="text-sm text-gray-700">
            Fechar
          </AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default FieldInfoDialog;
