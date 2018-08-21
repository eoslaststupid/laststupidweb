import React, { Component } from 'react';
import './App.css';
import Header from './Header'
import Top3banner from './Top3banner'
import Countdown from './Countdown'
import { Grid,Row,Col,Panel,Button,Table,FormGroup,InputGroup,FormControl } from 'react-bootstrap';
import Eos from 'eosjs'

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
      remaningTime : 0,
      capitalPool: '0 EOS',
      prevDisabled: true,
      nextDisabled: true,
    }

    this.perPage = 1 //history每页显示条数
    this.currentPage = 1 //当前页
    this.selfAccount = 'eosiostupid4'
    this.scatter = undefined
    this.eos     = undefined
    this.Eos     = undefined
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
    this.eos.getTableRows(true, this.selfAccount, this.selfAccount, 'stupids', 'id', 0, -1, 99999).then(obj => {
      const history = obj.rows
        .map(item => ({
          account: item.name,
          profit: 0,
          putin: 123,
          id: item.id + 1,
        }))
        .sort((history1, history2) => history2.id - history1.id)
      if(this.state.history.toString() != history.toString()){
        this.setState({history})
        this.whichPartShow()
      }
    })
  }

  getCurrentRecords = () =>{ //获取当前轮次所有参与记录
    this.eos.getTableRows(true, this.selfAccount, this.selfAccount, 'claims', 'stupidIndex', 0, -1, 99999).then(obj => {

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


        let minimumBet =  stupids[0].amount.replace(/ EOS/,'') * 10000 * 1.1 / 10000
        let rt = 24 * 60 * 60 - Math.round((Date.parse(new Date()) - Date.parse(new Date(stupids[0].bettime))) / 1000)
        let remaningTime = rt > 0 ? rt : 0

        // console.log(stupids[0].amount.replace(/ EOS/,''))
        // console.log(minimumBet,'---',remaningTime)

        if (stupids.toString() != this.state.betRecord.toString()) {
          this.setState({betRecord: stupids, currentStupidOrder, currentStupid: stupids[0].account, minimumBet, remaningTime})
        }



        // console.log('max:', currentStupidOrder)
        //  console.log(...obj.rows)


        // console.log(obj)
        //
        // let newestRecords = []
        // const len = obj.rows.length
        //
        // for(let i in obj.rows){
        //
        //   if(obj.rows[len - i - 1].price == '1.0000 EOS'){//判断是哪个轮次
        //     let tem = {account: obj.rows[len - i - 1].name, amount: obj.rows[len - i - 1].price, bettime: this.formatDate(obj.rows[len - i - 1].claimTime)}
        //     newestRecords.push(tem)
        //     break
        //   }
        //
        //   //console.log(row.name, '--',row.price, '----', '----',row.claimTime, this.formatDate(row.claimTime))
        // }
        // this.setState({betRecord: newestRecords})
        // console.log('betRecord:', this.state.betRecord)

      },err=>
        console.log('err:',err)
    )
  }


  getCapitalPool = async () => {
    const eosaccount = await this.eos.getAccount(this.selfAccount)
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
    // TODO: fetch data from here

    document.addEventListener('scatterLoaded',async scatterExtension => {
      this.scatter = window.scatter;
      this.eos = this.scatter.eos( this.network, Eos, {}, this.network.protocol);


      this.getCurrentRecords()
      this.getCapitalPool()
      this.getHistoryStupids()

      setInterval(()=>{
        this.getCapitalPool()
        this.getCurrentRecords()
        this.getHistoryStupids()
      }, 60000)

      const myContract =  this.eos.contract(this.selfAccount);

      myContract.then(obj => {

      },err => {

      })






    })

  }

  componentDidMount(){

  }

  async loginScatter(){

    this.scatter.authenticate().then(async sig =>{

      this.scatter.forgetIdentity();
      this.loginScatter() //每一次支付时，都让用户选择账号

    },err=>{

    })

    this.scatter.getIdentity({ accounts:[this.network] }).then(identity=>
    {
      let account = identity.accounts.find(acc => acc.blockchain === 'eos')
      console.log('account', account)
      return account
    },err=>{
      alert('接盘失败')
    })

  }

  // loginScatter = async () => {
  //   this.scatter.getIdentity({ accounts:[this.state.network] }).then(async identity=>
  //   {
  //     let account = identity.accounts.find(acc => acc.blockchain === 'eos')
  //     console.log(account)
  //   },err=>{
  //     console.log(err)
  //   })
  // }

  jiepan = ()=>{

    const baseBet = this.state.minimumBet * 10000 / 1.1
    if(this.state.betprice * 10000 < baseBet * 1.1 || this.state.betprice * 10000 > baseBet * 3) {
      alert('本轮接盘价需在 '+ baseBet * 1.1 / 10000 + ' 至 ' + baseBet * 3 / 10000 + ' EOS之间')
      return false
    }

    //todo: 发送数据

    this.loginScatter().then(
      (val)=>{
        console.log('val===>',val)

      },err=>{
        console.log('err===>',err)

      })

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

    if(this.currentPage == 1){
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
    //todo: 判断值是否是1.1倍到3倍
    const baseBet = this.state.minimumBet * 10000 / 1.1
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
      <div className="App">

        <Header/>

        <Top3banner  currentStupid = {this.state.currentStupid} currentStupidOrder = {this.state.currentStupidOrder}  minimumBet = {this.state.minimumBet}  capitalPool = {this.state.capitalPool} />

        <Countdown seconds={this.state.remaningTime} />

        <Grid>
          <Row  className="per-title order-list">
            <Col xs={12} md={3}>
            <span>接盘记录</span>
            </Col>

            <Col  xs={12} md={9}>
              <Col xs={0} md={5}>
              </Col>
              <Col xs={12} md={7}>


                <FormGroup>
                  <InputGroup className="inputGroup">
                    <FormControl type="text" name="betprice" id="betValue" onKeyUp= {this.formatInput} placeholder={'最低接盘价 ' + this.state.minimumBet + ' EOS'}/>
                    <InputGroup.Button>
                      <Button bsStyle="danger" onClick = {this.jiepan} >我来接盘</Button>
                    </InputGroup.Button>
                  </InputGroup>
                </FormGroup>
              </Col>

            </Col>
          </Row>

          {this.renderBetRecords()}

          <Row style={{margin:"0"}}>
            <div className="per-title" id="game-rule">游戏规则</div>
              <ul className="list-group rule-ul">
                <li className="list-group-item">1、第一个成为stupid的人需要支付1个EOS，随后每一个接盘侠最少需要支付前一个人接盘金额的1.1倍，也可以选择支付更多但上限为3倍；</li>
                <li className="list-group-item">2、接盘的资金将进入上一个玩家的钱包，所以一旦有其他玩家来接盘，你将至少获得10%的利润，除去手续费；</li>
                <li className="list-group-item">3、用户可以根据当前形势决定自己要支付的金额，支付的越多风险越高，但是收益也越高；</li>
                <li className="list-group-item">4、如果某玩家接盘后超过12小时没有人再来接盘，那么此玩家将成为Last Stupid，本轮游戏结束，进入下一轮；</li>
                <li className="list-group-item">5、游戏过程中将收取5%的总费用，其中2%作为DAPP运营费用，3%作为资金池；</li>
                <li className="list-group-item">6、每轮游戏的Last Stupid可以在后续游戏积累的资金池中享受永久分红，分红比例按照所有Last Stupid的个数平均分配；</li>
                <li className="list-group-item">7、分红总量为资金池总额的70%，剩余资金将积累到下一轮；</li>
              </ul>
          </Row>

          <Row style={{margin:"0"}}>
            <div className="per-title" id="history-records">历史记录</div>
            <Table className="history-ul" responsive>
              <thead>
                <tr>
                  <th>轮次</th>
                  <th>玩家</th>
                  <th>投入</th>
                  <th>分红收益</th>
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
