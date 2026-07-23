<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";

const games = ref([
    {
        id: 1,
        title: "Cyberpunk 2077",
        developer: "CD Projekt Red",
        genre: "RPG",
        price: 29.99,
        platforms: ["pc", "xsx", "nsw"],
        rating: 9.4,
        stock: 257,
    },
    {
        id: 2,
        title: "Hollow Knight",
        developer: "Team17",
        genre: "Metroidvania",
        price: 14.99,
        platforms: ["pc", "xsx", "nsw", "ps4"],
        rating: 9.2,
        stock: 150,
    },
    {
        id: 3,
        title: "Elden Ring",
        developer: "FromSoftware",
        genre: "Action RPG",
        price: 59.99,
        platforms: ["pc", "ps5", "xsx"],
        rating: 9.7,
        stock: 328,
    },
    {
        id: 4,
        title: "Stardew Valley",
        developer: "ConcernedApe",
        genre: "Simulation",
        price: 14.99,
        platforms: ["pc", "ps4", "nsw", "xsx"],
        rating: 9.0,
        stock: 72,
    },
    {
        id: 5,
        title: "The Last of Us Part II",
        developer: "Naughty Dog",
        genre: "Action Adventure",
        price: 39.99,
        platforms: ["ps5", "ps4"],
        rating: 8.8,
        stock: 41,
    },
    {
        id: 6,
        title: "Dead Space",
        developer: "Motive Studio",
        genre: "Survival Horror",
        price: 49.99,
        platforms: ["pc", "ps5", "xsx"],
        rating: 8.6,
        stock: 18,
    },
    {
        id: 7,
        title: "Diablo IV",
        developer: "Blizzard Entertainment",
        genre: "Action RPG",
        price: 69.99,
        platforms: ["pc", "ps5", "xsx"],
        rating: 7.4,
        stock: 0,
    },
    {
        id: 8,
        title: "Sonic Frontiers",
        developer: "Sonic Team",
        genre: "Platformer",
        price: 39.99,
        platforms: ["pc", "ps5", "nsw"],
        rating: 6.8,
        stock: 12,
    },
    {
        id: 9,
        title: "Marvel's Avengers",
        developer: "Crystal Dynamics",
        genre: "Action RPG",
        price: 19.99,
        platforms: ["pc", "ps5", "ps4", "xsx"],
        rating: 5.6,
        stock: 0,
    },
    {
        id: 10,
        title: "The Ascent",
        developer: "Neon Giant",
        genre: "Cyberpunk Shooter",
        price: 24.99,
        platforms: ["pc", "xsx", "ps5"],
        rating: 7.9,
        stock: 9,
    },
]);

const searchTerm = ref("");
const openDropdown = ref(null);
const selectedPlatform = ref("all");
const selectedRating = ref("all");
const selectedStatus = ref("all");

const toggleDropdown = (name) => {
    if (openDropdown.value === name) {
        openDropdown.value = null;
    } else {
        openDropdown.value = name;
    }
};

const selectOption = (filterType, value) => {
    if (filterType === "platform") selectedPlatform.value = value;
    if (filterType === "rating") selectedRating.value = value;
    if (filterType === "status") selectedStatus.value = value;
    openDropdown.value = null;
};

const filteredGames = computed(() => {
    return (
        games.value
            // 1. Search filter
            .filter((game) => game.title.toLowerCase().includes(searchTerm.value.toLowerCase()))
            // 2. Platform filter
            .filter((game) => {
                if (selectedPlatform.value === "all") return true;
                return game.platforms.includes(selectedPlatform.value);
            })
            // 3. Rating filter
            .filter((game) => {
                if (selectedRating.value === "all") return true;
                if (selectedRating.value === "high") return game.rating >= 8.0;
                if (selectedRating.value === "medium") return game.rating >= 6.0 && game.rating < 8.0;
                if (selectedRating.value === "low") return game.rating < 6.0;
                return true;
            })
            // 4. Status filter
            .filter((game) => {
                if (selectedStatus.value === "all") return true;
                if (selectedStatus.value === "in-stock") return game.stock > 0;
                if (selectedStatus.value === "low-stock") return game.stock > 0 && game.stock < 50;
                if (selectedStatus.value === "out-of-stock") return game.stock === 0;
                return true;
            })
    );
});

const getRatingClass = (rating) => {
    if (rating >= 8.0) return "high";
    if (rating >= 6.0) return "medium";
    return "low";
};

const getStockStatus = (stock) => {
    if (stock === 0) return "out-of-stock";
    if (stock < 50) return "low-stock";
    return "in-stock";
};

const statusMap = {
    all: "All Stock",
    "in-stock": "In Stock",
    "out-of-stock": "Out of Stock",
    "low-stock": "Low Stock",
};

// Close dropdowns when clicking outside
const handleClickOutside = (event) => {
    if (!event.target.closest(".custom-dropdown")) {
        openDropdown.value = null;
    }
};

// Add/remove event listener
onMounted(() => {
    document.addEventListener("click", handleClickOutside);
});

onUnmounted(() => {
    document.removeEventListener("click", handleClickOutside);
});
</script>

<template>
    <div class="table-wrapper">
        <div class="table-controls">
            <div class="search-wrapper">
                <input v-model="searchTerm" type="text" placeholder="Search games..." class="search-input" />
                <button class="reset">Reset All Filters</button>
                <div class="add-game-container">
                    <button class="add-game-btn">+ Add New Game</button>
                </div>
            </div>
            <div class="filter-wrapper">
                <div class="custom-dropdown" :class="{ open: openDropdown === 'platform' }">
                    <button @click="toggleDropdown('platform')" class="dropdown-trigger">
                        <span :class="selectedPlatform !== 'all' ? { platform: true, [selectedPlatform]: true } : ''" class="dropdown-selected-text">
                            {{ selectedPlatform.toUpperCase() !== "ALL" ? selectedPlatform.toUpperCase() : "All Platforms" }}
                        </span>
                        <span class="dropdown-arrow"><i class="fa-solid fa-angle-down"></i></span>
                    </button>
                    <div class="dropdown-menu">
                        <button
                            @click="selectOption('platform', 'all')"
                            :class="{ active: selectedPlatform === 'all' }"
                            class="dropdown-option platform-option active"
                        >
                            All Platforms
                        </button>
                        <button
                            @click="selectOption('platform', 'pc')"
                            :class="{ active: selectedPlatform === 'pc' }"
                            class="dropdown-option platform-option"
                        >
                            <span class="platform pc">PC</span>
                        </button>
                        <button
                            @click="selectOption('platform', 'ps5')"
                            :class="{ active: selectedPlatform === 'ps5' }"
                            class="dropdown-option platform-option"
                        >
                            <span class="platform ps5">PS5</span>
                        </button>
                        <button
                            @click="selectOption('platform', 'ps4')"
                            :class="{ active: selectedPlatform === 'ps4' }"
                            class="dropdown-option platform-option"
                        >
                            <span class="platform ps4">PS4</span>
                        </button>
                        <button
                            @click="selectOption('platform', 'xsx')"
                            :class="{ active: selectedPlatform === 'xsx' }"
                            class="dropdown-option platform-option"
                        >
                            <span class="platform xsx">XSX</span>
                        </button>
                        <button
                            @click="selectOption('platform', 'nsw')"
                            :class="{ active: selectedPlatform === 'nsw' }"
                            class="dropdown-option platform-option"
                        >
                            <span class="platform nsw">NSW</span>
                        </button>
                    </div>
                </div>
                <div class="custom-dropdown" :class="{ open: openDropdown === 'rating' }">
                    <button @click="toggleDropdown('rating')" class="dropdown-trigger">
                        <span
                            class="dropdown-selected-text"
                            :class="
                                selectedRating === 'all' ? 'all' : selectedRating === 'high' ? 'high' : selectedRating === 'medium' ? 'medium' : 'low'
                            "
                        >
                            {{
                                selectedRating === "all"
                                    ? "All Ratings"
                                    : selectedRating === "high"
                                      ? "High (&ge; 8.0)"
                                      : selectedRating === "medium"
                                        ? "Medium (6.0&ndash;7.9)"
                                        : "Low (&le; 6.0)"
                            }}
                        </span>
                        <span class="dropdown-arrow"><i class="fa-solid fa-angle-down"></i></span>
                    </button>
                    <div class="dropdown-menu">
                        <button
                            @click="selectOption('rating', 'all')"
                            :class="{ active: selectedRating === 'all' }"
                            class="dropdown-option rating-option"
                        >
                            All Ratings
                        </button>
                        <button
                            @click="selectOption('rating', 'high')"
                            :class="{ active: selectedRating === 'high' }"
                            class="dropdown-option rating-option"
                        >
                            High (&ge; 8.0)
                        </button>
                        <button
                            @click="selectOption('rating', 'medium')"
                            :class="{ active: selectedRating === 'medium' }"
                            class="dropdown-option rating-option"
                        >
                            Medium (6.0&ndash;7.9)
                        </button>
                        <button
                            @click="selectOption('rating', 'low')"
                            :class="{ active: selectedRating === 'low' }"
                            class="dropdown-option rating-option"
                        >
                            Low (&le; 6.0)
                        </button>
                    </div>
                </div>
                <div class="custom-dropdown" :class="{ open: openDropdown === 'status' }">
                    <button @click="toggleDropdown('status')" class="dropdown-trigger">
                        <span
                            class="dropdown-selected-text"
                            :class="selectedStatus !== 'all' ? { 'status-badge': true, [selectedStatus]: true } : ''"
                        >
                            {{ statusMap[selectedStatus] }}
                        </span>
                        <span class="dropdown-arrow"><i class="fa-solid fa-angle-down"></i></span>
                    </button>
                    <div class="dropdown-menu">
                        <button
                            @click="selectOption('status', 'all')"
                            :class="{ active: selectedStatus === 'all' }"
                            class="dropdown-option status-option"
                        >
                            All Stock
                        </button>
                        <button
                            @click="selectOption('status', 'in-stock')"
                            :class="{ active: selectedStatus === 'in-stock' }"
                            class="dropdown-option status-option"
                        >
                            <span class="status-badge in-stock">In Stock</span>
                        </button>
                        <button
                            @click="selectOption('status', 'low-stock')"
                            :class="{ active: selectedStatus === 'low-stock' }"
                            class="dropdown-option status-option"
                        >
                            <span class="status-badge low-stock">Low Stock</span>
                        </button>
                        <button
                            @click="selectOption('status', 'out-of-stock')"
                            :class="{ active: selectedStatus === 'out-of-stock' }"
                            class="dropdown-option status-option"
                        >
                            <span class="status-badge out-of-stock">Out of Stock</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <div class="table-responsive">
            <table class="game-table">
                <thead>
                    <tr>
                        <th class="sortable">ID <i class="fa-solid fa-arrow-down-short-wide"></i></th>
                        <th class="sortable">Game Title <i class="fa-solid fa-arrows-up-down"></i></th>
                        <th>Developer/Publisher</th>
                        <th>Genre</th>
                        <th class="sortable">Price <i class="fa-solid fa-arrows-up-down"></i></th>
                        <th>Platform</th>
                        <th class="sortable">Rating <i class="fa-solid fa-arrows-up-down"></i></th>
                        <th class="sortable">Stock Status <i class="fa-solid fa-arrows-up-down"></i></th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="game in filteredGames" :key="game.id">
                        <td>{{ game.id }}</td>
                        <td>{{ game.title }}</td>
                        <td>{{ game.developer }}</td>
                        <td>{{ game.genre }}</td>
                        <td>${{ game.price }}</td>
                        <td>
                            <div class="platforms">
                                <span v-for="platform in game.platforms" :class="platform" class="platform">
                                    {{ platform.toUpperCase() }}
                                </span>
                            </div>
                        </td>
                        <td>
                            <div class="rating-container">
                                <div class="rating">
                                    <span class="rating-value">{{ game.rating }}&nbsp; </span>
                                    <span class="rating-max">/ 10</span>
                                </div>
                                <div class="progress-bar">
                                    <div
                                        :class="getRatingClass(game.rating)"
                                        :style="{ width: `${(game.rating / 10) * 100}%` }"
                                        class="progress-fill"
                                    ></div>
                                </div>
                            </div>
                        </td>
                        <td>
                            <span :class="getStockStatus(game.stock)" class="status-badge" :stock="game.stock">
                                {{ statusMap[getStockStatus(game.stock)] }}
                            </span>
                        </td>
                        <td>
                            <div class="actions">
                                <button class="action-btn edit">Edit</button>
                                <button class="action-btn delete">Delete</button>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="table-footer">
            <div class="pagination-info">Showing <span>1</span>&dash;<span>10</span> of <span>0</span> games</div>
            <div class="pagination-controls">
                <div class="per-page">
                    <span>Show</span>
                    <div class="custom-dropdown" id="pagination-dropdown">
                        <button class="dropdown-trigger">
                            <span class="dropdown-selected-text">10</span>
                            <span class="dropdown-arrow"><i class="fa-solid fa-angle-down"></i></span>
                        </button>
                        <div class="dropdown-menu">
                            <button class="dropdown-option pagination-option">20</button>
                            <button class="dropdown-option pagination-option">15</button>
                            <button class="dropdown-option pagination-option active">10</button>
                            <button class="dropdown-option pagination-option">5</button>
                        </div>
                    </div>
                    <span>per page</span>
                </div>
                <div class="page-controls">
                    <button class="page-btn" disabled><i class="fa-solid fa-caret-left"></i></button>
                    <button class="page-btn" disabled><i class="fa-solid fa-caret-right"></i></button>
                </div>
            </div>
        </div>
    </div>
    <div class="modal-overlay">
        <div class="modal-content">
            <div class="modal-header">
                <h2>Forge New Game</h2>
                <button id="close-modal" class="modal-close">&times;</button>
            </div>
            <form>
                <div class="form-group">
                    <label>Game Title *</label>
                    <input type="text" required />
                </div>
                <div class="form-group">
                    <label>Developer/Publisher *</label>
                    <input type="text" required placeholder="e.g., Electronic Arts, Activision" />
                </div>
                <div class="form-group">
                    <label>Genre *</label>
                    <input type="text" required placeholder="e.g., RPG, Action" />
                </div>
                <div class="form-group">
                    <label>Price ($) *</label>
                    <input type="number" step="0.01" min="0" required />
                </div>
                <div class="form-group">
                    <label>Platforms *</label>
                    <div class="platform-checkboxes">
                        <label>
                            <input type="checkbox" value="pc" />
                            <div class="checkmark"></div>
                            <span class="platform pc">PC</span>
                        </label>
                        <label>
                            <input type="checkbox" value="ps5" />
                            <div class="checkmark"></div>
                            <span class="platform ps5">PS5</span>
                        </label>
                        <label>
                            <input type="checkbox" value="ps4" />
                            <div class="checkmark"></div>
                            <span class="platform ps4">PS4</span>
                        </label>
                        <label>
                            <input type="checkbox" value="xsx" />
                            <div class="checkmark"></div>
                            <span class="platform xsx">XSX</span>
                        </label>
                        <label>
                            <input type="checkbox" value="nsw" />
                            <div class="checkmark"></div>
                            <span class="platform nsw">NSW</span>
                        </label>
                    </div>
                </div>
                <div class="form-group">
                    <label>Stock *</label>
                    <input type="number" min="0" required />
                </div>
                <div class="form-group">
                    <label>Rating (0-10)</label>
                    <input type="number" step="0.1" min="0.1" max="10" value="0" />
                </div>
                <div class="form-actions">
                    <button type="button" class="cancel-btn">Cancel</button>
                    <button type="submit" class="save-btn">Add Game</button>
                </div>
            </form>
        </div>
    </div>
</template>

<style scoped lang="scss">
/* Table wrapper for horizontal scroll on small screens */
.table-wrapper {
    transition: variables.$transition-smooth;
    position: relative;
    // margin-left: 17.5rem;
    padding: 1rem 1rem;
    overflow-x: visible;

    .table-controls {
        @include mixins.flex-between;
        margin-bottom: 1.5rem;
        gap: 1rem;
        flex-wrap: wrap;

        .search-wrapper {
            @include mixins.flex-center;
            gap: 0.5rem;

            * {
                height: 2.25rem;
            }

            .search-input {
                @include mixins.focus-ring;
                transition: variables.$transition-smooth;
                background: colors.$bg-card;
                border: variables.$border-light;
                color: colors.$text-primary;
                padding: 0 1rem;
                border-radius: variables.$radius;
            }

            .reset {
                @include mixins.focus-ring;
                transition: variables.$transition-smooth;
                background: colors.$bg-card;
                border: variables.$border-light;
                color: colors.$text-primary;
                border-radius: variables.$radius;
                padding: 0.5rem 2rem 0.5rem 1rem;
                width: max-content;
                font-size: 0.875rem;
                font-weight: 500;
                cursor: pointer;
                user-select: none;

                &:hover {
                    border-color: colors.$accent;
                    background: functions.alpha(colors.$accent, 0.05);
                }
            }

            .add-game-container {
                @include mixins.flex-center;

                .add-game-btn {
                    @include mixins.focus-ring;
                    transition: variables.$transition-smooth;
                    background: colors.$accent;
                    border: none;
                    border-radius: variables.$radius;
                    padding: 0.5rem 1.2rem;
                    color: white;
                    font-weight: bold;
                    cursor: pointer;
                    font-size: 0.9rem;

                    &:hover {
                        background: colors.$accent-hover;
                        transform: translateY(-1px);
                    }
                }
            }
        }

        .filter-wrapper {
            @include mixins.flex-center;
            gap: 0.5rem;

            @at-root .custom-dropdown {
                position: relative;
                display: inline-flex;
                width: fit-content;
                min-width: 9rem;

                .dropdown-trigger {
                    @include mixins.flex-between;
                    @include mixins.focus-ring;
                    justify-content: space-evenly;
                    background: colors.$bg-card;
                    border: variables.$border-light;
                    transition: variables.$transition-smooth;
                    color: colors.$text-primary;
                    border-radius: variables.$radius;
                    padding: 0.5rem 1rem;
                    min-width: inherit;
                    // width: max-content;
                    height: 2.25rem;
                    font-size: 0.875rem;
                    font-weight: 500;
                    cursor: pointer;
                    gap: 0.75rem;
                    user-select: none;

                    &:hover {
                        border-color: colors.$accent;
                        background: functions.alpha(colors.$accent, 0.05);
                    }

                    .dropdown-selected-text {
                        display: inline-flex;
                        align-items: center;
                        white-space: nowrap;
                        flex: 0 0 auto;
                    }

                    .dropdown-arrow {
                        transition: variables.$transition-smooth;
                        display: inline-flex;
                        align-items: center;
                        flex-shrink: 0;
                    }
                }

                .dropdown-menu {
                    background: colors.$bg-card;
                    border: variables.$border-light;
                    transition: variables.$transition-smooth;
                    position: absolute;
                    top: calc(100% + 8px);
                    left: 0;
                    width: 100%;
                    border-radius: 14px;
                    padding: 0.5rem;
                    z-index: 100;
                    opacity: 0;
                    visibility: hidden;
                    transform: translateY(-6px) scale(0.98);
                    box-shadow:
                        0 12px 28px rgba(0, 0, 0, 0.4),
                        0 0 0 1px rgba(255, 255, 255, 0.05) inset;
                    backdrop-filter: blur(0px);

                    .dropdown-option {
                        @include mixins.flex-center;
                        @include mixins.focus-ring;
                        justify-content: flex-start;
                        color: colors.$text-primary;
                        transition: all 0.12s ease;
                        width: 100%;
                        padding: 0.6rem 0.8rem;
                        margin-bottom: 0.25rem;
                        background: transparent;
                        border: none;
                        border-radius: 10px;
                        font-size: 0.85rem;
                        font-weight: 450;
                        cursor: pointer;
                        text-align: left;
                        gap: 0.5rem;
                        user-select: none;
                        white-space: nowrap;
                        overflow: hidden;
                        text-overflow: ellipsis;

                        &:last-child {
                            margin-bottom: 0;
                        }

                        &:hover {
                            background: functions.alpha(colors.$accent, 0.12);
                        }

                        &.active {
                            background: functions.alpha(colors.$accent, 0.08);
                            color: colors.$accent;

                            &::after {
                                content: "✓";
                                font-size: 0.9rem;
                                font-weight: 600;
                                margin-left: auto;
                                color: colors.$accent;
                            }
                        }

                        &[data-platform="all"] {
                            color: colors.$text-secondary;
                            font-weight: 400;

                            &:hover {
                                background: functions.alpha(colors.$accent, 0.05);
                                color: colors.$text-primary;
                            }
                        }
                    }
                }

                &#pagination-dropdown {
                    min-width: 5rem;
                }

                &.open {
                    .dropdown-menu {
                        opacity: 1;
                        visibility: visible;
                        transform: translateY(0) scale(1);
                    }

                    .dropdown-arrow {
                        transform: rotate(-90deg);
                    }
                }
            }
        }
    }

    .table-responsive {
        overflow-x: auto;
        overflow-y: hidden;

        .game-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 0.9rem;
            min-width: 90rem;

            thead {
                tr {
                    th {
                        padding: 1rem 1.25rem;
                        text-align: left;
                        border-bottom: variables.$border-light;
                        width: min-content;
                        height: 1.75rem;
                        background-color: colors.$gray-800;
                        color: colors.$text-primary;
                        font-weight: 600;
                        letter-spacing: 0.05rem;
                        cursor: default;
                        font-size: 0.95rem;

                        &::selection {
                            color: colors.$text-primary;
                            background: functions.alpha(colors.$accent, 0.5);
                        }

                        &.sortable {
                            cursor: pointer;
                            transition: variables.$transition-smooth;

                            i {
                                color: colors.$accent;
                                font-size: 1rem;
                                margin-left: 0.4rem;
                                width: 1.05rem;
                                height: 1.05rem;
                                opacity: 0.5;
                            }

                            &:hover {
                                background: functions.alpha(colors.$accent, 0.1);

                                i {
                                    opacity: 1;
                                }
                            }
                        }

                        &:first-child {
                            i {
                                opacity: 1;
                            }
                        }
                    }
                }
            }

            tbody {
                tr {
                    transition: variables.$transition-smooth;
                    height: 3.75rem;

                    td {
                        border-bottom: variables.$border-light;
                        color: colors.$text-secondary;
                        padding: 1rem 1.25rem;
                        text-align: left;
                        width: min-content;
                        height: 1.75rem;

                        .platforms {
                            display: flex;
                            gap: 0.4rem;

                            @at-root .platform {
                                padding: 0.2rem 0.5rem;
                                border-radius: 0.25rem;
                                font-size: 0.75rem;
                                font-weight: 600;
                                line-height: 150%;
                                user-select: none;

                                &.nsw {
                                    @include mixins.status-badge(
                                        colors.$status-error,
                                        functions.alpha(colors.$status-error, 0.1),
                                        functions.alpha(colors.$status-error, 0.2)
                                    );
                                }

                                &.pc {
                                    @include mixins.status-badge(
                                        colors.$blue-500,
                                        functions.alpha(colors.$blue-500, 0.1),
                                        functions.alpha(colors.$blue-500, 0.2)
                                    );
                                }

                                &.xsx {
                                    @include mixins.status-badge(
                                        colors.$status-success,
                                        functions.alpha(colors.$status-success, 0.1),
                                        functions.alpha(colors.$status-success, 0.2)
                                    );
                                }

                                &.ps4 {
                                    color: #e50bf5;
                                    background: functions.alpha(#f805f0, 0.1);
                                    border: 1px solid functions.alpha(#f50bed, 0.2);
                                }

                                &.ps5 {
                                    color: #0006ff;
                                    background: functions.alpha(#0006ff, 0.1);
                                    border: 1px solid functions.alpha(#0006ff, 0.2);
                                }
                            }
                        }

                        .rating-container {
                            display: flex;
                            align-items: center;
                            gap: 0.6rem;

                            .rating {
                                .rating-value {
                                    font-weight: 600;
                                    color: colors.$text-primary;
                                    user-select: none;
                                }

                                .rating-max {
                                    font-size: 0.7rem;
                                    color: colors.$text-secondary;
                                    user-select: none;
                                }
                            }

                            .progress-bar {
                                flex: 1;
                                background: colors.$gray-600;
                                border-radius: variables.$radius;
                                height: 0.35rem;
                                overflow: hidden;
                                min-width: 5rem;

                                .progress-fill {
                                    transition: variables.$transition-smooth;
                                    height: 100%;
                                    border-radius: variables.$radius;

                                    &.high {
                                        background: colors.$status-success;
                                    }

                                    &.medium {
                                        background: colors.$status-warning;
                                    }

                                    &.low {
                                        background: colors.$status-error;
                                    }
                                }
                            }
                        }

                        @at-root .status-badge {
                            display: inline-block;
                            padding: 0.25rem 0.75rem;
                            border-radius: variables.$radius-lg;
                            font-size: 0.75rem;
                            font-weight: 600;
                            text-align: center;
                            user-select: none;
                            position: relative;

                            :not(.dropdown-option) > &::before {
                                content: "";
                                opacity: 0;
                                position: absolute;
                                bottom: -25%;
                                left: 50%;
                                transform: translateX(-50%);
                                border-width: 7px;
                                border-style: solid;
                                border-color: transparent transparent colors.$bg-sidebar transparent;
                                z-index: 1000;
                                transition: opacity 0.3s ease;
                            }

                            :not(.dropdown-option) > &::after {
                                content: attr(stock);
                                opacity: 0;
                                position: absolute;
                                bottom: -125%;
                                left: 50%;
                                transform: translateX(-50%);
                                background: colors.$bg-sidebar;
                                color: colors.$text-primary;
                                padding: 0.25rem 0.5rem;
                                border-radius: 4px;
                                font-size: 0.9rem;
                                width: auto;
                                z-index: 1000;
                                transition: opacity 0.3s ease;
                            }

                            &:hover {
                                &::after,
                                &::before {
                                    opacity: 1;
                                }
                            }

                            &.in-stock {
                                @include mixins.status-badge(
                                    colors.$status-success,
                                    functions.alpha(colors.$status-success, 0.1),
                                    functions.alpha(colors.$status-success, 0.2)
                                );
                            }

                            &.low-stock {
                                @include mixins.status-badge(
                                    colors.$status-warning,
                                    functions.alpha(colors.$status-warning, 0.1),
                                    functions.alpha(colors.$status-warning, 0.2)
                                );
                            }

                            &.out-of-stock {
                                @include mixins.status-badge(
                                    colors.$status-error,
                                    functions.alpha(colors.$status-error, 0.1),
                                    functions.alpha(colors.$status-error, 0.2)
                                );
                            }
                        }

                        .actions {
                            display: flex;
                            gap: 0.5rem;

                            .action-btn {
                                @include mixins.focus-ring;
                                background: transparent;
                                border: none;
                                padding: 0.3rem 0.8rem;
                                border-radius: 6px;
                                font-size: 0.75rem;
                                font-weight: 500;
                                cursor: pointer;
                                transition: all 0.2s ease;
                                user-select: none;

                                &.edit {
                                    color: colors.$accent;
                                    background: functions.alpha(colors.$accent, 0.1);
                                    border: 1px solid functions.alpha(colors.$accent, 0.2);

                                    &:hover {
                                        background: colors.$accent;
                                        color: white;
                                    }
                                }

                                &.delete {
                                    color: colors.$status-error;
                                    background: functions.alpha(colors.$status-error, 0.1);
                                    border: 1px solid functions.alpha(colors.$status-error, 0.2);

                                    &:hover {
                                        background: colors.$status-error;
                                        color: white;
                                    }
                                }
                            }
                        }

                        &::selection {
                            color: colors.$text-primary;
                            background: functions.alpha(colors.$accent, 0.35);
                        }
                    }

                    &:hover {
                        background: functions.alpha(colors.$accent, 0.05);
                    }
                }
            }
        }
    }

    .table-footer {
        @include mixins.flex-between;
        padding-top: 1rem;
        flex-wrap: wrap;
        gap: 1rem;

        .pagination-info {
            background: colors.$bg-card;
            padding: 0.4rem 1rem;
            border-radius: variables.$radius-lg;
            border: 1px solid colors.$border-divider;
            font-size: 0.85rem;
            color: colors.$text-secondary;

            span {
                font-weight: 700;
                // font-style: italic;
                font-size: 0.9rem;
                color: colors.$text-primary;
                background: functions.alpha(colors.$accent, 0.1);
                padding: 0.1rem 0.4rem;
                border-radius: 6px;
                margin: 0 0.1rem;
            }
        }

        .pagination-controls {
            display: flex;
            align-items: center;
            gap: 1rem;

            .per-page {
                display: flex;
                align-items: center;
                gap: 0.5rem;
                font-size: 0.85rem;
                color: colors.$text-secondary;

                #pagination-dropdown .dropdown-menu {
                    bottom: calc(100% + 8px);
                    top: unset;
                    transform: scale(0.98);
                }
            }

            .page-controls {
                display: flex;
                align-items: center;

                .page-btn {
                    background: colors.$bg-card;
                    border: 1px solid colors.$border-divider;
                    border-radius: 6px;
                    padding: 0.3rem 0.8rem;
                    color: colors.$text-primary;
                    font-size: 0.85rem;
                    cursor: pointer;
                    transition: all 0.2s ease;

                    &:hover:not(:disabled) {
                        border-color: colors.$accent;
                        color: colors.$accent;
                        background: functions.alpha(colors.$accent, 0.05);
                    }

                    &:focus-visible:not(:disabled) {
                        outline: none;
                        box-shadow:
                            0 0 0 2px colors.$bg-card,
                            0 0 0 4px colors.$accent;
                    }

                    &:disabled {
                        opacity: 0.4;
                        cursor: not-allowed;
                    }

                    &:first-child {
                        border-top-right-radius: 0;
                        border-bottom-right-radius: 0;
                    }

                    &:last-child {
                        border-top-left-radius: 0;
                        border-bottom-left-radius: 0;
                    }

                    i {
                        font-size: 1.25rem;
                    }
                }
            }
        }
    }
}

.modal-overlay {
    display: flex;
    opacity: 0;
    pointer-events: none;
    flex-direction: column;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    backdrop-filter: blur(1.25px);
    z-index: 2000;
    justify-content: center;
    align-items: center;
    transition: all 0.2s ease;
    overflow: hidden;

    &.open {
        opacity: 1;
        pointer-events: auto;
    }

    .modal-content {
        background: colors.$bg-card;
        border-radius: variables.$radius-lg;
        width: 40vw;
        max-height: 95vh;
        height: auto;
        overflow-y: auto;
        border: 1px solid colors.$border-divider;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.5);

        .modal-header {
            display: flex;
            position: sticky;
            top: 0;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 1.25rem;
            background: colors.$bg-card;
            border-bottom: 1px solid colors.$border-divider;

            h2 {
                margin: 0;
                font-size: 1.5rem;
                color: colors.$text-primary;
            }

            .modal-close {
                background: none;
                border: none;
                font-size: 2rem;
                cursor: pointer;
                color: colors.$text-secondary;
                transition: color 0.2s;

                &:hover {
                    color: colors.$accent;
                }
            }
        }

        form {
            padding: 1.25rem;

            .form-group {
                margin-bottom: 1.2rem;

                label {
                    display: block;
                    margin-bottom: 0.2rem;
                    font-weight: 600;
                    color: colors.$text-primary;
                }

                input,
                select {
                    width: 100%;
                    padding: 0.5rem;
                    background: colors.$bg-sidebar;
                    border: 1px solid colors.$border-divider;
                    border-radius: variables.$radius;
                    color: colors.$text-primary;
                    font-size: 0.9rem;
                    transition: all 0.2s ease;
                    outline: none;
                    box-shadow: none;

                    &:focus-visible {
                        border-color: colors.$accent;
                        box-shadow: 0 0 0 2px functions.alpha(colors.$accent, 0.3);
                    }
                }

                input {
                    &:not([type="checkbox"]) {
                        &:user-valid {
                            border-color: colors.$status-success;
                            box-shadow: 0 0 0 2px functions.alpha(colors.$status-success, 0.3);
                        }

                        &:user-invalid {
                            border-color: colors.$status-error;
                            box-shadow: 0 0 0 2px functions.alpha(colors.$status-error, 0.3);
                        }
                    }

                    &:active {
                        &::placeholder {
                            content: "";
                        }
                    }

                    &::-webkit-outer-spin-button,
                    &::-webkit-inner-spin-button {
                        -webkit-appearance: none;
                        margin: 0;
                    }
                }

                .platform-checkboxes {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 1rem;

                    label {
                        display: inline-flex;
                        align-items: center;
                        gap: 0.3rem;
                        font-weight: normal;
                    }

                    input[type="checkbox"] {
                        appearance: none;
                        width: 1.2rem;
                        height: 1.2rem;
                        border: 1px solid colors.$border-divider;
                        border-radius: 4px;
                        background: transparent;
                        cursor: pointer;
                        position: relative;

                        &:checked {
                            border-color: colors.$accent;

                            &::after {
                                content: "";
                                position: absolute;
                                top: 50%;
                                left: 50%;
                                transform: translate(-50%, -50%);
                                width: 0.6rem;
                                height: 0.6rem;
                                background: colors.$accent;
                                border-radius: 2px;
                            }
                        }
                    }
                }
            }

            .form-actions {
                display: flex;
                justify-content: flex-end;
                gap: 1rem;
                margin-top: 1.5rem;

                .cancel-btn,
                .save-btn {
                    padding: 0.5rem 1.2rem;
                    border-radius: variables.$radius;
                    font-weight: bold;
                    cursor: pointer;
                    border: none;
                }

                .cancel-btn {
                    background: transparent;
                    border: 1px solid colors.$border-divider;
                    color: colors.$text-secondary;

                    &:hover {
                        border-color: colors.$accent;
                        color: colors.$accent;
                    }
                }

                .save-btn {
                    background: colors.$accent;
                    color: white;

                    &:hover {
                        background: colors.$accent-hover;
                    }
                }
            }
        }
    }
}
</style>
