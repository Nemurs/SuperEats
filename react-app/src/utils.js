export function isTimestampOld(timestamp, minutes) {
    /*Check if timestamp is older than x amount of minutes */
    const newTimestamp = new Date(timestamp);
    const currentTime = new Date();
    currentTime.setMinutes(currentTime.getMinutes() - minutes);
    return newTimestamp < currentTime;
  }
