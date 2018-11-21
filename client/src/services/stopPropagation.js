// Stops the element's parent onClick event.
export function stopEventPropagation(e) {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
}