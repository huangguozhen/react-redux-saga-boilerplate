import fetch from '../utils/fetch';

export const DEVICE = '/device/action';

export const fetchAll = (gid) =>
  (dispatch, getState) => {
    const promise = fetch(`/device?gId=${gid}`);
    promise.then(data => {
      dispatch({ type: DEVICE, data });
    });

    return promise;
  }

export const updateDps = (devId, data, opts) =>
  (dispatch, getState) => {
    const device = getState().device.data.map(dev => {
      if (dev.devId === devId) {
        return { ...dev, data, ts: opts.ts };
      }

      return dev;
    });

    dispatch({ type: DEVICE, data: device });
  }

export const control = (dpId, val) =>
  (dispatch, getState) => {
    const promise = fetch('/control', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: { dpId, val, prdId: 'd8b2dce90000042d' }
    });

    promise.then(() => {
      const { controller } = getState().device;
      dispatch({ type: DEVICE, controller: { ...controller, [`${dpId}`]: val } });
    });

    return promise;
  }

function getSeries (data, interval = 36e5) {
  const series = [{
    name: '空气温度(℃)'
  }, {
    name: '空气湿度(%)'
  }, {
    name: '土壤湿度(%)'
  }, {
    name: '光照强度(Lx)'
  }, {
    name: 'CO₂浓度(ppm)'
  }];

  for (let i = 1; i < 6; i++) {
    series[i - 1].data = data
      .filter(point => point.dpId === i)
      .map(point => {
        return [point.ts * 1000 + 8 * 36e5, point.val];
      });

    // series[i - 1].pointInterval = interval;
  }

  return series;
}

export const fetchDevData = (devId, start, end) =>
  (dispatch, getState) => {
    const url = `/sensordata?devId=${devId}&start=${start}&end=${end}`;
    const promise = fetch(url, {
      method: 'GET',
      headers: { 'Content-Type': 'application/json' }
    });

    // 处理历史数据
    promise.then((data) => {
      dispatch({ type: DEVICE, series: getSeries(data) });
    });

    return promise;
  }
