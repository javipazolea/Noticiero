import React from 'react';
import './modal.css';  // Asegúrate de importar el archivo de estilo en tu componente

const NewsModal = ({ article, closeModal }) => {
    return (
        <div className="modal-overlay">
            <div className="modal">
                <button className="close-btn" onClick={closeModal}>
                    X
                </button>
                <img src={article.urlToImage || '/assets/image/default.jpg'} alt={article.title} />
                <h2>{article.title}</h2>
                <p>{article.publishedAt}</p>
                <p>{article.description || 'Sin descripción disponible.'}</p>
                <a href={article.url} target="_blank" rel="noopener noreferrer">Leer más</a>
            </div>
        </div>
    );
};


export default NewsModal;
