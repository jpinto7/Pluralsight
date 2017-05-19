
export function onTap({ object: button }) {
  button.text = "I've been tapped!";
  console.log('button was tapped!');
}