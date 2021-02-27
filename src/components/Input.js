import React, { Component } from 'react';
import Output from './Output';
import { connect } from 'react-redux';

class Input extends Component {
  constructor(props){
    super(props);
    this.handler = this.handler.bind(this);
    this.child = React.createRef();
  }

  handler = (value,e) => {
    this.setState({
      [value]: e
    });
    console.log(value+": "+e);
  }

  prosesQry = () => {
    this.child.current.prosesQry();
  };

  proses = () => {
    this.child.current.proses();
  }

  render(){
    return(
      <>
        { this.props.rendCond === true ? (
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
                      value={this.props.area}
                      onChange={e => this.props.handleChange("area",e)}
                      list="areadata"
                      placeholder="Area 1"
                    />
                  </td>
                </tr>
                <tr>
                  <td rowSpan="4" align="center"><label htmlFor="in"><b>Query</b></label></td>
                  <td rowSpan="4" align="center">
                    <textarea id="in" name="in" rows="6" cols="30" onChange={e => this.props.handleChange("in",e)} placeholder="A1-100"></textarea>
                  </td>
                  <td rowSpan="4" align="center">
                    <button onClick={this.prosesQry} type="button" name="prosesqry" className="btn btn-primary">Proses Query</button>
                    <br />
                    <button onClick={this.props.rubahRender} type="button" name="rubahrender" className="rend btn btn-info">Manual Input</button>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="kode" hidden><b>Kode</b></label></td>
                  <td><input id="kode" type="text" name="kode" value={this.props.kode} onChange={e => this.props.handleChange("kode",e)} hidden/></td>
                </tr>
                <tr>
                  <td><label htmlFor="nomor1" hidden><b>Nomor Awal</b></label></td>
                  <td><input id="nomor1" type="number" name="nomor1" value={this.props.noAwal} onChange={e => this.props.handleChange("noAwal",e)} hidden/></td>
                </tr>
                <tr>
                  <td><label htmlFor="nomor2" hidden><b>Nomor Akhir</b></label></td>
                  <td><input id="nomor2" type="number" name="nomor2" value={this.props.noAkhir} onChange={e => this.props.handleChange("noAkhir",e)} hidden/></td>
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
                      value={this.props.area}
                      onChange={e => this.props.handleChange("area",e)}
                      list="areadata"
                      placeholder="Area 1"
                    />
                  </td>
                  <td rowSpan="4" align="center"><label htmlFor="in" hidden><b>Query</b></label></td>
                  <td rowSpan="4" align="center">
                    <textarea id="in" name="in" rows="6" cols="30" onChange={e => this.props.handleChange("in",e)} hidden></textarea>
                  </td>
                  <td rowSpan="4" align="center">
                    <button onClick={this.proses} type="button" name="proses" className="btn btn-primary">Proses</button>
                    <br />
                    <button onClick={this.props.rubahRender} type="button" name="rubahrender" className="rend btn btn-info">Query Input</button>
                  </td>
                </tr>
                <tr>
                  <td><label htmlFor="kode"><b>Kode</b></label></td>
                  <td>
                    <input
                      id="kode"
                      type="text"
                      name="kode"
                      value={this.props.kode}
                      onChange={e => this.props.handleChange("kode",e)}
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
                      value={this.props.noAwal}
                      onChange={e => this.props.handleChange("noAwal",e)}
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
                      value={this.props.noAkhir}
                      onChange={e => this.props.handleChange("noAkhir",e)}
                      placeholder="999"
                    />
                  </td>
                </tr>
              </tbody>
            </table>
          </>
        )}

        <Output
          area={this.props.area}
          kode={this.props.kode}
          noAwal={this.props.noAwal}
          noAkhir={this.props.noAkhir}
          in={this.props.in}
          handler={this.handler}
          ref={this.child}
          rendCond={this.props.rendCond}
        />
      </>
    );
  }
}

const mapStateToProps = (state) => {
  return state;
}

const mapDispatchToProps = (dispatch) => {
  return {
    handleChange : (store, e) => {
      const eventTarget = e.target.value;
      const action = { type: "handleChange", store: store, value: eventTarget }
      dispatch(action);
    },
    rubahRender : () => {
      const action = { type: "rubahRender" }
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
