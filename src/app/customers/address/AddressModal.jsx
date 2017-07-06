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
        city: 'VICOSA',
        stateName: 'MG',
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

  _handleSearchCities(query) {
    const me = this
    const stateInitials = me.stateName.value
    const customerId = me.props.customerId
    
    CustomerAddressesService.searchCities(stateInitials, query)
      .then(payload => {
        const data = []

        payload.data[0].cidades.map(city => data.push({
          id: city.codigo_ibje, 
          label: city.nome_municipio
        }))

        me.setState({
          cities: {
            loaded: true,
            data: data
          }
        })
      })
      .catch(error => {

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
                      name="stateName"
                      value={address.stateName || ''}
                      onChange={this.onChangeValue}
                      inputRef={input => { this.stateName = input; }} 
                      disabled={!me.states.loaded || me.submited}>
                        {!me.states.loaded && <option value>Carregando...</option>}
                        {me.states.loaded  && me.states.data.map(state => <option value={state.sigla_uf} key={state._id}>{state.nome_uf}</option>)}
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
                      placeholder="Digite o nome da cidade..."
                      ignoreDiacritics={false}
                      onSearch={(query) => this._handleSearchCities(query)}
                      options={this.state.cities.data} />

                    <FormControl.Feedback />

                    {validation.state && validation.state.map((message, index) => (
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