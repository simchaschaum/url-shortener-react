import "bootstrap/dist/css/bootstrap.min.css";
import './App.css';
import Footer from './footer';
import Header from './header';
import MainForm from './mainForm';

function App() {

  return (
    <div className="App">
      <div id="page-container">
        <div id="content-wrap">
          <Header/>
            <MainForm />
          <Footer />
        </div>
      </div>
    </div>
  );
}

export default App;
