import {
  CommonActions,
  StackActions,
  createNavigationContainerRef,
} from '@react-navigation/core';

const navigationRef = createNavigationContainerRef();

const logStyle =
  'color: black; font-weight: bold; font-size:12px; background-color: #FFC60F;color: #515E63; padding: 4px; border-radius: 2px';

const parseRoute = (route: any, params?: any): string => {
  const name = typeof route === 'string' ? route : route?.name ?? '';

  if (__DEV__ && name) {
    console.log(`%c${name} \n`, logStyle, params ? params : '');
  }

  return name;
};

const navigate = (route: any, params?: any) => {
  const routerName = parseRoute(route, params);
  navigationRef?.navigate?.(routerName, params);
};

const push = (route: any, params?: any) => {
  const routerName = parseRoute(route, params);
  navigationRef?.dispatch?.(StackActions.push(routerName, params));
};

const replace = (route: any, params?: any) => {
  const routerName = parseRoute(route, params);
  navigationRef?.dispatch?.(StackActions?.replace?.(routerName, params));
};

const goBack = () => {
  navigationRef?.dispatch?.(CommonActions.goBack());
};

const pop = (step: number) => {
  const popAction = StackActions.pop(step);
  navigationRef?.dispatch(popAction);
};

const getRoute = () => {
  if (!navigationRef?.isReady()) return false;

  return navigationRef?.getCurrentRoute();
};

export default {
  ref: navigationRef,
  push,
  navigate,
  getRoute,
  goBack,
  replace,
  pop,
};
