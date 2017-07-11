/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, { Component, PropTypes } from 'react'
import update from 'react-addons-update';
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesome from 'react-fontawesome'
import { 
  Row,
  Col,
  Button,
  ButtonGroup,
  Panel, 
  Table,
  Form,
  FormGroup,
  FormControl,
} from 'react-bootstrap'
import SweetAlert from '../../../util/SweetAlert'
import AddressModal from './AddressModal'
import CustomerAddressesService from './service/CustomerAddressesService'

class CustomerAddressesTable extends Component {
  constructor(props) {
    super(props)

    this.state = {
      showModal: false,
      addressId: null,
      selected: null
    }
  }

  closeModal = (e) => {
    this.setState({ 
      showModal: false 
    });
  }

  openModal(e, addressId, index) {
    this.setState({ 
      showModal: true,
      addressId: addressId,
      selected: index
    });
  }

  renderModal() {
    const addressId = this.state.addressId
    const addresses = this.props.addresses

    return (
      <AddressModal 
          title={addressId ? 'Editar Endereço' : 'Adicionar Endereço'}
          addressId={addressId}
          addresses={addresses}
          selected={this.state.selected}
          isOpened={this.state.showModal} 
          closeModal={this.closeModal}
          customerId={this.props.customerId} />
    )
  }

  /**
   * @param {SyntheticEvent} event
   * @param {String} userId
   */
  handleRemoveAddress(event, index, addressId) {
    const me = this
    const customerForm = me.props.customerForm

    SweetAlert
      .confirm('Deseja remover esse registro?')
      .then(() => {
        CustomerAddressesService.remove(me.props.customerId, addressId)
          .then(response => {
            customerForm.setState(prevState => ({
              data: {
                ...prevState.data,
                addresses: update(prevState.data.addresses, {$splice: [[index, 1]]})
              }
            }))
          })
          .catch(error => {
            SweetAlert.error('Ocorreu um erro durante a exclusão do registro.')
          })
      })
  }

  render() {
    const addressId = this.state.addressId
    const addresses = this.props.addresses

    return (
      <Panel header={(
        <h4>
          <FontAwesome name="address-book" /> Endereços
        </h4>
      )} bsStyle="info">
        <Row>
          <Col xs={12} sm={12} md={4} lg={4}>
            <Button bsStyle="success" onClick={event => this.openModal(event)}>
              <FontAwesome name="plus" /> Adicionar Endereço
            </Button>
          </Col>
        </Row>

        <Table responsive hover>
          <thead>
            <tr>
              <th>#</th>
              <th>Endereço</th>
            </tr>
          </thead>

          <tbody>
            {addresses.length > 0 && addresses.map((address, index) => (
              <tr key={index}>
                <td>
                  <ButtonGroup>
                    <Button bsStyle="info" onClick={event => this.openModal(event, address._id, index)}>
                      <FontAwesome name="pencil" />
                    </Button>
                    
                    <Button bsStyle="danger" onClick={event => this.handleRemoveAddress(event, index, address._id)}>
                      <FontAwesome name="trash" />
                    </Button>
                  </ButtonGroup>
                </td>
                <td>{`${address.address}, ${address.number}, ${address.neighborhood}, ${address.complement} - ${address.city}/${address.state.name}`}</td>
              </tr>
            ))}
          </tbody>
        </Table>

        {this.state.showModal && this.renderModal()}
      </Panel>
    )
  }
}

CustomerAddressesTable.PropTypes = {
  customerForm: PropTypes.object.isRequired,
  addresses: PropTypes.array.isRequired,
  customerId: PropTypes.array.isRequired
}

export default CustomerAddressesTable