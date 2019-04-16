import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import 'bootstrap/dist/css/bootstrap.css';
import { BrowserRouter as Router, Route, Link } from "react-router-dom";

class App extends Component {
  
  render() {
  
    function VerLista() {
      let notas=[];
      fetch('https://quadminds-notes-test.getsandbox.com/notes').then(response => response.json()).then(result => result.data).then(responseData =>{ localStorage.setItem("Notas",JSON.stringify(responseData))});
      notas=JSON.parse(localStorage.getItem("Notas"));
      const rows = notas.map(elemento => 
                  <tr>
                    <th scope="row">{elemento['id']}</th>
                    <td>
                      <input 
                          class="btn btn-outline-info" type="button" value={elemento['title']} 
                          onClick={()=> EditarTitulo(elemento['id']) }
                      />
                    </td>
                    <td>
                      <input 
                          class="btn btn-outline-primary" type="button" value={elemento['content']} 
                          onClick={()=> EditarNota(elemento['id']) }

                      />
                    </td>
                    <td>
                      <input class="btn btn-warning" type="button" value="Borrar" onClick={()=> BorrarNota(elemento['id']) } />
                    </td>  
                  </tr>) 

      return <table class="table table-bordered table-dark w-50">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Titulo</th>
              <th scope="col">Nota</th>
              <th scope="col">Acciones</th>
            </tr>
          </thead>
          <tbody>
            {rows}
          </tbody>
        </table>;
    }

    function BorrarNota(Id){
      console.log('Borrando');
      console.log(fetch('https://quadminds-notes-test.getsandbox.com/notes/'+Id, {  
        method: 'DELETE',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          noteid: '{Id}',
        })
      }));
    }

    function EditarTitulo(Id){
      let titulo = prompt("Titulo");
      fetch('https://quadminds-notes-test.getsandbox.com/notes/'+Id, {  
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titulo,

        })
      });
    }

    function EditarNota(Id){
      let nota = prompt("Nota");
      fetch('https://quadminds-notes-test.getsandbox.com/notes/'+Id, {  
        method: 'PATCH',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          content: nota

        })
      });
    }

    function EnviarNota(){
      let titulo = prompt("Titulo");
      let contenido = prompt("Contenido");
      console.log(fetch('https://quadminds-notes-test.getsandbox.com/notes', {  
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: titulo,
          content: contenido,
        })
      }));
    }

    return (
      <Router>
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <div class="alert alert-primary" role="alert">
            React test para Quad Minds!
          </div>
          <div class="btn-group" role="group" aria-label="Button group with nested dropdown">
            <Link  class="btn btn-primary" to="/VerLista/">Ver Notas</Link>
            <input type="button" class="btn btn-primary" onClick={()=> EnviarNota()} value="Nueva Nota" />

            
          </div>
          
          <Route path="/VerLista" component={VerLista} />

        </header>
      </div>
      </Router>
    );
  }
}

export default App;
