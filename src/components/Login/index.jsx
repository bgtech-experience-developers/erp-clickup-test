import React from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import * as S from "./style";


import { _ContentWrapper } from "./style";
import { Form } from "../Forms/Form";
import { Card } from "../../components/Forms/Card";
import { Input } from "../../components/Forms/Inputs/Input";
import { Button } from "../../components/Forms/Button";
import { Text } from "../../components/Texts/Text";
// import { TbNavigationEast } from "react-icons/tb";

export const Login = () => {

  const [form, setForm] = React.useState({cnpj: '', password: ''});
  const navigate = useNavigate();
  const { isAuth, singIn } = React.useContext(AuthContext);



  function handleChanges( event ) {
    const { name, value } = event.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }))
  };

  function handleLogin(e) {
    e.preventDefault();
    console.log(form);
    if (!isAuth) {
      singIn(form);
    }
  }

  // React.useEffect(() => {
  //   console.log(isAuth);
  //   if (isAuth) {
  //     navigate("/*");
  //   }

  // }, [isAuth, navigate])

  React.useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (token) {
        navigate("/allusers")
    }
  }, [navigate])

  return (
    <>
      <S._ContentWrapper>
        <Card variant="form-container-login">
          <Form variant="secondary" onSubmit={handleLogin} >
            <S._DivWrapper>
              {/* <FormsField $variant="file"> */}

              <Input
                style={{
                  fontSize: "14px",
                  letterSpacing: "0px",
                }}
                variant="secondary"
                placeholder="CNPJ"
                type="text"
                name={"cnpj"}
                value={form.cnpj}
                onChange={handleChanges}
              >
                CNPJ
              </Input>
              <Input
                variant="secondary"
                placeholder="Senha"
                type="password"
                name={"password"}
                value={form.password}
                style={{
                  fontSize: "14px",
                  letterSpacing: "0px",
                }}
                onChange={handleChanges}
              >
                Senha
              </Input>
              {/* </FormsField> */}
            </S._DivWrapper>

            <S._DivWrapper $margin="1.4rem 0 0 0">
              {/* Me diga a diferença de 14 pixeis para 16 bea, me diga a difrença */}
              <Button height="4.8rem" type="submit">Entrar</Button>

              <Text
                variant="x-small"
                color="#5B5B5B"
                style={{
                  fontSize: "14px",
                  letterSpacing: "0px",
                }}
              >
                Esqueceu a senha?
                <S._LinkText href="">Recuperar</S._LinkText>
              </Text>
            </S._DivWrapper>
          </Form>
        </Card>
      </S._ContentWrapper>
    </>
  );
};
