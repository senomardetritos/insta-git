import './Modal.scss'

function Modal({ children, show, className }: any) {
    return (
        <div>
            {show && (
                <div className={`modal ${className}`}>
                    <div className="modal-bg"></div>
                    <div className="modal-body">
                        {children}
                    </div>
                </div>
            )
            }
        </div>
    )
}

export default Modal