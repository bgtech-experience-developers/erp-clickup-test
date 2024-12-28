import { FormsField } from "../../../components/Forms/FormsField";
import { Input } from "../../../components/Forms/Inputs/Input";
import { Card } from "../../../components/Forms/Card";
import { Form } from "../../../components/Forms/Form";
import { FileInput } from "../../../components/Forms/Inputs/File";
import { Button } from "../../../components/Forms/Button";
import { useEffect, useState } from "react";
import useForm from "../../../hooks/useForm";
import { SpanError } from "../style";
import { useLocation } from "react-router-dom";

export const RegisterSupplierPF = () => {
  const { state } = useLocation();

  const { mask, onBlur, removeErrorOnChange, error } = useForm();
  const [formValues, setFormValues] = useState({
    supplier_name: "",
    email: "",
    phone: "",
    rg: "",
    cpf: "",
    birth_date: "",
    address: {
      street: "",
      number: "",
      cep: "",
      complement: "",
      neighborhood: "",
      city: "",
      state: "",
    },

    supplier_imagem: "",
  });

  const [title, setTitle] = useState("Cadastrar Fornecedor");
  const [button, setButton] = useState("Cadastrar");

  useEffect(() => {
    if (state?.supplier) {
      setFormValues(state.supplier);
      setTitle("Editar Fornecedor");
      setButton("Atualizar cadastro");
    } else {
      setTitle("Cadastrar Fornecedor");
      setButton("Cadastrar");
    }
  }, [state]);

  const [errorImage, setErrorImage] = useState(false);

  function handleImage({ target }) {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const file = target.files[0];
    const id = target.id;

    if (!allowedTypes.includes(file.type)) {
      setErrorImage(true);
      setTimeout(() => {
        setErrorImage(false);
      }, 2000);
      return;
    }
    console.log(id);

    setFormValues({ ...formValues, fotos: file });
  }

  const handleInputChange = (field) => (event) => {
    const { name, value } = event.target;

    removeErrorOnChange(name);

    setFormValues({
      ...formValues,
      [field]: {
        ...formValues[field],
        [name]: mask(name, value),
      },
    });
  };

  function handleRemove() {
    setFormValues({
      ...formValues,
      fotos: "",
    });
  }

  return (
    <Form title={title}>
      <Card>
        <FormsField variant="file" align="flex-end">
          <FormsField>
            <Input
              name="name"
              id="supplier_name"
              height="4.8rem"
              value={formValues.supplier_name}
              onChange={handleInputChange("supplier")}
              onBlur={onBlur}
            >
              Nome do fornecedor *
              {error.name && <SpanError>{error.name}</SpanError>}
            </Input>

            <Input
              id="email"
              name="email"
              value={formValues.email}
              onChange={handleInputChange("supplier")}
              onBlur={onBlur}
              height="4.8rem"
              type="email"
            >
              Email
              {error.email && <SpanError>{error.email}</SpanError>}
            </Input>
          </FormsField>
          <FileInput
            id={"fotoProduto"}
            error={errorImage}
            image={formValues.supplier_imagem}
            handleRemove={handleRemove}
            onChange={handleImage}
            variant="secondary"
            text="Foto do Produto"
            smileSize={55}
          />
        </FormsField>

        <Input
          id="cell_phone"
          name="cell_phone"
          value={formValues.cell_phone}
          onChange={handleInputChange("supplier")}
          onBlur={onBlur}
          height="4.8rem"
        >
          Telefone
          {error.cell_phone && <SpanError>{error.cell_phone}</SpanError>}
        </Input>

        <FormsField variant="triple">
          <Input
            id="rg"
            name="rg"
            value={formValues.rg}
            onChange={handleInputChange("supplier")}
            onBlur={onBlur}
            height="4.8rem"
          >
            RG
            {error.rg && <SpanError>{error.rg}</SpanError>}
          </Input>
          <Input
            id="cpf"
            name="cpf"
            value={formValues.cpf}
            onChange={handleInputChange("supplier")}
            onBlur={onBlur}
            height="4.8rem"
          >
            CPF *{error.cpf && <SpanError>{error.cpf}</SpanError>}
          </Input>
          <Input
            id="date_of_birth"
            name="date_of_birth"
            value={formValues.birth_date}
            onChange={handleInputChange("supplier")}
            height="4.8rem"
            type="date"
          >
            Data de nascimento
          </Input>
        </FormsField>
      </Card>

      <Card title="Endereço do fornecedor">
        <FormsField variant="triple">
          <Input
            id="street"
            name="street"
            value={formValues.address.street}
            onChange={handleInputChange("address")}
            onBlur={onBlur}
            height="4.8rem"
          >
            Logradouro
            {error.street && <SpanError>{error.street}</SpanError>}
          </Input>
          <Input
            id="number"
            name="number"
            value={formValues.address.number}
            onChange={handleInputChange("address")}
            onBlur={onBlur}
            height="4.8rem"
          >
            Número
            {error.number && <SpanError>{error.number}</SpanError>}
          </Input>
          <Input
            id="cep"
            name="cep"
            value={formValues.address.cep}
            onChange={handleInputChange("address")}
            onBlur={onBlur}
            height="4.8rem"
          >
            CEP
            {error.cep && <SpanError>{error.cep}</SpanError>}
          </Input>
        </FormsField>

        <Input
          id="complement"
          name="complement"
          value={formValues.address.complement}
          onChange={handleInputChange("address")}
          height="4.8rem"
        >
          Complemento
        </Input>

        <FormsField variant="double">
          <Input
            id="neighborhood"
            name="neighborhood"
            value={formValues.address.neighborhood}
            onChange={handleInputChange("address")}
            onBlur={onBlur}
            height="4.8rem"
          >
            Bairro
            {error.neighborhood && <SpanError>{error.neighborhood}</SpanError>}
          </Input>

          <Input
            id="city"
            name="city"
            value={formValues.address.city}
            onChange={handleInputChange("address")}
            onBlur={onBlur}
            height="4.8rem"
          >
            Cidade
            {error.city && <SpanError>{error.city}</SpanError>}
          </Input>
        </FormsField>

        <Input
          id="state"
          name="state"
          value={formValues.address.state}
          onChange={handleInputChange("address")}
          height="4.8rem"
        >
          Estado
        </Input>
      </Card>
      <Card>
        <Button type="submit" height="4.8rem">
          {button}
        </Button>
      </Card>
    </Form>
  );
};

export const RegisterSupplierPJ = () => {
  const { state } = useLocation();
  const [mask, onBlur, onChange, error] = useForm();
  const [formValues, setFormValues] = useState({
    fotos: "",
    supplier: {
      corporate_reason: "",
      fantasy_name: "",
      responsible: "",
      cnpj: "",
      state_registration: "",
      suframa_inscription: "",
      municipal_registration: "",
      email: "",
      phone: "",
      taxpayer_type: "",
    },
    address: {
      cep: "",
      street: "",
      number: "",
      complement: "",
      city: "",
      neighborhood: "",
      state: "",
    },
  });

  const [title, setTitle] = useState("Cadastrar Fornecedor");
  const [button, setButton] = useState("Cadastrar");

  useEffect(() => {
    if (state?.supplier) {
      setFormValues(state.supplier);
      setTitle("Editar Fornecedor");
      setButton("Atualizar cadastro");
    } else {
      setTitle("Cadastrar Fornecedor");
      setButton("Cadastrar");
    }
  }, [state]);

  const [errorImage, setErrorImage] = useState(false);

  function handleImage({ target }) {
    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    const file = target.files[0];
    const id = target.id;

    if (!allowedTypes.includes(file.type)) {
      setErrorImage(true);
      setTimeout(() => {
        setErrorImage(false);
      }, 2000);
      return;
    }

    setFormValues({ ...formValues, fotos: file });
  }

  const handleInputChange = (field) => (event) => {
    const { id, name, value } = event.target;
    onChange(name);
    setFormValues({
      ...formValues,
      [field]: {
        ...formValues[field],
        [name]: mask(name, value),
      },
    });
  };

  function handleRemove() {
    setFormValues({
      ...formValues,
      fotos: "",
    });
  }

  return (
    <Form title={title}>
      <Card>
        <FormsField variant="file" align="flex-end">
          <FormsField>
            <Input
              id="corporate_reason"
              name="corporate_reason"
              value={formValues.supplier.corporate_reason}
              onChange={handleInputChange("supplier")}
              onBlur={onBlur}
              height="4.8rem"
            >
              Razão social *
              {error.corporate_reason && (
                <SpanError>{error.corporate_reason}</SpanError>
              )}
            </Input>
            <Input
              id="fantasy_name"
              name="fantasy_name"
              value={formValues.supplier.fantasy_name}
              onChange={handleInputChange("supplier")}
              onBlur={onBlur}
              height="4.8rem"
            >
              Nome fantasia
              {/* {error.fantasy_name && (
                <SpanError>{error.fantasy_name}</SpanError>
              )} */}
            </Input>
          </FormsField>
          <FileInput
            id={"fotoProduto"}
            error={errorImage}
            image={formValues.fotos}
            handleRemove={handleRemove}
            onChange={handleImage}
            variant="secondary"
            text="Foto do Produto"
            smileSize={55}
          />
        </FormsField>

        <Input
          id="responsible"
          name="responsible"
          value={formValues.supplier.responsible}
          onChange={handleInputChange("supplier")}
          onBlur={onBlur}
          height="4.8rem"
        >
          Responsável
          {/* {error.responsible && <SpanError>{error.responsible}</SpanError>} */}
        </Input>

        <Input
          id="cnpj"
          name="cnpj"
          value={formValues.supplier.cnpj}
          onChange={handleInputChange("supplier")}
          onBlur={onBlur}
          height="4.8rem"
        >
          CNPJ *{error.cnpj && <SpanError>{error.cnpj}</SpanError>}
        </Input>

        <FormsField variant="triple">
          <Input
            id="state_registration"
            name="state_registration"
            value={formValues.supplier.state_registration}
            onChange={handleInputChange("supplier")}
            height="4.8rem"
          >
            Inscrição estadual
          </Input>

          <Input
            id="suframa_inscription"
            name="suframa_inscription"
            value={formValues.supplier.suframa_inscription}
            onChange={handleInputChange("supplier")}
            height="4.8rem"
          >
            Inscrição SUFRAMA
          </Input>

          <Input
            id="municipal_registration"
            name="municipal_registration"
            value={formValues.supplier.municipal_registration}
            onChange={handleInputChange("supplier")}
            height="4.8rem"
          >
            Inscrição municipal
          </Input>
        </FormsField>

        <FormsField variant="double">
          <Input
            id="email"
            name="email"
            value={formValues.supplier.email}
            onChange={handleInputChange("supplier")}
            onBlur={onBlur}
            height="4.8rem"
          >
            Email
            {/* {error.price && <SpanError>{error.price}</SpanError>} */}
          </Input>
          <Input
            id="phone"
            name="phone"
            value={formValues.supplier.phone}
            onChange={handleInputChange("supplier")}
            height="4.8rem"
          >
            Telefone
          </Input>
        </FormsField>

        <Input
          id="taxpayer_type"
          name="taxpayer_type"
          value={formValues.supplier.taxpayer_type}
          onChange={handleInputChange("supplier")}
          height="4.8rem"
        >
          Tipo de contribuinte
        </Input>
      </Card>

      <Card title="Endereço do fornecedor">
        <FormsField variant="triple">
          <Input
            id="street"
            name="street"
            value={formValues.address.street}
            onChange={handleInputChange("address")}
            onBlur={onBlur}
            height="4.8rem"
          >
            Logradouro
            {error.street && <SpanError>{error.street}</SpanError>}
          </Input>
          <Input
            id="number"
            name="number"
            value={formValues.address.number}
            onChange={handleInputChange("address")}
            onBlur={onBlur}
            height="4.8rem"
          >
            Número
            {error.number && <SpanError>{error.number}</SpanError>}
          </Input>
          <Input
            id="cep"
            name="cep"
            value={formValues.address.cep}
            onChange={handleInputChange("address")}
            onBlur={onBlur}
            height="4.8rem"
          >
            CEP
            {error.cep && <SpanError>{error.cep}</SpanError>}
          </Input>
        </FormsField>

        <Input
          id="complement"
          name="complement"
          value={formValues.address.complement}
          onChange={handleInputChange("address")}
          height="4.8rem"
        >
          Complemento
        </Input>

        <FormsField variant="double">
          <Input
            id="neighborhood"
            name="neighborhood"
            value={formValues.address.neighborhood}
            onChange={handleInputChange("address")}
            onBlur={onBlur}
            height="4.8rem"
          >
            Bairro
            {error.neighborhood && <SpanError>{error.neighborhood}</SpanError>}
          </Input>
          <Input
            id="city"
            name="city"
            value={formValues.address.city}
            onChange={handleInputChange("address")}
            onBlur={onBlur}
            height="4.8rem"
          >
            Cidade
            {error.city && <SpanError>{error.city}</SpanError>}
          </Input>
        </FormsField>

        <Input
          id="state"
          name="state"
          value={formValues.address.state}
          onChange={handleInputChange("address")}
          height="4.8rem"
        >
          Estado
        </Input>
      </Card>

      <Card>
        <Button type="submit" height="4.8rem">
          {button}
        </Button>
      </Card>
    </Form>
  );
};
