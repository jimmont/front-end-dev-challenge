import { ChallengeDataService } from './ChallengeDataService.js';
import '/challenge-table.js';
import '/challenge-chart/dist/challenge-chart.js';
 
import {LitElement, html, css} from 'lit';

window.customElements.define("challenge-controls", class ChallengeControls extends LitElement {
/*
  static get styles() {
    return css`
      :host {
        color: red;
      }
      table {
        border: dashed purple;
      }
    `;
  }
*/ 
  static get properties() {
    return {
      // Feel free to refactor, change type, name, etc
      size: { type: String },
      data: { type: Array },
    };
  }

  constructor(){
	super();
	this.size = '';
	this.data = [`small`,`medium`,'large'];
	this.service = new ChallengeDataService();

	this.dataRefresh = this.dataRefresh.bind(this);
  }

  async dataRequest(size=''){
	const index = this.data.indexOf(size);
	let data = [];
	let req; 
	if(index > -1){
		req = this.service.getDataSet(size);
	}else{
		req = Promise.resolve(data);
	};
	req.then(this.dataRefresh)
		.catch(console.error)
		.finally(()=>{
			console.log(`finished dataRequest`);
		});

  }

  _xColumn(data, value, index){
	const {table, yColumn, plot, precision = 5} = data;
	const x = value;//.toPrecision(precision);
	const y = yColumn[index];//.toPrecision(precision);
	table[index] = [x, y];
	plot[index] = {x,y};

	return data;
  }

  async dataRefresh({
		name='',
		xColumn={values:[],name:''},
		yColumn={values:[],name:''},
  }){
	//console.warn(`dataRefresh (${ name }) >`,{xColumn,yColumn});
	const cols = [xColumn.name, yColumn.name];
	const data = xColumn.values.reduce(this._xColumn, {yColumn:yColumn.values,table:[],plot:[]});
	const table = this.querySelector('challenge-table');
	const chart = this.querySelector('challenge-chart');
	table.header = cols;
	table.data = data.table;
	table.tableName = name;
	chart.data = data.plot;
  }

  change({ type, target:{value=''} }){
	this.dataRequest(value);
  }

  render() {
return html`
<form>
<label>size
	<select @change=${ this.change }>
	<option value="">choose</option>
	${this.data.map(
		(size, i) => html`<option value="${ size }">${ size }</option>`
	)}
	<!--
	<option value="stop">clear</option>
	-->
	</select>
</label>
<!--
<br>
<label>streaming <button type=button>start</button>
</label>
-->
<slot></slot>
</form>
`;
  }
})

