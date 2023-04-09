const axios = require('axios');

class APIMonitor {
  constructor(apiUrl, checkInterval = 60) {
    this.apiUrl = apiUrl;
    this.checkInterval = checkInterval;
    this.lastUpdateTime = null;
    this.isRunning = false;
    this.intervalId = null;
    this.onUpdate = null;
  }

  start() {
    this.isRunning = true;
    this.intervalId = setInterval(() => this._monitorLoop(), this.checkInterval * 1000);
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.intervalId);
  }

  async _monitorLoop() {
    try {
      const response = await axios.get(this.apiUrl);
      if (response.status === 200) {
        const data = response.data;
        const updateTime = data.posts[0];
        if (this.lastUpdateTime === null) {
          this.lastUpdateTime = updateTime;
        }
        if (updateTime !== this.lastUpdateTime) {
          this.lastUpdateTime = updateTime;
          if (typeof this.onUpdate === 'function') {
            await this.onUpdate(updateTime);
          }
        }
      } else {
        console.error(`API request failed with status code ${response.status}`);
      }
    } catch (err) {
      console.error(`API request failed with error: ${err}`);
    }
  }
}

function onPost(onUpdate = null) {
  const monitor = new APIMonitor('https://api.cbmc.club/v1/latest?limit=1', 10);
  monitor.onUpdate = onUpdate;
  monitor.start();
}

async function getPostList(limit) {
  try {
    const response = await axios.get(`https://api.cbmc.club/v1/latest?limit=${Math.min(limit, 300)}`);
    return response.data;
  } catch (err) {
    console.error(`API request failed with error: ${err}`);
    return null;
  }
}

async function getPost(platformId) {
  try {
    const response = await axios.get(`https://api.cbmc.club/v1/post/${platformId}`);
    return response.data;
  } catch (err) {
    console.error(`API request failed with error: ${err}`);
    return null;
  }
}

module.exports = {
  onPost,
  getPostList,
  getPost,
};
