

export const getActiveCategoriesFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const categories = searchParams.getAll('category');
    return categories;
}

export const getActivePageFromURL = () => {
    const searchParams = new URLSearchParams(window.location.search);
    const activePage = searchParams.get('page') || 1;
    return Number(activePage);
}

export const getProductByIdFromURL = (products) => {
    const searchParams = new URLSearchParams(window.location.search);
    const id = searchParams.get('id');
    const product = products.filter(product => (product.id === Number(id)));
    return product;
}