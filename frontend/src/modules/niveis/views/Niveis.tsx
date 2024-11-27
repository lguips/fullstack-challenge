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
import AddNivelDialog from "../components/AddNivelDialog";
import { useToast } from "@/hooks/use-toast";
import RemoveNivelDialog from "../components/RemoveNivelDialog";
import EditNivelDialog from "../components/EditNivelDialog";
import { Nivel } from "../types";

const defaultNivelData = {
  id: -1,
  nivel: "any_nivel",
  associatedDevs: 0,
};

const Niveis = () => {
  const [data, setData] = useState<Nivel[]>([]);
  const [loading, setLoading] = useState(false);
  const [showAddNivelDialog, setShowAddNivelDialog] = useState(false);
  const [showRemoveNivelDialog, setShowRemoveNivelDialog] = useState(false);
  const [showEditNivelDialog, setShowEditNivelDialog] = useState(false);
  const [currentActionNivel, setCurrentActionNivel] =
    useState<Nivel>(defaultNivelData);

  const { toast } = useToast();

  const getNiveis = useCallback(async () => {
    try {
      setLoading(true);
      const response = await axios.get("http://localhost:3333/niveis");
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

  async function onAddNivel(name: string) {
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:3333/niveis", {
        nivel: name,
      });
      setData([...data, { ...response.data, associatedDevs: 0 }]);
      setShowAddNivelDialog(false);
      toast({
        title: "Nível adicionado com sucesso",
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

  async function onEditNivel(name: string, id: number) {
    try {
      setLoading(true);
      const response = await axios.put(`http://localhost:3333/niveis/${id}`, {
        nivel: name,
      });
      const updatedData = data.map((nivel) => {
        if (nivel.id === id) nivel.nivel = response.data.nivel;
        return nivel;
      });
      setData(updatedData);
      setShowEditNivelDialog(false);
      toast({
        title: "Nível editado com sucesso",
      });
      setCurrentActionNivel(defaultNivelData);
    } catch (error: unknown) {
      toast({
        title: error.response.data.error,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  async function onRemoveNivel() {
    try {
      setLoading(true);
      await axios.delete(
        `http://localhost:3333/niveis/${currentActionNivel.id}`
      );
      const updatedData = data.filter(
        (nivel) => nivel.id != currentActionNivel.id
      );
      setData(updatedData);
      setShowRemoveNivelDialog(false);
      toast({
        title: "Nível removido com sucesso",
      });
      setCurrentActionNivel(defaultNivelData);
    } catch (error: unknown) {
      toast({
        title: error.response.data.error,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }

  function handleRemoveDialog(nivel: Nivel) {
    setCurrentActionNivel(nivel);
    setShowRemoveNivelDialog(true);
  }

  function handleEditDialog(nivel: Nivel) {
    setCurrentActionNivel(nivel);
    setShowEditNivelDialog(true);
  }

  function sortById() {
    const sortedById = [...data].sort((a, b) => a.id - b.id);
    setData(sortedById);
  }

  function sortByNivel() {
    const sortedByNivel = [...data].sort((a, b) =>
      a.nivel.localeCompare(b.nivel)
    );
    setData(sortedByNivel);
  }

  useEffect(() => {
    getNiveis();
  }, [getNiveis]);

  if (loading) {
    return <div className="container mx-auto text-center">Carregando...</div>;
  }

  return (
    <>
      <AddNivelDialog
        onAddNivel={onAddNivel}
        open={showAddNivelDialog}
        loading={loading}
        onClose={() => setShowAddNivelDialog(false)}
      />
      <RemoveNivelDialog
        onRemove={onRemoveNivel}
        open={showRemoveNivelDialog}
        onClose={() => setShowRemoveNivelDialog(false)}
        loading={loading}
      />
      <EditNivelDialog
        onEditNivel={onEditNivel}
        open={showEditNivelDialog}
        loading={loading}
        onClose={() => setShowEditNivelDialog(false)}
        value={currentActionNivel}
      />
      <div className="container mx-auto">
        <Button data-testid="show-add-modal-button" onClick={() => setShowAddNivelDialog(true)}>
          Adicionar nível
        </Button>
        <div className="mt-4 mb-4">
          <Table>
            <TableCaption>Lista de níveis</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead
                  onClick={sortById}
                  className="w-[100px] hover:text-sky-400 hover:cursor-pointer"
                >
                  Id
                </TableHead>
                <TableHead
                  onClick={sortByNivel}
                  className="hover:text-sky-400 hover:cursor-pointer"
                >
                  Nivel
                </TableHead>
                <TableHead className="hover:text-sky-400 hover:cursor-pointer">
                  Desenvolvedores associados
                </TableHead>
                <TableHead className="w-[100px]">Editar</TableHead>
                <TableHead className="w-[100px]">Excluir</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.map((nivel) => (
                <TableRow key={nivel.id}>
                  <TableCell className="font-medium">{nivel.id}</TableCell>
                  <TableCell>{nivel.nivel}</TableCell>
                  <TableCell>
                    {nivel.associatedDevs === 0
                      ? "Nenhum"
                      : nivel.associatedDevs}
                  </TableCell>
                  <TableCell>
                    <Button data-testid="edit-button" onClick={() => handleEditDialog(nivel)}>
                      Editar
                    </Button>
                  </TableCell>
                  <TableCell>
                    <Button data-testid="remove-button" onClick={() => handleRemoveDialog(nivel)}>
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

export default Niveis;
