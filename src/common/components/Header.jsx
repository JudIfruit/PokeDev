import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import pokeballLogo from "../assets/pokeball.png";
import "./Header.css";

const Header = () => {
    const [search, setSearch] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false); // État pour le menu hamburger
    const navigate = useNavigate();

    const handleSearch = (e) => {
        e.preventDefault();
        if (search.trim()) {
            navigate(`/pokemon/${search.trim().toLowerCase()}`);
            setSearch("");
            setIsMenuOpen(false); // Fermer le menu après une recherche
        }
    };

    const toggleMenu = () => {
        setIsMenuOpen((prev) => !prev);
    };

    return (
        <header className="header">
            <div className="logo-container">
                <img src={pokeballLogo} alt="Pokéball" className="logo" />
                <h1 className="title">PokeDev</h1>
            </div>
            {/* Icône du menu hamburger */}
            <div className="hamburger" onClick={toggleMenu}>
                <div className="line"></div>
                <div className="line"></div>
                <div className="line"></div>
            </div>
            {/* Menu dépliable */}
            <nav className={`nav ${isMenuOpen ? "open" : ""}`}>
                <a href="/" className="navLink" onClick={() => setIsMenuOpen(false)}>
                    Accueil
                </a>
                <a href="/pokemon" className="navLink" onClick={() => setIsMenuOpen(false)}>
                    Liste des Pokémons
                </a>
                <a href="/types" className="navLink" onClick={() => setIsMenuOpen(false)}>
                    Liste des Types
                </a>
                <a href="/battle" className="navLink" onClick={() => setIsMenuOpen(false)}>
                    Combat
                </a>
            </nav>
            <form onSubmit={handleSearch} className="form">
                <input
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Rechercher un Pokémon..."
                    className="input"
                />
                <button type="submit" className="button">
                    Rechercher
                </button>
            </form>
        </header>
    );
};

export default Header;
