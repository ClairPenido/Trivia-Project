import React, { Component } from 'react';

export default class Modal extends Component {
  render() {
    return (
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5
                className="modal-title"
                id="exampleModalLabel"
                data-testid="settings-title"
              >
                Configurações
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              />
            </div>
            <div className="modal-body">
              ...
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className=""
                data-bs-dismiss="modal"
              >
                Fechar

              </button>
              <button type="button" className="">Salvar</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
