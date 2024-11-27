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
import { useEffect, useState } from "react";
import { Nivel } from "../types";

interface EditNivelDialogProps {
  open: boolean;
  loading: boolean;
  onEditNivel: (name: string, id: number) => void;
  onClose: () => void;
  value: Nivel;
}

const EditNivelDialog = ({
  open,
  loading,
  onEditNivel,
  onClose,
  value,
}: EditNivelDialogProps) => {
  const [name, setName] = useState("");

  useEffect(() => {
    setName(value.nivel);
  }, [value])

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Editar nível</DialogTitle>
          <DialogDescription>Digite um nome para o nível</DialogDescription>
        </DialogHeader>
        <div>
          <Label htmlFor="name" className="text-right">
            Nome
          </Label>
          <Input
            data-testid="edit-nivel-input"
            id="name"
            defaultValue={value.nivel}
            className="mt-2"
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <DialogFooter>
          <Button data-testid="edit-submit" type="submit" onClick={() => onEditNivel(name, value.id)}>
            {loading ? "Carregando..." : "Editar nível"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditNivelDialog;
