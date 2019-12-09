import { Component, h, State, Prop } from '@stencil/core';

@Component({
  tag: 'nav-button',
  styleUrl: './nav-buttons.css',
  shadow: true
})
export class NavButton {
  @State() fetchedInfo: number;

  fetchInfoFromObject(event: Event) {
    event.preventDefault();
    fetch(
      'https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=MSFT&apikey=demo'
    )
      .then(res => {
        return res.json();
      })
      .then(parsedRes => {
        console.log(parsedRes);
        this.fetchedInfo = +parsedRes['Global Quote']['05. price'];
      })
      .catch(err => {
        console.log(err);
      });
  }


  render() {
    
    return[
      <form onSubmit={this.fetchInfoFromObject.bind(this)}>
        <nav-button-name></nav-button-name>
      </form>,
        <div>
          <p>Dummy Information: {this.fetchedInfo}</p>
        </div>

    ];
  }
}
