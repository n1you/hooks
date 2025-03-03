self.onmessage = (e) => {
    console.log(e);

    self.postMessage(e.data + ` : ${Date.now()}`);
};
export default {};
