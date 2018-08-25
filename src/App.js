import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Top3banner from './Top3banner'
import Countdown from './Countdown'
import { Grid,Row,Col,Button,Table,FormGroup,InputGroup,FormControl } from 'react-bootstrap';
import Eos from 'eosjs'
import intl from 'react-intl-universal'
import cookie from 'cookie'


const locales = {
  "en-US": require('./locales/en-US.js'),
  "zh-CN": require('./locales/zh-CN.js'),
};

class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      betRecord: [],
      history:[],
      whichPartShow: [],
      betprice : 0,
      currentStupidOrder: 0,
      currentStupid: 'loading...',
      minimumBet: 0,
      maxBet: 0,
      remaningTime : 0,
      capitalPool: '0 EOS',
      prevDisabled: true,
      nextDisabled: true,
      initDone: false,
    }

    this.perPage = 10 //history每页显示条数
    this.currentPage = 1 //当前页
    this.selfAccount = 'eosiostupid4'
    this.scatter = undefined
    this.eos     = undefined
    this.Eos     = undefined
    this.originEos = undefined //eosjs原生
    this.network = {
      protocol:'https',
      blockchain:'eos',
      host:'api-kylin.eosasia.one',
      port:443,
      chainId:'5fff1dae8dc8e2fc4d5b23b2c7665c97f9e9d8edf2b6485a86ba311c25639191',
      verbose:true
    }
  }



  stupidIndexSplit = originIndex => ({
    stupidOrder: originIndex & 0xff,//排序
    stupidIndexOrder: originIndex >> 8,//轮次
   // console.log('originIndex:',originIndex,'')
  })

  getHistoryStupids = () =>{
    this.originEos.getTableRows(true, this.selfAccount, this.selfAccount, 'stupids', 'id', 0, -1, 99999).then(obj => {
      const history = obj.rows
        .map(item => ({
          account: item.name,
          profit: item.bonus,
          putin: item.claim,
          id: item.id + 1,
        }))
        .sort((history1, history2) => history2.id - history1.id)
      if(this.state.history.toString() !== history.toString()){
        this.setState({history})
        this.whichPartShow()
      }
    })
  }

  getCurrentRecords = () =>{ //获取当前轮次所有参与记录
    this.originEos.getTableRows(true, this.selfAccount, this.selfAccount, 'claims', 'stupidIndex', 0, -1, 99999).then(obj => {

        const currentStupidOrder = Math.max(
          ...obj.rows.map(
            claim => this.stupidIndexSplit(claim.stupidIndex).stupidIndexOrder,
          ),
        )

        const stupids = obj.rows
          .filter(
            claim =>
              this.stupidIndexSplit(claim.stupidIndex).stupidIndexOrder ===
              currentStupidOrder,
          )
          .map(claim => ({
            account: claim.name,
            amount: claim.price,
            bettime: this.formatDate(claim.claimTime),
            stupidOrder: this.stupidIndexSplit(claim.stupidIndex).stupidOrder,

          }))
          .sort((stupid1, stupid2) => stupid2.stupidOrder - stupid1.stupidOrder)


        let minimumBet =  Math.ceil(stupids[0].amount.replace(/ EOS/,'') * 1.1 * 10000) / 10000
        let maxBet = Math.floor(stupids[0].amount.replace(/ EOS/,'') * 3 * 10000) / 10000

        let rt = 12 * 60 * 60 - Math.round((Date.parse(new Date()) - Date.parse(new Date(stupids[0].bettime))) / 1000)
        let remaningTime = rt > 0 ? rt : 0

        // console.log(stupids[0].amount.replace(/ EOS/,''))
        // console.log(minimumBet,'---',remaningTime)

        // if (stupids.toString() !== this.state.betRecord.toString()) {
          this.setState({betRecord: stupids, currentStupidOrder, currentStupid: stupids[0].account, minimumBet, maxBet, remaningTime})
        // }

      },err=>
        console.log('err:',err)
    )
  }


  getCapitalPool = async () => {
    const eosaccount = await this.originEos.getAccount(this.selfAccount)
    const balance	=	eosaccount.core_liquid_balance ? eosaccount.core_liquid_balance : '0 EOS'
    // console.log('eosaccount:', eosaccount)
    this.setState({capitalPool: balance})
    // console.log('capitalPool:', this.state.capitalPool)
  }



  formatDate(time){ //格式化时间

    const date = new Date(1000 * time);//需要13位

    const year = date.getFullYear(),
          month = date.getMonth() + 1,//月份是从0开始的
          day = date.getDate(),
          hour = date.getHours(),
          min = date.getMinutes(),
          sec = date.getSeconds();
    const newTime = year + '-' +
                    month + '-' +
                    day + ' ' +
                    hour + ':' +
                    min + ':' +
                    sec;
    return newTime;
  }

  componentWillMount() {

    const httpEndpoint =   this.network.protocol + '://' +this.network.host
    const chainId = this.network.chainId
    this.originEos = Eos({httpEndpoint, chainId})

    this.getCurrentRecords()
    this.getCapitalPool()
    this.getHistoryStupids()

    setInterval(()=>{
      this.getCapitalPool()
      this.getCurrentRecords()
      this.getHistoryStupids()
    }, 10000)


    document.addEventListener('scatterLoaded',async scatterExtension => {
      this.scatter = window.scatter;
      this.eos = this.scatter.eos( this.network, Eos, {}, this.network.protocol);



      const myContract =  this.eos.contract(this.selfAccount);

      myContract.then(obj => {

      },err => {

      })






    })

  }

  componentDidMount(){
    this.loadLocales()
  }

  loadLocales() {


    intl.init({
      currentLocale: cookie.parse(document.cookie).lang ? cookie.parse(document.cookie).lang : 'zh-CN',
      locales,
    })
      .then(() => {

        this.setState({initDone: true});
      });


    console.log('intl1111：',intl.options)
    // console.log('kaishi:', intl.determineLocale())
    // console.log('document.cookie:', document.cookie)
    // document.cookie = cookie.serialize("lang", "zh-CN");
    // console.log('document.cookie:', document.cookie)
    // console.log('jiesu:', intl.determineLocale())
    // console.log(cookie.parse(document.cookie))
    console.log('intl2222：',intl.options)
  }

  async scatterPost(){

    this.scatter.authenticate().then(async sig =>{

      await this.scatter.forgetIdentity();
      this.scatterPost() //每一次支付时，都让用户选择账号
      return false;
    },err=>{
      throw err
    })

    this.scatter.getIdentity({ accounts:[this.network] }).then(identity=>
    {
      let account = identity.accounts.find(acc => acc.blockchain === 'eos')
      console.log('account', account)
      const eosioContract =  this.eos.contract('eosio.token')
      eosioContract.then(contract => {
          const options = {
            authorization: `${account.name}@${account.authority}`,
            broadcast: true,
            sign: true
          };
          contract
            .transfer(
              account.name,
              this.selfAccount,
              parseFloat(this.state.betprice).toFixed(4) + ' EOS',
              '',
              options
            )
            .then(resl => {
                this.getCurrentRecords()
                this.getCapitalPool()
                this.getHistoryStupids()
                console.log('resl:', resl)
                document.getElementById('betValue').value = ''
                alert(intl.get('PAYMENT_SUCCESS'))
              },error => {
                this.scatter.forgetIdentity().then(() => {})
                let errorMessage = ``
                if (typeof error === `object`) errorMessage = error.message
                else {
                  const innerError = JSON.parse(error).error
                  errorMessage =
                    innerError.details.length > 0
                      ? innerError.details
                        .map(({ message }) => message)
                        .join(`;`)
                        .replace(`condition: assertion failed: `, ``)
                      : innerError.what
                }
                if (errorMessage.trim() === `unknown key:`) errorMessage = `No such account`
                alert(intl.get('PAYMENT_FAILED'))
                throw errorMessage

            })
        },err =>
          console.log(err)
      )
      .catch(err =>
        this.scatter.forgetIdentity().then(() => {
        throw err
      }),
      )
      return account
    },err=>{
      alert(intl.get('PAYMENT_FAILED'))
    })

  }


  jiepan = ()=>{

    if(this.state.betprice < this.state.minimumBet || this.state.betprice > this.state.maxBet) {
      alert(intl.get('PAYMENT_SECTION', {'minimumBet': this.state.minimumBet, 'maxBet': this.state.maxBet}))
      return false
    }

    this.scatterPost()

  }

  clickPrev = () => {

    if(this.currentPage > 1){
      this.currentPage --
      this.whichPartShow()
    }

  }

  clickNext = () => {

    this.currentPage ++
    this.whichPartShow()

  }

  whichPartShow(){
    let tem = this.state.history
    let begin = this.perPage * (this.currentPage - 1)
    let end = this.perPage * (this.currentPage - 1) + this.perPage

    this.setState({whichPartShow: tem.slice(begin, end)})

    if(this.currentPage === 1){
      this.setState({prevDisabled: true})
    }else{
      this.setState({prevDisabled: false})
    }

    if(this.state.history.length > end){
      this.setState({nextDisabled: false})
    }else{
      this.setState({nextDisabled: true})
    }
  }

  formatInput = (e) => {
    e.target.value = e.target.value.replace(/[^\d.]/g,"");
    e.target.value = e.target.value.replace(/^\./g,"");
    e.target.value = e.target.value.replace(/\.{2,}/g,".");
    e.target.value = e.target.value.replace(".","$#$").replace(/\./g,"").replace("$#$",".");
    e.target.value = e.target.value.replace(/^(\-)*(\d+)\.(\d\d\d\d).*$/,'$1$2.$3');

    this.setState({betprice: e.target.value})


  }

  renderBetRecords() {
    return (
      <Row style={{margin:"0"}}>
        <Table responsive>
          <tbody style={{border:"4px solid rgb(65, 117, 105)"}}>
          {this.state.betRecord.map((rcd,index) => {
            return (
              <tr key={index}>
                <td>{rcd.account}</td>
                <td>{rcd.amount}</td>
                <td>{rcd.bettime}</td>
              </tr>
            )
          })}
          </tbody>
        </Table>
      </Row>
    )
  }

  renderHistory(){
    return (
      this.state.whichPartShow.map((item,index)=>{
        return (
          <tr key={index} >
            <td>#{item.id}</td>
            <td>{item.account}</td>
            <td>{item.putin}</td>
            <td>{item.profit}</td>
          </tr>
        )
      })

    )
  }

  render() {
    return (
      this.state.initDone &&
      <div className="App">

        <Header intl = {intl}/>

        <Top3banner intl = {intl} currentStupid = {this.state.currentStupid} currentStupidOrder = {this.state.currentStupidOrder}  minimumBet = {this.state.minimumBet}  capitalPool = {this.state.capitalPool} />

        <Countdown seconds={this.state.remaningTime} />

        <Grid>
          <Row  className="per-title order-list">
            <Col xs={12} md={3}>
            <span>{intl.get('OFFER_RECORDS')}</span>
            </Col>

            <Col  xs={12} md={9}>
              <Col xs={0} md={5}>
              </Col>
              <Col xs={12} md={7}>


                <FormGroup>
                  <InputGroup className="inputGroup">
                    <FormControl type="text" name="betprice" id="betValue" onKeyUp= {this.formatInput} placeholder={intl.get('OFFER_MINIMAL') + ' ' + this.state.minimumBet + ' EOS'}/>
                    <InputGroup.Button>
                      <Button bsStyle="danger" onClick = {this.jiepan} >{intl.get('QUOTATION')}</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              </Col>

            </Col>
          </Row>

          {this.renderBetRecords()}

          <Row style={{margin:"0"}}>
            <div className="per-title" id="game-rule">{intl.get('GMAE_RULE')}</div>
              <ul className="list-group rule-ul">
                <li className="list-group-item">{intl.get('RULE_1')}</li>
                <li className="list-group-item">{intl.get('RULE_2')}</li>
                <li className="list-group-item">{intl.get('RULE_3')}</li>
                <li className="list-group-item">{intl.get('RULE_4')}</li>
                <li className="list-group-item">{intl.get('RULE_5')}</li>
                <li className="list-group-item">{intl.get('RULE_6')}</li>
                <li className="list-group-item">{intl.get('RULE_7')}</li>
              </ul>
          </Row>

          <Row style={{margin:"0"}}>
            <div className="per-title" id="history-records">{intl.get('HISTORY')}</div>
            <Table className="history-ul" responsive>
              <thead>
                <tr>
                  <th>{intl.get('ROUND')}</th>
                  <th>{intl.get('PLAYER')}</th>
                  <th>{intl.get('PUT_INTO')}</th>
                  <th>{intl.get('DIVIDEND_INCOM')}</th>
                </tr>
              </thead>

              <tbody>

                {this.renderHistory()}
              </tbody>
            </Table>
            <div className="click-div">
              <Button className="prev" disabled = {this.state.prevDisabled} onClick = {this.clickPrev}>
                &lt;&lt;
              </Button>

              <Button className="next" disabled = {this.state.nextDisabled} onClick = {this.clickNext}>
                >>
              </Button>
            </div>
          </Row>



        </Grid>

        <Row style={{margin:"0"}} className="footer">
          <span>Copyright © BlackCat 2018</span>
        </Row>

      </div>
    );
  }
}

export default App;
