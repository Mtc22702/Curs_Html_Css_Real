import React, { Component } from "react";
import User from "./User.jsx";
import UserCode from "./UserCode.jsx";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "Ben Torrance",
      email: "ben@email.com",
      dateOfBirth: "01/01/1990",
      password: "5n4n5n"
    };
    this.generateNewPassword = this.generateNewPassword.bind(this);
  }
  generateNewPassword() {
    this.setState({ password: Math.random().toString(36).substring(7) });
  }
  render() {
    return (
      <main className="app-shell">
        <div className="ambient-shape ambient-shape--one" />
        <div className="ambient-shape ambient-shape--two" />
        <section className="profile-panel" aria-labelledby="page-title">
          <header className="profile-header">
            <div className="brand">
              <span className="brand-mark">L</span> LinkAcademy
            </div>
            <span className="status">
              <i /> Account attivo
            </span>
          </header>
          <div className="profile-content">
            <div className="intro">
              <p className="eyebrow">Area personale</p>
              <h1 id="page-title">Il tuo profilo</h1>
              <p>
                Gestisci qui i dati del tuo account e tieni al sicuro le tue
                credenziali.
              </p>
            </div>
            <User user={this.state} />
            <UserCode generateNewPassword={this.generateNewPassword} />
          </div>
        </section>
      </main>
    );
  }
}

export default App;
