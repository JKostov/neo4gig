
export function updateFeedByProp(feed, property, value) {
  if (feed) {
    const arr = feed[property];
    for (let i = 0; i < arr.length; i += 1) {
      if (arr[i].id === value.id) {
        arr.splice(i, 1);
        return feed;
      }
    }
    arr.push(value);
    feed[property] = arr;
    return feed;
  }
}
