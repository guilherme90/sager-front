/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, { PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesome from 'react-fontawesome'
import {
  Button,
  ButtonGroup,
  Table,
  Label
} from 'react-bootstrap'

/**
 * @param {Object} users 
 */
const UserTable = (props) => (
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
      {props.users.map((user, index) => (
        <tr key={index}>
          <td>
            <ButtonGroup>
              <LinkContainer to={`/users/edit/${user._id}`}>
                <Button bsStyle="info">
                  <FontAwesome name="pencil" />
                </Button>
              </LinkContainer>

              <Button onClick={() => props.handleRemoveUser(user._id)} bsStyle="danger">
                <FontAwesome name="trash" />
              </Button>
            </ButtonGroup>
          </td>
          <td className="hidden-xs">
            <h5>
              <Label bsStyle={user.active ? 'primary' : 'warning'}>{user.active ? 'Sim' : 'Não'}</Label>
            </h5>
          </td>
          <td className="hidden-xs">{user.userType}</td>
          <td>{user.name}</td>
          <td className="hidden-xs">{user.email}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)

UserTable.PropTypes = {
  users: PropTypes.array.isRequired,
  handleRemoveUser: PropTypes.func.isRequired,
  usersScreen: PropTypes.object.isRequired
}

export default UserTable