import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  CreateDesenvolvedorDTO,
  Desenvolvedor,
  UpdateDesenvolvedorDTO,
} from "../types";
import { useToast } from "@/hooks/use-toast";
import RemoveDesenvolvedorDialog from "../components/RemoveDesenvolvedorDialog";
import AddDesenvolvedorDialog from "../components/AddDesenvolvedorDialog";
import EditDesenvolvedorDialog from "../components/EditDesenvolvedorDialog";

const defaultDesenvolvedorData: Desenvolvedor = {
  id: 12,
  nome: "any_name",
  sexo: "M",
  data_nascimento: "1990-01-01",
  idade: -1,
  hobby: "any_hobby",
  nivel: {
    id: -1,
    nivel: "any_nivel",
  },
};

const Desenvolvedores = () => {
  const [data, setData] = useState<Desenvolvedor[]>([]);
  const [loading, setLoading] = useState(false);
  const [showRemoveDesenvolvedorDialog, setShowRemoveDesenvolvedorDialog] =
    useState(false);
  const [showAddDesenvolvedorDialog, setShowAddDesenvolvedorDialog] =
    useState(false);
  const [showEditDesenvolvedorDialog, setShowEditDesenvolvedorDialog] =
    useState(false);
  const [currentActionDesenvolvedor, setCurrentActionDesenvolvedor] =
    useState<Desenvolvedor>(defaultDesenvolvedorData);

  const { toast } = useToast();

  const getDesenvolvedores = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3333/desenvolvedores");
      setData(response.data);
    } catch (error: unknown) {
      toast({
        title: error.response.data.error,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  async function onRemoveDesenvolvedor() {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:3333/desenvolvedores/${currentActionDesenvolvedor.id}`
      );
      const updatedData = data.filter(
        (dev) => dev.id != currentActionDesenvolvedor.id
      );
      setData(updatedData);
      setShowRemoveDesenvolvedorDialog(false);
      toast({
        title: "Desenvolvedor removido com sucesso",
      });
      setCurrentActionDesenvolvedor(defaultDesenvolvedorData);
    } catch (error: unknown) {
      toast({
        title: error.response.data.error,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onAddDev(form: CreateDesenvolvedorDTO) {
    try {
      setLoading(true);
      const response = await axios.post(
        "http://localhost:3333/desenvolvedores",
        {
          nome: form.nome,
          sexo: form.sexo,
          data_nascimento: form.data_nascimento,
          idade: form.idade,
          hobby: form.hobby,
          nivel_id: form.nivel_id,
        }
      );
      setData([...data, { ...response.data }]);
      setShowAddDesenvolvedorDialog(false);
      toast({
        title: "Desenvolvedor adicionado com sucesso",
      });
    } catch (error: unknown) {
      toast({
        title: error.response.data.error,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onEditDev(form: UpdateDesenvolvedorDTO) {
    try {
      setLoading(true);
      const response = await axios.put<Desenvolvedor>(
        `http://localhost:3333/desenvolvedores/${currentActionDesenvolvedor.id}`,
        {
          nome: form.nome,
          sexo: form.sexo,
          data_nascimento: form.data_nascimento,
          idade: form.idade,
          hobby: form.hobby,
          nivel_id: form.nivel_id,
        }
      );
      const updatedData = data.map((dev) => {
        if (dev.id === currentActionDesenvolvedor.id) {
          dev.nome = response.data.nome;
          dev.sexo = response.data.sexo;
          dev.data_nascimento = response.data.data_nascimento;
          dev.idade = response.data.idade;
          dev.hobby = response.data.hobby;
          dev.nivel = {
            id: +response.data.nivel.id,
            nivel: response.data.nivel.nivel,
          };
        }
        return dev;
      });
      setData(updatedData);
      setShowEditDesenvolvedorDialog(false);
      toast({
        title: "Desenvolvedor editado com sucesso",
      });
      setCurrentActionDesenvolvedor(defaultDesenvolvedorData);
    } catch (error: unknown) {
      toast({
        title: error.response.data.error,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleEditDialog(dev: Desenvolvedor) {
    setCurrentActionDesenvolvedor(dev);
    setShowEditDesenvolvedorDialog(true);
  }

  function handleRemoveDialog(dev: Desenvolvedor) {
    setCurrentActionDesenvolvedor(dev);
    setShowRemoveDesenvolvedorDialog(true);
  }

  function sortById() {
    const sortedById = [...data].sort((a, b) => a.id - b.id);
    setData(sortedById);
  }

  function sortByName() {
    const sortedByName = [...data].sort((a, b) => a.nome.localeCompare(b.nome));
    setData(sortedByName);
  }

  useEffect(() => {
    getDesenvolvedores();
  }, [getDesenvolvedores]);

  if (loading)
    return <div className="container mx-auto text-center">Carregando...</div>;

  return (
    <>
      <AddDesenvolvedorDialog
        onAddDev={onAddDev}
        open={showAddDesenvolvedorDialog}
        loading={loading}
        onClose={() => setShowAddDesenvolvedorDialog(false)}
      />
      <RemoveDesenvolvedorDialog
        onRemove={onRemoveDesenvolvedor}
        open={showRemoveDesenvolvedorDialog}
        onClose={() => setShowRemoveDesenvolvedorDialog(false)}
        loading={loading}
      />
      <EditDesenvolvedorDialog
        onEditDev={onEditDev}
        open={showEditDesenvolvedorDialog}
        loading={loading}
        onClose={() => setShowEditDesenvolvedorDialog(false)}
        value={currentActionDesenvolvedor}
      />
      <div className="container mx-auto">
        <Button data-testid="show-add-modal-button" onClick={() => setShowAddDesenvolvedorDialog(true)}>
          Adicionar desenvolvedor
        </Button>
        <div className="mt-4 mb-4">
          <Table>
            <TableCaption>Lista de desenvolvedores</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead
                  onClick={sortById}
                  className="hover:text-sky-400 hover:cursor-pointer"
                >
                  Id
                </TableHead>
                <TableHead
                  onClick={sortByName}
                  className="w-[250px] hover:text-sky-400 hover:cursor-pointer"
                >
                  Nome
                </TableHead>
                <TableHead>Sexo</TableHead>
                <TableHead className="w-[200px]">Data de nascimento</TableHead>
                <TableHead>Idade</TableHead>
                <TableHead>Hobby</TableHead>
                <TableHead>Nivel</TableHead>
                <TableHead className="w-[100px]">Editar</TableHead>
                <TableHead className="w-[100px]">Excluir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((dev) => (
                <TableRow key={dev.id}>
                  <TableCell className="font-medium">{dev.id}</TableCell>
                  <TableCell>{dev.nome}</TableCell>
                  <TableCell>{dev.sexo}</TableCell>
                  <TableCell>
                    {new Date(dev.data_nascimento)
                      .toLocaleDateString('pt-BR', {timeZone: 'UTC'})}
                  </TableCell>
                  <TableCell>{dev.idade}</TableCell>
                  <TableCell>{dev.hobby}</TableCell>
                  <TableCell>{dev.nivel.nivel}</TableCell>
                  <TableCell>
                    <Button data-testid="edit-button" onClick={() => handleEditDialog(dev)}>
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button data-testid="remove-button" onClick={() => handleRemoveDialog(dev)}>
                      Excluir
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </>
  );
};

export default Desenvolvedores;
