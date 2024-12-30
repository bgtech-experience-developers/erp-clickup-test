import { ThemeProvider } from "styled-components";
import { theme } from "./theme/theme";
import { AppRoutes } from "./routes";
import { AuthProvider } from "./contexts/AuthContext";
import { SidebarProvider } from "./contexts/SidebarContext";

function App() {
  return (
    <>
    {/* comentario aleatorio apenas para testar o clickup */}
    {/* novo comentario para testar o rastreamento do commit no clickup */}
    {/* comentario para testar se o link funciona sem colocar na branch o id da task do clickup */}
    {/* comentario para branch cadastrar/cliente/test*/}
    {/* comentario task 6 automatizar status no clickup */}
    {/* comentario task 6 automatizar status no clickup */}
    {/* comentario task 6 automatizar status no clickup */}
    {/* comentario task 7 automatizar status no clickup */}
    {/* comentario task 8 automatizar status no clickup */}
    {/* task 10 auto workflow */}
    {/* task 11 auto close issue */}
    {/* task 12 */}
      <ThemeProvider theme={theme}>
        <SidebarProvider>
          <AppRoutes />
        </SidebarProvider>
      </ThemeProvider>
    </>
  );
}

export default App;
