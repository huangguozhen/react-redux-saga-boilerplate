import React, { Component } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  wrapper: {
    width: 'calc(100% - 350px)',
    height: 380,
    padding: '10px 20px',
    marginLeft: 310,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  tableRow: {
    height: 42
  },
  warning: {
    color: 'red'
  },
  rowSelected: {
    backgroundColor: 'rgba(0,0,0, .08)'
  }
});

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: '#f3f5f4',
    color: '#666',
    paddingRight: 12,
    paddingLeft: 12,
    textAlign: 'center',
    fontSize: 14
  },
  body: {
    textAlign: 'center',
    paddingRight: 12,
    paddingLeft: 12,
    fontSize: 12
  },
}))(TableCell);

const moment = require('moment');
class DevTable extends Component {
  static defaultProps = {
    data: []
  };

  state = {
    selectedDev: ''
  };

  getStatus = (type, value) => {
    const { group, classes } = this.props;

    if (!group || !value) return '';
    const isWarn = group[`${type}Min`] > value || group[`${type}Max`] < value;
    return isWarn ? classes.warning : '';
  }

  getWarnField = (device) => {
    if (!device.data) return '';
    const types = [ 'airTemp', 'airHumi', 'solHumi', 'illum', 'co2' ];

    const status = types.map((type, index) => {
      const { group } = this.props;
      const value = device.data[`${index + 1}`];
      if (!group || !value) return false;

      return group[`${type}Min`] > value || group[`${type}Max`] < value;
    });

    const isWarn = status.reduce((ret, state) => {
      return ret || state;
    }, false);

    return (
      <img
        src={isWarn
          ? require('../../assets/img/warning.svg')
          : require('../../assets/img/check.svg')
        }
        alt='status'
        style={{ width: 22, height: 22 }}
      />
    );
  }

  handleRowClick = (device) => {
    const { period, fetchDevData } = this.props;

    this.setState({ selectedDev: device }, () => {
      fetchDevData(device.devId, period);
    });
  }

  render () {
    const { classes, data } = this.props;
    const selectedDev = this.state.selectedDev || data[0];

    return (
      <div className={classes.wrapper}>
        <Table
          className={classes.table}
        >
          <TableHead>
            <TableRow>
              <CustomTableCell>节点名称</CustomTableCell>
              <CustomTableCell numeric>空气温度(℃)</CustomTableCell>
              <CustomTableCell numeric>空气湿度(%)</CustomTableCell>
              <CustomTableCell numeric>土壤湿度(%)</CustomTableCell>
              <CustomTableCell numeric>光照强度(Lx)</CustomTableCell>
              <CustomTableCell numeric>CO₂浓度(ppm)</CustomTableCell>
              <CustomTableCell numeric>电池电量(%)</CustomTableCell>
              <CustomTableCell>节点状态</CustomTableCell>
              <CustomTableCell>上报时间</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.filter(device => device.type === 2).map(device => (
              <TableRow
                hover
                selected={device.devId === selectedDev.devId}
                key={device.devId}
                classes={{ root: classes.tableRow }}
                onClick={this.handleRowClick.bind(this, device)}
              >
                <CustomTableCell component="th" scope="row">{device.name}</CustomTableCell>
                <CustomTableCell
                  numeric
                  className={this.getStatus('airTemp', device.data ? device.data['1'] : 0)}
                >
                  {device.data ? device.data['1'] : 0}
                </CustomTableCell>
                <CustomTableCell
                  numeric
                  className={this.getStatus('airHumi', device.data ? device.data['2'] : 0)}
                >
                  {device.data ? device.data['2'] : 0}
                </CustomTableCell>
                <CustomTableCell
                  numeric
                  className={this.getStatus('solHumi', device.data ? device.data['3'] : 0)}
                >
                  {device.data ? device.data['3'] : 0}
                </CustomTableCell>
                <CustomTableCell
                  numeric
                  className={this.getStatus('illum', device.data ? device.data['4'] : 0)}
                >
                  {device.data ? device.data['4'] : 0}
                </CustomTableCell>
                <CustomTableCell
                  numeric
                  className={this.getStatus('co2', device.data ? device.data['5'] : 0)}
                >
                  {device.data ? device.data['5'] : 0}
                </CustomTableCell>
                <CustomTableCell
                  numeric
                  className={this.getStatus('power', device.data ? device.data['6'] : 0)}
                >
                  {device.data ? device.data['6'] : 0}
                </CustomTableCell>
                <CustomTableCell>{this.getWarnField(device)}</CustomTableCell>
                <CustomTableCell className={device.ts ? '' : classes.warning}>
                  {device.ts
                    ? moment(device.ts * 1000).format('YYYY-MM-DD HH:mm:ss')
                    : '未上报'
                  }
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  }
}

export default withStyles(styles)(DevTable);
