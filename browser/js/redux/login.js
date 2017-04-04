import axios from 'axios';

/* -----------------    ACTIONS     ------------------ */

const SET_CURRENT_USER = 'SET_CURRENT_USER';


/* ------------   ACTION CREATORS     ------------------ */


const login = (user) => ({type: SET_CURRENT_USER, user})


/* ------------       REDUCER     ------------------ */

export default function reducer (currentUser = {}, action) {
  switch (action.type) {
    case SET_CURRENT_USER:
      return action.user
    default:
      return currentUser;
  }
}


/* ------------       DISPATCHERS     ------------------ */

export const loginUser = (user) => dispatch => {
  console.log('from dispatch', user)
  axios.post(`/api/login`, user)
       .then(res => {
           res.data = user
        //    console.log('from inside axios!!!!!', res)
           dispatch(login(res.data))           
       })
       .catch(err => console.error(`Login unsuccessful`, err));
};
