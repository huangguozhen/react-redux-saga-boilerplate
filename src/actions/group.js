import fetch from '../utils/fetch';

export const GROUP = '/group/action';

export const fetchAll = () => (dispatch, getState) => {
  // const p1 = fetch(`/product/5a3aa6970000042c`);
  // const p2 = fetch(`/product/d8b2dce90000042d`);
  // Promise.all([p1, p2]).then(data => {
  //   console.log(data);
  // });
  const promise = fetch('/group');
  promise.then(data => {
    dispatch({ type: GROUP, data });
  });

  return promise;
}

export const update = (gId, data) =>
  (dispatch, getState) => {
    const promise = fetch(`/group/${gId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: data
    });

    promise.then(() => {
      const groups = getState().group.data.map(group => {
        if (group._id === gId) {
          return { ...group, ...data };
        }
        return group;
      });

      dispatch({ type: GROUP, data: groups });
    })
  }
