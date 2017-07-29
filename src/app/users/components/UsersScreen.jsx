/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

// react
import React, { Component } from 'react'
import PropTypes from 'prop-types'

// redux
import { connect } from  'react-redux'

// others
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

// app
import SweetAlert from '../../../util/SweetAlert'
import AppTitle from '../../components/AppTitle'
import UserTable from './UserTable'

/**
 * Actions
 */
import { 
  getUsers,
  searchUsers,
  removeUser
} from '../user.action'

const mapStateToProps = (state) => ({
  pending: state.users.pending,
  errorFetching: state.users.errorFetching,
  message: state.users.message,
  users: state.users.data
})

const mapDispatchToProps = (dispatch) => ({
  getUsers: () => dispatch(getUsers()),
  searchUsers: query => dispatch(searchUsers(query)),
  removeUser: userId => dispatch(removeUser(userId))
})

class UsersScreen extends Component {
  componentDidMount() {
    this.props.getUsers()
  }

  /**
   * @param {String} userId
   */
  handleRemoveUser(userId) {
    const me = this
    const usersScreen = me.usersScreen

    SweetAlert
      .confirm('Deseja remover esse registro?')
      .then(() => {
        usersScreen.props.removeUser(userId)
      })
  }

  /**
   * @param {Object|SyntheticEvent} e
   */
  _debounceSearchUser(e) {
    const query = this.search.value

    if (query) {
      return this.props.searchUsers(query)
    }
    
    return this.props.getUsers()
  }

  handleSearchUser = _.debounce(e => this._debounceSearchUser(e), 300)

  render() {
    const { 
      pending,
      errorFetching, 
      message,
      users 
    } = this.props

    return (
      <AppTitle title="Usuários">
        <Panel header={(<h4><FontAwesome name="users" /> Usuários</h4>)}>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <LinkContainer to="/users/add">
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
          
          <Loader loaded={!pending}>
            {
              !pending && 
              !users.length && 
              errorFetching && (
              <Alert bsStyle="danger">
                <FontAwesome name="remove" /> {message}
              </Alert>
            )}

            {
              !pending && 
              !users.length && 
              !errorFetching && (
              <Alert bsStyle="info">
                <FontAwesome name="info-circle" /> {message}
              </Alert>
            )}

            {
              !pending && 
              !errorFetching && 
              users.length > 0 && 
              <UserTable 
                users={users} 
                handleRemoveUser={this.handleRemoveUser} 
                usersScreen={this} />
            }
          </Loader>
        </Panel>
      </AppTitle>
    )
  }
}

UsersScreen.PropTypes = {
  getUsers: PropTypes.func.isRequired,
  searchUsers: PropTypes.func.isRequired,
  removeUser: PropTypes.func.isRequired,
  pending: PropTypes.bool.isRequired,
  errorFetching: PropTypes.bool.isRequired,
  message: PropTypes.string.isRequired,
  search: PropTypes.object
}

export default connect(mapStateToProps, mapDispatchToProps)(UsersScreen)