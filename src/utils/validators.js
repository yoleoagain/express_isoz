// @ts-check
const strictEmailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

module.exports = {
    /**
     * @param {String} email 
     */
    validateEmail(email = '') {
        return strictEmailRegex.test(email.toLowerCase());
    },

    isValidUser(user) {
        return !user || !('name' in user) || !('email' in user)
    },

    isValidPost(post) {
        return !post || !('body' in post) || !('title' in post)
    }
}