import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';
const SIGN_IN_USER = 'SIGN_IN_USER';
const SIGN_OUT_USER = 'SIGN_OUT_USER';

/* ------------   ACTION CREATORS     ------------------ */


const login = (user) => ({type: SET_CURRENT_USER, user})
const signup = (user) => ({type: SIGN_IN_USER, user})
const signout = () => ({type: SIGN_OUT_USER})

/* ------------       REDUCER     ------------------ */

export default function reducer (currentUser = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user
    case SIGN_IN_USER:
      return action.user
    case SIGN_OUT_USER:
      return null;
    default:
      return currentUser;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const loginUser = (user) => dispatch => {
  // console.log('from dispatch', user)
  axios.post(`/api/login`, user)
       .then(res => {
           res.data = user
        //    console.log('from inside axios!!!!!', res)
           dispatch(login(res.data))
       })
       .catch(err => console.error(`Login unsuccessful`, err));
};

export const signinUser = (user) => dispatch => {
  axios.post(`/api/users`, user)
       .then(res => {
           console.log('from inside axios!!!!!', res)
           dispatch(signup(res.data))
       })
       .catch(err => console.error(`SignUp unsuccessful`, err));
};

export const signoutUser = () => dispatch => {
  axios.put(`/api/logout`)
       .then(res => {
          console.log('inside signoutUser!!!!')
           dispatch(signout())
       })
       .catch(err => console.error(`Sign out unsuccessful`, err));
};

export const fetchCurrentUser = () => dispatch => {
  axios.get('/api/auth/me')
    .then(res => dispatch(login(res.data)))
    .catch(err => console.error('did not fetch current user', err))
}
