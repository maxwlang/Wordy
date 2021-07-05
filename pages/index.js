import Head from 'next/head';
import Image from 'next/image';

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

      <a href="https://github.com/maxwlang/Wordy" className="position-absolute">
        <Image
          width={149}
          height={149}
          src="https://github.blog/wp-content/uploads/2008/12/forkme_left_white_ffffff.png?resize=149%2C149"
          alt="Fork me on GitHub"
        />
      </a>

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
