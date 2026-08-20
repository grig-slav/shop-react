const API_URL="http://localhost:3001/products";
export async function getProducts() {
    const responce=await fetch(API_URL);
    return responce.json();
}

export async function getProductsById(id) {
    const responce=await fetch(`${API_URL}/${id}`);
    return responce.json();
}
