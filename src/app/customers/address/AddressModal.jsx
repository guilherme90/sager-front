/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, { Component, PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { 
  Row,
  Col,
  Modal,
  Button,
  ButtonGroup,
  Form,
  Checkbox,
  FormGroup,
  FormControl,
  ControlLabel,
  HelpBlock
} from 'react-bootstrap'
import CustomerAddressesService from './service/CustomerAddressesService'
import { asyncContainer, Typeahead } from 'react-bootstrap-typeahead';
const AsyncTypeahead = asyncContainer(Typeahead);

class AddressModal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      loaded: false,
      submited: false,
      data: {
        city: '',
        stateId: '',
        address: '',
        neighborhood: '',
        number: '',
        complement: ''
      },
      states: {
        loaded: false,
        data: []
      },
      cities: {
        loading: false,
        loaded: false,
        data: []
      },
      validation: {}
    }
  }

  componentDidUpdate() {
    const me = this

    if (me.props.isOpened && me.state.states.data.length === 0) {
      CustomerAddressesService.findAllStates()
      .then(payload => {
        me.setState({
          states: {
            loaded: true,
            data: payload.data
          }
        })
      })
      .catch(error => {

      })
    }
  }

  /**
   * @param {SyntheticEvent} event
   */
  onChangeValue = (event) => {
    this.setState({
      data: {
        ...this.state.data,
        [event.target.name]: event.target.value
      }
    })
  }

  /**
   * @param {Array} selected
   */
  onChangeTypeahead = (selected) => {
    const city = selected[0]
    
    this.setState({
      data: {
        ...this.state.data,
        city: city ? city.nome : ''
      }
    })
  }

  _handleSearchCities(query) {
    const me = this
    const stateId = me.stateInput.value
    
    CustomerAddressesService.searchCities(stateId, query)
      .then(payload => {
        me.setState({
          cities: {
            loaded: true,
            data: payload.data
          }
        })
      })
      .catch(error => {

      })
  }

  /**
   * @param {SyntheticEvent} event
   */
  handleSubmit = (event) => {
    event.preventDefault()

    const me = this
    
    const stateOptions = me.stateInput.options
    const customerId = me.props.customerId
    const data = {
      address: me.address.value.toUpperCase(),
      neighborhood: me.neighborhood.value.toUpperCase(),
      number: me.number.value.toUpperCase(),
      complement: me.complement.value.toUpperCase(),
      state: {
        name: stateOptions[stateOptions.selectedIndex].text.toUpperCase(),
        id: stateOptions[stateOptions.selectedIndex].value.toUpperCase()
      },
      city: me.state.data.city.toUpperCase()
    }

    me.setState({
      submited: true
    })

    return CustomerAddressesService.save(data, customerId)
      .then(payload => {
        me.setState({
          submited: false,
          data: {
            city: '',
            stateId: '',
            address: '',
            neighborhood: '',
            number: '',
            complement: ''
          }
        })

        me.props.addresses.push(data)
        me.props.closeModal()
      })
      .catch(error => {
        me.setState({
          submited: false,
          validation: error.response.data
        })
      })
  }

  render() {
    const me = this.state
    const props = this.props
    const isLoaded = me.loaded
    const address = me.data
    const validation = me.validation
    const disableFieldset = me.stateName && me.city ? false : true

    return (
      <Modal show={props.isOpened} onHide={props.close} backdrop="static">
        <Modal.Header>
          <Modal.Title>{props.title}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Form horizontal>
            <Row>
              <Col xs={12} md={4} md={4} lg={4}>
                <FormGroup validationState={validation.state && 'error'}>
                  <Col xs={12} md={12} md={12} lg={12}>
                    <ControlLabel>Estado</ControlLabel>
                    <FormControl 
                      componentClass="select" 
                      name="stateId"
                      value={address.stateId || ''}
                      onChange={this.onChangeValue}
                      inputRef={input => { this.stateInput = input; }} 
                      disabled={!me.states.loaded || me.submited}>
                        {!me.states.loaded && <option value>Carregando...</option>}
                        {me.states.loaded  && me.states.data.map(state => <option value={state.uf} key={state._id}>{state.nome_uf}</option>)}
                    </FormControl>

                    <FormControl.Feedback />

                    {validation.state && validation.state.map((message, index) => (
                      <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
                    ))}
                  </Col>
                </FormGroup>
              </Col>

              <Col xs={12} md={8} md={8} lg={8}>
                <FormGroup validationState={validation.city && 'error'}>
                  <Col xs={12} md={12} md={12} lg={12}>
                    <ControlLabel>Cidade</ControlLabel>
                    <AsyncTypeahead
                      name="city"
                      ref="city"
                      onChange={selected => this.onChangeTypeahead(selected)}
                      placeholder="Digite o nome da cidade..."
                      ignoreDiacritics={false}
                      onSearch={(query) => this._handleSearchCities(query)}
                      labelKey={option => option.nome}
                      options={this.state.cities.data}
                      filterBy={['nome']}
                      searchText="Buscando..."
                      emptyLabel="Nenhum registro encontrado"
                      promptText="Digite o nome da cidade..."
                      paginationText="Exibir mais resultados..."
                      delay={300} />

                    <FormControl.Feedback />

                    {validation.city && validation.city.map((message, index) => (
                      <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
                    ))}
                  </Col>
                </FormGroup>
              </Col>
            </Row>
            
            <fieldset>
              <Row>
                <Col xs={7} md={7} md={7} lg={7}>
                  <FormGroup validationState={validation.address && 'error'}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <ControlLabel>Qual o <strong>endereço?</strong></ControlLabel>
                      <FormControl 
                        type="text" 
                        name="address"
                        value={address.address || ''}
                        onChange={this.onChangeValue}
                        autoComplete="off"
                        inputRef={input => { this.address = input; }} 
                        disabled={me.submited} />

                      <FormControl.Feedback />

                      {validation.address && validation.address.map((message, index) => (
                        <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
                      ))}
                    </Col>
                  </FormGroup>
                </Col>

                <Col xs={5} md={5} md={5} lg={5}>
                  <FormGroup validationState={validation.number && 'error'}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <ControlLabel>Nº</ControlLabel>
                      <FormControl 
                        type="text" 
                        name="number"
                        value={address.number || ''}
                        onChange={this.onChangeValue}
                        autoComplete="off"
                        inputRef={input => { this.number = input; }} 
                        disabled={me.submited} />

                      <FormControl.Feedback />

                      {validation.number && validation.number.map((message, index) => (
                        <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
                      ))}
                    </Col>
                  </FormGroup>
                </Col>

                <Col xs={6} md={6} md={6} lg={6}>
                  <FormGroup validationState={validation.neighborhood && 'error'}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <ControlLabel>Qual o <strong>bairro?</strong></ControlLabel>
                      <FormControl 
                        type="text" 
                        name="neighborhood"
                        value={address.neighborhood || ''}
                        onChange={this.onChangeValue}
                        autoComplete="off"
                        inputRef={input => { this.neighborhood = input; }} 
                        disabled={me.submited} />

                      <FormControl.Feedback />

                      {validation.neighborhood && validation.neighborhood.map((message, index) => (
                        <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
                      ))}
                    </Col>
                  </FormGroup>
                </Col>

                <Col xs={6} md={6} md={6} lg={6}>
                  <FormGroup validationState={validation.complement && 'error'}>
                    <Col xs={12} sm={12} md={12} lg={12}>
                      <ControlLabel>E o <strong>complemento?</strong></ControlLabel>
                      <FormControl 
                        type="text" 
                        name="complement"
                        value={address.complement || ''}
                        onChange={this.onChangeValue}
                        autoComplete="off"
                        inputRef={input => { this.complement = input; }} 
                        disabled={me.submited} />

                      <FormControl.Feedback />

                      {validation.complement && validation.complement.map((message, index) => (
                        <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
                      ))}
                    </Col>
                  </FormGroup>
                </Col>
              </Row>
            </fieldset>
          </Form>
        </Modal.Body>

        <Modal.Footer>
          <ButtonGroup>
            <Button onClick={this.props.closeModal} disabled={me.submited}>
              <FontAwesome name="reply" /> Fechar
            </Button>

            <Button onClick={this.handleSubmit} bsStyle="primary" disabled={me.submited}>
              <FontAwesome name="save" /> Salvar
            </Button>
          </ButtonGroup>
        </Modal.Footer>
      </Modal>
    )
  }
}

AddressModal.PropTypes = {
  customerId: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
  closeModal: PropTypes.func.isRequired,
  loadingStates: PropTypes.bool.isRequired
}

export default AddressModal