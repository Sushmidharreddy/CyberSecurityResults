import React from 'react'
import './Header.css';

function Header() {
  return (
    <div className="header-container">
      <a href="/"><img
        className="header-logo"
        src="https://qualitythought.in/wp-content/uploads/2024/02/Quality_thought_logo.png"
        alt="Quality Thought Logo"
      />
      </a>
      <a className="header-link" href="https://qualitythought.in/contact-us/">Contact Us</a>
    </div>
  )
}

export default Header