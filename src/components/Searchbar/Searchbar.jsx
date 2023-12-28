import { Component } from 'react';
import css from './Searchbar.module.css';

export class Searchbar extends Component {
  state = {
    input: '',
  };

  handleChange = e => {
    const { value } = e.target;
    this.setState({
      input: value,
    });
  };

  handleSubmit = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.input);
    this.resetSubmit();
  };

  resetSubmit = () => {
    this.setState({
      input: '',
    });
  };

  render() {
    const { input } = this.state;
    return (
      <header className="searchbar">
        <form onSubmit={this.handleSubmit} className="form">
          {input === '' ? (
            <button type="submit" className="button" disabled>
              <span className="button-label">Search</span>
            </button>
          ) : (
            <button type="submit" className="button">
              <span className="button-label">Search</span>
            </button>
          )}

          <input
            onChange={this.handleChange}
            className="input"
            type="text"
            value={input}
            autoComplete="off"
            autoFocus
            placeholder="Search images and photos"
          />
        </form>
      </header>
    );
  }
}
