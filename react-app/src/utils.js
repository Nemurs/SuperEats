export function isTimestampOld(timestamp, minutes) {
    /*Check if timestamp is older than x amount of minutes */
    const newTimestamp = new Date(timestamp);
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() - minutes);
    return newTimestamp < currentTime;
  }

 export function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min) + min); // The maximum is exclusive and the minimum is inclusive
}

export function shuffle(arr) {
    let out = [];
    let visited = new Set([]);
    let max = arr.length;
    while (out.length < max) {
        let idx = getRandomInt(0, max)
        if (!visited.has(idx)) {
            visited.add(idx)
            out.push(arr[idx])
        }
    }
    return out;
}
