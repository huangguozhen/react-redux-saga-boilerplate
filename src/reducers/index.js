import { combineReducers } from 'redux';
import counter from './counter';
import group from './group';
import device from './device';

export default combineReducers({
  counter,
  group,
  device
});
