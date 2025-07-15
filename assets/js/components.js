// Reusable UI Components for SPA
class UIComponents {
    static createLoadingSpinner(size = 'medium') {
        const sizes = {
            small: '20px',
            medium: '40px',
            large: '60px'
        };

        return `
            <div class="loading-spinner" style="width: ${sizes[size]}; height: ${sizes[size]};">
                <div class="spinner-border" role="status">
                    <span class="sr-only">Loading...</span>
                </div>
            </div>
        `;
    }

    static createAlert(message, type = 'info') {
        return `
            <div class="alert alert-${type}" role="alert">
                <span class="alert-icon">${this.getAlertIcon(type)}</span>
                <span class="alert-message">${message}</span>
                <button class="alert-close" onclick="this.parentElement.remove()">×</button>
            </div>
        `;
    }

    static getAlertIcon(type) {
        const icons = {
            success: '✓',
            error: '✗',
            warning: '⚠',
            info: 'ℹ'
        };
        return icons[type] || icons.info;
    }

    static createPagination(currentPage, totalPages, baseUrl = '') {
        if (totalPages <= 1) return '';

        let pagination = '<div class="pagination">';

        // Previous button
        if (currentPage > 1) {
            pagination += `<a href="${baseUrl}?page=${currentPage - 1}" class="pagination-btn">← Previous</a>`;
        }

        // Page numbers
        for (let i = 1; i <= totalPages; i++) {
            if (i === currentPage) {
                pagination += `<span class="pagination-btn active">${i}</span>`;
            } else if (i <= 3 || i > totalPages - 3 || Math.abs(i - currentPage) <= 2) {
                pagination += `<a href="${baseUrl}?page=${i}" class="pagination-btn">${i}</a>`;
            } else if (i === 4 && currentPage > 6) {
                pagination += '<span class="pagination-ellipsis">...</span>';
            } else if (i === totalPages - 3 && currentPage < totalPages - 5) {
                pagination += '<span class="pagination-ellipsis">...</span>';
            }
        }

        // Next button
        if (currentPage < totalPages) {
            pagination += `<a href="${baseUrl}?page=${currentPage + 1}" class="pagination-btn">Next →</a>`;
        }

        pagination += '</div>';
        return pagination;
    }

    static createModal(id, title, content, actions = []) {
        return `
            <div id="${id}" class="modal">
                <div class="modal-content">
                    <div class="modal-header">
                        <h3>${title}</h3>
                        <button class="modal-close" onclick="closeModal('${id}')">&times;</button>
                    </div>
                    <div class="modal-body">
                        ${content}
                    </div>
                    ${actions.length > 0 ? `
                        <div class="modal-footer">
                            ${actions.map(action => `
                                <button class="btn ${action.class || 'btn-secondary'}" 
                                        onclick="${action.onclick || ''}">${action.text}</button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    static createCard(title, content, imageUrl = '', actions = []) {
        return `
            <div class="card">
                ${imageUrl ? `<img src="${imageUrl}" alt="${title}" class="card-image">` : ''}
                <div class="card-content">
                    <h3 class="card-title">${title}</h3>
                    <div class="card-body">${content}</div>
                    ${actions.length > 0 ? `
                        <div class="card-actions">
                            ${actions.map(action => `
                                <button class="btn ${action.class || 'btn-primary'}" 
                                        onclick="${action.onclick || ''}">${action.text}</button>
                            `).join('')}
                        </div>
                    ` : ''}
                </div>
            </div>
        `;
    }

    static createBreadcrumb(items) {
        return `
            <nav class="breadcrumb">
                ${items.map((item, index) => `
                    <span class="breadcrumb-item ${index === items.length - 1 ? 'active' : ''}">
                        ${item.url && index < items.length - 1 ? 
                            `<a href="${item.url}">${item.text}</a>` : 
                            item.text
                        }
                    </span>
                    ${index < items.length - 1 ? '<span class="breadcrumb-separator">›</span>' : ''}
                `).join('')}
            </nav>
        `;
    }

    static createTabs(tabs, activeTab = 0) {
        return `
            <div class="tabs">
                <div class="tab-headers">
                    ${tabs.map((tab, index) => `
                        <button class="tab-header ${index === activeTab ? 'active' : ''}" 
                                onclick="switchTab(${index})">${tab.title}</button>
                    `).join('')}
                </div>
                <div class="tab-contents">
                    ${tabs.map((tab, index) => `
                        <div class="tab-content ${index === activeTab ? 'active' : ''}" 
                             id="tab-${index}">${tab.content}</div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    static createAccordion(items) {
        return `
            <div class="accordion">
                ${items.map((item, index) => `
                    <div class="accordion-item">
                        <div class="accordion-header" onclick="toggleAccordion(${index})">
                            <h3>${item.title}</h3>
                            <span class="accordion-toggle">+</span>
                        </div>
                        <div class="accordion-content" id="accordion-${index}">
                            ${item.content}
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }

    static createProgressBar(percentage, label = '') {
        return `
            <div class="progress-bar">
                ${label ? `<div class="progress-label">${label}</div>` : ''}
                <div class="progress-track">
                    <div class="progress-fill" style="width: ${percentage}%"></div>
                </div>
                <div class="progress-text">${percentage}%</div>
            </div>
        `;
    }

    static createToast(message, type = 'info', duration = 3000) {
        const toastId = 'toast-' + Date.now();
        const toast = `
            <div id="${toastId}" class="toast toast-${type}">
                <span class="toast-icon">${this.getAlertIcon(type)}</span>
                <span class="toast-message">${message}</span>
                <button class="toast-close" onclick="removeToast('${toastId}')">×</button>
            </div>
        `;

        // Add to toast container or create one
        let container = document.getElementById('toast-container');
        if (!container) {
            container = document.createElement('div');
            container.id = 'toast-container';
            container.className = 'toast-container';
            document.body.appendChild(container);
        }

        container.insertAdjacentHTML('beforeend', toast);

        // Auto-remove after duration
        setTimeout(() => {
            this.removeToast(toastId);
        }, duration);

        return toastId;
    }

    static removeToast(toastId) {
        const toast = document.getElementById(toastId);
        if (toast) {
            toast.classList.add('toast-removing');
            setTimeout(() => toast.remove(), 300);
        }
    }

    static createDropdown(options, selectedValue = '', placeholder = 'Select an option') {
        return `
            <div class="dropdown">
                <button class="dropdown-toggle" onclick="toggleDropdown(this)">
                    <span class="dropdown-text">${selectedValue || placeholder}</span>
                    <span class="dropdown-arrow">▼</span>
                </button>
                <div class="dropdown-menu">
                    ${options.map(option => `
                        <div class="dropdown-item ${option.value === selectedValue ? 'selected' : ''}" 
                             onclick="selectDropdownItem(this, '${option.value}')">${option.text}</div>
                    `).join('')}
                </div>
            </div>
        `;
    }

    static createImageGallery(images, columns = 3) {
        return `
            <div class="image-gallery" style="grid-template-columns: repeat(${columns}, 1fr);">
                ${images.map((image, index) => `
                    <div class="gallery-item" onclick="openImageModal(${index})">
                        <img src="${image.thumbnail || image.url}" alt="${image.alt || ''}" loading="lazy">
                        ${image.caption ? `<div class="gallery-caption">${image.caption}</div>` : ''}
                    </div>
                `).join('')}
            </div>
        `;
    }

    static createDataTable(headers, rows, options = {}) {
        const { sortable = false, searchable = false, pagination = false } = options;

        return `
            <div class="data-table-container">
                ${searchable ? `
                    <div class="table-search">
                        <input type="text" placeholder="Search..." onkeyup="filterTable(this)">
                    </div>
                ` : ''}
                
                <table class="data-table">
                    <thead>
                        <tr>
                            ${headers.map(header => `
                                <th ${sortable ? `onclick="sortTable(this)" class="sortable"` : ''}>
                                    ${header}
                                    ${sortable ? '<span class="sort-indicator"></span>' : ''}
                                </th>
                            `).join('')}
                        </tr>
                    </thead>
                    <tbody>
                        ${rows.map(row => `
                            <tr>
                                ${row.map(cell => `<td>${cell}</td>`).join('')}
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
                
                ${pagination ? this.createPagination(1, Math.ceil(rows.length / 10)) : ''}
            </div>
        `;
    }
}

// Global utility functions for components
window.closeModal = function(modalId) {
    const modal = document.getElementById(modalId);
    if (modal) {
        modal.classList.remove('show');
        document.body.style.overflow = 'auto';
    }
};

window.switchTab = function(tabIndex) {
    // Remove active class from all tabs
    document.querySelectorAll('.tab-header').forEach(header => header.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab
    document.querySelectorAll('.tab-header')[tabIndex].classList.add('active');
    document.getElementById(`tab-${tabIndex}`).classList.add('active');
};

window.toggleAccordion = function(index) {
    const content = document.getElementById(`accordion-${index}`);
    const toggle = content.previousElementSibling.querySelector('.accordion-toggle');
    
    if (content.classList.contains('active')) {
        content.classList.remove('active');
        toggle.textContent = '+';
    } else {
        // Close all other accordions
        document.querySelectorAll('.accordion-content').forEach(item => {
            item.classList.remove('active');
        });
        document.querySelectorAll('.accordion-toggle').forEach(toggle => {
            toggle.textContent = '+';
        });
        
        // Open selected accordion
        content.classList.add('active');
        toggle.textContent = '-';
    }
};

window.toggleDropdown = function(button) {
    const dropdown = button.parentElement;
    dropdown.classList.toggle('open');
    
    // Close other dropdowns
    document.querySelectorAll('.dropdown').forEach(dd => {
        if (dd !== dropdown) dd.classList.remove('open');
    });
};

window.selectDropdownItem = function(item, value) {
    const dropdown = item.closest('.dropdown');
    const toggle = dropdown.querySelector('.dropdown-toggle .dropdown-text');
    
    toggle.textContent = item.textContent;
    dropdown.classList.remove('open');
    
    // Remove selected class from all items
    dropdown.querySelectorAll('.dropdown-item').forEach(i => i.classList.remove('selected'));
    item.classList.add('selected');
    
    // Trigger change event
    const event = new CustomEvent('dropdownChange', { detail: { value, text: item.textContent } });
    dropdown.dispatchEvent(event);
};

window.removeToast = UIComponents.removeToast.bind(UIComponents);

// Close dropdowns when clicking outside
document.addEventListener('click', (e) => {
    if (!e.target.closest('.dropdown')) {
        document.querySelectorAll('.dropdown').forEach(dd => dd.classList.remove('open'));
    }
});

// Export for module use
window.UIComponents = UIComponents;