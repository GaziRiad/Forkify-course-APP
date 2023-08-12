import * as model from './model.js';
import recipeView from './views/recipeView.js';
import searchView from './views/searchView.js';
import resultsView from './views/resultsView.js';
import paginationView from './views/paginationView.js';

// Pollifiling
import 'core-js/stable';
// Pollifiling Async/Await
import 'regenerator-runtime/runtime';

// if (module.hot) {
//   module.hot.accept();
// }

const controlRecipes = async function () {
  try {
    const id = window.location.hash.slice(1);

    if (!id) return;
    recipeView.renderSpinner();

    // 0) Updating results view to mark selected search results
    resultsView.update(model.getSearchResultsPage());

    // 1) Loading recipe
    await model.laodRecipe(id);
    // 2) Rendering recipe
    recipeView.render(model.state.recipe);
  } catch (err) {
    recipeView.renderError();
    console.error(err);
  }
};

const controlSearchResults = async function () {
  try {
    // 1} Get search query
    const query = searchView.getQuery();
    if (!query) return;

    resultsView.renderSpinner();

    // 2) Load searches
    await model.loadSearchResults(query);

    // 3)Render Results
    resultsView.render(model.getSearchResultsPage());

    // 4)Render Pagination buttons
    paginationView.render(model.state.search);
  } catch (err) {
    console.error(err);
  }
};

const controlPagination = function (goToPage) {
  // 3)Render New Results
  resultsView.render(model.getSearchResultsPage(goToPage));

  // 4)Render New Pagination buttons
  paginationView.render(model.state.search);
};

const controlServings = function (newServings) {
  // Update the recipe servings (in state)
  model.updateServings(newServings);

  // Update the recipe view
  // recipeView.render(model.state.recipe);
  recipeView.update(model.state.recipe);
};

const controlAddBookmark = function () {
  if (!model.state.recipe.bookmarked) model.addBookmark(model.state.recipe);
  if (model.state.recipe.bookmarked)
    model.deleteBookmark(model.state.recipe.id);
  recipeView.update(model.state.recipe);
  console.log(model.state.bookmarks);
};

const newFeature = function () {
  console.log('Welcome to the APP!');
};

const init = function () {
  recipeView.addHandlerRender(controlRecipes);
  recipeView.addHandlerUpdateServing(controlServings);
  searchView.addHandlerSearch(controlSearchResults);
  paginationView.addHandlerClick(controlPagination);
  recipeView.addHandlerAddBookmark(controlAddBookmark);
  newFeature();
};

init();

// window.addEventListener('hashchange', controlRecipes);
// window.addEventListener('load', controlRecipes);

// According to MVC, event listeners should be attached to DOM elements in the view, but they should be handled in the controler !
// For that we use the Publisher- Subscriber design pattern..
