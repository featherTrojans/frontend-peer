import {CommonActions as NavigationActions} from '@react-navigation/native';
import {useNavigation} from '@react-navigation/native';

let _navigator: any;

const setTopLevelNavigator = (navigatorRef: any) => {
  _navigator = navigatorRef;
};

const navigate = (routeName: string, params = {}) => {
  if (_navigator.isReady()) {
    _navigator.dispatch(
      NavigationActions.navigate({
        name: routeName,
        params,
      }),
    );
  }
};



const goBack = () => {
  if (_navigator.isReady()) {
    _navigator.dispatch(NavigationActions.goBack());
  }
};



const reset = (routeName: string) => {
  if (_navigator.isReady()) {
    _navigator.dispatch(
      NavigationActions.reset({
        index: 0,
        routes: [{name: routeName}],
      }),
    );
  }
};


function getNavigator() {
  return _navigator;
}

// add other navigation functions that you need and export them
export default {
  navigate,
  reset,
  setTopLevelNavigator,
  getNavigator,
  goBack,
};
