// Stops the element's parent onClick event (to stop getting redirected to product's page)
export function stopEventPropagation(e) {
  e.stopPropagation();
  e.nativeEvent.stopImmediatePropagation();
}