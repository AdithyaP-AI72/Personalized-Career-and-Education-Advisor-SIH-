// src/components/Modal.jsx

export default function Modal({ isOpen, onClose, title, children }) {
    if (!isOpen) return null;

    return (
        <div className="modal" onClick={onClose}>
            <div className="modal-content" onClick={e => e.stopPropagation()}>
                <div className="modal-header">
                    <h2 id="modalTitle">{title}</h2>
                    <button id="modalCloseBtn" className="modal-close" onClick={onClose}>&times;</button>
                </div>
                <div id="modalBody">
                    {children}
                </div>
            </div>
        </div>
    );
}