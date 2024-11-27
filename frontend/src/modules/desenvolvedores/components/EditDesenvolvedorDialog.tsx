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
import { Desenvolvedor, UpdateDesenvolvedorDTO } from "../types";
import { Nivel } from "@/modules/niveis/types";
import axios from "axios";
import { useToast } from "@/hooks/use-toast";

interface EditDesenvolvedorDialogProps {
  open: boolean;
  loading: boolean;
  onEditDev: (data: UpdateDesenvolvedorDTO) => void;
  onClose: () => void;
  value: Desenvolvedor;
}

const EditDesenvolvedorDialog = ({
  open,
  loading,
  onEditDev,
  onClose,
  value,
}: EditDesenvolvedorDialogProps) => {
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
        if (!value.nivel) {
          setNivel(response.data[0].id.toString());
        }
      } catch (error: unknown) {
        toast({
          title: error.response.data.error,
          variant: "destructive",
        });
      } finally {
        setLoadingNiveis(false);
      }
    }
  }, [toast, open, value.nivel]);

  useEffect(() => {
    getNiveis();
    setName(value.nome);
    setSex(value.sexo);
    setBirthday(value.data_nascimento);
    setAge(value.idade.toString());
    setHobby(value.hobby);
    setNivel(value.nivel.id.toString());
  }, [getNiveis, value]);

  return (
    <Dialog open={open} onOpenChange={onClose}>
      {loadingNiveis ? (
        <DialogContent>
          <div>Carregando...</div>
        </DialogContent>
      ) : (
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Editar desenvolvedor</DialogTitle>
            <DialogDescription>
              Altere os dados para editar um desenvolvedor
            </DialogDescription>
          </DialogHeader>

          <div>
            <Label htmlFor="name" className="text-right">
              Nome
            </Label>
            <Input
              data-testid="edit-dev-name-input"
              id="name"
              placeholder="Digite um nome..."
              defaultValue={value.nome}
              className="mt-2"
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="name" className="text-right">
              Sexo
            </Label>
            <div className="mt-2">
              <Select
                onValueChange={(e) => setSex(e)}
                defaultValue={value.sexo}
              >
                <SelectTrigger className="w-[180px]">
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
              id="birthday"
              type="date"
              placeholder="Digite uma data de nascimento..."
              defaultValue={new Date(value.data_nascimento)
                .toISOString()
                .substring(0, 10)}
              className="mt-2"
              onChange={(e) => setBirthday(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="age" className="text-right">
              Idade
            </Label>
            <Input
              id="age"
              type="number"
              placeholder="Digite uma idade..."
              defaultValue={value.idade}
              className="mt-2"
              onChange={(e) => setAge(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="hobby" className="text-right">
              Hobby
            </Label>
            <Input
              id="hobby"
              placeholder="Digite um hobby..."
              defaultValue={value.hobby}
              className="mt-2"
              onChange={(e) => setHobby(e.target.value)}
            />
          </div>
          <div>
            <Label htmlFor="name" className="text-right">
              Nível
            </Label>
            <div className="mt-2">
              <Select onValueChange={(e) => setNivel(e)} defaultValue={nivel}>
                <SelectTrigger className="w-[180px]">
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
              data-testid="edit-submit"
              type="submit"
              onClick={() =>
                onEditDev({
                  nome: name,
                  sexo: sex,
                  data_nascimento: birthday,
                  idade: +age,
                  hobby,
                  nivel_id: +nivel
                })
              }
            >
              {loading ? "Carregando..." : "Editar desenvolvedor"}
            </Button>
          </DialogFooter>
        </DialogContent>
      )}
    </Dialog>
  );
};

export default EditDesenvolvedorDialog;
