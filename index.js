const axios = require('axios');

class APIMonitor {
  constructor(apiUrl, checkInterval = 60) {
    this.apiUrl = apiUrl;
    this.checkInterval = checkInterval;
    this.lastUpdateTime = null;
    this.isRunning = false;
    this.thread = null;
    this.onUpdate = null;
  }

  start() {
    this.isRunning = true;
    this.thread = setInterval(this._monitorLoop.bind(this), this.checkInterval * 1000);
  }

  stop() {
    this.isRunning = false;
    clearInterval(this.thread);
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
          if (this.onUpdate) {
            await this.onUpdate(updateTime);
          }
        }
      } else {
        console.log(`API request failed with status code ${response.status}`);
      }
    } catch (error) {
      console.log(`API request failed with error: ${error.message}`);
    }
  }
}

function onpost(onUpdate) {
  const monitor = new APIMonitor('https://api.cbmc.club/v1/latest?limit=1', 10);
  monitor.onUpdate = onUpdate;
  monitor.start();
}

async function postList(limit) {
  try {
    const response = await axios.get(`https://api.cbmc.club/v1/latest?limit=${limit > 300 ? 300 : limit}`);
    return response.data;
  } catch (error) {
    console.log(`API request failed with error: ${error.message}`);
    return null;
  }
}

async function getPost(platformId) {
  try {
    const response = await axios.get(`https://api.cbmc.club/v1/post/${platformId}`);
    return response.data.status === 'failed' ? null : response.data;
  } catch (error) {
    console.log(`API request failed with error: ${error.message}`);
    return null;
  }
}

module.exports = {
  onpost,
  postList,
  getPost
};
