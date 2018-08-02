import React, { Component } from 'react';
import Button from '@material-ui/core/Button';
import Highcharts from 'highcharts';
import HighchartsReact from 'highcharts-react-official';
import withStyles from '@material-ui/core/styles/withStyles';

const styles = theme => ({
  wrapper: {
    width: 'calc(100% - 350px)',
    minHeight: 424,
    height: 'calc(100vh - 560px)',
    padding: '10px 20px',
    marginLeft: 310,
    borderRadius: 10,
    textAlign: 'center',
    backgroundColor: '#fff'
  },
  button: {
    minHeight: 24,
    minWidth: 36,
    padding: '4px 8px',
    marginRight: 4
  }
});

const options = {
  chart: {
    zoomType: 'x'
  },
  title: {
    text: '大棚环境数据曲线图'
  },
  credits: {
    text: 'www.intoyun.com',
    href: 'https://www.intoyun.com'
  },
  xAxis: {
    type: 'datetime'
  },
  yAxis: {
    title: {
      text: '环境数据'
    }
  },
  tooltip: {
    headerFormat: '<b>{series.name}</b><br>',
    pointFormat: '{point.x:%B %e, %H:%M:%S}: {point.y:.2f}'
  }
};

class Chart extends Component {
  refresh (period) {
    const { fetchDevData, selectedDev } = this.props;
    fetchDevData(selectedDev, period);
  }

  render () {
    const { classes, series, period } = this.props;
    const highchartOpts = { ...options, series };

    return (
      <div className={classes.wrapper}>
        <div style={{ position: 'relative' }}>
          <div style={{ textAlign: 'left' }}>
            <Button
              onClick={this.refresh.bind(this, 1)}
              variant={period === 1 ? 'contained' : 'text'}
              color={period === 1 ? 'primary' : 'default'}
              classes={{ root: classes.button }}
            >最近1天</Button>
            <Button
              onClick={this.refresh.bind(this, 7)}
              variant={period === 7 ? 'contained' : 'text'}
              color={period === 7 ? 'primary' : 'default'}
              classes={{ root: classes.button }}
            >最近7天</Button>
            <Button
              onClick={this.refresh.bind(this, 30)}
              variant={period === 30 ? 'contained' : 'text'}
              color={period === 30 ? 'primary' : 'default'}
              classes={{ root: classes.button }}
            >最近30天</Button>
          </div>
        </div>
        <HighchartsReact
          style={{ width: '100%', height: 300 }}
          highcharts={Highcharts}
          options={highchartOpts}
        />
      </div>
    );
  }
}

export default withStyles(styles)(Chart);
