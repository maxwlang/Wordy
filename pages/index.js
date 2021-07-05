import Head from 'next/head'

import { ToastContainer } from 'react-toastify';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import ControlsForm from '../components/ControlsForm';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Wordy :: Overecomplicate things</title>
        <meta name="description" content="Wordy - Overcomplicate things." />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Container>
        <Row className="py-3">
          <Col sm={12}>
            <h1>Wordy :: Overcomplicate things</h1>
          </Col>
        </Row>

        <ControlsForm />
      </Container>
      <ToastContainer
        position="bottom-right"
      />
    </div>
  )
}
