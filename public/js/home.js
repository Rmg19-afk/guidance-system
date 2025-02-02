function addDataModal() {
    const modal = document.getElementById('addDataModal');
    modal.style.display = 'block';
}

function closeModal() {
    const modal = document.getElementById('addDataModal');
    modal.style.display = 'none';
}

function addData(event) {
    event.preventDefault();
    
    const formData = new FormData(document.getElementById('addDataForm'));
    
    fetch('/addStudentData', {
        method: 'POST',
        body: formData
    })
    .then(response => response.json())
    .then(data => {
        console.log('Success:', data);
        closeModal();
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}

function filterHome() {
    document.getElementById('searchBar').addEventListener('input', () => {
        const searchInput = document.getElementById('searchBar').value.toLowerCase();
    
        fetch(`/searchStudentData?q=${encodeURIComponent(searchInput)}`) 
            .then(response => {
                if (!response.ok) {
                    throw new Error('Failed to fetch student data');
                }
                return response.json();
            })
            .then(data => {
                const dataTableRow = document.getElementById('tableBody');
                dataTableRow.innerHTML = '';
    
                if (data.length === 0) {
                    dataTableRow.innerHTML = '<tr><td colspan="12" id="notFound">No data found.</td></tr>';
                    return;
                }
    
                data.forEach(item => {
                    const row = document.createElement('tr');
                    row.innerHTML = `
                        <td>${item.date}</td>
                        <td>${item.student_id}</td>
                        <td>${item.level}</td>
                        <td>${item.program}</td>
                        <td>${item.guidance_service_availed}</td>
                        <td>${item.contact_type}</td>
                        <td>${item.nature_of_concern}</td>
                        <td>${item.specific_concern}</td>
                        <td>${item.concern}</td>
                        <td>${item.intervention}</td>
                        <td>${item.status}</td>
                        <td>${item.remarks}</td>
                    `;
                    dataTableRow.appendChild(row);
                });
            })
            .catch(error => {
                console.error('Error:', error);
                const dataTableRow = document.getElementById('tableBody');
                dataTableRow.innerHTML = '<tr><td colspan="12">Failed to load data. Please try again later.</td></tr>';
            });
    });
}