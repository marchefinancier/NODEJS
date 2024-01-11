const puppeteer = require("puppeteer");

async function YTSearch(course) {
  const browser = await puppeteer.launch({
    headless: true,
  });
  const page = await browser.newPage();
  
  await page.goto(`https://www.youtube.com/results?search_query=${course}`);
  await page.waitForSelector("div#contents");
  
  const results = await page.evaluate(function () {
    console.log("Scraping...");
    const videoElements = document.querySelectorAll("ytd-video-renderer");

    const videos = [];
    for (let i = 0; i < Math.min(videoElements.length, 13); i++) {
      const el = videoElements[i];
      const title = el.querySelector("a#video-title").getAttribute("title");
      const link = "https://www.youtube.com" + el.querySelector("a#video-title").getAttribute("href");
      const thumbnail = el.querySelector("#thumbnail img").getAttribute("src");
      
      videos.push({ title, link, thumbnail });
    }
    
    return videos;
  });

  await browser.close();
  return results;
}

const coursefetching = async (req, res) => {
  const { course } = req.params;

  try {
    const result = await YTSearch(course);
     res.json(result);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching data' });
  }
};

module.exports = {
  coursefetching,
};
