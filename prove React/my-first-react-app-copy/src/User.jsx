import React, { Component } from "react";
class User extends Component {
  render() {
    return (
      <section className="user-card" aria-label="Dati utente">
        <div className="user-identity">
          <div className="avatar" aria-hidden="true">{this.props.user.name.split(" ").map((part) => part[0]).join("")}</div>
          <div>
            <p className="user-name">{this.props.user.name}</p>
            <p className="user-role">Studente LinkAcademy</p>
          </div>
        </div>
        <dl className="details-list">
          <div><dt><span>✉</span> Email</dt><dd>{this.props.user.email}</dd></div>
          <div><dt><span>◷</span> Data di nascita</dt><dd>{this.props.user.dateOfBirth}</dd></div>
          <div className="password-detail"><dt><span>⌁</span> Password</dt><dd><code>{this.props.user.password}</code></dd></div>
        </dl>
      </section>
    );
  }
}

export default User;
