import { createRouter, createWebHistory } from 'vue-router';

// Function to convert CamelCase or PascalCase to hyphen-case
function toHyphenCase(str: string): string {
  return str.replace(/\B([A-Z])/g, '-$1').toLowerCase();
}

// Function to load all views and return routes
function loadViewModules() {
  const viewModules = import.meta.glob('../views/*.vue');
  const routes = Object.keys(viewModules).map(path => {
    const name = path.split('/').pop().replace(/\.\w+$/, ''); // Extract the file name without extension

    const cleanName = name.replace(/View$/, ''); // Remove 'View' from the end of the name
    const hyphenCaseName = toHyphenCase(cleanName)
    console.log(hyphenCaseName)
    return {
      path: `/${hyphenCaseName}`, // Create a path in hyphen-case based on the cleaned file name
      name: cleanName,
      component: () => viewModules[path]() // Lazy load the view component
    };
  });
  return routes;
}

const routes = [
  ...loadViewModules(),
  // You can add other static routes here
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
});

export default router;