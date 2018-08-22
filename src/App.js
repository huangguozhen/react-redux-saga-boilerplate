import React, { Component } from 'react';
import { connect } from 'react-redux';
import withStyles from '@material-ui/core/styles/withStyles';
import Grid from "@material-ui/core/Grid";
import Button from '@material-ui/core/Button';
import EzvizLive from './components/EzvizLive';
import Header from './components/Header';
import Sidebar from './components/Sidebar';
import Threshold from './components/Threshold';
import DevTable from './components/DevTable';
import CtrlPanel from './components/CtrlPanel';
import ChartPanel from './components/Chart';

import {
  fetchAll,
  update as updateG,
} from './actions/group';
import {
  DEVICE,
  fetchAll as fetchDev,
  updateDps,
  fetchDevData,
  control
} from './actions/device';

import wsClient from './utils/wsClient';
const client = new wsClient(`ws://${window.location.host}`);

const styles = theme => ({
  wrapper: {
    position: 'relative',
    top: 0,
    height: '100vh'
  },
  container: {
    overflow: 'auto',
    position: 'relative',
    // float: 'right',
    maxHeight: 'calc(100vh - 100px)',
    width: 'calc(100% - 150px)',
    overflowScrolling: 'touch'
  },
  inner: {
    padding: 15
  },
  row: {},
  button: {
    borderRadius: 0,
    minWidth: 'auto',
    padding: '8px 4px'
  }
});

const moment = require('moment');

class App extends Component {
  static defaultProps = {
    groups: [],
    series: [{
      name: '空气温度(℃)',
      data: []
    }, {
      name: '空气湿度(%)',
      data: []
    }, {
      name: '土壤湿度(%)',
      data: []
    }, {
      name: '光照强度(Lx)',
      data: []
    }, {
      name: 'CO₂浓度(ppm)',
      data: []
    }]
  };

  state = {
    tab: 'left',
    menu: 0,
    period: 1,
    span: 12
  };

  async componentDidMount () {
    const { dispatch } = this.props;

    await dispatch(fetchAll());
    this.getDevice();

    client.onMessage = (payload) => {
      console.log(payload);
      const { body: { prdId, devId, data }, ...opts } = JSON.parse(payload);
      if (prdId === 'd8b2dce90000042d') {
        // 控制设备
        dispatch({ type: DEVICE, controller: data });
      } else if (prdId === '5a3aa6970000042c') {
        // 传感器设备
        dispatch(updateDps(devId, data, opts));
      }
    };

    client.connect();
  }

  handleChangeTab = (tab) => this.setState({ tab });

  handleChangeMenu = (menu) => {
    this.setState({ menu }, () => {
      this.getDevice();
    });
  }

  getThreshold = () => {
    const threshold = [];
    const group = this.props.groups[this.state.menu];
    if (!group) return threshold;

    threshold.push({
      img: require('./assets/img/threshold1.png'),
      min: group.airTempMin,
      max: group.airTempMax,
      desc: '空气温度(℃)'
    });

    threshold.push({
      img: require('./assets/img/threshold2.png'),
      min: group.airHumiMin,
      max: group.airHumiMax,
      desc: '空气湿度(%)'
    });

    threshold.push({
      img: require('./assets/img/threshold3.png'),
      min: group.solHumiMin,
      max: group.solHumiMax,
      desc: '土壤湿度(%)'
    });

    threshold.push({
      img: require('./assets/img/threshold4.png'),
      min: group.illumMin,
      max: group.illumMax,
      desc: '光照强度(Lx)'
    });

    threshold.push({
      img: require('./assets/img/threshold5.png'),
      min: group.co2Min,
      max: group.co2Max,
      desc: 'CO₂浓度(ppm)'
    });

    threshold.push({
      img: require('./assets/img/threshold6.png'),
      min: 15,
      max: 100,
      desc: '电池电量(%)'
    });

    return threshold;
  }

  getDevice = async () => {
    const group = this.props.groups[this.state.menu];
    if (group) {
      const devices = await this.props.dispatch(fetchDev(group['_id']));
      // const { start, end } = this.state;
      if (devices.length > 0) {
        const devId = this.state.selectedDev || devices[0].devId;
        this.fetchDevData(devId, this.state.period);
      } else {
        this.props.dispatch({ type: DEVICE, series: App.defaultProps.series });
      }
    }
  }

  handleControl = ({ currentTarget: { value } }, checked) => {
    try {
      this.props.dispatch(control(parseInt(value, 10), checked ? 1 : 0));
    } catch (err) {/**/}
  }

  fetchDevData = (devId, period) => {
    try {
      const end = moment().unix();
      const start = end - period * 24 * 3600;
      this.setState({ selectedDev: devId, period });

      this.props.dispatch(fetchDevData(devId, start, end));
    } catch (err) {/**/}
  }

  handleSetThreshold = (gId, data) => {
    return this.props.dispatch(updateG(gId, data));
  }

  render() {
    const { classes, groups, devices, controller } = this.props;
    return (
      <div className={classes.wrapper}>
        <Header
          active={this.state.tab}
          onChangeTab={this.handleChangeTab}
        />
        <div
          className={classes.content}
          style={{
            display: this.state.tab === 'left' ? 'block' : 'none'
          }}
        >
          <Sidebar
            routes={groups}
            active={this.state.menu}
            onChangeMenu={this.handleChangeMenu}
          />
          <div className={classes.container}>
            <div className={classes.inner}>
              <div className={classes.row}>
                <Threshold
                  update={this.handleSetThreshold}
                  group={groups[this.state.menu]}
                  data={this.getThreshold()}
                />
                <DevTable
                  data={devices}
                  period={this.state.period}
                  group={groups[this.state.menu]}
                  fetchDevData={this.fetchDevData}
                />
              </div>
              <div className={classes.row} style={{ marginTop: 10 }}>
                <CtrlPanel
                  data={controller}
                  onChange={this.handleControl}
                />
                <ChartPanel
                  selectedDev={this.state.selectedDev}
                  period={this.state.period}
                  series={this.props.series}
                  fetchDevData={this.fetchDevData}
                />
              </div>
            </div>
          </div>
        </div>
        <div
          style={{
            display: this.state.tab === 'right' ? 'block' : 'none',
            height: 'calc(100vh - 140px)' }}
          >
          <Grid style={{ paddingLeft: 24 }}>
            <Button
              classes={{ root: classes.button }}
              onClick={() => this.setState({ span: 12 })}
            >
              <img
                style={{ height: 24 }}
                src={require('./assets/img/grid12.svg')}
                alt='12'
              />
            </Button>
            <Button
              classes={{ root: classes.button }}
              onClick={() => this.setState({ span: 6 })}
            >
              <img
                style={{ height: 24 }}
                src={require('./assets/img/grid6.svg')}
                alt='12'
              />
            </Button>
            <Button
              classes={{ root: classes.button }}
              onClick={() => this.setState({ span: 4 })}
            >
              <img
                style={{ height: 24 }}
                src={require('./assets/img/grid4.svg')}
                alt='12'
              />
            </Button>
            <Button
              classes={{ root: classes.button }}
              onClick={() => this.setState({ span: 3 })}
            >
              <img
                style={{ height: 24 }}
                src={require('./assets/img/grid3.svg')}
                alt='12'
              />
            </Button>
          </Grid>
          <Grid container style={{ height: 'calc(100% - 30px)', padding: '0 30px' }}>
            <Grid item xs={this.state.span} style={{ margin: '0 10px 10px 0' }}>
              <div
                style={{
                  fontSize: 18,
                  color: '#fff',
                  backgroundColor: '#000',
                  padding: '12px 16px 0'
                }}>
                大棚2号
              </div>
              <EzvizLive />
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

const select = state => ({
  groups: state.group.data,
  devices: state.device.data,
  series: state.device.series,
  controller: state.device.controller
});

const appWithStyle = withStyles(styles)(App);

export default connect(select)(appWithStyle);
