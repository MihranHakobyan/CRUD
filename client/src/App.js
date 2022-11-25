import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js';
import Home from './components/home';
import Register from './components/register';
import Edit from './components/edit';
import Details from './components/details';
import {Routes, Route} from 'react-router-dom';

function App() {
    return (
        <>
            <Routes>
                <Route exact path="/accaunt" element={<Home/>}/>
                <Route exact path="/register" element={<Register/>}/>
                <Route exact path="edit/:id" element={<Edit/>}/>
                <Route exact path="/accaunt/:id" element={<Details/>}/>
            </Routes>
        </>
    );
}

export default App;
