export default async function decorate(block) {
  // Step 1: Read the JSON path from the block cell
  const jsonPath = block.querySelector('div > div').textContent.trim();

  // Step 2: Fetch all data from the spreadsheet JSON
  const response = await fetch(jsonPath);
  const json = await response.json();
  const items = json.data;

  // Step 3: Pagination settings
  const itemsPerPage = 20;
  let currentPage = 1;
  const totalPages = Math.ceil(items.length / itemsPerPage);

  // Step 4: Clear the block content
  block.innerHTML = '';

  // Step 5: Create the list container
  const ul = document.createElement('ul');
  ul.classList.add('employee-items');
  block.appendChild(ul);

  // Step 6: Create pagination controls
  const pagination = document.createElement('div');
  pagination.classList.add('pagination');
  pagination.innerHTML = `
    <button class="prev-btn" disabled>Previous</button>
    <span class="page-info">Page ${currentPage} of ${totalPages}</span>
    <button class="next-btn">Next</button>
  `;
  block.appendChild(pagination);

  // Step 7: Function to render items for current page
  function renderPage(page) {
    // Clear the list
    ul.innerHTML = '';

    // Calculate start and end index
    const start = (page - 1) * itemsPerPage;
    const end = start + itemsPerPage;

    // Slice the data for current page
    const pageItems = items.slice(start, end);

    // Render each item
    pageItems.forEach((item) => {
      const li = document.createElement('li');
      li.classList.add('employee-item');
      li.innerHTML = `
        <span class="name">${item.Name}</span>
        <span class="position">${item.Position}</span>
        <span class="office">${item.Office}</span>
        <span class="salary">${item.Salary}</span>
      `;
      ul.appendChild(li);
    });

    // Update page info text
    pagination.querySelector('.page-info').textContent = 
      `Page ${page} of ${totalPages}`;

    // Enable/disable buttons based on current page
    pagination.querySelector('.prev-btn').disabled = page === 1;
    pagination.querySelector('.next-btn').disabled = page === totalPages;
  }

  // Step 8: Button click events
  pagination.querySelector('.prev-btn').addEventListener('click', () => {
    if (currentPage > 1) {
      currentPage -= 1;
      renderPage(currentPage);
    }
  });

  pagination.querySelector('.next-btn').addEventListener('click', () => {
    if (currentPage < totalPages) {
      currentPage += 1;
      renderPage(currentPage);
    }
  });

  // Step 9: Render the first page on load
  renderPage(currentPage);
}