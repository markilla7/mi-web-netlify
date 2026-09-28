// // 1. Conexión a tu nuevo proyecto 'mi-web-netlify' en Supabase
const SUPABASE_URL = 'https://ixywzpizxtqvdnljwqbi.supabase.co'; //PEGA_AQUI_TU_NUEVA_PROJECT_URL
const SUPABASE_ANON_KEY = 'sb_publishable_mmuixxgYNO0kpaF-mzjpeA_PiGiRd1Z'; //PEGA_AQUI_TU_NUEVA_ANON_KEY

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Función para obtener y listar los productos
async function cargarProductos() {
    const lista = document.getElementById('product-list');
    lista.innerHTML = '<li>Cargando productos...</li>';

    const { data, error } = await _supabase
        .from('producto')
        .select('*')
        .order('id', { ascending: false });

    if (error) {
        console.error('Error al consultar:', error);
        lista.innerHTML = '<li>Error al cargar los datos.</li>';
        return;
    }

    if (data.length === 0) {
        lista.innerHTML = '<li>No hay productos registrados.</li>';
        return;
    }

    lista.innerHTML = '';
    data.forEach(prod => {
        const li = document.createElement('li');
        li.innerHTML = `<span><strong>${prod.nombre}</strong></span> <span>$${prod.precio}</span>`;
        lista.appendChild(li);
    });
}

// Función para insertar un nuevo producto
document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();

    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);

    const { error } = await _supabase
        .from('producto')
        .insert([{ nombre, precio }]);

    if (error) {
        alert('Error al guardar el producto: ' + error.message);
    } else {
        document.getElementById('product-form').reset();
        cargarProductos();
    }
});

// Ejecutar al iniciar
cargarProductos();