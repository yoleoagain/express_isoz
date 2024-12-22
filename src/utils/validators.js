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

    isValidAuthor(author) {
        return !author || !('name' in author)
    },

    isValidPost(post) {
        return !post || !('body' in post) || !('title' in post)
    },

    isValidGenre(genre) {
        return !genre || !('name' in genre)
    },

    isValidBook(book) {
        return !book || !('name' in book) || !('genre_id' in book)
    },

    bookStatus: {
        IN_STOCK: 'in_stock',
        SOLD: 'sold',
        FOR_RENT: 'for_rent'
    }
}