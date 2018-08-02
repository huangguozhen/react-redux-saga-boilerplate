export default function device (state = { controller: {} }, { type, ...rest }) {
  if (/^\/device/.test(type)) {
    return { ...state, ...rest };
  }

  return state;
}
