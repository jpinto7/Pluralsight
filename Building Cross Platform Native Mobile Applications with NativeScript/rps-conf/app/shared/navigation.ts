import * as frameModule from 'ui/frame';

export const startingPage = () => 'pages/main-page/main-page';

export const gotoSessionPage = (session) => {
  frameModule.topmost().navigate({
    moduleName: 'pages/session-page/session-page',
    context: session
  });
}

export const goToRoomMapPage = (session) => {
  frameModule.topmost().navigate({
    moduleName: 'pages/map-page/map-page',
    context: session,
    transition: {
      name: 'fade',
      duration: 1000,
      curve: 'easeIn'
    }
  });
}

export const goBack = () => {
  frameModule.topmost().goBack();
}

export const configurePlatformSpecificFeatures = () => {
    // Enable platform specific feature (in this case Android page caching)
  if (frameModule.topmost().android) {
    frameModule.topmost().android.cachePagesOnNavigate = true;
  }

  const iosFrame = frameModule.topmost().ios;
  if (iosFrame) {
    // Fix status bar color and nav bar visibility
    iosFrame.controller.view.window.backgroundColor = UIColor.blackColor();
    iosFrame.navBarVisibility = 'never';
  }
}

export const goToPageByFunction = (factoryFunc) => {
  frameModule.topmost().navigate(factoryFunc);
}