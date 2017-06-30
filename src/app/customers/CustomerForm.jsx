/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, { Component, PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesome from 'react-fontawesome'
import {
  Row,
  Col,
  Alert,
  HelpBlock,
  Button,
  ButtonGroup,
  Panel, 
  Form,
  Checkbox,
  FormGroup,
  FormControl,
  ControlLabel
} from 'react-bootstrap'
import AppTitle from '../components/AppTitle'
import CustomerAddressesTable from './address/CustomerAddressesTable'
import CustomerService from './service/CustomerService'

class CustomerForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      loaded: false,
      submited: false,
      data: {
        name: '',
        email: '',
        telephone: '',
        cellphone: ''
      },
      validation: {}
    }    
  }

  componentDidMount() {
    const me = this
    const customerId = me.context.router.params.customerId

    if (customerId) {
      me.setState({
        loading: true
      })
      
      CustomerService.findById(customerId)
        .then(payload => {
          me.setState({
            loading: false,
            loaded: true,
            data: payload.data
          })
        })
        .catch(error => {
          console.log(error)
        })
    }
  }

  /**
   * @param {SyntheticEvent} event
   */
  handleSubmit = (event) => {
    event.preventDefault()

    const me = this
    const customerId = me.context.router.params.customerId
    const data = {
      name: me.name.value,
      email: me.email.value,
      telephone: me.telephone.value,
      cellphone: me.cellphone.value
    }

    me.setState({
      submited: true
    })

    return CustomerService.save(data, customerId)
      .then(payload => {
        me.context.router.push('/customers')
      })
      .catch(error => {
        me.setState({
          submited: false,
          validation: error.response.data
        })
      })
  }

  /**
   * @param {SyntheticEvent} event
   */
  onChangeValue = (event) => {
    const target = event.target;
    const value = target.value;
    const name = target.name;

    this.setState({
      data: {
        ...this.state.data,
        [name]: value
      }
    })
  }

  render() {
    const me = this.state
    const isLoaded = me.loaded
    const customer = me.data
    const validation = me.validation

    return (
      <AppTitle title={isLoaded ? 'Editar Cliente' : 'Adicionar Cliente'}>
        <Panel header={(<h4><FontAwesome name="plus" /> {isLoaded ? 'Editar Cliente' : 'Adicionar Cliente'}</h4>)}>
          <Form horizontal>
            <FormGroup validationState={validation.name && 'error'}>
              <Col sm={6} md={6}>
                <ControlLabel>Nome</ControlLabel>

                <FormControl 
                  type="text" 
                  name="name"
                  value={customer.name || ''}
                  onChange={this.onChangeValue}
                  placeholder="Informe o nome do cliente"
                  autoComplete="off"
                  inputRef={input => { this.name = input; }} 
                  disabled={me.submited} />

                <FormControl.Feedback />

                {validation.name && validation.name.length && validation.name.map((message, index) => (
                  <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
                ))}

                {validation.email && validation.email.message && (
                  <HelpBlock><FontAwesome name="remove" /> {validation.email.message}</HelpBlock>
                )}
              </Col>
            </FormGroup>

            <FormGroup validationState={validation.email && 'error'}>
              <Col sm={6} md={6}>
                <ControlLabel>Email</ControlLabel>
                <FormControl 
                  type="email"
                  name="email"
                  value={customer.email || ''}
                  onChange={this.onChangeValue}
                  placeholder="Informe um email válido" 
                  autoComplete="off"
                  inputRef={input => { this.email = input; }} 
                  disabled={me.submited} />
                
                <FormControl.Feedback />

                {validation.email && validation.email.length && validation.email.map((message, index) => (
                  <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
                ))}

                {validation.email && validation.email.message && (
                  <HelpBlock><FontAwesome name="remove" /> {validation.email.message}</HelpBlock>
                )}
              </Col>
            </FormGroup>
            
            <Row>
              <Col xs={6} md={6} md={3}>
                <FormGroup validationState={validation.telephone && 'error'}>
                  <Col xs={12} sm={12} md={12}>
                    <ControlLabel>Telefone</ControlLabel>
                    <FormControl 
                      type="tel" 
                      name="telephone"
                      value={customer.telephone || ''}
                      onChange={this.onChangeValue}
                      min="0"
                      autoComplete="off"
                      inputRef={input => { this.telephone = input; }} 
                      disabled={me.submited} />

                    <HelpBlock>99 9999-9999</HelpBlock>

                    <FormControl.Feedback />

                    {validation.telephone && validation.telephone.map((message, index) => (
                      <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
                    ))}
                  </Col>
                </FormGroup>
              </Col>

              <Col xs={6} md={6} md={3}>
                <FormGroup validationState={validation.cellphone && 'error'}>
                  <Col xs={12} sm={12} md={12}>
                    <ControlLabel>Celular</ControlLabel>
                    <FormControl 
                      type="tel" 
                      name="cellphone"
                      value={customer.cellphone || ''}
                      onChange={this.onChangeValue}
                      min="0"
                      autoComplete="off"
                      inputRef={input => { this.cellphone = input; }} 
                      disabled={me.submited} />

                    <HelpBlock>99 9999-9999</HelpBlock>

                    <FormControl.Feedback />

                    {validation.cellphone && validation.cellphone.map((message, index) => (
                      <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
                    ))}
                  </Col>
                </FormGroup>
              </Col>
            </Row>

            {isLoaded && <CustomerAddressesTable addresses={customer.addresses} />}

            <ButtonGroup>
              <LinkContainer to="/customers">
                <Button bsStyle="success" disabled={me.submited}>
                  <FontAwesome name="reply" /> Voltar
                </Button>
              </LinkContainer>

              <Button onClick={this.handleSubmit} bsStyle="primary" disabled={me.submited}>
                <FontAwesome name="save" /> Salvar
              </Button>
            </ButtonGroup>
          </Form>
        </Panel>
      </AppTitle>
    );
  }
}

CustomerForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default CustomerForm