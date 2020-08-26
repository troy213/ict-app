import React, { Component } from 'react';

class Output extends Component {
  constructor(props){
    super(props);
    this.state = {
      value: [],
      err: "",
    }
    this.proses = this.proses.bind(this);
    this.prosesQry = this.prosesQry.bind(this);
  }

  proses(){
    var a = this.props.area;
    var b = this.props.kode;
    var c = Number(this.props.noAwal);
    var d = Number(this.props.noAkhir);

    if (c>d) {
      this.setState({
        err: "Nomor awal lebih besar dari nomor akhir!"
      });
    } else if (b==="" || c==="" || d==="") {
      this.setState({
        err: "kolom masih kosong!"
      });
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
      this.setState({
        err: "Nomor awal lebih besar dari nomor akhir!"
      });
    } else if (b==="" || c===0 || d===0) {
      this.setState({
        err: "kolom masih kosong!"
      });
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
      this.setState({
        err:"query masih kosong"
      });
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

        this.props.handler("kode",kode);
        this.props.handler("noAwal",noAwal)
        this.props.handler("noAkhir",noAkhir);
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
        <p id="logger" className="text-danger">{this.state.err}</p>
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

export default Output;
