export default function group (state = {}, { type, ...rest }) {
  if (/^\/group/.test(type)) {
    return { ...state, ...rest };
  }

  return state;
}
