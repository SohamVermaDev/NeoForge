// ======================== REFERENCES ========================
const table = document.querySelector('.game-table');
const tbody = table?.querySelector('tbody');
const rows = tbody ? Array.from(tbody.querySelectorAll('tr')) : [];
const searchInput = document.querySelector('.search-input');

// ======================== HELPER FUNCTIONS ========================
function getRatingValue(ratingCell) {
    const ratingSpan = ratingCell?.querySelector('.rating-value');
    if (!ratingSpan) return 0;
    const val = parseFloat(ratingSpan.textContent);
    return isNaN(val) ? 0 : val;
}

function getStockStatus(statusCell) {
    const badge = statusCell?.querySelector('.status-badge');
    if (!badge) return 'unknown';
    if (badge.classList.contains('in-stock')) return 'instock';
    if (badge.classList.contains('low-stock')) return 'lowstock';
    if (badge.classList.contains('out-of-stock')) return 'outofstock';
    return 'unknown';
}

function resetAllSortIcons() {
    document.querySelectorAll('.game-table th.sortable').forEach(th => {
        const icon = th.querySelector('i');
        if (icon) {
            // Remove directional classes
            icon.classList.remove('fa-arrow-up-wide-short', 'fa-arrow-down-short-wide');
            // Add neutral double arrows
            icon.classList.add('fa-arrows-up-down');
            icon.style.opacity = '0.5';
        }
    });
}

// ======================== FILTERING LOGIC ========================
let currentFilters = {
    search: '',
    platform: 'all',
    rating: 'all',
    status: 'all'
};

function filterTable() {
    if (!table || !rows.length) return;

    let hasVisible = false;

    rows.forEach(row => {
        const titleCell = row.cells[1];      // Title
        const platformCell = row.cells[5];   // Platform (adjust index if needed)
        const ratingCell = row.cells[6];     // Rating
        const statusCell = row.cells[7];     // Status

        let matchesSearch = true;
        let matchesPlatform = true;
        let matchesRating = true;
        let matchesStatus = true;

        if (currentFilters.search !== '') {
            const title = titleCell ? titleCell.textContent.toLowerCase() : '';
            matchesSearch = title.includes(currentFilters.search);
        }

        if (currentFilters.platform !== 'all') {
            const platformText = platformCell ? platformCell.textContent.toLowerCase() : '';
            matchesPlatform = platformText.includes(currentFilters.platform);
        }

        if (currentFilters.rating !== 'all') {
            const rating = getRatingValue(ratingCell);
            if (currentFilters.rating === 'high') matchesRating = rating >= 8.0;
            else if (currentFilters.rating === 'medium') matchesRating = rating > 6.0 && rating < 8;
            else if (currentFilters.rating === 'low') matchesRating = rating <= 6.0;
        }

        if (currentFilters.status !== 'all') {
            const stock = getStockStatus(statusCell);
            if (currentFilters.status === 'instock') {
                matchesStatus = stock === 'instock' || stock === 'lowstock';
            } else if (currentFilters.status === 'outofstock') {
                matchesStatus = stock === 'outofstock';
            }
        }

        if (matchesSearch && matchesPlatform && matchesRating && matchesStatus) {
            row.style.opacity = 1;
            row.style.display = '';
            row.style.visibility = 'visible';
            hasVisible = true;
        } else {
            // row.style.transition = 'all 0.3s ease-in-out';
            row.style.opacity = 0;
            row.style.display = 'none';
            row.style.visibility = 'hidden';
        }
    });

    let noResultRow = document.querySelector('.no-results-row');
    if (!hasVisible) {
        if (!noResultRow) {
            noResultRow = document.createElement('tr');
            noResultRow.className = 'no-results-row';
            noResultRow.style.height = '3.75rem';
            const td = document.createElement('td');
            td.colSpan = table.querySelectorAll('thead th').length;
            td.textContent = 'No games match the filters.';
            td.style.textAlign = 'center';
            td.style.fontStyle = 'italic';
            td.style.color = 'var(--secondary-text-color)';
            noResultRow.appendChild(td);
            tbody.appendChild(noResultRow);
        }
    } else if (noResultRow) {
        noResultRow.remove();
    }
}

// ======================================== SORTING LOGIC =======================================
let currentSort = { column: null, direction: 'asc' }; // 'asc' or 'desc'

function sortTable(columnIndex, sortType) {
    if (!tbody) return;

    // Get all rows as an array
    const rowsArray = Array.from(tbody.querySelectorAll('tr:not(.no-results-row)'));

    // Sort the array
    rowsArray.sort((rowA, rowB) => {
        const cellA = rowA.cells[columnIndex];
        const cellB = rowB.cells[columnIndex];
        let valA, valB;

        if (sortType === 'number') {
            // Extract numeric value
            if (columnIndex === 6) { // Rating column – get from .rating-value span
                valA = parseFloat(cellA?.querySelector('.rating-value')?.textContent) || 0;
                valB = parseFloat(cellB?.querySelector('.rating-value')?.textContent) || 0;
            } else if (columnIndex === 4) { // Price – remove $ and parse
                valA = parseFloat(cellA?.textContent.replace('$', '')) || 0;
                valB = parseFloat(cellB?.textContent.replace('$', '')) || 0;
            } else if (columnIndex === 7) { // Stock - get from stock attribute 
                const spanA = cellA?.querySelector('span[stock]');
                const spanB = cellB?.querySelector('span[stock]');
                valA = spanA ? parseInt(spanA.getAttribute('stock')) || 0 : 0;
                valB = spanB ? parseInt(spanB.getAttribute('stock')) || 0 : 0;
            } else {
                valA = parseInt(cellA?.textContent) || 0;
                valB = parseInt(cellB?.textContent) || 0;
            }
        } else { // string
            valA = cellA?.textContent.trim().toLowerCase() || '';
            valB = cellB?.textContent.trim().toLowerCase() || '';
        }

        if (valA < valB) return currentSort.direction === 'asc' ? -1 : 1;
        if (valA > valB) return currentSort.direction === 'asc' ? 1 : -1;
        return 0;
    });

    // Reorder the DOM
    rowsArray.forEach(row => tbody.appendChild(row));
}

// Attach click handlers to sortable headers
document.querySelectorAll('.game-table th.sortable').forEach(th => {
    th.addEventListener('click', () => {
        const columnIndex = parseInt(th.getAttribute('data-column'));
        const sortType = th.getAttribute('data-sort-type');
        
        // Reset ALL sort icons to neutral first
        resetAllSortIcons();
        
        // Update sort state
        if (currentSort.column === columnIndex) {
            currentSort.direction = currentSort.direction === 'asc' ? 'desc' : 'asc';
        } else {
            currentSort.column = columnIndex;
            currentSort.direction = 'asc';
        }
        
        // Set the active icon on the clicked column
        const icon = th.querySelector('i');
        if (icon) {
            icon.classList.remove('fa-arrows-up-down');
            currentSort.direction === 'asc' ? icon.classList.add('fa-arrow-down-short-wide') : icon.classList.add('fa-arrow-up-wide-short');
            icon.style.opacity = '1';
        }
        
        sortTable(columnIndex, sortType);
    });
});

// ======================== CUSTOM DROPDOWN FACTORY (WITH SPAN CLONING) ========================
function initCustomDropdown(dropdownId, optionsConfig) {
    const dropdown = document.getElementById(dropdownId);
    if (!dropdown) return;

    const trigger = dropdown.querySelector('.dropdown-trigger');
    const selectedTextSpan = dropdown.querySelector('.dropdown-selected-text');
    const optionButtons = dropdown.querySelectorAll('.dropdown-option');
    const filterKey = optionsConfig.filterKey; // 'platform', 'rating', 'status'

    // Toggle dropdown
    trigger.addEventListener('click', (e) => {
        e.stopPropagation();
        dropdown.classList.toggle('open');
        console.log("trigger clicked!");
    });

    document.addEventListener('click', (e) => {
        if (!dropdown.contains(e.target)) {
            dropdown.classList.remove('open');
        }
    });

    // Handle option selection
    optionButtons.forEach(option => {
        option.addEventListener('click', (e) => {
            e.stopPropagation();

            // Get value from data attribute
            let value;
            if (filterKey === 'platform') value = option.getAttribute('data-platform');
            else if (filterKey === 'rating') value = option.getAttribute('data-rating');
            else if (filterKey === 'status') value = option.getAttribute('data-status');

            // Clear the selected span
            selectedTextSpan.innerHTML = '';
            selectedTextSpan.classList.remove('platform-chip', 'pc', 'ps5', 'ps4', 'xsx', 'nsw', 'status-badge', 'in-stock', 'low-stock', 'out-of-stock');

            if (filterKey === 'platform') {
                // For "All Platforms", just text
                if (value === 'all') {
                    selectedTextSpan.textContent = option.textContent.trim();
                } else {
                    // Clone the inner span from the option (which contains .platform-chip + platform class)
                    const innerSpan = option.querySelector('span');
                    if (innerSpan) {
                        const clonedSpan = innerSpan.cloneNode(true);
                        selectedTextSpan.appendChild(clonedSpan);
                    } else {
                        selectedTextSpan.textContent = option.textContent.trim();
                    }
                }
            } 
            else if (filterKey === 'status') {
                if (value === 'all') {
                    selectedTextSpan.textContent = option.textContent.trim();
                } else {
                    const innerSpan = option.querySelector('span');
                    if (innerSpan) {
                        const clonedSpan = innerSpan.cloneNode(true);
                        selectedTextSpan.appendChild(clonedSpan);
                    } else {
                        selectedTextSpan.textContent = option.textContent.trim();
                    }
                }
            }
            else { // rating – plain text
                selectedTextSpan.textContent = option.textContent.trim();
            }

            // Mark active option
            optionButtons.forEach(btn => btn.classList.remove('active'));
            option.classList.add('active');

            // Update filter state
            if (filterKey === 'platform') currentFilters.platform = value || 'all';
            else if (filterKey === 'rating') currentFilters.rating = value || 'all';
            else if (filterKey === 'status') currentFilters.status = value || 'all';

            dropdown.classList.remove('open');
            filterTable();
        });
    });
}

// ======================== INITIALIZE ALL DROPDOWNS ========================
initCustomDropdown('platform-dropdown', { filterKey: 'platform' });
initCustomDropdown('rating-dropdown', { filterKey: 'rating' });
initCustomDropdown('status-dropdown', { filterKey: 'status' });

// ======================== SEARCH INPUT ========================
if (searchInput) {
    searchInput.addEventListener('input', (e) => {
        currentFilters.search = e.target.value.toLowerCase().trim();
        filterTable();
    });
}

// ======================== RATING PROGRESS BARS ========================
document.querySelectorAll('.rating-container').forEach(container => {
    const ratingValueSpan = container.querySelector('.rating-value');
    const progressFill = container.querySelector('.progress-fill');
    if (ratingValueSpan && progressFill) {
        const rating = parseFloat(ratingValueSpan.textContent);
        if (!isNaN(rating)) {
            if (rating >= 8.0) progressFill.classList.add('high');
            else if (rating > 6.0) progressFill.classList.add('medium');
            else progressFill.classList.add('low');
            progressFill.style.width = `${(rating / 10) * 100}%`;
        }
    }
});

// ======================== RESET ALL FILTERS ========================
const resetBtn = document.querySelector('.reset');
if (resetBtn) {
    resetBtn.addEventListener('click', () => {
        // 1. Reset global filter state
        currentFilters = {
            search: '',
            platform: 'all',
            rating: 'all',
            status: 'all'
        };

        // 2. Clear search input
        if (searchInput) searchInput.value = '';

        // 3. Reset platform dropdown
        const platformDropdown = document.getElementById('platform-dropdown');
        if (platformDropdown) {
            const platformSelected = platformDropdown.querySelector('.dropdown-selected-text');
            platformSelected.innerHTML = 'All Platforms';
            platformSelected.classList.remove('platform-chip', 'pc', 'ps5', 'ps4', 'xsx', 'nsw');
            const platformOptions = platformDropdown.querySelectorAll('.dropdown-option');
            platformOptions.forEach(opt => opt.classList.remove('active'));
            const allPlatform = platformDropdown.querySelector('[data-platform="all"]');
            if (allPlatform) allPlatform.classList.add('active');
        }

        // 4. Reset rating dropdown
        const ratingDropdown = document.getElementById('rating-dropdown');
        if (ratingDropdown) {
            const ratingSelected = ratingDropdown.querySelector('.dropdown-selected-text');
            ratingSelected.innerHTML = 'All Ratings';
            ratingSelected.classList.remove('platform-chip'); // just in case
            const ratingOptions = ratingDropdown.querySelectorAll('.dropdown-option');
            ratingOptions.forEach(opt => opt.classList.remove('active'));
            const allRating = ratingDropdown.querySelector('[data-rating="all"]');
            if (allRating) allRating.classList.add('active');
        }

        // 5. Reset status dropdown
        const statusDropdown = document.getElementById('status-dropdown');
        if (statusDropdown) {
            const statusSelected = statusDropdown.querySelector('.dropdown-selected-text');
            statusSelected.innerHTML = 'All Stock';
            statusSelected.classList.remove('status-badge', 'in-stock', 'low-stock', 'out-of-stock');
            const statusOptions = statusDropdown.querySelectorAll('.dropdown-option');
            statusOptions.forEach(opt => opt.classList.remove('active'));
            const allStatus = statusDropdown.querySelector('[data-status="all"]');
            if (allStatus) allStatus.classList.add('active');
        }

        // 6. Re-run filter to show all rows
        filterTable();
    });
}

// ======================== PAGINATION ========================
let currentPage = 1;
let rowsPerPage = 10;
let allFilteredRows = []; // store rows after filtering/sorting

function updatePaginationDisplay() {
    const total = allFilteredRows.length;
    const start = (currentPage - 1) * rowsPerPage + 1;
    const end = Math.min(start + rowsPerPage - 1, total);
    document.getElementById('range-start').textContent = total === 0 ? 0 : start;
    document.getElementById('range-end').textContent = total === 0 ? 0 : end;
    document.getElementById('total-filtered').textContent = total;
    
    // Enable/disable prev/next buttons
    document.getElementById('prev-page').disabled = currentPage === 1;
    document.getElementById('next-page').disabled = currentPage * rowsPerPage >= total;
}

function renderPage() {
    if (!tbody) return;
    const start = (currentPage - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    const rowsToShow = allFilteredRows.slice(start, end);
    
    // Hide all rows first
    Array.from(tbody.querySelectorAll('tr')).forEach(row => {
        row.style.display = 'none';
    });
    // Show only rows for current page
    rowsToShow.forEach(row => {
        row.style.display = '';
        row.style.opacity = 1;
        row.style.visibility = 'visible';
    });
    
    updatePaginationDisplay();
}

// Override your existing filterTable to also store filtered rows and reset page
const originalFilterTable = filterTable;
filterTable = function() {
    // Call original filtering logic (which hides rows via display)
    originalFilterTable();
    
    // After filtering, collect visible rows (rows that are not display:none)
    allFilteredRows = Array.from(tbody.querySelectorAll('tr:not(.no-results-row)')).filter(row => {
        const computedStyle = window.getComputedStyle(row);
        return computedStyle.display !== 'none' && row.style.display !== 'none';
    });
    
    // Reset to page 1 and render
    currentPage = 1;
    renderPage();
};

// Attach event listeners for pagination
document.getElementById('prev-page').addEventListener('click', () => {
    if (currentPage > 1) {
        currentPage--;
        renderPage();
    }
});

document.getElementById('next-page').addEventListener('click', () => {
    const totalPages = Math.ceil(allFilteredRows.length / rowsPerPage);
    if (currentPage < totalPages) {
        currentPage++;
        renderPage();
    }
});

document.getElementById('per-page-select').addEventListener('change', (e) => {
    rowsPerPage = parseInt(e.target.value);
    currentPage = 1;
    renderPage();
});

// Make sure sorting also triggers pagination reset
const originalSortTable = sortTable;
sortTable = function(columnIndex, sortType) {
    originalSortTable(columnIndex, sortType);
    // After sorting, re-collect filtered rows and re-render
    allFilteredRows = Array.from(tbody.querySelectorAll('tr:not(.no-results-row)')).filter(row => {
        const computedStyle = window.getComputedStyle(row);
        return computedStyle.display !== 'none' && row.style.display !== 'none';
    });
    currentPage = 1;
    renderPage();
};

// Initial run after table loads
setTimeout(() => {
    filterTable(); // this will trigger the overridden version
}, 100);