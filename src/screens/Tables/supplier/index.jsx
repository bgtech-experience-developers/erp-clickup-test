import React from "react";
// Internos
import * as T from "../../../components/Table/style";
import useSupplierPf from "../../../hooks/useSupplierPf";
import useSupplierPj from "../../../hooks/useSupplierPj";
import { Table } from "../../../components/Table";
import { Modal } from "../../../components/Modal";
import { Title } from "../../../components/Texts/Title";
import { Text } from "../../../components/Texts/Text";
//Externos
import { NavLink, useNavigate } from "react-router-dom";
import { HiEye, HiPencilAlt, HiTrash } from "react-icons/hi";
import { MdOutlineFilterList, MdOutlineFilterListOff } from "react-icons/md";

export const PfSupplierTable = () => {
  // Estados de interação
  const [selectedItem, setSelectedItem] = React.useState("active");
  const [isLoading, setIsLoading] = React.useState(false);
  const [fetchStatus, setFetchStatus] = React.useState(true);

  // Estados de controle
  const [supplierPF, setSupplierPF] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const { getSupplierPf, deleteSupplierPf, getSupplierPfById } =
    useSupplierPf();
  const navigate = useNavigate();

  // Função para buscar todos os fornecedores pessoa física
  const fetchSupplierPF = async () => {
    setIsLoading(true);
    try {
      const data = await getSupplierPf(`?page=${page}`);

      setSupplierPF((prev) => {
        const existingIds = prev.map((supplier) => supplier.id);
        const newData = data.filter(
          (supplier) => !existingIds.includes(supplier.id)
        );

        return [...prev, ...newData];
      });
    } catch (error) {
      toast.error("Erro na busca de fornecedores.");
      console.error("Erro na busca de fornecedores: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  React.useEffect(() => {
    fetchSupplierPF();
  }, [page]);

  //? Ârea funcional
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esse cadastro?"
    );
    if (confirmDelete) {
      try {
        await deleteSupplierPf(id);
        setSupplierPF((prev) => prev.filter((supplier) => supplier.id !== id));
        toast.success("Fornecedor excluído com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir o fornecedor.");
        console.error("Erro ao deletar fornecedor:", error);
      }
    }
  };

  const handleEdit = async (row) => {
    try {
      const data = await getSupplierPfById(row.original.id);
      const supplierResponse = supplierFormMap(data);
      // navigate("/cadastrar/fornecedor/pessoa/fisica/editar", {
      //   state: { clients: row.original },
      // });
    } catch (error) {
      console.error("Erro ao buscar fornecedor:", error.message);
    }
  };

  // Lógica de enviar os dados para outros componentes
  const supplierFormMap = (supplierResponse) => {
    console.log(supplierResponse);

    const supplierResponseMap = {};
  };

  const columns = React.useMemo(() => [
    { accessorKey: "supplier_name", header: "Nome do fornecedor", size: 200 },
    // { header: "Produto", accessorKey: "product_supplier_pf", size: 50 },
    { accessorKey: "email", header: "Email", size: 200 },
    { accessorKey: "phone", header: "Telefone", size: 100 },
    {
      header: "Opções",
      cell: (props) => (
        <T.IconContainer>
          {/* Trocar rota */}
          <NavLink to={"/home"}>
            <HiEye className="icon" />
          </NavLink>
          <HiTrash
            className="icon"
            onClick={() => handleDelete(props.row.original.id)}
          />
          <HiPencilAlt className="icon" onClick={() => handleEdit(props.row)} />
        </T.IconContainer>
      ),
    },
  ]);

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
      data={supplierPF}
      setPage={setPage}
      page={page}
      isLoading={isLoading}
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
            Meus fornecedores - pessoa física
          </Title>

          <Text>
            <NavLink to="/cadastrar/fornecedor/pessoa/fisica/novo">
              Cadastrar novo
            </NavLink>
          </Text>
        </>
      }
    />
  );
};

export const PjSupplierTable = () => {
  // Estados de interação
  const [selectedItem, setSelectedItem] = React.useState("active");
  const [isLoading, setIsLoading] = React.useState(false);
  const [fetchStatus, setFetchStatus] = React.useState(true);

  // Estados de controile
  const [supplierPj, setSupplierPj] = React.useState([]);
  const { getSupplierPj, deleteSupplierPj } = useSupplierPj();
  const navigate = useNavigate();

  const fetchSupplierPj = async () => {
    setIsLoading(true);
    try {
      const data = await getSupplierPj();

      setSupplierPj(data);
    } catch (error) {
      toast.error("Erro ao buscar fornecedores.");
      console.error("Erro na busca de fornecedores: ", error);
    } finally {
      setIsLoading(false);
    }
  };
  // useEffect para carregar os cadastros

  React.useEffect(() => {
    fetchSupplierPj();
  }, []);

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir esse cadastro?"
    );
    if (confirmDelete) {
      try {
        await deleteSupplierPj(id);
        setClients((prev) => prev.filter((client) => client.id !== id));
        toast.success("Cliente excluído com sucesso!");
      } catch (error) {
        toast.error("Erro ao excluir o fornecedor.");
        console.error("Erro ao deletar fornecedor:", error);
      }
    }
  };

  const handleEdit = (row) => {
    navigate("/cadastrar/fornecedor/pessoa/juridica/editar", {
      state: { clients: row.original },
    });
  };

  // Atualizar accessorKey de acordo com os dados do backend
  const columns = React.useMemo(
    () => [
      { header: "Nome", accessorKey: "nome" },
      { header: "Email", accessorKey: "email" },
      { header: "RG", accessorKey: "rg" },
      { header: "CPF", accessorKey: "cpf" },
      { header: "Nascimento", accessorKey: "nascimento" },
      { header: "Tipo", accessorKey: "tipo" },
      { header: "Situação", accessorKey: "situacao" },
      { header: "CEP", accessorKey: "cep" },
      { header: "Logradouro", accessorKey: "logradouro" },
      { header: "Número", accessorKey: "numero" },
      { header: "Bairro", accessorKey: "bairro" },
      { header: "Cidade", accessorKey: "cidade" },
      { header: "Telefone", accessorKey: "telefone" },
      { header: "Celular", accessorKey: "celular" },
      {
        header: "Opções",
        cell: (props) => (
          <T.IconContainer>
            {/* Trocar rota */}
            <NavLink to={"/home"}>
              <HiEye className="icon" />
            </NavLink>
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
      data={supplierPj}
      isLoading={isLoading}
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
            Meus fornecedores - pessoa jurídica
          </Title>

          <Text>
            <NavLink to="/cadastrar/fornecedor/pessoa/juridica/novo">
              Cadastrar novo
            </NavLink>
          </Text>
        </>
      }
    />
  );
};
