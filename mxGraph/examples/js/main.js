function main(container) {
    if (mxClient.isBrowserSupported()) {
        init(container);
    } else {
        mxUtils.error('Browser is not supported!', 200, false);
    }
}