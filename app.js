// 1. Inicializar Supabase con tus credenciales de la nube
const SUPABASE_URL = 'TU_PROJECT_URL_AQUI';
const SUPABASE_ANON_KEY = 'TU_ANON_PUBLIC_KEY_AQUI';

const { createClient } = supabase;
const _supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// 2. Función para leer y mostrar los datos de la base de datos
async function cargarProductos() {
    const lista = document.getElementById('product-list');
    lista.innerHTML = '<li>Cargando...</li>';

    // Consultamos la tabla 'productos' en Supabase
    const { data, error } = await _supabase.from('productos').select('*');

    if (error) {
        console.error('Error al cargar:', error);
        lista.innerHTML = '<li>Error al cargar los datos</li>';
        return;
    }

    lista.innerHTML = '';
    data.forEach(prod => {
        const li = document.createElement('li');
        li.textContent = `${prod.nombre} - $${prod.precio}`;
        lista.appendChild(li);
    });
}

// 3. Función para insertar un nuevo registro al enviar el formulario
document.getElementById('product-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const nombre = document.getElementById('nombre').value;
    const precio = parseFloat(document.getElementById('precio').value);

    const { error } = await _supabase
        .from('productos')
        .insert([{ nombre, precio }]);

    if (error) {
        alert('Error al guardar: ' + error.message);
    } else {
        document.getElementById('product-form').reset();
        cargarProductos(); // Recargamos la lista
    }
});

// Ejecutar al cargar la página
cargarProductos();