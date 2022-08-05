import { getAllByPlaceholderText } from "@testing-library/react";
import React, { Component } from "react";
import styled from "styled-components";

const Container = styled.div `
  height: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
`

const Formulario = styled.form `

  display: flex;
  flex-wrap: wrap;
  width: 350px;
  align-items: center;
  justify-content: center;

  input {
    margin: 10px;
    width: 350px;
    height: 40px;
    font-size: 25px;
    border-radius: 10px;
    border: solid 1px #101010;
  }

  button {
    margin: 10px;
    width: 40%;
    height: 30px;
    border-radius: 5px;
    transition: 0.5s;
    background-color: #fff;
  }

  button:hover {
    background-color: #101010;
    color: #fff;
  }
`
const Lista = styled.div `
  width: 60%;
  min-width: 350px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid;

  #check:checked ~ label {
    text-decoration: line-through;
  }

  label {
    width: 80%;
    margin: 10px;
    font-size: 20px;
  }

  button {
    height: 30px;
    border: none;
    background-color: #fff;
    transition: 0.5s;
  }

  button:hover {
    border-radius: 5px;
    background-color: red;
    cursor: pointer;
  }
`

export default class Main extends Component {
  state = {
    compras: "",
    listaDeCompras: []
  };

  handleChange = (event) => {
    this.setState({
      compras: event.target.value
    });
  };

  handleClick = () => {
    if(this.state.compras !== '') {
      this.setState({
        listaDeCompras: this.state.listaDeCompras.concat({
          compras: this.state.compras,
          id: Date.now(),
        }),
        compras: ''
      });
    }
    
  };

  Remove = (id) => { 
  this.setState({
    listaDeCompras: this.state.listaDeCompras.filter ((ident)=>(ident.id !== id))
  })  
  }

  RemoveAll = (id) => { 
    this.setState({
      listaDeCompras: this.state.listaDeCompras.filter ((ident)=>(ident.listaDeCompras))
    })  
    }

  render() {
    return (
      <Container>
        <h2>To-Do List</h2>
        <Formulario onSubmit={(e) => (e.preventDefault())}>
          <input autoFocus value={this.state.compras} onChange={this.handleChange} />
          <button  onClick={this.handleClick}>Enviar</button>
          <button onClick={this.RemoveAll}>Limpar Tudo</button>
        </Formulario>
        
          {this.state.listaDeCompras.map((item) => (
            <Lista>
                <input type='checkbox' id='check'/>
                <label for='check'>{item.compras}</label>
                <button onClick={() => {this.Remove(item.id)}}>Remover</button>
            </Lista>
          ))}
      </Container>
    );
  }
}