import {LitElement, html, css} from 'lit';

export class ChallengeTable extends LitElement {
  static get styles() {
    return css`
      :host {
        color: #000;
      }
      table {
        border: dotted #ddd;
        min-width: 3rem;
        min-height: 3rem;
        position: relative;
      }
      th{
        position: sticky;
        top: 0;
        background: #fff;
        text-align: left;
      }
    `;
  }
  
  static get properties() {
    return {
      // Feel free to refactor, change type, name, etc
      tableName: { type: String },
      header: { type: Array },
      data: { type: Array },
    };
  }

  constructor(){
    super();
    this.tableName = '';
    this.data = [];
    this.header = [];
  }

  render() {
    return html`
      <h1>${this.tableName}</h1>
      <table>
      <thead>
        <tr>
        ${ this.header.map((text='') => html`
		<th>${ text }</th>
        `) }
        </tr>
      </thead>
      <tbody>
        ${this.data.map(
          (dataRow) => html`
            <tr>
              <td>${dataRow[0]}</td>
              <td>${dataRow[1]}</td>
              <td></td>
            </tr>
          `
        )}
      </table>
    `;
  }
}
window.customElements.define("challenge-table", ChallengeTable);
