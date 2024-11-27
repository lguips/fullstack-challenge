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

interface RemoveNivelDialogProps {
  onClose: () => void;
  onRemove: () => void;
  loading: boolean;
  open: boolean;
}

const RemoveNivelDialog = ({
  onClose,
  onRemove,
  loading,
  open,
}: RemoveNivelDialogProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onClose}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Excluir um nível</AlertDialogTitle>
          <AlertDialogDescription>
            Tem certeza que deseja excluir esse nível? As ações serão irreversíveis.
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

export default RemoveNivelDialog;
