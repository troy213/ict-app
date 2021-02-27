import React, { Component } from 'react';
import { connect } from 'react-redux';

class Input extends Component {
  constructor(props){
    super(props);
    this.handler = this.handler.bind(this);
    this.proses = this.proses.bind(this);
    this.prosesQry = this.prosesQry.bind(this);
    this.child = React.createRef();
  }

  handler = (value,e) => {
    this.setState({
      [value]: e
    });
    console.log(value+": "+e);
  }

  proses(){
    var a = this.props.area;
    var b = this.props.kode;
    var c = Number(this.props.noAwal);
    var d = Number(this.props.noAkhir);

    if (c>d) {
      this.props.handleError("Nomor awal lebih besar dari nomor akhir!");
    } else if (b==="" || c==="" || d==="") {
      this.props.handleError("kolom masih kosong!");
    } else {
      for (var i = c; i <= d; i++) {
        document.getElementById("out").innerHTML += b + i + "\t" + a +"\n";
      }
      document.getElementById("logger").innerHTML = "";
    }
  }

  proses2(b,c,d){
    var a = this.props.area;

    if (c>d) {
      this.props.handleError("Nomor awal lebih besar dari nomor akhir!");
    } else if (b==="" || c===0 || d===0) {
      this.props.handleError("kolom masih kosong!");
    } else {
      for (var i = c; i <= d; i++) {
        document.getElementById("out").innerHTML += b + i + "\t" + a +"\n";
      }
      document.getElementById("logger").innerHTML = "";
    }
  }

  clr(){
    var clr = "";
    document.getElementById("out").innerHTML = clr;
    document.getElementById("in").innerHTML = clr;
    document.getElementById("logger").innerHTML = "";
    console.log("Clear");
  }

  prosesQry() {
    var qry = this.props.in;
    var etr = String.fromCharCode(10);
    var res = qry.split(etr);
    var x;
    var y;

    if (qry==="") {
      this.props.handleError("query masih kosong");
    } else {
      for (var i = 0; i < res.length; i++) {
        var j = 0;
        x = res[i].indexOf("-");
        y = res[i].length;
        while (isNaN(res[i].substr(j,1))) {
          j++;
        }
        var kode = res[i].substr(0,j);
        var noAwal = Number(res[i].substr(j,x-j));
        var noAkhir = Number(res[i].substr(x+1,y-x-1));

        this.handler("kode",kode);
        this.handler("noAwal",noAwal)
        this.handler("noAkhir",noAkhir);
        this.proses2(kode,noAwal,noAkhir);
      }
    }
  }

  copyContent(){
    document.getElementById("out").removeAttribute("disabled");
    document.getElementById("out").select();
    document.execCommand('copy');
    document.getElementById("out").setAttribute("disabled","");
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

        <p id="logger" className="text-danger">{this.props.err}</p>
        <br />
        <label htmlFor="output"><b>Hasil</b></label>
        <br />
        <textarea id="out" name="output" rows="10" cols="75" disabled></textarea>
        <br />
        <button onClick={this.clr} type="button" name="clear" className="btn btn-danger">Clear</button>
        <button onClick={this.copyContent} type="button" name="copy" className="btn btn-info">Copy</button>
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
    },
    handleError : (value) => {
      const action = { type: "handleError", value: value }
      dispatch(action);
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Input);
