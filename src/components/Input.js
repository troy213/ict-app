import React, { Component } from 'react';
import Output from './Output';

class Input extends Component {
  constructor(props){
    super(props);
    this.state = {
      area: "",
      kode: "",
      noAwal: "",
      noAkhir: "",
      in: "",
      rendCond: false
    }
    this.handleChange = this.handleChange.bind(this);
    this.handler = this.handler.bind(this);
    this.child = React.createRef();
  }

  handler = (value,e) => {
    this.setState({
      [value]: e
    });
    console.log(value+": "+e);
  }

  handleChange = (value,e) => {
    const eventTarget = e.target.value;
    this.setState({
      [value]: eventTarget
    });
  }

  prosesQry = () => {
    this.child.current.prosesQry();
  };

  proses = () => {
    this.child.current.proses();
  }

  rubahRender = () => {
    this.setState({
      rendCond: !this.state.rendCond
    });
  }

  render(){
    return(
      <>
        { this.state.rendCond === true ? (
          <>
            <table>
              <tbody>
                <tr>
                  <td><label htmlFor="area"><b>Area</b></label></td>
                  <td>
                    <input
                      id="area"
                      type="text"
                      name="area"
                      value={this.state.area}
                      onChange={e => this.handleChange("area",e)}
                      list="areadata"
                      placeholder="Area 1"
                    />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="4" align="center"><label htmlFor="in"><b>Query</b></label></td>
                  <td rowSpan="4" align="center">
                    <textarea id="in" name="in" rows="6" cols="30" onChange={e => this.handleChange("in",e)} placeholder="A1-100"></textarea>
                  </td>
                  <td rowSpan="4" align="center">
                    <button onClick={this.prosesQry} type="button" name="prosesqry" className="btn btn-primary">ProsesQuery</button>
                    <br />
                    <button onClick={this.rubahRender} type="button" name="rubahrender" className="rend btn btn-info">Manual Input</button>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="kode" hidden><b>Kode</b></label></td>
                  <td><input id="kode" type="text" name="kode" value={this.state.kode} onChange={e => this.handleChange("kode",e)} hidden/></td>
                </tr>
                <tr>
                  <td><label htmlFor="nomor1" hidden><b>Nomor Awal</b></label></td>
                  <td><input id="nomor1" type="number" name="nomor1" value={this.state.noAwal} onChange={e => this.handleChange("noAwal",e)} hidden/></td>
                </tr>
                <tr>
                  <td><label htmlFor="nomor2" hidden><b>Nomor Akhir</b></label></td>
                  <td><input id="nomor2" type="number" name="nomor2" value={this.state.noAkhir} onChange={e => this.handleChange("noAkhir",e)} hidden/></td>
                </tr>
              </tbody>
            </table>
          </>
        ) : (
          <>
            <table>
              <tbody>
                <tr>
                  <td><label htmlFor="area"><b>Area</b></label></td>
                  <td>
                    <input
                      id="area"
                      type="text"
                      name="area"
                      value={this.state.area}
                      onChange={e => this.handleChange("area",e)}
                      list="areadata"
                      placeholder="Area 1"
                    />
                  </td>
                  <td rowSpan="4" align="center"><label htmlFor="in" hidden><b>Query</b></label></td>
                  <td rowSpan="4" align="center">
                    <textarea id="in" name="in" rows="6" cols="30" onChange={e => this.handleChange("in",e)} hidden></textarea>
                  </td>
                  <td rowSpan="4" align="center">
                    <button onClick={this.proses} type="button" name="proses" className="btn btn-primary">Proses</button>
                    <br />
                    <button onClick={this.rubahRender} type="button" name="rubahrender" className="rend btn btn-info">Query Input</button>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="kode"><b>Kode</b></label></td>
                  <td>
                    <input
                      id="kode"
                      type="text"
                      name="kode"
                      value={this.state.kode}
                      onChange={e => this.handleChange("kode",e)}
                      placeholder="A"
                    />
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="nomor1"><b>Nomor Awal</b></label></td>
                  <td>
                    <input
                      id="nomor1"
                      type="number"
                      name="nomor1"
                      value={this.state.noAwal}
                      onChange={e => this.handleChange("noAwal",e)}
                      placeholder="1"
                    />
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="nomor2"><b>Nomor Akhir</b></label></td>
                  <td>
                    <input
                      id="nomor2"
                      type="number"
                      name="nomor2"
                      value={this.state.noAkhir}
                      onChange={e => this.handleChange("noAkhir",e)}
                      placeholder="999"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        <Output
          area={this.state.area}
          kode={this.state.kode}
          noAwal={this.state.noAwal}
          noAkhir={this.state.noAkhir}
          in={this.state.in}
          handler={this.handler}
          ref={this.child}
          rendCond={this.state.rendCond}
        />
      </>
    );
  }
}

export default Input;
