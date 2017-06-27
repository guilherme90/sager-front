import React, { Component, PropTypes } from 'react'
import { LinkContainer } from 'react-router-bootstrap'
import FontAwesome from 'react-fontawesome'
import {
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
import axiosRequest from '../../http/axiosRequest'

const titlePanel = (title) => (
  <h4>
    <FontAwesome name="plus" /> {title}
  </h4>
)

class UserForm extends Component {
  constructor(props) {
    super(props)

    this.state = {
      loading: false,
      loaded: false,
      submited: false,
      data: {
        name: '',
        email: '',
        userType: '',
        active: ''
      },
      validation: {}
    }    
  }

  componentDidMount() {
    const me = this
    const userId = me.context.router.params.userId

    if (userId) {
      me.setState({
        user: {
          loading: true
        }
      })

      axiosRequest.get(`/users/${userId}`)
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

  handleSubmit = (e) => {
    e.preventDefault()

    const me = this
    const userId = me.context.router.params.userId

    me.setState({
      submited: true
    })

    if (userId) {
      return axiosRequest.put(`/users/${userId}`, {
        name: me.name.value,
        email: me.email.value,
        userType: me.userType.value,
        password: me.password.value
      })
      .then(payload => {
        me.context.router.push('/users')
      })
      .catch(error => {
        me.setState({
          submited: false,
          validation: error.response.data
        })
      })
    }

    return axiosRequest.post('/users', {
      name: me.name.value,
      email: me.email.value,
      userType: me.userType.value,
      password: me.password.value
    })
    .then(payload => {
      me.context.router.push('/users')
    })
    .catch(error => {
      me.setState({
        submited: false,
        validation: error.response.data
      })
    })
  }

  onChangeValue = (event) => {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      data: {
        [name]: value
      }
    })
  }

  render() {
    const me = this.state
    const isLoaded = me.loaded
    const user = me.data
    const validation = me.validation

    return (
      <Panel header={titlePanel(isLoaded ? 'Editar Usuário' : 'Adicionar Usuário')}>
        <Form horizontal>
          <FormGroup validationState={validation.name && 'error'}>
            <Col sm={6} md={6}>
              <ControlLabel>Nome</ControlLabel>
              <FormControl 
                type="text" 
                name="name"
                value={user.name}
                onChange={this.onChangeValue}
                placeholder="Informe o nome do usuário" 
                inputRef={input => { this.name = input; }} 
                disabled={me.submited} />

              <FormControl.Feedback />

              {validation.name && validation.name.map((message, index) => (
                <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
              ))}
            </Col>
          </FormGroup>

          <FormGroup validationState={validation.userType && 'error'}>
            <Col sm={6} md={6}>
              <ControlLabel>Tipo de Usuário</ControlLabel>
              <FormControl 
                componentClass="select" 
                name="userType"
                value={user.userType}
                onChange={this.onChangeValue}
                inputRef={input => { this.userType = input; }} 
                disabled={me.submited}>
                <option value=""></option>
                <option value="Administrador">Administrador</option>
                <option value="Administrativo">Administrativo</option>
                <option value="Vendedor">Vendedor</option>
              </FormControl>

              <FormControl.Feedback />

              {validation.userType && validation.userType.map((message, index) => (
                <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
              ))}
            </Col>
          </FormGroup>

          <FormGroup validationState={validation.email && 'error'}>
            <Col sm={6} md={6}>
              <ControlLabel>Email</ControlLabel>
              <FormControl 
                type="email"
                name="email"
                value={user.email}
                onChange={this.onChangeValue}
                placeholder="Informe um email válido" 
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

          <FormGroup validationState={validation.password && 'error'}>
            <Col sm={6} md={6}>
              <ControlLabel>Senha</ControlLabel>
              <FormControl 
                type="password" 
                name="password"
                onChange={this.onChangeValue}
                placeholder="Mínimo 6 caracteres" 
                inputRef={input => { this.password = input; }} 
                disabled={me.submited} />

              <FormControl.Feedback />

              {validation.password && validation.password.map((message, index) => (
                <HelpBlock key={index}><FontAwesome name="remove" /> {message}</HelpBlock>
              ))}
            </Col>
          </FormGroup>

          <FormGroup>
            <Col sm={6} md={6}>
              <Checkbox name="active" defaultChecked={user && user.active || true} value={user && user.active || true} inline>
                {isLoaded && user.active && (
                  <span>
                    Esse usuário está <strong className={user && user.active ? 'text-info' : 'text-danger'}>{user && user.active ? 'ATIVADO' : 'INATIVO'}</strong>
                  </span>
                )}

                {!user.active && (
                  <span>Por padrão, este novo usuário será salvo como <strong className="text-info">ATIVO</strong></span>
                )}
              </Checkbox>
            </Col>
          </FormGroup>

          <ButtonGroup>
            <LinkContainer to="/users">
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
    );
  }
}

UserForm.contextTypes = {
  router: PropTypes.object.isRequired
}

export default UserForm