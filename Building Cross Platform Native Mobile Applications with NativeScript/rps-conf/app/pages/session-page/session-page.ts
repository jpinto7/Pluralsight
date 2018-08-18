import { EventData } from 'data/observable';
import {
  GestureEventData,
  SwipeDirection,
  SwipeGestureEventData
} from 'ui/gestures';
import {
  NavigatedData,
  Page
} from 'ui/page'; 
import { Button } from 'ui/button';
import { Label } from 'ui/label';
import { ScrollView } from 'ui/scroll-view';
import { ListView } from 'ui/list-view';
import SessionViewModel from './session-view-model';
import * as navigationModule from '../../shared/navigation';
import * as animationHelperModule from '../../shared/animation-helper';

let vm: SessionViewModel;
let page: Page;

export const pageNavigatingTo = (args: NavigatedData) => {
  page = <Page>args.object;
  vm = <SessionViewModel>page.navigationContext;
  page.bindingContext = vm;
}

export const toggleFavorite = (args: GestureEventData) => {
  var gl = <any>args.object;
  var img = gl.getViewById('imgFav');
  
  animationHelperModule.popAnimate(img)
    .then(()=>{
      vm.toggleFavorite();
    });
}

export const toggleDescription = (args: EventData) => {
  const btn = <Button>args.object;
  const txtDesc = <Label>page.getViewById('txtDescription');
  const scroll = <ScrollView>page.getViewById('scroll');

  if (btn.text === 'MORE') {
    btn.text = 'LESS';
    txtDesc.text = vm.description;
  } else {
    btn.text = 'MORE';
    txtDesc.text = vm.descriptionShort;
    scroll.scrollToVerticalOffset(0, false);
  }
}

export const backTap = (args: GestureEventData) => {
  navigationModule.goBack();
}

export const showMapTap = (args: GestureEventData) => {
  navigationModule.goToRoomMapPage(vm);
}

export const backSwipe = (args: SwipeGestureEventData) => {
  if (args.direction === SwipeDirection.right) {
    navigationModule.goBack();
  }
}