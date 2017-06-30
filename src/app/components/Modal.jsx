/**
 * @author Guilherme Nogueira <guilhermenogueira90@gmail.com>
 */

import React, { PropTypes } from 'react'
import FontAwesome from 'react-fontawesome'
import { 
  Modal,
  Button
} from 'react-bootstrap'

const AppModal = (props) => (
  <Modal show={props.isOpened} onHide={props.close} backdrop="static">
    <Modal.Header closeButton>
      <Modal.Title>{props.title}</Modal.Title>
    </Modal.Header>

    <Modal.Body>
      {props.children}
    </Modal.Body>

    <Modal.Footer>
      <Button onClick={props.close}>Close</Button>
    </Modal.Footer>
  </Modal>
)

Modal.PropTypes = {
  title: PropTypes.string.isRequired,
  isOpened: PropTypes.bool.isRequired,
  close: PropTypes.func.isRequired
}

export default AppModal