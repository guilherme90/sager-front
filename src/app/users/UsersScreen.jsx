import React, { Component } from 'react'
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesome from 'react-fontawesome'
import { 
  Button,
  ButtonGroup,
  Panel, 
  Table 
} from 'react-bootstrap'
import axiosRequest from '../../http/axiosRequest'

const titlePanel = (
  <h4>
    <FontAwesome name="users" /> Usuários
  </h4>
)

const table = (data) => {
  return (
    <Table responsive hover>
      <thead>
        <tr>
          <th>#</th>
          <th className="hidden-xs">Ativo</th>
          <th className="hidden-xs">Tipo</th>
          <th>Nome</th>
          <th className="hidden-xs">E-mail</th>
        </tr>
      </thead>

      <tbody>
        {data.map((user, index) => (
          <tr key={index}>
            <td>
              <ButtonGroup>
                <LinkContainer to={`users/edit/${user._id}`}>
                  <Button bsStyle="info">
                    <FontAwesome name="pencil" />
                  </Button>
                </LinkContainer>

                <Button href="#" bsStyle="danger">
                  <FontAwesome name="trash" />
                </Button>
              </ButtonGroup>
            </td>
            <td className="hidden-xs">
              <strong>{user.active ? 'Sim' : 'Não'}</strong>
            </td>
            <td className="hidden-xs">Administrador</td>
            <td>{user.name}</td>
            <td className="hidden-xs">{user.email}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  )
}

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

    axiosRequest
      .get('/users')
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

        {!me.loading && me.data.length > 0 && table(me.data)}

        {!me.loading && me.data.length === 0 && <p>Nenhum registro encontrado.</p>}
      </Panel>
    );
  }
}

export default UsersScreen