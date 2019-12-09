import { Component, h, State } from '@stencil/core';

@Component({
  tag: 'nav-button-name',
//   styleUrl: './nav-buttons.css',
  shadow: true
})
export class NavButtonName {
  @State() name: number;

  componentWillLoad() {}
  getNameOfButton() {
    event.preventDefault();
    fetch(
      'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo'
    )
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        this.name = +parsedRes['Global Quote']['01. symbol'];
      })
      .catch(err => {
        console.log(err);
      });
    }



  render() {
    
    return(
        <button>{this.name}</button>

    )
  }
}
