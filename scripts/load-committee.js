async function loadCommitteeMembers() {
  const SHEET_ID = "1ECRMvfG2wffrhnZGePEoN2ycN-YLLacN5wVIg_xxGvo";
  
  // Google Sheets public CSV export URL
  const url = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/export?format=csv&gid=0`;
  
  try {
    const response = await fetch(url);
    const csv = await response.text();
    
    // Parse CSV
    const lines = csv.trim().split('\n');
    const headers = lines[0].split(',');
    
    const members = lines.slice(1).map(line => {
      // Handle CSV parsing with quotes
      const values = line.match(/(".*?"|[^",]+)/g) || [];
      
      // Detect what's in each column by checking content
      let imageUrl = undefined;
      let linkedinUrl = undefined;
      let department = undefined;
      
      // Scan through all values to find image URL, LinkedIn URL, and department
      for (let i = 2; i < values.length; i++) {
        const val = values[i]?.replace(/"/g, '').trim();
        if (!val) continue;
        
        if (val.includes('linkedin.com')) {
          linkedinUrl = val;
        } else if (val.startsWith('http') && !val.includes('linkedin')) {
          if (!imageUrl) imageUrl = val;
        } else if (val.includes('Executive') || val.includes('General') || val.includes('Finance') || 
                   val.includes('Industry') || val.includes('Events') || val.includes('Marketing') || 
                   val.includes('Outreach')) {
          department = val;
        }
      }
      
      return {
        name: values[0]?.replace(/"/g, '').trim(),
        title: values[1]?.replace(/"/g, '').trim(),
        image: imageUrl,
        linkedin: linkedinUrl,
        department: department
      };
    }).filter(member => member.name); // Remove empty rows
    
    // Debug: log all members and their data
    console.log('Loaded members:', members);
    members.forEach(m => console.log(`${m.name} - Image: "${m.image}"`));
    
    // Store members globally for filtering
    window.allCommitteeMembers = members;
    
    // Display all members initially
    displayMembers(members);
    
    // Setup button filters
    setupButtonFilters(members);
    
    // Set Executive button as active by default and trigger it
    const executiveButton = Array.from(document.querySelectorAll('.subcommittee-button')).find(btn => btn.textContent.trim() === 'Executive');
    if (executiveButton) {
      executiveButton.click();
    }
  } catch (error) {
    console.error('Error loading committee members:', error);
  }
}

function displayMembers(members) {
  const container = document.getElementById('committee-container');
  
  if (!container) {
    console.error('Committee container not found');
    return;
  }
  
  container.innerHTML = ''; // Clear existing content
  
  members.forEach(member => {
    // Default image if not provided
    const imageUrl = member.image || '../assets/images/default-profile-picture/Default Profile Picture.jpg';
    
    const cardContent = `
      <img src="${imageUrl}" alt="${member.name}">
      <h3>${member.name}</h3>
      <p>${member.title || ''}</p>
    `;
    
    if (member.linkedin) {
      const memberLink = document.createElement('a');
      memberLink.className = 'committee-member has-linkedin';
      memberLink.href = member.linkedin;
      memberLink.target = '_blank';
      memberLink.rel = 'noopener noreferrer';
      memberLink.innerHTML = cardContent;
      container.appendChild(memberLink);
    } else {
      const memberDiv = document.createElement('div');
      memberDiv.className = 'committee-member';
      memberDiv.innerHTML = cardContent;
      container.appendChild(memberDiv);
    }
  });
}

function setupButtonFilters(members) {
  const buttons = document.querySelectorAll('.subcommittee-button');
  
  buttons.forEach(button => {
    button.addEventListener('click', function() {
      const department = this.textContent.trim();
      
      // Remove active class from all buttons
      buttons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      this.classList.add('active');
      
      // Filter and display members
      if (department === 'All') {
        displayMembers(members);
      } else {
        const filtered = members.filter(member => {
          // Handle multiple departments separated by comma
          const departments = member.department?.split(',').map(d => d.trim()) || [];
          return departments.some(dept => 
            dept.toLowerCase() === department.toLowerCase()
          );
        });
        displayMembers(filtered);
      }
    });
  });
}

// Load on page load
document.addEventListener('DOMContentLoaded', loadCommitteeMembers);
