import { userConstants } from './user.constants';
import { userService } from './user.service';
import { history } from './history';


export const userActions = {
    login,
    logout,
    create,
    update,
    getAll,
    search,
    delete: _delete
};

function login(email, password) {
    return dispatch => {
        dispatch(request({ email }));

        userService.login(email, password)
            .then(
                user => {
                    // console.log(user);
                    dispatch(success(user));
                    history.push('/users');
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}


function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => {
                    dispatch(success(users))
                    // console.log(users)
                },
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function create(user) {
    return dispatch => {
        dispatch(request(user));

        userService.create(user)
            .then(
                user => { 
                    // console.log(user);
                    dispatch(success(user.data));
                    history.push('/users');
                    // window.location.reload(false);

                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.CREATE_REQUEST, user } }
    function success(user) { return { type: userConstants.CREATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.CREATE_FAILURE, error } }
}

function update(user) {
    return dispatch => {
        dispatch(request(user));

        userService.update(user)
            .then(
                user => { 
                    dispatch(success(user.data));
                    history.push('/users');

                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.UPDATE_REQUEST, user } }
    function success(user) { return { type: userConstants.UPDATE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.UPDATE_FAILURE, error } }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                resp => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}

function search(result) {
    return dispatch => dispatch(success(result));

    function success(result) { return { type: userConstants.SEARCH_SUCCESS, result}};
}