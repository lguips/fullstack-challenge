import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface AddNivelDialogProps {
  open: boolean;
  loading: boolean;
  onAddNivel: (name: string) => void;
  onClose: () => void;
}

const AddNivelDialog = ({
  open,
  loading,
  onAddNivel,
  onClose,
}: AddNivelDialogProps) => {
  const [name, setName] = useState("");

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Adicionar nível</DialogTitle>
          <DialogDescription>
            Complete as informações para cadastrar um nível
          </DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="name" className="text-right">
            Nome
          </Label>
          <Input
            data-testid="add-nivel-input"
            id="name"
            placeholder="Digite um nome..."
            defaultValue={name}
            className="mt-2"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button data-testid="add-nivel-submit-button" type="submit" onClick={() => onAddNivel(name)}>
            {loading ? "Carregando..." : "Adicionar nível"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default AddNivelDialog;
