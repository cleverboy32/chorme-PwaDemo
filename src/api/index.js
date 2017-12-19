import axios from 'axios';

export default {
    getUser: function () {
        axios.get('users').then((res) => {
            console.log(res);
        })
    }
};
