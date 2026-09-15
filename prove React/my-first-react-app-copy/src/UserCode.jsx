import React, { Component } from "react";
class UserCode extends Component {
  render() {
    return (
      <section className="security-card" aria-labelledby="security-title">
        <div className="security-icon" aria-hidden="true">⌘</div>
        <div className="security-copy">
          <p className="eyebrow">Sicurezza</p>
          <h2 id="security-title">Aggiorna la password</h2>
          <p>Genera una nuova chiave di accesso sicura per il tuo account.</p>
        </div>
        <button className="generate-button" onClick={this.props.generateNewPassword}>
          <span aria-hidden="true">↻</span> Genera password
        </button>
      </section>
    );
  }
}

export default UserCode;
