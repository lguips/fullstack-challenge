import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCallback, useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import axios from "axios";
import { Nivel } from "@/modules/niveis/types";
import { CreateDesenvolvedorDTO } from "../types";

interface AddDesenvolvedorDialogProps {
  open: boolean;
  loading: boolean;
  onAddDev: (data: CreateDesenvolvedorDTO) => void;
  onClose: () => void;
}

const AddDesenvolvedorDialog = ({
  open,
  loading,
  onAddDev,
  onClose,
}: AddDesenvolvedorDialogProps) => {
  const [name, setName] = useState("");
  const [sex, setSex] = useState("M");
  const [birthday, setBirthday] = useState("");
  const [age, setAge] = useState("");
  const [hobby, setHobby] = useState("");
  const [nivel, setNivel] = useState("");
  const [loadingNiveis, setLoadingNiveis] = useState(false);
  const [niveis, setNiveis] = useState<Nivel[]>([]);

  const { toast } = useToast();

  const getNiveis = useCallback(async () => {
    if (open) {
      try {
        setLoadingNiveis(true);
        const response = await axios.get("http://localhost:3333/niveis");
        setNiveis(response.data);
        setNivel(response.data[0].id.toString());
      } catch (error: unknown) {
        toast({
          title: error.response.data.error,
          variant: "destructive",
        });
      } finally {
        setLoadingNiveis(false);
      }
    }
  }, [toast, open]);

  useEffect(() => {
    getNiveis();
  }, [getNiveis]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {loadingNiveis ? (
        <DialogContent>
          <div>Carregando...</div>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Adicionar desenvolvedor</DialogTitle>
            <DialogDescription>
              Complete as informações para cadastrar um desenvolvedor
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              data-testid="dev-input-name"
              id="name"
              placeholder="Digite um nome..."
              defaultValue={name}
              className="mt-2"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="sex" className="text-right">
              Sexo
            </Label>
            <div className="mt-2">
              <Select onValueChange={(e) => setSex(e)} defaultValue={sex}>
                <SelectTrigger aria-label="Sex" className="w-[180px]">
                  <SelectValue placeholder="Selecione o sexo" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    <SelectItem value="M">Masculino</SelectItem>
                    <SelectItem value="F">Feminino</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div>
            <Label htmlFor="birthday" className="text-right">
              Data de nascimento
            </Label>
            <Input
              data-testid="dev-input-birthday"
              id="birthday"
              type="date"
              placeholder="Digite uma data de nascimento..."
              defaultValue={birthday}
              className="mt-2"
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="age" className="text-right">
              Idade
            </Label>
            <Input
              data-testid="dev-input-age"
              id="age"
              type="number"
              placeholder="Digite uma idade..."
              defaultValue={age}
              className="mt-2"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hobby" className="text-right">
              Hobby
            </Label>
            <Input
              data-testid="dev-input-hobby"
              id="hobby"
              placeholder="Digite um hobby..."
              defaultValue={hobby}
              className="mt-2"
              onChange={(e) => setHobby(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="name" className="text-right">
              Nível
            </Label>
            <div className="mt-2">
              <Select data-testid="dev-input-nivel" onValueChange={(e) => setNivel(e)} defaultValue={nivel}>
                <SelectTrigger aria-label="Nivel" className="w-[180px]">
                  <SelectValue placeholder="Selecione o nível" />
                </SelectTrigger>
                <SelectContent>
                  <SelectGroup>
                    {niveis.map((nivel) => (
                      <SelectItem key={nivel.id} value={nivel.id?.toString()}>
                        {nivel.nivel}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>
          <DialogFooter>
            <Button
              type="submit"
              data-testid="add-dev-submit-button"
              onClick={() =>
                onAddDev({
                  nome: name,
                  sexo: sex,
                  data_nascimento: birthday,
                  idade: +age,
                  hobby,
                  nivel_id: +nivel,
                })
              }
            >
              {loading ? "Carregando..." : "Adicionar desenvolvedor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default AddDesenvolvedorDialog;
