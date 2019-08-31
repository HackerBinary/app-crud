import React, { Component } from 'react';
import { Table, Button, Form, FormGroup, Label, Input } from 'reactstrap';

class FormUser extends Component {

  state = {
    model: {
      email: '',
      first_name: '',
      last_name: ''
    }
  };

  //
  setValues = (e, field) => {
    const { model } = this.state;
    model[field] = e.target.value;
    this.setState({ model });
    //console.log(this.state.model);
  }

  create = () => {
    //const users = this.props.users;
    //console.log(users);
    let data = {
      email: this.state.model.email,
      first_name: this.state.model.first_name,
      last_name: this.state.model.last_name,
    };
    //console.log(data);
    this.props.userCreate(data);
  }

  render(){
    return (
      <Form>
        <FormGroup>
          <div className="form-row">
            <div className="col-md-6">
                <Label for="fn">Nombre: </Label>
                <Input id="fn" type="text"
                  value={this.state.model.first_name}
                  placeholder="Ingrese su primer nombre..."
                  onChange={e => this.setValues(e, 'first_name')}/>
            </div>
            <div className="col-md-6">
              <Label for="ln">Segundo Nombre:</Label>
              <Input id="ln" type="text"
                value={this.state.model.last_name}
                placeholder="Ingrese su segundo nombre..."
                onChange={e => this.setValues(e, 'last_name')}/>
            </div>
          </div>
        </FormGroup>

        <FormGroup>
          <div className="form-row">
            <Label for="ln">Email:</Label>
            <Input id="ln" type="email"
              value={this.state.model.email}
              placeholder="Ingrese su email..."
              onChange={e => this.setValues(e, 'email')}/>
          </div>
        </FormGroup>

        <Button color="primary" block onClick={this.create}>Guardar</Button>
      </Form>
    )
  }
}

class ListUser extends Component {

  delete(id){
    console.log('Eliminar usuario', id);
  }

  render(){
    const users = this.props.users;
    //console.log(users);
    return (
      <Table className="table-bordered text-center">
        <thead className="thead-dark">
          <tr>
            <th>Avatar</th>
            <th>Id</th>
            <th>Email</th>
            <th>Nombre</th>
            <th>Segundo Nombre</th>
            <th>Acciones</th>
          </tr>
        </thead>

        <tbody>
          {
            users.map(user => (
              <tr key={user.id}>
                <td><img src={user.avatar}/></td>
                <td>{user.id}</td>
                <td>{user.email}</td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
                <td>
                  <Button color="info" size="sm" onClick={() => this.edit(user.id)}>Editar</Button>
                  <Button color="danger" size="sm" onClick={() => this.delete(user.id)}>Eliminar</Button>
                </td>
              </tr>
            ))
          }
        </tbody>
      </Table>
    );
  }
}

export default class UserBox extends Component {

  //Url = 'https://reqres.in/api/users';

  state = {
    users: [],
  }

  componentDidMount(){
    fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(users => this.setState({ users: users.data }))
      .catch(e => console.log(e));
  }

  create = (user) => {
    //console.log(user);
    const requestInfo = {
      method: 'POST',
      body: JSON.stringify(user),
      headers: new Headers({
        'Content-type': 'application/json'
      })
    };

    fetch('https://reqres.in/api/users')
      .then(response => response.json())
      .then(newUser => console.log(newUser))
      .catch(e => console.log(e));
  }

  render(){
    return (
      <div className="row">
        <div className="col-md-6 my-3">
          <h2 className="font-weight-bold text-center">Creación de usuarios</h2>
          <FormUser userCreate={this.create}/>
        </div>

        <div className="col-md-6 my-3">
          <h2 className="font-weight-bold text-center">Lista de usuarios</h2>
          <ListUser users={this.state.users}/>
        </div>
      </div>
    );
  }
}
