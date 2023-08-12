import icons from '../../img/icons.svg';
import View from './View';

class paginationView extends View {
  _parentElement = document.querySelector('.pagination');

  addHandlerClick(handler) {
    this._parentElement.addEventListener('click', function (e) {
      const btn = e.target.closest('.btn--inline');

      if (!btn) return;

      const goToPage = +btn.dataset.goto;
      console.log(goToPage);
      handler(goToPage);
    });
  }

  _generateMarkup() {
    const numPages = Math.ceil(
      this._data.results.length / this._data.resultsPerPage
    );
    const currentPage = this._data.currentPage;
    // console.log(numPages);

    // Page 1, and there are no other pages
    if (currentPage === 1 && currentPage === numPages) {
      return ``;
    }

    // Page 1, and there are other pages
    if (currentPage === 1 && numPages > 1) {
      return `
        <button data-goto = "${
          currentPage + 1
        }" class="btn--inline pagination__btn--next">
          <span ">Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>
      `;
    }

    // Last page
    if (currentPage === numPages && numPages > 1) {
      return `
        <button data-goto = "${
          currentPage - 1
        }" class="  btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span">Page ${currentPage - 1}</span>
        </button>
      `;
    }

    // Other page
    if (currentPage !== 1 && currentPage < numPages) {
      return `
        <button data-goto = "${
          currentPage + 1
        }"class="btn--inline pagination__btn--next">
          <span">Page ${currentPage + 1}</span>
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-right"></use>
          </svg>
        </button>

        <button data-goto = "${
          currentPage - 1
        }" class="btn--inline pagination__btn--prev">
          <svg class="search__icon">
            <use href="${icons}#icon-arrow-left"></use>
          </svg>
          <span"> Page ${currentPage - 1}</span>
        </button>
      `;
    }
  }
}

export default new paginationView();
