export default (context, payload, done) => {
    context.dispatch('UPDATE_TIME');
    done();
};
