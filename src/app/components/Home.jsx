import React from 'react'
import {
  Alert,
  Button,
  ButtonGroup,
  PageHeader,
  Panel,
  Row,
  Col,
  Glyphicon
} from 'react-bootstrap'
import AppTitle from './AppTitle'
import FeaturePanel from './features/FeaturePanel'

const Home = () => {
  return (
    <AppTitle>
      <Alert bsStyle="success">
        <strong>
          <Glyphicon glyph="ok" /> Well done!
        </strong> You application started :)
      </Alert>
    </AppTitle>
  )
}

export default Home