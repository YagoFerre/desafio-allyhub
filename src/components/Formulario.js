import React, { useState, useEffect } from "react";
import axios from "axios";
import Select from "react-select";
import "./Formulario.css";

const Formulario = ({ user }) => {
  const [nome, setNome] = useState(user ? user.nome : "");
  const [email, setEmail] = useState(user ? user.email : "");
  const [telefone, setTelefone] = useState(user ? user.telefone : "");
  const [cpf, setCpf] = useState(user ? user.cpf : "");

  const [pais, setPais] = useState([]);
  const [selectedPais, setSelectedPais] = useState([]);

  const [cidade, setCidade] = useState([]);
  const [selectedCidade, setSelectedCidade] = useState([]);

  useEffect(() => {
    axios.get("https://amazon-api.sellead.com/country").then((response) => {
      setPais(response.data);
    });
  }, []);

  useEffect(() => {
    axios.get("https://amazon-api.sellead.com/city").then((response) => {
      setCidade(response.data);
    });
  }, []);

  const paisOptions = pais.map((pais) => ({
    value: pais.code,
    label: pais.name,
  }));

  const cidadeOptions = cidade.map((cidade) => ({
    value: cidade.id,
    label: cidade.name,
  }));

  function verificaValor() {
    if (selectedPais.value && selectedCidade.value == null) {
      alert("Todos os campos devem ser preenchidos.");
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    setNome("");
    setEmail("");
    setTelefone("");
    setCpf("");
    setSelectedPais("");
    setSelectedCidade("");
    verificaValor();
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit} className="form">
        <h3 className="title">Dados Pessoais</h3>
        <label>
          <span className="texto">Nome</span>
          <input
            required
            type="text"
            name="nome"
            placeholder="Digite o seu nome"
            onChange={(e) => {
              setNome(e.target.value);
            }}
            value={nome}
          />
        </label>
        <label>
          <span className="texto">Email</span>
          <input
            required
            pattern="^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$"
            type="text"
            name="email"
            placeholder="Digite o seu email"
            onChange={(e) => {
              setEmail(e.target.value);
            }}
            value={email}
          />
        </label>
        <label>
          <span className="texto">Telefone</span>
          <input
            required
            pattern="^\([1-9]{2}\) (?:[2-8]|9[1-9])[0-9]{3}\-[0-9]{4}$"
            maxLength="11"
            type="text"
            inputMode="numeric"
            name="telefone"
            placeholder="Digite o seu número de telefone"
            onChange={(e) => {
              setTelefone(e.target.value);
            }}
            value={telefone}
          />
        </label>
        <label>
          <span className="texto">CPF</span>
          <input
            required
            pattern="[0-9]{2}[\.]?[0-9]{3}[\.]?[0-9]{3}[\/]?[0-9]{4}[-]?[0-9]{2})|([0-9]{3}[\.]?[0-9]{3}[\.]?[0-9]{3}[-]?[0-9]{2}"
            type="text"
            inputMode="numeric"
            maxLength="11"
            name="cpf"
            placeholder="Digite o seu cpf"
            onChange={(e) => {
              setCpf(e.target.value);
            }}
            value={cpf}
          />
        </label>

        <h3 className="title">Destinos de Interesse</h3>

        <label>
          <Select
            className="select"
            required
            isMulti
            isClearable={true}
            isSearchable={true}
            closeMenuOnSelect={false}
            options={paisOptions}
            placeholder="Selecione um país"
            onChange={(pais) => setSelectedPais(pais)}
            value={selectedPais}
          />
        </label>

        <label>
          <Select
            className="select"
            required
            isMulti
            isClearable={true}
            isSearchable={true}
            closeMenuOnSelect={false}
            options={cidadeOptions}
            placeholder="Selecione uma cidade"
            onChange={(cidade) => setSelectedCidade(cidade)}
            value={selectedCidade}
          />
        </label>

        <input type="submit" value="Enviar" className="btn" />
      </form>
    </div>
  );
};

export default Formulario;
