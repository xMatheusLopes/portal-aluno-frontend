module.exports = {
    checkAuthenticated(props) {
        let user = window.localStorage.getItem('user');
        if (user) {
            return JSON.parse(user);
        } else {
            props.history.push(`/`);
            return false;
        }
    }
}