import React from "react";

import * as T from "../../../components/Table/style";
import { Table } from "../../../components/Table";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal } from "../../../components/Modal";

import { MdOutlineFilterList, MdOutlineFilterListOff } from "react-icons/md";
import { HiEye, HiPencilAlt, HiTrash } from "react-icons/hi";
import useClients from "../../../hooks/useClients";
import { Title } from "../../../components/Texts/Title";
import { Text } from "../../../components/Texts/Text";
import { debounce } from "../../../utils/debounce";

export const ClientTable = () => {
  // Estados de Interação
  const [fetchStatus, setFetchStatus] = React.useState(true);
  const [selectedItem, setSelectedItem] = React.useState("active");

  // Estados de controle
  const { getClients, deleteClient, getClientByID, isLoading } = useClients();
  const [clients, setClients] = React.useState([]);
  const [searchClients, setSearchClients] = React.useState([]);
  const [search, setSearch] = React.useState("");
  const [page, setPage] = React.useState(1);
  const navigate = useNavigate();

  // Funções para buscar clientes
  const fetchClients = async () => {
    try {
      const data = await getClients(
        `?status=${fetchStatus}&page=${page}&limit=10`
      );

      setClients((prev) => {
        const existingIds = prev.map((client) => client.id);
        const newData = data.filter(
          (client) => !existingIds.includes(client.id)
        );
        return [...prev, ...newData];
      });
    } catch (error) {
      toast.error("Erro na busca de clientes.");
      console.error("Erro na busca de clientes:", error);
    }
  };

  const fetchClientsBySearch = React.useCallback(
    debounce(async () => {
      try {
        const data = await getClients(
          `filtragem/?status=${fetchStatus}&value=${search}`
        );
        setSearchClients(data);
      } catch (error) {
        toast.error("Erro na busca filtrada de clientes.");
        console.error("Erro na busca filtrada de clientes:", error);
      }
    }, 500),
    [search, fetchStatus]
  );

  React.useEffect(() => {
    if (search) {
      setPage(1);
      fetchClientsBySearch();
      return;
    }
    setSearchClients([]);
    fetchClients();
  }, [search, page, fetchStatus]);

  // Alternar status entre "Ativo" e "Inativo"
  const toggleStatus = async (id) => {
    const client = clients.find((c) => c.id === id);
    const newStatus = client.status === "Ativo" ? "Inativo" : "Ativo";

    try {
      await axios.patch(`/api/clients/${id}`, { status: newStatus });
      setClients((prev) =>
        prev.map((c) => (c.id === id ? { ...c, status: newStatus } : c))
      );
      toast.success("Status atualizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao atualizar status.");
      console.error("Erro ao alternar status:", error);
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esse cadastro?"
    );
    if (confirmDelete) {
      try {
        await deleteClient(id);
        setClients((prev) => prev.filter((client) => client.id !== id));
        toast.success("Cliente excluído com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir cliente.");
        console.error("Erro ao deletar cliente:", error);
      }
    }
  };

  const handleEdit = async (row) => {
    try {
      const clientResponse = await getClientByID(row.original.id);
      console.log(clientResponse);

      const clientResponseMap = clientFormMap(clientResponse);

      navigate("/cadastrar/cliente/editar", {
        state: { data: clientResponseMap },
      });
    } catch (error) {
      console.error("Erro ao buscar cliente:", error.message);
      alert("Não foi possível carregar os dados do cliente.");
    }
  };

  const handleView = async (e, row) => {
    console.log(e.currentTarget.dataset);

    try {
      const clientResponse = await getClientByID(row.original.id);

      const clientResponseMap = clientFormMap(clientResponse);

      navigate("/cadastrar/cliente/visualizar", {
        state: { data: clientResponseMap },
      });
    } catch (error) {
      console.error("Erro ao buscar cliente:", error.message);
    }
  };

  // Função responsável por enviar os dados para o formulário de update
  const clientFormMap = (clientResponse) => {
    const clientResponseMap = {
      imagens: [],
      cliente: {
        corporate_reason: clientResponse?.corporate_reason,
        fantasy_name: clientResponse?.fantasy_name,
        cnpj: clientResponse?.cnpj,
        state_registration: clientResponse?.state_registration,
        type_contribuition: clientResponse?.type_contribuition,
        branch_activity: clientResponse?.branch_activity,
        image_company: clientResponse?.image_company,
      },
      endereco_empresa: {
        cep: clientResponse.company_address[0].cep,
        street: clientResponse.company_address[0].street,
        number: clientResponse.company_address[0].number,
        complement: clientResponse.company_address[0].complement,
        city: clientResponse.company_address[0].city,
        neighborhood: clientResponse.company_address[0].neighborhood,
      },
      endereco_entrega: {
        cep: clientResponse.delivery_address[0].cep,
        street: clientResponse.delivery_address[0].street,
        number: clientResponse.delivery_address[0].number,
        complement: clientResponse.delivery_address[0].complement,
        city: clientResponse.delivery_address[0].city,
        neighborhood: clientResponse.delivery_address[0].neighborhood,
      },
      financeiro: {
        name: clientResponse.financinal_contact[0]?.name,
        phone: clientResponse.financinal_contact[0]?.phone,
        cell_phone: clientResponse.financinal_contact[0]?.cell_phone,
        rg: clientResponse.financinal_contact[0]?.rg,
        email: clientResponse.financinal_contact[0]?.email,
        cpf: clientResponse.financinal_contact[0]?.cpf,
        image: clientResponse.financinal_contact[0]?.image,
      },
      comercial: {
        name: clientResponse.commercial_contact[0]?.name,
        phone: clientResponse.commercial_contact[0]?.phone,
        cell_phone: clientResponse.commercial_contact[0]?.cell_phone,
        rg: clientResponse.commercial_contact[0]?.rg,
        email: clientResponse.commercial_contact[0]?.email,
        cpf: clientResponse.commercial_contact[0]?.cpf,
        image: clientResponse.commercial_contact[0]?.image,
      },
      contabil: {
        name: clientResponse.accounting_contact[0]?.name,
        phone: clientResponse.accounting_contact[0]?.phone,
        cell_phone: clientResponse.accounting_contact[0]?.cell_phone,
        rg: clientResponse.accounting_contact[0]?.rg,
        email: clientResponse.accounting_contact[0]?.email,
        cpf: clientResponse.accounting_contact[0]?.cpf,
        image: clientResponse.accounting_contact[0]?.image,
      },
      socio: {
        name: clientResponse.owner_partner[0]?.name,
        phone: clientResponse.owner_partner[0]?.phone,
        cell_phone: clientResponse.owner_partner[0]?.cell_phone,
        rg: clientResponse.owner_partner[0]?.rg,
        email: clientResponse.owner_partner[0]?.email,
        cpf: clientResponse.owner_partner[0]?.cpf,
        image: clientResponse.owner_partner[0]?.image,
      },
    };

    const photosResponseMap = {
      file1: {
        file: clientResponse.image_company,
        status: clientResponse.image_company ? false : false,
      },
      file2: {
        file: clientResponse.owner_partner[0]?.image,
        status: clientResponse.owner_partner[0]?.image ? false : false,
      },
      file3: {
        file: clientResponse.commercial_contact[0]?.image,
        status: clientResponse.commercial_contact[0]?.image ? false : false,
      },
      file4: {
        file: clientResponse.financinal_contact[0]?.image,
        status: clientResponse.financinal_contact[0]?.image ? false : false,
      },
      file5: {
        file: clientResponse.accounting_contact[0]?.image,
        status: clientResponse.accounting_contact[0]?.image ? false : false,
      },
    };

    const id = clientResponse?.id;

    return { clientResponseMap, photosResponseMap, id };
  };

  // Configurações da coluna
  const columns = React.useMemo(
    () => [
      // { accessorKey: "corporate_reason", header: "Nome da empresa" },
      { accessorKey: "fantasy_name", header: "Nome da empresa" },
      { accessorKey: "branch_activity", header: "Ramo", size: 60 },
      { accessorKey: "name", header: "Contato" },

      { accessorKey: "phone", header: "Telefone" },

      {
        header: "Opções",
        size: 30,
        cell: (props) => (
          <T.IconContainer>
            <HiEye
              className="icon"
              data-target="view"
              onClick={(e) => handleView(e, props.row)}
            />

            <HiTrash
              className="icon"
              onClick={() => handleDelete(props.row.original.id)}
            />
            <HiPencilAlt
              className="icon"
              onClick={() => handleEdit(props.row)}
            />
          </T.IconContainer>
        ),
      },
    ],
    []
  );

  const filterModalItens = [
    {
      id: 1,
      icon: <MdOutlineFilterListOff />,
      text: "Limpar Filtros",
      value: "clear",
      query: "",
    },
    {
      id: 2,
      icon: <MdOutlineFilterList />,
      text: "Filtrar por ativos",
      value: "active",
      query: "true",
    },
    {
      id: 3,
      icon: <MdOutlineFilterList />,
      text: "Filtrar por Inativos",
      value: "inactive",
      query: "false",
    },
  ];

  return (
    <Table
      columns={columns}
      data={searchClients.length > 0 ? searchClients : clients}
      isLoading={isLoading}
      setPage={setPage}
      page={page}
      setSearch={setSearch}
      search={search}
      filterModal={
        <Modal
          setSelectedItem={setSelectedItem}
          selectedItem={selectedItem}
          setFetchStatus={setFetchStatus}
          filterModalItens={filterModalItens}
        />
      }
      title={
        <>
          <Title bold="bold" variant="small">
            Meus Clientes
          </Title>

          <Text>
            <NavLink to="/cadastrar/cliente/novo">Cadastrar novo</NavLink>
          </Text>
        </>
      }
    />
  );
};
