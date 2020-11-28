import Footer from "./components/Footer";
import { Container } from 'react-bootstrap'
import Header from "./components/Header";

const App = () => {
  return (
    <>
      <Header />
      <main className="py-3">
        <Container>
          <h1>Bienvenue Chez Sunu-Business</h1>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default App;
