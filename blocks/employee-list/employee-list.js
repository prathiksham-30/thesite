export default async function decorate(block) {
  // Get the JSON path from the block content
  const jsonPath = block.querySelector('div > div').textContent.trim();

  // Fetch the JSON data
  const response = await fetch(jsonPath);
  const json = await response.json();
  const employees = json.data;

  // Clear the block content
  block.innerHTML = '';

  // Create the list
  const ul = document.createElement('ul');
  ul.classList.add('employee-list-items');

  employees.forEach((employee) => {
    const li = document.createElement('li');
    li.classList.add('employee-item');
    li.innerHTML = `
      <span class="name">${employee.Name}</span>
      <span class="position">${employee.Position}</span>
      <span class="office">${employee.Office}</span>
      <span class="salary">${employee.Salary}</span>
    `;
    ul.appendChild(li);
  });

  block.appendChild(ul);
}