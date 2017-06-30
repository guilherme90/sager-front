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
 * @param {Object} customers 
 */
const CustomerTable = (props) => (
  <Table responsive hover>
    <thead>
      <tr>
        <th>#</th>
        <th>Nome</th>
        <th className="hidden-xs">E-mail</th>
        <th className="hidden-xs">Telefone</th>
        <th className="hidden-xs">Celular</th>
      </tr>
    </thead>

    <tbody>
      {props.customers.map((customer, index) => (
        <tr key={index}>
          <td>
            <ButtonGroup>
              <LinkContainer to={`/customers/edit/${customer._id}`}>
                <Button bsStyle="info">
                  <FontAwesome name="pencil" />
                </Button>
              </LinkContainer>

              <Button onClick={event => props.handleRemoveCustomer(event, index, customer._id)} bsStyle="danger">
                <FontAwesome name="trash" />
              </Button>
            </ButtonGroup>
          </td>
          <td>{customer.name}</td>
          <td className="hidden-xs">{customer.email}</td>
          <td className="hidden-xs">{customer.telephone}</td>
          <td className="hidden-xs">{customer.cellphone}</td>
        </tr>
      ))}
    </tbody>
  </Table>
)

CustomerTable.PropTypes = {
  users: PropTypes.array.isRequired,
  handleRemoveCustomer: PropTypes.func.isRequired,
  customersScreen: PropTypes.object.isRequired
}

export default CustomerTable