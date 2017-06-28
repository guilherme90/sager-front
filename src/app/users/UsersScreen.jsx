import React, { Component } from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesome from 'react-fontawesome'
import { 
  Button,
  ButtonGroup,
  Panel, 
  Table,
  Label
} from 'react-bootstrap'
import api from '../../http/axiosRequest'
import UserTable from './UserTable'
import UserService from './service/UserService'

const titlePanel = (
  <h4>
    <FontAwesome name="users" /> Usuários
  </h4>
)

class UsersScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: true,
      data: []
    }
  }

  componentDidMount() {
    const me = this

    UserService.findAllUsers()
      .then(response => {
        me.setState({
          loading: false,
          data: response.data
        })
      })
      .catch(error => {
        me.setState({
          loading: false
        })
      })
  }

  handleRemoveUser = (e) => {
    alert('ok')
  }

  render() {
    const me = this.state

    return (
      <Panel header={titlePanel}>
        <LinkContainer to="users/add">
          <Button bsStyle="success">
            <FontAwesome name="plus" /> Adicionar Usuário
          </Button>
        </LinkContainer>

        {me.loading && (
          <p>Carregando...</p>
        )}

        {!me.loading && me.data.length > 0 && <UserTable users={me.data} handleRemoveUser={this.handleRemoveUser} />}

        {!me.loading && me.data.length === 0 && <p>Nenhum registro encontrado.</p>}
      </Panel>
    );
  }
}

export default UsersScreen