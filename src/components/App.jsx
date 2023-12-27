import { Component } from 'react';
import PixabayApiService from './helpers/helper-api';

const pixabayAPI = new PixabayApiService();

export class App extends Component {
  state = {};

  componentDidMount() {
    pixabayAPI.getPixabayData();
  }

  render() {
    return <h1>finder H22W</h1>;
  }
}
