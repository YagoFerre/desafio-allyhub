import "./App.css";
import Formulario from "./components/Formulario";

function App() {
  return (
    <div className="App">
      <Formulario
        user={{
          nome: "",
          email: "",
          telefone: "",
          cpf: "",
        }}
      />
    </div>
  );
}

export default App;
