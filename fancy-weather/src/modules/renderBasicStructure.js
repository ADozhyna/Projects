function renderStructure() {
  const template = `
  <div class="container">
    <div class="controls">
      <div class="options">
        <button class="button" id="load"></button>
        <select class="button" id="lang" name="lang">
          <option value="en">en</option>
          <option value="ru">ru</option>
          <option value="be">be</option>
        </select>
        <button class="button" id="far">F°</button>
        <button class="button" id="cel">C°</button>
      </div>
      <div class="search">
        <input type="text" class="input">
        <button class="button" id="button-search"></button>
        <button class="button speech" id="voice"></button>
        <div class="errors"></div>
      </div>
    </div>
    <div class="content">
      <div class="weather"></div>
      <div class="location">
        <div id="map"></div>
        <div class="coordinates"></div>
      </div>
    </div>
</div>`;
  document.querySelector('.wrapper').innerHTML = template;
}
export default renderStructure();
