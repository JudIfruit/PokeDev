// src/App.jsx
import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomePage from "./common/pages/HomePage";
import PokemonList from "./pokemon/pages/PokemonList";
import PokemonDetail from "./pokemon/pages/PokemonDetail";
import PokemonTypes from "./pokemon/pages/PokemonTypes";
import PokemonByTypePage from "./pokemon/pages/PokemonByTypePage";
import BattlePage from "./pokemon/pages/BattlePage";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/pokemon" element={<PokemonList />} />
                <Route path="/pokemon/:id" element={<PokemonDetail />} />
                <Route path="/pokemon/:pokemonName" element={<PokemonDetail />} />
                <Route path="/types" element={<PokemonTypes />} />
                <Route path="/type/:type" element={<PokemonByTypePage />} />
                <Route path="/battle" element={<BattlePage />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;
