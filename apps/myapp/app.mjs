import MainContainer from './view/MainContainer.mjs';

Neo.onStart = function() {
    Neo.app({
        appPath : 'apps/myapp/',
        mainView: MainContainer,
        name    : 'MyApp'
    });
};