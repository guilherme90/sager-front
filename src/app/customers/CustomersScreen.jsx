/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

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
import SweetAlert from '../../util/SweetAlert'
import AppTitle from '../components/AppTitle'
import CustomerTable from './CustomerTable'
import CustomerService from './service/CustomerService'

class CustomersScreen extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loaded: false,
      data: []
    }
  }

  componentDidMount() {
    const me = this

    CustomerService.findAllCustomers()
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
   * @param {String} customerId
   */
  handleRemoveCustomer(event, index, customerId) {
    const me = this
    const customersScreen = me.customersScreen

    SweetAlert
      .confirm('Deseja remover esse registro?')
      .then(() => {
        CustomerService.remove(customerId)
          .then(response => {
            customersScreen.setState(prevState => ({
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
  _searchCustomers(e) {
    const me = this

    me.setState({
      loaded: false
    })

    CustomerService.searchCustomers(me.search.value)
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

  handleSearchCustomer = _.debounce(e => this._searchCustomers(e), 300)

  render() {
    const me = this.state

    return (
      <AppTitle title="Clientes">
        <Panel header={(<h4><FontAwesome name="universal-access" /> Clientes</h4>)}>
          <Row>
            <Col xs={12} sm={12} md={4} lg={4}>
              <LinkContainer to="/customers/add">
                <Button bsStyle="success">
                  <FontAwesome name="plus" /> Adicionar Cliente
                </Button>
              </LinkContainer>
            </Col>

            <Col xs={12} sm={12} md={10} lg={8}>
              <Form horizontal onSubmit={this.handleSearchCustomer}>
                  <FormGroup>
                    <Col xs={12} sm={12} md={6} lg={6} className="pull-right">
                      <FormControl 
                        type="text" 
                        name="search"
                        onChange={this.handleSearchCustomer}
                        inputRef={input => { this.search = input; }}
                        autoComplete="off"
                        placeholder="Pesquisar cliente..." />
                    </Col>
                  </FormGroup>
                </Form>
            </Col>
          </Row>
          
          <Loader loaded={me.loaded}>
            {me.data.length > 0 && <CustomerTable customers={me.data} handleRemoveCustomer={this.handleRemoveCustomer} customersScreen={this} />}

            {me.data.length === 0 && (
              <Alert bsStyle="warning">
                <FontAwesome name="info-circle" /> Não encontramos nenhum cliente cadastrado.
              </Alert>
            )}
          </Loader>
        </Panel>
      </AppTitle>
    );
  }
}

export default CustomersScreen