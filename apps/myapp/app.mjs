import MainContainer from './view/MainContainer.mjs';

Neo.onStart = () => {
    Neo.app({
        appPath : 'apps/myapp/',
        mainView: MainContainer,
        name    : 'MyApp'
    });
};