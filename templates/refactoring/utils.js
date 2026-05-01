// This code works but has poor structure - refactor it!

function processUserData(users) {
  let result = [];
  for (let i = 0; i < users.length; i++) {
    let u = users[i];
    if (u.age >= 18 && u.age <= 65) {
      if (u.name && u.name.length > 0) {
        if (u.email && u.email.includes('@')) {
          let fullName = u.name.charAt(0).toUpperCase() + u.name.slice(1).toLowerCase();
          let domain = u.email.split('@')[1];
          let category;
          if (u.age >= 18 && u.age <= 25) {
            category = 'young';
          } else if (u.age >= 26 && u.age <= 40) {
            category = 'adult';
          } else if (u.age >= 41 && u.age <= 55) {
            category = 'middle';
          } else {
            category = 'senior';
          }
          result.push({
            name: fullName,
            email: u.email,
            domain: domain,
            category: category,
            isActive: u.lastLogin ? (Date.now() - new Date(u.lastLogin).getTime()) < 30 * 24 * 60 * 60 * 1000 : false
          });
        }
      }
    }
  }

  // Sort by category
  for (let i = 0; i < result.length - 1; i++) {
    for (let j = 0; j < result.length - i - 1; j++) {
      if (result[j].category > result[j + 1].category) {
        let temp = result[j];
        result[j] = result[j + 1];
        result[j + 1] = temp;
      }
    }
  }

  // Count by category
  let counts = {};
  for (let i = 0; i < result.length; i++) {
    if (counts[result[i].category]) {
      counts[result[i].category] = counts[result[i].category] + 1;
    } else {
      counts[result[i].category] = 1;
    }
  }

  // Format output
  let output = '';
  output = output + 'Total users: ' + result.length + '\n';
  output = output + 'Categories:\n';
  let keys = Object.keys(counts);
  for (let i = 0; i < keys.length; i++) {
    output = output + '  ' + keys[i] + ': ' + counts[keys[i]] + '\n';
  }

  return { users: result, summary: output, counts: counts };
}

module.exports = { processUserData };
