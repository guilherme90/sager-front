import React, { Component } from 'react'
import update from 'react-addons-update';
import { Link } from 'react-router'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesome from 'react-fontawesome'
import { 
  Row,
  Col,
  Button,
  ButtonGroup,
  Panel, 
  Table,
  Label,
  Alert,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap'
import Loader from 'react-loader'
import _ from 'lodash'
import api from '../../http/axiosRequest'
import SweetAlert from '../../util/SweetAlert'
import AppTitle from '../components/AppTitle'
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
      loaded: false,
      data: []
    }
  }

  componentDidMount() {
    const me = this

    UserService.findAllUsers()
      .then(response => {
        me.setState({
          loaded: true,
          data: response.data
        })
      })
      .catch(error => {
        me.setState({
          loaded: true
        })
      })
  }

  /**
   * @param {SyntheticEvent} event
   * @param {String} userId
   */
  handleRemoveUser(event, index, userId) {
    const me = this
    const usersScreen = me.usersScreen

    SweetAlert
      .confirm('Deseja remover esse registro?')
      .then(() => {
        UserService.remove(userId)
          .then(response => {
            usersScreen.setState(prevState => ({
              data: update(prevState.data, {$splice: [[index, 1]]})
            }))
          })
          .catch(error => {
            SweetAlert.error('Ocorreu um erro durante a exclusão do registro.')
          })
      })
  }

  /**
   * @param {Object|SyntheticEvent} e
   */
  _searchUser(e) {
    const me = this

    me.setState({
      loaded: false
    })

    UserService.searchUsers(me.search.value)
      .then(response => {
        me.setState({
          loaded: true,
          data: response.data
        })
      })
      .catch(error => {
        me.setState({
          loaded: true
        })

        SweetAlert.error('Ocorreu um erro durante a pesquisa dos registros.')
      })
  }

  handleSearchUser = _.debounce(e => this._searchUser(e), 300)

  render() {
    const me = this.state

    return (
      <AppTitle title="Usuários">
        <Panel header={titlePanel}>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <LinkContainer to="users/add">
                <Button bsStyle="success">
                  <FontAwesome name="plus" /> Adicionar Usuário
                </Button>
              </LinkContainer>
            </Col>

            <Col xs={12} sm={12} md={10} lg={8}>
              <Form horizontal onSubmit={this.handleSearchUser}>
                  <FormGroup>
                    <Col xs={12} sm={12} md={6} lg={6} className="pull-right">
                      <FormControl 
                        type="text" 
                        name="search"
                        onChange={this.handleSearchUser}
                        inputRef={input => { this.search = input; }}
                        autoComplete="off"
                        placeholder="Pesquisar usuário..." />
                    </Col>
                  </FormGroup>
                </Form>
            </Col>
          </Row>
          
          <Loader loaded={me.loaded}>
            {me.data.length > 0 && <UserTable users={me.data} handleRemoveUser={this.handleRemoveUser} usersScreen={this} />}

            {me.data.length === 0 && (
              <Alert bsStyle="warning">
                <FontAwesome name="info-circle" /> Não encontramos nenhum usuário cadastrado.
              </Alert>
            )}
          </Loader>
        </Panel>
      </AppTitle>
    );
  }
}

export default UsersScreen