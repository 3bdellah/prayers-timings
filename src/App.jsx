import './App.css';
import MainContent from './components/MainContent';
import { Container } from '@mui/material';

function App() {


  return (
    <>
      <div className={"main"}>
        <Container maxWidth="ml" >
        <MainContent/>
        </Container>

      </div>

    </>
  );
}

export default App
