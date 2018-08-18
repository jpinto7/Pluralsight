import { View } from 'ui/core/view';
import { AnimationDefinition } from 'ui/animation';
import { AnimationCurve } from 'ui/enums';

const duration: number = 250;
const scaleFactor: number = 1.8;

export const popAnimate = (view: View) => {
  const defPopUp: AnimationDefinition = {
    duration: duration,
    curve: AnimationCurve.easeIn,
    scale: { x: scaleFactor, y: scaleFactor }
  };
    
  const defPopDown: AnimationDefinition = {
    duration: duration,
    curve: AnimationCurve.easeOut,
    scale: { x: 1.0, y: 1.0 }
  };

  return view.animate(defPopUp)
    .then(()=>{
      view.animate(defPopDown);
    });
}

export const fadeIn = (view: View) => {
  return view.animate({
    opacity: 1.0,
    duration: duration
  });
}