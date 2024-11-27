import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface RemoveDesenvolvedorDialogProps {
  onClose: () => void;
  onRemove: () => void;
  loading: boolean;
  open: boolean;
}

const RemoveDesenvolvedorDialog = ({
  onClose,
  onRemove,
  loading,
  open,
}: RemoveDesenvolvedorDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir um desenvolvedor</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir esse desenvolvedor? As ações serão
            irreversíveis.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={onClose}>Cancelar</AlertDialogCancel>
          <AlertDialogAction data-testid="submit-remove" onClick={onRemove}>
            {loading ? "Carregando..." : "Continuar"}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default RemoveDesenvolvedorDialog;
