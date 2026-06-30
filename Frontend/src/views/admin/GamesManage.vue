<script setup>
</script>

<template>
    <div class="table-wrapper">
        <div class="table-controls">
            <div class="search-wrapper">
                <input type="text" placeholder="Search games..." class="search-input">
                <button class="reset">Reset All Filters</button>
                <div class="add-game-container">
                    <button id="add-game-btn" class="add-game-btn">+ Add New Game</button>
                </div>
            </div>
            <div class="filter-wrapper">
                <div class="custom-dropdown" id="platform-dropdown">
                    <button class="dropdown-trigger" id="platform-trigger">
                        <span class="dropdown-selected-text">All Platforms</span>
                        <span class="dropdown-arrow"><i class="fa-solid fa-angle-down"></i></span>
                    </button>
                    <div class="dropdown-menu" id="platform-filter">
                        <button class="dropdown-option platform-option active" data-platform="all">All Platforms</button>
                        <button class="dropdown-option platform-option" data-platform="pc">
                            <span class="platform-chip pc">PC</span>
                        </button>
                        <button class="dropdown-option platform-option" data-platform="ps5">
                            <span class="platform-chip ps5">PS5</span>
                        </button>
                        <button class="dropdown-option platform-option" data-platform="ps4">
                            <span class="platform-chip ps4">PS4</span>
                        </button>
                        <button class="dropdown-option platform-option" data-platform="xsx">
                            <span class="platform-chip xsx">XSX</span>
                        </button>
                        <button class="dropdown-option platform-option" data-platform="nsw">
                            <span class="platform-chip nsw">NSW</span>
                        </button>
                    </div>
                </div>
                <div class="custom-dropdown" id="rating-dropdown">
                    <button class="dropdown-trigger" id="rating-trigger">
                        <span class="dropdown-selected-text">All Ratings</span>
                        <span class="dropdown-arrow"><i class="fa-solid fa-angle-down"></i></span>
                    </button>
                    <div class="dropdown-menu" id="rating-filter">
                        <button class="dropdown-option rating-option active" data-rating="all">All Ratings</button>
                        <button class="dropdown-option rating-option" data-rating="high">High (8.0 &lt;)</button>
                        <button class="dropdown-option rating-option" data-rating="medium">Medium (6.0 - 7.9)</button>
                        <button class="dropdown-option rating-option" data-rating="low">Low (&lt; 6.0)</button>
                    </div>
                </div>
                <div class="custom-dropdown" id="status-dropdown">
                    <button class="dropdown-trigger" id="status-trigger">
                        <span class="dropdown-selected-text">All Stock</span>
                        <span class="dropdown-arrow"><i class="fa-solid fa-angle-down"></i></span>
                    </button>
                    <div class="dropdown-menu" id="status-filter">
                        <button class="dropdown-option status-option active" data-status="all">All Stock</button>
                        <button class="dropdown-option status-option" data-status="instock">
                            <span class="status-badge in-stock">In Stock</span>
                        </button>
                        <button class="dropdown-option status-option" data-status="outofstock">
                            <span class="status-badge out-of-stock">Out of Stock</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div id="game-modal" class="modal-overlay">
            <div class="modal-content">
                <div class="modal-header">
                    <h2>Forge New Game</h2>
                    <button id="close-modal" class="modal-close">&times;</button>
                </div>
                <form id="new-game-form">
                    <div class="form-group">
                        <label>Game Title *</label>
                        <input type="text" id="game-title" required>
                    </div>
                    <div class="form-group">
                        <label>Developer/Publisher *</label>
                        <input type="text" id="game-developer" required placeholder="e.g., Electronic Arts, Activision">
                    </div>
                    <div class="form-group">
                        <label>Genre *</label>
                        <input type="text" id="game-genre" required placeholder="e.g., RPG, Action">
                    </div>
                    <div class="form-group">
                        <label>Price ($) *</label>
                        <input type="number" id="game-price" step="0.01" min="0" required>
                    </div>
                    <div class="form-group">
                        <label>Platforms *</label>
                        <div class="platform-checkboxes">
                            <label><input type="checkbox" value="pc"><div class="checkmark"></div> PC</label>
                            <label><input type="checkbox" value="ps5"><div class="checkmark"></div> PS5</label>
                            <label><input type="checkbox" value="ps4"><div class="checkmark"></div> PS4</label>
                            <label><input type="checkbox" value="xsx"><div class="checkmark"></div> XSX</label>
                            <label><input type="checkbox" value="nsw"><div class="checkmark"></div> NSW</label>
                        </div>
                    </div>
                    <div class="form-group">
                        <label>Stock *</label>
                        <input type="number" id="game-stock" min="0" required>
                    </div>
                    <div class="form-group">
                        <label>Rating (0-10)</label>
                        <input type="number" id="game-rating" step="0.1" min="0.1" max="10" value="0">
                    </div>
                    <div class="form-actions">
                        <button type="button" id="cancel-modal" class="cancel-btn">Cancel</button>
                        <button type="submit" class="save-btn">Add Game</button>
                    </div>
                </form>
            </div>
        </div>
        <div class="table-responsive">
            <table class="game-table">
                <thead>
                    <tr>
                        <th class="sortable" data-sort-type="number" data-column="0">ID <i class="fa-solid fa-arrow-down-short-wide"></i></th>
                        <th class="sortable" data-sort-type="string" data-column="1">Game Title <i class="fa-solid fa-arrows-up-down"></i></th>
                        <th>Developer/Publisher</th>
                        <th>Genre</th>
                        <th class="sortable" data-sort-type="number" data-column="4">Price <i class="fa-solid fa-arrows-up-down"></i></th>
                        <th>Platform</th>
                        <th class="sortable" data-sort-type="number" data-column="6">Rating <i class="fa-solid fa-arrows-up-down"></i></th>
                        <th class="sortable" data-sort-type="number" data-column="7">Stock Status <i class="fa-solid fa-arrows-up-down"></i></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr>
                        <td>1</td>
                        <td>Cyberpunk 2077</td>
                        <td>CD Projekt Red</td>
                        <td>RPG</td>
                        <td>$29.99</td>
                        <td>
                            <div class="platforms">
                                <span class="platform-chip pc">PC</span>
                                <span class="platform-chip xsx">XSX</span>
                                <span class="platform-chip nsw">NSW</span>
                            </div>
                        </td>
                        <td>
                            <div class="rating-container">
                                <div class="rating">
                                    <span class="rating-value">9.5 </span>
                                    <span class="rating-max">/ 10</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill"></div>
                                </div>
                            </div>
                        </td>
                        <td><span class="status-badge in-stock" stock="257">In Stock</span></td>
                        <td class="actions">
                            <button class="action-btn edit">Edit</button>
                            <button class="action-btn delete">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>2</td>
                        <td>Hollow Knight</td>
                        <td>Team17</td>
                        <td>Metroidvania</td>
                        <td>$14.99</td>
                        <td>
                            <div class="platforms">
                                <span class="platform-chip pc">PC</span>
                                <span class="platform-chip nsw">NSW</span>
                            </div>
                        </td>
                        <td>
                            <div class="rating-container">
                                <div class="rating">
                                    <span class="rating-value">7.8 </span>
                                    <span class="rating-max">/ 10</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill"></div>
                                </div>
                            </div>
                        </td>
                        <td><span class="status-badge low-stock" stock="24">Low Stock</span></td>
                        <td class="actions">
                            <button class="action-btn edit">Edit</button>
                            <button class="action-btn delete">Delete</button>
                        </td>
                    </tr>
                    <tr>
                        <td>3</td>
                        <td>Elden Ring</td>
                        <td>FromSoftware</td>
                        <td>Action RPG</td>
                        <td>$59.99</td>
                        <td>
                            <div class="platforms">
                                <span class="platform-chip pc">PC</span>
                                <span class="platform-chip xsx">XSX</span>
                                <span class="platform-chip ps5">PS5</span>
                            </div>
                        </td>
                        <td>
                            <div class="rating-container">
                                <div class="rating">
                                    <span class="rating-value">8.7 </span>
                                    <span class="rating-max">/ 10</span>
                                </div>
                                <div class="progress-bar">
                                    <div class="progress-fill"></div>
                                </div>
                            </div>
                        </td>
                        <td><span class="status-badge out-of-stock" stock="0">Out of Stock</span></td>
                        <td class="actions">
                            <button class="action-btn edit">Edit</button>
                            <button class="action-btn delete">Delete</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table-footer">
            <div class="pagination-info">
                Showing <span id="range-start">1</span>-<span id="range-end">10</span> 
                of <span id="total-filtered">0</span> games
            </div>
            <div class="pagination-controls">
                <div class="per-page">
                    <span>Show</span>
                    <div class="custom-dropdown" id="pagination-dropdown">
                        <button class="dropdown-trigger" id="pagination-trigger">
                            <span class="dropdown-selected-text">10</span>
                            <span class="dropdown-arrow"><i class="fa-solid fa-angle-down"></i></span>
                        </button>
                        <div class="dropdown-menu" id="pagination-filter">
                            <button class="dropdown-option pagination-option active">20</button>
                            <button class="dropdown-option pagination-option">15</button>
                            <button class="dropdown-option pagination-option">10</button>
                            <button class="dropdown-option pagination-option">5</button>
                        </div>
                    </div>
                    <span>per page</span>
                </div>
                <div class="page-controls">
                    <button id="prev-page" class="page-btn" disabled><i class="fa-solid fa-caret-left"></i></button>
                    <button id="next-page" class="page-btn" disabled><i class="fa-solid fa-caret-right"></i></button> 
                </div>
            </div>
        </div>
    </div>
</template>

<style scoped lang="scss">
</style>